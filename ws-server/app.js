const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const usersRouter = require('./users.js');

const config = require('./config.js')

const service = express();
service.use(cors());
service.use(bodyParser.json());
service.use(bodyParser.urlencoded({extended: false}));

const parametriConnessioneDB = config.dbParams;

service.get('/', (request, response) => {
    response.sendFile(__dirname + '/help.html');
});

service.use(config.baseUrls.users, usersRouter);

const server = service.listen(config.serverPort, () => {
    console.log('Server in esecuzione...');
})




