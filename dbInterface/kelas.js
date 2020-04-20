//dependencies

const errorHandler = require('../errorHandler/database.js')
const dbConfig = require('./dbConfig.js')

async function insertKelas(idkelas,idgedung,lantai,jumlahlampu,kapasitaskelas,lampumenyala){
    let result = {};
    try {
        const text = 'INSERT INTO kelas(idkelas,idgedung,lantai,jumlahlampu,kapasitaskelas,lampumenyala) VALUES ($1,$2,$3,$4,$5,$6)'
        const values = [idkelas,idgedung,lantai,jumlahlampu,kapasitaskelas,lampumenyala]
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

//update idgedung, lantai, jumlahlampu, kapasitaskelas
async function updateKelas(idkelas, idgedung, lantai, jumlahlampu, kapasitaskelas){
    let result = {};
    try {
        const text = 'UPDATE kelas SET idgedung=$1,lantai=$2,jumlahlampu=$3,kapasitaskelas=$4 WHERE idkelas=$5'
        const values = [idgedung,lantai,jumlahlampu,kapasitaskelas,idkelas]
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

async function showAllKelas(){
    let result = {};
    try {
        const text = 'SELECT idkelas,idgedung,lantai,jumlahlampu,kapasitaskelas,lampumenyala FROM kelas'
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

async function showKelasById(idkelas){
    let result = {};
    try {
        const text = 'SELECT idkelas,idgedung,lantai,jumlahlampu,kapasitaskelas,lampumenyala FROM kelas WHERE idkelas=$1'
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

async function deleteKelas(idkelas){
    let result = {};
    try {
        const text = 'DELETE FROM kelas WHERE idkelas=$1'
        const values = [idkelas]
        const query_result = await dbConfig.db.query(text, values)
        result.Status = 'Success'
        result.Message = 'Record delete successful'
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

async function updateLampuMenyala(idkelas,lampumenyala){
    let result = {};
    try {
        const text = 'UPDATE kelas SET lampumenyala=$1 WHERE idkelas=$2'
        const values = [lampumenyala,idkelas]
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
    insertKelas : insertKelas,
    updateKelas : updateKelas,
    showAllKelas : showAllKelas,
    showKelasById : showKelasById,
    deleteKelas : deleteKelas,
    updateLampuMenyala : updateLampuMenyala
}