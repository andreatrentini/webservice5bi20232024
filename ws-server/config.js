const config = {
    dbParams: {
        host: 'db-server',
        user: 'root',
        password: 'root',
        database: 'gestione_ticket',
        multipleStatements : true
    },
    serverPort: 3000,
    secret: 'cisco',
    saltRounds: 10,
    baseUrls: {
        users: '/users'
    },
    secretPhrase: 'Nel mezzo di cammin di nostra vita mi ritrovai per una selva oscura ché la diritta via era smarrita.'
}

module.exports = config;