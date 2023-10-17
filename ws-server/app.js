const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const service = express();

service.use(cors());

service.get('/', (request, response) => {
    response.sendFile(__dirname + '/help.html');
});

const server = service.listen(3000, () => {
    console.log('Server in esecuzione...');
})




