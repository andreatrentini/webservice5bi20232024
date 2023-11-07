const config = {
    dbParams: {
        host: 'db-server',
        user: 'root',
        password: 'root',
        database: 'gestione_ticket'
    },
    serverPort: 3000,
    secret: 'cisco',
    saltRounds: 10,
    baseUrls: {
        users: '/users'
    }
}

module.exports = config;