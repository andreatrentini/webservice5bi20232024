const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const service = express();
service.use(cors());
service.use(bodyParser.json());
service.use(bodyParser.urlencoded({extended: false}));

const parametriConnessioneDB = {
    host: 'db-server',
    user: 'root',
    password: 'root',
    database: 'gestione_ticket'
};

service.get('/', (request, response) => {
    response.sendFile(__dirname + '/help.html');
});

service.get('/users', (request, response) => {
    const connessione = mysql.createConnection(parametriConnessioneDB);
    let querySTR = 'SELECT * FROM Users';
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

service.get('/users/:id', (request, response) => {
    let id = request.params.id;
    if (id) {
        const connessione = mysql.createConnection(parametriConnessioneDB);
        let querySTR = 'SELECT * FROM Users WHERE id = ?';
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

service.delete('/users/:id', (request, response) => {
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

service.post('/users', (request, response) => {
    let nuovoUtente = [request.body.nome, request.body.cognome, request.body.data_nascita,
    request.body.email, request.body.username, request.body.password];
    
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


const server = service.listen(3000, () => {
    console.log('Server in esecuzione...');
})




