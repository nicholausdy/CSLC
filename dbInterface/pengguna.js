//dependencies

const errorHandler = require('../errorHandler/database.js')
const dbConfig = require('./dbConfig.js')

async function getPassword(username){
    try {
        const text = 'SELECT password FROM pengguna WHERE username=$1'
        const values = [username]
        const query_result = await dbConfig.db.query(text,values)
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
        const query_result = await dbConfig.db.query(text,values)
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

