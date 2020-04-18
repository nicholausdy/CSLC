const pengguna = require('./dbInterface/pengguna.js')

async function main(){
    const user = 'william'
    const res = await pengguna.getPassword(user)
    console.log(res)
    const pass = 'william'
    const res2 = await pengguna.register(user,pass)
    console.log(res2)
}

main();