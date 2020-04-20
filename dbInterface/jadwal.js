//dependencies

const errorHandler = require('../errorHandler/database.js')
const dbConfig = require('./dbConfig.js')

async function insertJadwal(idkelas,idkuliah,namakuliah,hari,jammulai,jamselesai){
    let result = {};
    try {
        const text = 'INSERT INTO jadwal(idkelas,idkuliah,namakuliah,hari,jammulai,jamselesai) VALUES ($1,$2,$3,$4,$5,$6)'
        const values = [idkelas,idkuliah,namakuliah,hari,jammulai,jamselesai]
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

async function updateJadwal(idkelas,idkuliahbaru,namakuliah,haribaru,jammulai,jamselesai,idkuliahlama,harilama){
    let result = {};
    try {
        const text = 'UPDATE jadwal SET idkuliah=$1,namakuliah=$2,hari=$3,jammulai=$4,jamselesai=$5 WHERE idkelas=$6 AND idkuliah=$7 AND hari=$8'
        const values = [idkuliahbaru,namakuliah,haribaru,jammulai,jamselesai,idkelas,idkuliahlama,harilama]
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

async function deleteJadwal(idkelas,idkuliah,hari){
    let result = {};
    try {
        const text = 'DELETE FROM jadwal WHERE idkelas=$1 AND idkuliah=$2 AND hari=$3'
        const values = [idkelas,idkuliah,hari]
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

async function showJadwalByIdKelas(idkelas){
    let result = {};
    try {
        const text = 'SELECT idkelas,idkuliah,namakuliah,hari,jammulai,jamselesai FROM jadwal WHERE idkelas=$1'
        const values = [idkelas]
        const query_result = await dbConfig.db.query(text,values)
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

async function showAllJadwal(){
    let result = {};
    try {
        const text = 'SELECT idkelas,idkuliah,namakuliah,hari,jammulai,jamselesai FROM jadwal'
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


module.exports = {
    insertJadwal : insertJadwal,
    updateJadwal : updateJadwal,
    deleteJadwal : deleteJadwal,
    showJadwalByIdKelas : showJadwalByIdKelas,
    showAllJadwal : showAllJadwal
}