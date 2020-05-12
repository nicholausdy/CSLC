//dependencies

const errorHandler = require('../errorHandler/database.js')
const dbConfig = require('./dbConfig.js')

async function insertPrediction(idgedung, biaya_today, biaya_week, biaya_year, jumlah_lampu_avg, jumlah_kelas){
    let result = {};
    try {
        const text = 'INSERT INTO prediction(idgedung, biaya_today, biaya_week, biaya_year, jumlah_lampu_avg, jumlah_kelas) VALUES ($1,$2,$3,$4,$5,$6)'
        const values = [idgedung, biaya_today, biaya_week, biaya_year, jumlah_lampu_avg, jumlah_kelas]
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

async function showAllPrediction(){
    let result = {};
    try {
        const text = 'SELECT idgedung, biaya_today, biaya_week, biaya_year, jumlah_lampu_avg, jumlah_kelas FROM prediction'
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

async function showPredictionByIdGedung(idgedung){
    let result = {};
    try {
        const text = 'SELECT idgedung, biaya_today, biaya_week, biaya_year, jumlah_lampu_avg, jumlah_kelas FROM prediction WHERE idgedung=$1'
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

async function updatePrediction(idgedung, biaya_today, biaya_week, biaya_year, jumlah_lampu_avg, jumlah_kelas){
    let result = {};
    try {
        const text = 'UPDATE prediction SET biaya_today=$1,biaya_week=$2,biaya_year=$3,jumlah_lampu_avg=$4, jumlah_kelas=$5 WHERE idgedung=$6'
        const values = [biaya_today, biaya_week, biaya_year, jumlah_lampu_avg, jumlah_kelas, idgedung]
        const query_result = await dbConfig.db.query(text, values)
        result.Status = 'Success'
        result.Message = 'Record update successful'
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
    insertPrediction : insertPrediction,
    showAllPrediction : showAllPrediction,
    showPredictionByIdGedung : showPredictionByIdGedung,
    updatePrediction : updatePrediction
}