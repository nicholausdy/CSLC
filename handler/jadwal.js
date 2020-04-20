const jadwal = require('../dbInterface/jadwal.js')

async function addJadwal(idkelas,idkuliah,namakuliah,hari,jammulai,jamselesai){
    let result = await jadwal.insertJadwal(idkelas,idkuliah,namakuliah,hari,jammulai,jamselesai)
    if (result.Status == 'Success' ){
        result.Code = 200
    }
    else {
        result.Code = 500
    }
    return result
}

async function editJadwal(idkelas,idkuliahbaru,namakuliah,haribaru,jammulai,jamselesai,idkuliahlama,harilama){
    let result = await jadwal.updateJadwal(idkelas,idkuliahbaru,namakuliah,haribaru,jammulai,jamselesai,idkuliahlama,harilama)
    if (result.Status == 'Success'){
        result.Code = 200
    }
    else {
        result.Code = 500
    }
    return result
}

async function removeJadwal(idkelas,idkuliah,hari){
    let result = await jadwal.deleteJadwal(idkelas,idkuliah,hari)
    if (result.Status == 'Success'){
        result.Code = 200
    }
    else {
        result.Code = 500
    }
    return result
}

async function listJadwal(idkelas){
    let result = await jadwal.showJadwalByIdKelas(idkelas)
    if (result.Status == 'Success'){
        result.Code = 200
    }
    else {
        result.Code = 500
    }
    return result
}

async function listAllJadwal(){
    let result = await jadwal.showAllJadwal()
    if (result.Status == 'Success'){
        result.Code = 200
    }
    else {
        result.Code = 500
    }
    return result
}

module.exports = {
    addJadwal : addJadwal,
    editJadwal : editJadwal,
    removeJadwal : removeJadwal,
    listJadwal : listJadwal,
    listAllJadwal : listAllJadwal
}