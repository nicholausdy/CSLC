const kelas = require('../dbInterface/kelas.js')
const gedungHandler = require('./gedung.js')

//validasi gedung dan validasi lokasi lantai yang dimasukkan pada info kelas sama dengan lantai maksimum gedung yang bersangkutan / tidak
async function validateGedung(idgedung,lantai){
    let result = {};
    const infoGedung = await gedungHandler.detailGedung(idgedung)
    //pencarian gedung sukses
    if (infoGedung.Status == 'Success'){
        if (infoGedung.Message.jumlahlantai < lantai){ // lantai maksimum gedung < lantai yang dimasukkan 
            result.Status = 'Failed'
            result.Message = 'Lantai tidak valid, maksimum ' + infoGedung.Message.jumlahlantai 
        }
        else {
            result.Status = 'Success'
            result.Message = 'Lantai valid'
        }
    }
    else {
        result.Status = 'Failed'
        result.Message = 'Gedung tidak terdaftar'
    }
    return result
}

async function addKelas(idkelas,idgedung,lantai,jumlahlampu,kapasitaskelas){
    let result = {};
    const isLantaiValid = await validateGedung(idgedung,lantai)
    if (isLantaiValid.Status == 'Failed'){
        result.Status = isLantaiValid.Status
        result.Message = isLantaiValid.Message
        result.Code = 400
    }
    else {
        result = await kelas.insertKelas(idkelas,idgedung,lantai,jumlahlampu,kapasitaskelas,0) // lampu menyala = 0
        if (result.Status == 'Success'){
            result.Code = 200
        }
        else {
            result.Code = 500
        }
    }
    return result
}

//kalkulasi lampumenyala
//update lampumenyala berdasarkan jumlahseharusnya

module.exports = {
    addKelas : addKelas
}