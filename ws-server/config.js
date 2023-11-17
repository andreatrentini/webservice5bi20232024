const config = {
    dbParams: {
        host: 'db-server',
        user: 'root',
        password: '',
        database: 'gestione_ticket',
        multipleStatements : true
    },
    dbParamsInit: {
        host: 'db-server',
        user: 'root',
        password: '',        
        multipleStatements : true
    },
    serverPort: 3000,
    secret: 'cisco',
    saltRounds: 10,
    baseUrls: {
        users: '/users',
        tickets: '/tickets',
    },
    secretPhrase: 'Nel mezzo di cammin di nostra vita mi ritrovai per una selva oscura ché la diritta via era smarrita.'
}

module.exports = config;