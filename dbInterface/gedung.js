//dependencies

const errorHandler = require('../errorHandler/database.js')
const dbConfig = require('./dbConfig.js')

async function insertGedung(idgedung,jumlahlantai){
    let result = {};
    try {
        const text = 'INSERT INTO gedung(idgedung,jumlahlantai) VALUES ($1,$2)'
        const values = [idgedung,jumlahlantai]
        const query_result = await dbConfig.db.query(text,values)
        result.Status = 'Success'
        result.Message = 'Record insert successful'
    }
    catch (e) {
        result.Status = 'Failed'
        result.Message = await errorHandler.databaseError(e)
        result.Detail = e
    }
    finally {
        return result
    }
}

async function showAllGedung() {
    let result = {};
    try {
        const text = 'SELECT idgedung,jumlahlantai FROM gedung'
        const query_result = await dbConfig.db.query(text)
        if (typeof query_result.rows[0] === 'undefined'){
            result.Status = 'Failed'
            result.Message = 'Record empty'
        }
        else {
            result.Status = 'Success'
            result.Message = query_result.rows
        }
    }
    catch (e) {
        result.Status = 'Failed'
        result.Message = await errorHandler.databaseError(e)
        result.Detail = e
    }
    finally {
        return result
    }
}

async function showGedungById(idgedung){
    let result = {};
    try {
        const text = 'SELECT idgedung,jumlahlantai FROM gedung WHERE idgedung=$1'
        const values = [idgedung]
        const query_result = await dbConfig.db.query(text,values)
        if (typeof query_result.rows[0] === 'undefined'){
            result.Status = 'Failed'
            result.Message = 'Record empty'
        }
        else {
            result.Status = 'Success'
            result.Message = query_result.rows[0]
        }
    }
    catch (e) {
        result.Status = 'Failed'
        result.Message = await errorHandler.databaseError(e)
        result.Detail = e
    }
    finally {
        return result
    }
}


module.exports = {
    insertGedung : insertGedung,
    showAllGedung : showAllGedung,
    showGedungById : showGedungById
}