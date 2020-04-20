const kelas = require('../dbInterface/kelas.js')
const gedungHandler = require('./gedung.js')
const sensorHandler = require('./sensor.js')

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
            //result.Code = 200
            const resultSensor = await sensorHandler.addSensor(idkelas,0) // people count = 0
            if (resultSensor.Status == 'Success'){
                result.Status = resultSensor.Status
                result.Code = 200
            }
            else {
                result.Status = resultSensor.Status
                result.Code = 500
            }
        }
        else {
            result.Code = 500
        }
    }
    return result
}

//update idgedung, lantai, jumlahlampu, kapasitaskelas
async function editKelas(idkelas, idgedung, lantai, jumlahlampu, kapasitaskelas){
    let result = {};
    const isGedungLantaiValid = await validateGedung(idgedung,lantai)
    if (isGedungLantaiValid.Status == 'Failed'){
        result.Status = isGedungLantaiValid.Status
        result.Message = isGedungLantaiValid.Message
        result.Code = 400
    }
    else {
        result = await kelas.updateKelas(idkelas,idgedung,lantai,jumlahlampu,kapasitaskelas)
        if (result.Status == 'Success'){
            result.Code = 200
        }
        else {
            result.Code = 500
        }
    }
    return result
}

async function listKelas(){
    let result = await kelas.showAllKelas()
    if (result.Status == 'Success'){
        result.Code = 200
    }
    else {
        result.Code = 500
    }
    return result
}

async function detailKelas(idkelas){
    let result = await kelas.showKelasById(idkelas)
    if (result.Status == 'Success'){
        result.Code = 200
    }
    else {
        result.Code = 500
    }
    return result
}

async function removeKelas(idkelas){
    let result = await kelas.deleteKelas(idkelas)
    if (result.Status == 'Success'){
        result.Code = 200
    }
    else {
        result.Code = 500
    }
    return result
}
//kalkulasi lampumenyala
async function calculateLampuMenyala(idkelas){
    const sensorResult = await sensorHandler.detailSensor(idkelas)
    const kelasResult = await kelas.showKelasById(idkelas)
    let result = {};
    let lampumenyala;
    if ((sensorResult.Status == 'Success') && (kelasResult.Status == 'Success')){
        if(sensorResult.Message.peoplecount == 0){
            lampumenyala = 0
        }
        else if(sensorResult.Message.peoplecount > kelasResult.Message.kapasitaskelas){ //jumlah orang melebihi kapasitas kelas maksimum
            lampumenyala = kelasResult.Message.jumlahlampu
        }
        else {
            lampumenyala = Math.ceil((sensorResult.Message.peoplecount * kelasResult.Message.jumlahlampu)/(kelasResult.Message.kapasitaskelas))
        }
        result.Message = lampumenyala
        result.Status = 'Success'
    }
    else {
        result.Status = 'Failed'
        result.Message = 'Calculation failed'
    }
    return result
}
//update lampumenyala berdasarkan jumlahseharusnya
async function editLampuMenyala(idkelas) {
    let result = {};
    const calculationResult = await calculateLampuMenyala(idkelas)
    if (calculationResult.Status == 'Success'){
        const updateResult = await kelas.updateLampuMenyala(idkelas, calculationResult.Message)
        if (updateResult.Status == 'Success'){
            result = updateResult
            result.Code = 200
        }
        else {
            result = updateResult
            result.Code = 500
        }
    }
    else {
        result = calculationResult
        result.Code = 500
    }
    return result
}
// mendapatkan array lampu untuk konversi menjadi gambar
async function getArrayLampu(idkelas){
    let result = {};
    const detailKelas = await kelas.showKelasById(idkelas)
    if (detailKelas.Status == 'Success'){
        let petalampu = [];
        const lampumenyala = detailKelas.Message.lampumenyala
        const jumlahlampu = detailKelas.Message.jumlahlampu
        const lampumati = jumlahlampu - lampumenyala
        for (i=0;i<lampumenyala;i++){
            petalampu.push('ON')
        }
        for (i=0;i<lampumati;i++){
            petalampu.push('OFF')
        }
        result.Status = detailKelas.Status
        result.Message = petalampu
        result.Code = 200
    }
    else {
        result = detailKelas
        result.Code = 500
    }
    return result
}
module.exports = {
    addKelas : addKelas,
    editKelas : editKelas,
    listKelas : listKelas,
    detailKelas : detailKelas,
    removeKelas : removeKelas,
    editLampuMenyala : editLampuMenyala,
    getArrayLampu : getArrayLampu
}