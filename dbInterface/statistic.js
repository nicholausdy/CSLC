//dependencies

const errorHandler = require('../errorHandler/database.js')
const dbConfig = require('./dbConfig.js')

async function insertStatistic(idkelas, lampumenyala, timestamp,idgedung){
    let result = {};
    try {
        const text = 'INSERT INTO statistic(idkelas,lampumenyala,timestamp,idgedung) VALUES ($1,$2,$3,$4)'
        const values = [idkelas,lampumenyala,timestamp,idgedung]
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

async function showStatisticByIdGedung(idgedung){
    let result = {};
    try {
        const text = 'SELECT idkelas, lampumenyala, timestamp, idgedung FROM statistic WHERE idgedung=$1'
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
    insertStatistic : insertStatistic,
    showStatisticByIdGedung: showStatisticByIdGedung
}