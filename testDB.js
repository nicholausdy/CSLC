const pengguna = require('./dbInterface/pengguna.js')
const gedung = require('./dbInterface/gedung.js')

async function main(){
    //const user = 'william'
    //const res = await pengguna.getPassword(user)
    //console.log(res)
    //const pass = 'william'
    //const res2 = await pengguna.register(user,pass)
    //console.log(res2)
    const idgedung = 'Labtek XI'
    //const jumlahlantai = 4
    //const res3 = await gedung.insertGedung(idgedung,jumlahlantai)
    //console.log(res3)
    const res4 = await gedung.showAllGedung()
    console.log(res4)
    const res5 = await gedung.showGedungById(idgedung)
    console.log(res5)
}

main();