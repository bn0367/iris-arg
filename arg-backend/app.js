const db = require('./db');
const bodyParser = require('body-parser');
const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const profanity = require('profanity-middleware');
const fs = require('fs');
const http = require('http');
const https = require('https');

const app = express();
const port = 3001;

const SALT_ROUNDS = 10;
const TOKEN_EXPIRY = '24h';
const HISTORY_LIMIT = 10;
const CHAT_COOLDOWN = 5000;
const CHAT_MESSAGE_LIMIT = 128;

const DEBUG = true;

profanity.setOptions({
    mask: '#',
    fullyMasked: true,
});

app.use(bodyParser.json());
app.use(cors());
app.use(profanity.init);

const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
const passwordRegex = /^[a-zA-Z0-9 !@#$%^&*]{6,20}$/;

const chat_history = [];

function generateToken(user) {
    return jwt.sign(user, 'secret', {expiresIn: TOKEN_EXPIRY});
}

app.get('/', (req, res) => {
    res.send({"message": "success"});
});

app.get('/api/user/:user', (req, res) => {
    let user;
    try {
        user = req.params.user.toString();
    } catch (e) {
        res.status(400).send({"message": "Invalid user"});
        return;
    }
    console.log(`[USER] ${user} looked up`);
    db.get(user, (err, value) => {
            if (err) {
                res.send(err);
            } else {
                value = JSON.parse(value);
                res.send({user: value.user,});
            }
        }
    );
});

app.post('/api/token', (req, res) => {
    console.log(`[TOKN] token verification request`);
    let token;
    try {
        token = req.body.token;
    } catch (e) {
        res.status(400).send({message: 'invalid token'});
        return;
    }
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            res.status(200).send(err);
        } else {
            res.send(decoded);
        }
    });
});

app.post('/api/register', async (req, res) => {
    let user;
    let password;
    try {
        user = req.body.user.toString();
        if (!usernameRegex.test(user) || profanity.filter(user) !== user) {
            res.status(400).send({"message": "username is not valid"});
            return;
        }
        password = req.body.password.toString();
        if (!passwordRegex.test(password)) {
            res.status(400).send({"message": "password is not valid"});
            return;
        }
        password = await bcrypt.hash(password, SALT_ROUNDS);
    } catch (e) {
        res.status(400).send({error: 'Invalid request (missing/malformed parameters)'});
        return;
    }
    db.get(user, (err,) => {
            if (err) {
                db.put(user, JSON.stringify({user: user, password: password}), (err) => {
                        if (err) {
                            res.send(err);
                        } else {
                            res.send({message: "success", token: generateToken({user: user})});
                            console.log(`[AUTH] ${user} registered`);
                        }
                    }
                );
            } else {
                res.status(400).send({"message": "username already exists"});
            }
        }
    );
});

app.post('/api/login', async (req, res) => {
    let user;
    let password;
    try {
        user = req.body.user.toString();
        password = req.body.password.toString();
    } catch (e) {
        res.status(400).send({error: 'Invalid request (missing/malformed parameters)'});
        return;
    }
    db.get(user, async (err, value) => {
            if (err) {
                res.send(err);
            } else {
                const user = JSON.parse(value);
                if (await bcrypt.compare(password, user.password)) {
                    res.send({message: 'success', token: generateToken({user: user.user})});
                    console.log(`[AUTH] ${user.user} logged in`);
                } else {
                    res.status(400).send({"message": "Incorrect password"});
                }
            }
        }
    );
});

app.post('/api/chat/poll', (req, res) => {
    //console.log('[CHAT] history polled'); // this gets super spammy
    res.send(chat_history);
});

app.post('api/special', (req, res) => {
    let id;
    let token;
    try {
        id = req.body.id.toString();
        token = req.body.token.toString();
    } catch (e) {
        res.status(400).send({error: 'Invalid request (missing/malformed parameters)'});
        return;
    }
    console.log(`[SPCL] special request '${id}'`);
    jwt.verify(token, 'secret', (err) => {
        if (err) {
            res.status(401).send(err);
        } else {
            res.send({message: 'success'});
        }
    });
});

app.post('/api/chat/send', async (req, res) => {
    let token;
    let message;
    try {
        token = req.body.token.toString();
        message = req.body.message.toString();
    } catch (e) {
        res.status(400).send({error: 'Invalid request (missing/malformed parameters)'});
        return;
    }
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            res.status(401).send(err);
        } else {
            const user = decoded.user;
            if (chat_history.find(item => item.user === user && item.time > Date.now() - CHAT_COOLDOWN)) {
                res.status(400).send({"message": "You can only send one message every 5 seconds"});
                return;
            }
            if (message.length > CHAT_MESSAGE_LIMIT) {
                res.status(400).send({"message": `Message is ${message.length - CHAT_MESSAGE_LIMIT} characters too long`});
                return;
            }
            if (chat_history.length >= HISTORY_LIMIT) {
                chat_history.shift();
            }
            chat_history.push({user: user, message: message, time: Date.now()});
            console.log(`[CHAT] ${user} said: ${message}`);
            res.send({message: 'success'});
        }
    });

});


let server = (DEBUG ? http : https).createServer(DEBUG ? {} : {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app).listen(port, () => console.log(`Listening on port ${port}`));