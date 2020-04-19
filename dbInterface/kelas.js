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

module.exports = {
    insertKelas : insertKelas
}