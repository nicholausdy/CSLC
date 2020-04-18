//dependencies
const Pool = require('pg-pool')
const errorHandler = require('../errorHandler/database.js')
require('dotenv').config()

//initialize pool and db connection
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

async function getPassword(username){
    try {
        const text = 'SELECT password FROM pengguna WHERE username=$1'
        const values = [username]
        const query_result = await db.query(text,values)
        res = {}
        //query returns 0 rows
        if (typeof query_result.rows[0] === 'undefined'){
            res.Status = 'Failed'
            res.Message = 'Username not found'
        }
        else {
            res.Status = 'Success'
            res.Message = query_result.rows[0]
        }
    }
    catch (e){
        res.Status = 'Failed'
        res.Message = await errorHandler.databaseError(e)
        res.Detail = e
    }  
    finally {
        return res
    }
}

async function register(username,password){
    try {
        const text = 'INSERT INTO pengguna(username,password) VALUES ($1,$2)'
        const values = [username,password]
        const query_result = await db.query(text,values)
        res = {}
        res.Status = 'Success'
        res.Message = 'Record insert successful' 
    }
    catch (e) {
        res.Status = 'Failed'
        res.Message = await errorHandler.databaseError(e)
        res.Detail = e
    }
    finally {
        return res
    }
}

module.exports = {
    getPassword : getPassword,
    register : register
}

