const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const app = express();
const port = 3001;

const SALT_ROUNDS = 10;
const TOKEN_EXPIRY = '24h';


app.use(bodyParser.json());

const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
const passwordRegex = /^[a-zA-Z0-9 !@#$%^&*]{6,20}/;

function generateToken(user) {
    return jwt.sign(user, 'secret', {expiresIn: TOKEN_EXPIRY});
}

app.get('/', (req, res) => {
    res.send({"message": "success"});
});

app.get('/api/user/:user', (req, res) => {
    const user = req.params.user.toString();
    db.get(user, (err, value) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(JSON.parse(value));
            }
        }
    );
});

// check token validity
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
        if (!usernameRegex.test(user)) {
            res.status(400).send({"message": "username is not valid"});
            return;
        }
        password = req.body.password.toString();
        console.log(password)
        if (!passwordRegex.test(password)) {
            res.status(400).send({"message": "password is not valid"});
            return;
        }
        password = await bcrypt.hash(password, SALT_ROUNDS);
    } catch (e) {
        res.status(400).send({error: 'Invalid request (missing/malformed parameters)'});
        return;
    }
    db.get(user, (err, value) => {
            if (err) {
                db.put(user, JSON.stringify({user: user, password: password}), (err) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.send({message: "success", token: generateToken({user: user})});
                        }
                    }
                );
            } else {
                console.log(value);
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
                res.status(500).send(err);
            } else {
                const user = JSON.parse(value);
                if (await bcrypt.compare(password, user.password)) {
                    res.send({message: 'success', token: generateToken({user: user.user})});
                } else {
                    res.status(400).send({"message": "password is not valid"});
                }
            }
        }
    );
});
app.listen(port, () => console.log(`Listening on port ${port}`));