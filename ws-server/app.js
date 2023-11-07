const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const usersRouter = require('./users.js');
const fs = require('fs');

const config = require('./config.js')

const service = express();
service.use(cors());
service.use(bodyParser.json());
service.use(bodyParser.urlencoded({extended: false}));

const parametriConnessioneDB = config.dbParams;

service.get('/', (req, res) => {
    res.sendFile(__dirname + '/help.html');
});

service.post('/init', (req, res) => {
    let secret = req.body.secret;
    if (secret === config.secret) {
        // 1. carico da file  lo script SQL
        const scriptSQL = fs.readFileSync(__dirname + '/script.sql', 'utf8');
        console.log(scriptSQL);
        connessione = mysql.createConnection(parametriConnessioneDB);
        // 2. eseguo lo script SQL
        connessione.query(scriptSQL, (error, dati) => {
            if (!error) {

                connessione = mysql.createConnection(parametriConnessioneDB);
                let querySTR = 'INSERT INTO Users (username, password) VALUES (?, ?)';
                let password = bcrypt.hashSync(config.secret, config.saltRounds);
                let nuovoUtente = ['admin', password];
                connessione.query(querySTR, nuovoUtente, (error, dati) => {
                    if (!error) {
                        res.send('Database inizializzato correttamente');
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

service.use(config.baseUrls.users, usersRouter);

const server = service.listen(config.serverPort, () => {
    console.log('Server in esecuzione...');
})




