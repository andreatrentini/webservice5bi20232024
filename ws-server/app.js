const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const service = express();

const parametriConnessioneDB = {
    host: 'db-server',
    user:'root',
    password: 'root',
    database: 'gestione_ticket'
};

const connessione = mysql.createConnection(parametriConnessioneDB);

service.use(cors());

service.get('/', (request, response) => {
    response.sendFile(__dirname + '/help.html');
});

service.get('/users', (request, response) => {
    let querySTR = 'SELECT * FROM Users';
    connessione.query(querySTR, (error, dati) => {
        if (!error) {
            response.json(dati)
        }
        else {
            response.status(500).send(error);
        }
    })
})

const server = service.listen(3000, () => {
    console.log('Server in esecuzione...');
})




