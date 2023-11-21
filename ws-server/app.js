const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const usersRouter = require('./users.js');

const config = require('./config.js')

const service = express();
service.use(cors());
service.use(bodyParser.json());
service.use(bodyParser.urlencoded({extended: false}));

config.secret = fs.readFileSync('/run/secrets/init_secret', 'utf8');
config.dbParams.password = fs.readFileSync('/run/secrets/root_db_password', 'utf8');
config.dbParamsInit.password = config.dbParams.password;

service.get('/', (req, res) => {
    res.sendFile(__dirname + '/help.html');
});

service.post('/init', (req, res) => {
    let secret = req.body.secret;
    if (secret === config.secret) {
        // 1. carico da file  lo script SQL
        const scriptSQL = fs.readFileSync(__dirname + '/script.sql', 'utf8');
        connessione = mysql.createConnection(config.dbParamsInit);        
        // 2. eseguo lo script SQL
        connessione.query(scriptSQL, (error, dati) => {
            connessione.end(() => { });
            if (!error) {                
                connessione = mysql.createConnection(config.dbParams);
                let querySTR = 'INSERT INTO Users (username, password) VALUES (?, ?)';
                let adminPassword = fs.readFileSync('/run/secrets/admin_ws_password', 'utf8');
                let password = bcrypt.hashSync(adminPassword, config.saltRounds);
                let nuovoUtente = ['admin', password];
                connessione.query(querySTR, nuovoUtente, (error, dati) => {
                    connessione.end(() => { });
                    if (!error) {
                        res.status(200).send('Database inizializzato correttamente.');
                    }
                    else {
                        res.status(500).send(error);
                    }
                })               
            }
            else {
                res.status(500).send(error);
            }
        })
    }
    else {
        res.status(401).send('Unauthorized');
    }
})

service.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username && password) {
        const connessione = mysql.createConnection(config.dbParams);
        let querySTR = 'SELECT * FROM Users WHERE username = ?';
        connessione.query(querySTR, username, (error, dati) => {
            connessione.end(() => { });
            if (!error) {
                if (dati.length > 0) {
                    let user = dati[0];
                    let passwordHash = user.password;
                    if (bcrypt.compareSync(password, passwordHash)) {                        
                        let token = {};
                        token.username = user.username;
                        token.data_creazione = new Date();
                        token.data_scadenza = new Date();
                        token.data_scadenza.setDate(token.data_creazione.getDate() + 1);
                        token.ruolo = 'admin';

                        let tokenBearer = jwt.sign(token, config.secretPhrase);

                        res.json({token: tokenBearer});                        
                    }
                    else {
                        res.status(401).send('Unauthorized');
                    }
                }
                else {
                    res.status(401).send('Unauthorized');
                }
            }
            else {
                res.status(500).send(error);
            }
        })
    }
    else {
        res.status(401).send('Unauthorized');
    }
})

service.use(config.baseUrls.users, usersRouter);

const server = service.listen(config.serverPort, () => {
    console.log('Server in esecuzione...');
})




