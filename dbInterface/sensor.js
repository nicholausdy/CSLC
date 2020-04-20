//dependencies

const errorHandler = require('../errorHandler/database.js')
const dbConfig = require('./dbConfig.js')

async function insertSensor(idkelas,peoplecount){
    let result = {};
    try {
        const text = 'INSERT INTO sensor(idkelas,peoplecount) VALUES ($1,$2)'
        const values = [idkelas,peoplecount]
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

async function updatePeopleCount(idkelas,peoplecount){
    let result = {};
    try {
        const text = 'UPDATE sensor SET peoplecount=$1 WHERE idkelas=$2'
        const values = [peoplecount,idkelas]
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

async function showSensorByIdKelas(idkelas){
    let result = {};
    try {
        const text = 'SELECT idkelas,peoplecount FROM sensor WHERE idkelas=$1'
        const values = [idkelas]
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
    insertSensor : insertSensor,
    showSensorByIdKelas : showSensorByIdKelas,
    updatePeopleCount : updatePeopleCount
}