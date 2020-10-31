const { Client } = require('pg')

const config = {
    user: 'octom',
    database: 'mydb',
    host: 'localhost',
    password: 'genter',
    port: 5432,
};

const client = new Client(config)

client.connect()

client.query('drop table "_Migration"', function(err, res) {
    if (err.code === "42P01") console.log("dropTable.js : Table already Dropped")
    else if (err) throw err
    client.end()
})
