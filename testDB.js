const pengguna = require('./dbInterface/pengguna.js')
const gedung = require('./dbInterface/gedung.js')
const kelas = require('./dbInterface/kelas.js')
const sensor = require('./dbInterface/sensor.js')

async function main(){
    //const user = 'william'
    //const res = await pengguna.getPassword(user)
    //console.log(res)
    //const pass = 'william'
    //const res2 = await pengguna.register(user,pass)
    //console.log(res2)
    const idgedung = 'Labtek V' 
    const idkelas = '7601'
    const lantai = 1 
    const jumlahlampu = 8 
    const kapasitaskelas = 30
    //const jumlahlantai = 4
    //const res3 = await gedung.insertGedung(idgedung,jumlahlantai)
    //console.log(res3)
    //const res4 = await gedung.showAllGedung()
    //console.log(res4)
    //const res5 = await gedung.showGedungById(idgedung)
    //console.log(res5)
    //const res6 = await kelas.updateKelas(idkelas,idgedung,lantai,jumlahlampu,kapasitaskelas)
    //console.log(res6)
    //const res7 = await sensor.updatePeopleCount('7603', 0)
    const res8 = await sensor.showSensorByIdKelas('7603')
    console.log(res8)
}

main();