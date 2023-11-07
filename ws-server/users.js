const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const config = require('./config.js')

const router = express.Router();

const parametriConnessioneDB = config.dbParams;

router.get('/', (request, response) => {
    const connessione = mysql.createConnection(parametriConnessioneDB);
    let querySTR = 'SELECT id, nome, cognome, data_nascita, email, username FROM Users';
    connessione.query(querySTR, (error, dati) => {
        if (!error) {
            response.json(dati)
        }
        else {
            response.status(500).send(error);
        }
    })
    connessione.end(() => { });
})

router.get('/:id', (request, response) => {
    let id = request.params.id;
    if (id) {
        const connessione = mysql.createConnection(parametriConnessioneDB);
        let querySTR = 'SELECT id, nome, cognome, data_nascita, email, username FROM Users WHERE id = ?';
        connessione.query(querySTR, id, (error, dati) => {
            if (!error) {
                response.json(dati)
            }
            else {
                response.status(500).send(error);
            }
        })
        connessione.end(() => { });
    }
    else {
        response.status(404).send(error);
    }
})

router.delete('/:id', (request, response) => {
    let id = request.params.id;
    if (id) {
        const connessione = mysql.createConnection(parametriConnessioneDB);
        let querySTR = 'DELETE FROM Users WHERE id = ?';
        connessione.query(querySTR, id, (error, dati) => {
            if (!error) {
                response.json(dati)
            }
            else {
                response.status(500).send(error);
            }
        })
        connessione.end(() => { });
    }
    else {
        response.status(404).send(error);
    }
})

router.post('/', (request, response) => {
    let userPassword = request.body.password;
    let saltRounds = bcrypt.genSaltSync(10);
    let cryptedPassword = bcrypt.hashSync(userPassword, saltRounds);
    console.log(cryptedPassword);

    let nuovoUtente = [request.body.nome, request.body.cognome, request.body.data_nascita,
    request.body.email, request.body.username, cryptedPassword];
    
    const connessione = mysql.createConnection(parametriConnessioneDB);
    let querySTR = 'INSERT INTO Users (nome, cognome, data_nascita, email, username, password) VALUES (?, ?, ?, ?, ?, ?)';
    connessione.query(querySTR, nuovoUtente,(error, dati) => {
        if (!error) {
            response.json(dati)
        }
        else {
            response.status(500).send(error);
        }
    })
    connessione.end(() => { });
});

router.put('/:id', (request, response) => {
    let id = request.params.id;
    let nuovoUtente = [request.body.nome, request.body.cognome, request.body.data_nascita,
    request.body.email, id];
    
    const connessione = mysql.createConnection(parametriConnessioneDB);
    let querySTR = 'UPDATE Users SET nome = ?, cognome = ?, data_nascita = ?, email = ? WHERE id = ?';
    connessione.query(querySTR, nuovoUtente,(error, dati) => {
        if (!error) {
            response.json(dati)
        }
        else {
            response.status(500).send(error);
        }
    })
    connessione.end(() => { });
});

module.exports = router;



