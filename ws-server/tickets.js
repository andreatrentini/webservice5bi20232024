const express = require('express');
const mysql = require('mysql2');

const config = require('./config.js');
const auth = require('./auth.js');

const router = express.Router();

const parametriConnessioneDB = config.dbParams;

router.use(auth)

router.get('/', (request, response) => {
    const connessione = mysql.createConnection(parametriConnessioneDB);
    let querySTR = 'SELECT * FROM Tickets';
    connessione.query(querySTR, (error, dati) => {
        connessione.end(() => { });
        if (!error) {
            response.json(dati)
        }
        else {      
            response.status(500).send(error);
        }
    })    
})

router.get('/:id', (request, response) => {
    let id = request.params.id;
    if (id) {
        const connessione = mysql.createConnection(parametriConnessioneDB);
        let querySTR = 'SELECT * FROM Tickets WHERE id = ?';
        connessione.query(querySTR, id, (error, dati) => {
            connessione.end(() => { });
            if (!error) {
                response.json(dati)
            }
            else {               
                response.status(500).send(error);
            }
        })       
    }
    else {
        response.status(404).send(error);
    }
})

router.get('/user/:id', (request, response) => {
    let id = request.params.id;
    if (id) {
        const connessione = mysql.createConnection(parametriConnessioneDB);
        let querySTR = 'SELECT * FROM Tickets WHERE id_utente = ?';
        connessione.query(querySTR, id, (error, dati) => {
            connessione.end(() => { });
            if (!error) {
                response.json(dati)
            }
            else {               
                response.status(500).send(error);
            }
        })       
    }
    else {
        response.status(404).send(error);
    }
})

router.delete('/:id', (request, response) => {
    let id = request.params.id;
    if (id) {
        const connessione = mysql.createConnection(parametriConnessioneDB);
        let querySTR = 'DELETE FROM Tickets WHERE id = ?';
        connessione.query(querySTR, id, (error, dati) => {
            connessione.end(() => { });
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
    
    let nuovoTicket = [request.body.titolo, request.body.descrizione, request.body.data_creazione,
        request.body.data_chiusura, request.body.stato, request.body.id_utente];
        
        const connessione = mysql.createConnection(parametriConnessioneDB);
        let querySTR = 'INSERT INTO Tickets (titolo, descrizione, data_creazione, data_chiusura, stato, id_utente) VALUES (?, ?, ?, ?, ?, ?)';
        connessione.query(querySTR, nuovoTicket,(error, dati) => {
            connessione.end(() => { });
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
    let nuovoTicket = [request.body.titolo, request.body.descrizione, request.body.data_creazione,
        request.body.data_chiusura, request.body.stato, id_utente];
        
        const connessione = mysql.createConnection(parametriConnessioneDB);
        let querySTR = 'UPDATE Tickets SET titolo = ?, descrizione = ?, data_creazione = ?, data_chiusura = ?, stato = ?, id_utente = ? WHERE id = ?';
        connessione.query(querySTR, nuovoTicket,(error, dati) => {
            connessione.end(() => { });
            if (!error) {
                response.json(dati)
            }
            else {
                response.status(500).send(error);
            }
        })        
    });

module.exports = router;