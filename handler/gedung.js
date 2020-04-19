const gedung = require('../dbInterface/gedung.js')

async function addGedung(idgedung,jumlahlantai){
    let result = await gedung.insertGedung(idgedung,jumlahlantai)
    if (result.Status == 'Success' ){
        result.Code = 200
    }
    else {
        result.Code = 500
    }
    return result
}

async function listGedung(){
    let result = await gedung.showAllGedung()
    if (result.Status == 'Success'){
        result.Code = 200
    }
    else {
        result.Code = 500
    }
    return result
}

async function detailGedung(idgedung){
    let result = await gedung.showGedungById(idgedung)
    if (result.Status == 'Success'){
        result.Code = 200
    }
    else {
        result.Code = 500
    }
    return result
}

module.exports = {
    addGedung : addGedung,
    listGedung : listGedung,
    detailGedung : detailGedung
}