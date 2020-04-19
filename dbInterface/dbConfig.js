const Pool = require('pg-pool')
require('dotenv').config()

const db = new Pool({
    host:  process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    max: process.env.DB_MAXPOOL,
    idleTimeoutMillis: process.env.DB_IDLETIMEOUT,
    connectionTimeoutMillis: process.env.DB_CONNECTIONTIMEOUT  
});

module.exports = {
    db : db
}