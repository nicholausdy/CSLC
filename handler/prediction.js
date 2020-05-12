const prediction = require('../dbInterface/prediction.js');

async function addPrediction(idgedung, biaya_today, biaya_week, biaya_year, jumlah_lampu_avg, jumlah_kelas){
    let result = await prediction.insertPrediction(idgedung, biaya_today, biaya_week, biaya_year, jumlah_lampu_avg, jumlah_kelas)
    if (result.Status == 'Success' ){
        result.Code = 200
    }
    else {
        result.Code = 500
    }
    return result
}

async function listPrediction(){
    let result = await prediction.showAllPrediction()
    if (result.Status == 'Success'){
        result.Code = 200
    }
    else {
        result.Code = 500
    }
    return result
}

async function detailPrediction(idgedung){
    let result = await prediction.showPredictionByIdGedung(idgedung)
    if (result.Status == 'Success'){
        result.Code = 200
    }
    else {
        result.Code = 500
    }
    return result
}

async function editPrediction(idgedung, biaya_today, biaya_week, biaya_year, jumlah_lampu_avg, jumlah_kelas){
    let result = await prediction.updatePrediction(idgedung, biaya_today, biaya_week, biaya_year, jumlah_lampu_avg, jumlah_kelas)
    if (result.Status == 'Success'){
        result.Code = 200
    }
    else {
        result.Code = 500
    }
    return result
}

module.exports = {
    addPrediction : addPrediction,
    listPrediction : listPrediction,
    detailPrediction : detailPrediction,
    editPrediction : editPrediction
}