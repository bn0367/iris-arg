const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const Filter = require('bad-words');
const filter = new Filter();

const app = express();
const port = 3001;

const SALT_ROUNDS = 10;
const TOKEN_EXPIRY = '24h';
const HISTORY_LIMIT = 10;
const CHAT_COOLDOWN = 5000;


app.use(bodyParser.json());
app.use(cors());

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
    db.get(user, (err, value) => {
            if (err) {
                res.send(err);
            } else {
                value = JSON.parse(value);
                res.send({
                    user: value.user,
                });
            }
        }
    );
});

app.post('/api/token', (req, res) => {
    let token;
    try {
        token = req.body.token;
    } catch (e) {
        res.status(400).send({message: 'invalid token'});
        return;
    }
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            res.status(401).send(err);
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
        if (!usernameRegex.test(user) || filter.clean(user) !== user) {
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
                } else {
                    res.status(400).send({"message": "Incorrect password"});
                }
            }
        }
    );
});

app.post('/api/chat/poll', (req, res) => {
    res.send(chat_history);
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
            // make sure the user hasn't sent another chat message in the past second
            if (chat_history.find(item => item.user === user && item.time > Date.now() - CHAT_COOLDOWN)) {
                res.status(400).send({"message": "You can only send one message every 5 seconds"});
                return;
            }
            if (chat_history.length >= HISTORY_LIMIT) {
                chat_history.shift();
            }
            chat_history.push({user: user, message: filter.clean(message), time: Date.now()});
            res.send({message: 'success'});
        }
    });

});

app.listen(port, () => console.log(`Listening on port ${port}`));