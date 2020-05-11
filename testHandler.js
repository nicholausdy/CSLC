const penggunaHandler = require('./handler/pengguna.js')
const gedungHandler = require('./handler/gedung.js')
const kelasHandler = require('./handler/kelas.js')
const sensorHandler = require('./handler/sensor.js')
const statisticHandler = require('./handler/statistic.js')

async function main(){
    const user = 'william'
    const pass = 'william'
    //const res = await penggunaHandler.registerUser(user,pass)
    //console.log(res)
    //const res2 = await penggunaHandler.validateCredentials(user,pass)
    //console.log(res2)
    //const res3 = await penggunaHandler.login(user,pass)
    //console.log(res3)
    //const res4 = await penggunaHandler.verifyJWT('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IndpbGxpYW0iLCJpYXQiOjE1ODcyMzU0MTR9.Z0AVUVKjEIkZ0N5LVRC9ViMnzICtSUiqC-d6mPpXlYB34zyJkoonc_3TxcB6RzAPB1gCQlOeQAbo1jZ59nB4OwinmyHUKMg-bM0XZmpXnsPFI0dfSeTV5svAj6O5IepHjVoDP1091ajA618ycaAx5aGH9YBRkgNKB2WSvn46PC0ZbikWxgOZf9GCUL6BIAFeYlLRzHLe8bbMwoZmc69-x1I1HyUvcaebk3sDMQJhUw4Ys6mSqyK3sWgnIaSKdGgsPi1u9vxJY5fLXQHSrFYs92p0rmPlJ0AxAbvyFCix-NAtzMlJaWsAEvQEMdFUoD8R2RD-P-QWhkEBHhN-fiiLfqIKs9bogwCp1Pm9cZ4cEGaR0Zv4P3K-qgD6SeFqHOKyfrUp1P9KIJZFk4ZDHPTSq52goOYui4jX4sq8IbPjBTln4Lo4pzbhkDk4VnopAoL6D5eOfvibki5WAC1Lof5JSuQ8Q22aqsaCr4KyfZgpMNS9iuqmfta7I9WqOEjb3MSt0cy1g3mv15uFZ-LDQxoGfZnHt88f6YPESprhtgrhC5iM4fJQah7q_g7LpuywpHbFGnevkKU3ZnO8E5T73J-QYaT0BlAf3PFIg2xk8JRwPh6_XKTZL_UXVsWCcnhDwZ2ZeznjzwZfpZelYaOizuepEJ0D8-Dc6zbLoJDS6BRlBD8')
    //console.log(res4)
    //const idgedung = 'CC Barat'
    //const jumlahlantai = 2
    //const res5 = await gedungHandler.addGedung(idgedung,jumlahlantai) 
    //console.log(res5)
    //let request = {}
    //request.headers = {authorization: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRhbiIsImlhdCI6MTU4NzMwOTg3N30.LmmVr8U6npo2K0ISJpjQwjbDa0MfFS2MjlBDeeWyrF2sqv2Zbx3HikHQhF6Mr7n5RjUrzCwvtNpFwhF2NYQvor5mh6t-83FfvgwQn0Fw30yYT7zr6KGpV25RZXVuYCuKAr5uj4klBy1da0fRedV7bpll6AsXXWR2N6zpM5EAsdFpP2MLieeeXPDcAG1w2ahWt77Pjc33Ey1cV1aaQh-sz7ug_pu_Inpbe8S_CeGYo6PJNGaCHXfi8wuloGqUU_2hHsX54--sBNi64cIh8XTirzh9PTwrbnYx0np0ZDDifMA3NpW64SMNpwFwuP60kRibHGInHBKhx0d3jqPtEK_uPF3dfuFwpThJF1OwvbbEpL99BDFz71RPzQJWDcjEZn8ZqrK4AJJ1Tq6q_l7xMwmLRT_4W5kAq6UoBssHluTVvOjPDxTx2U6cUB75kjVtFBHXCEPVSgp2nGUDkE18K3DOJtEcc9bXkMb9F3JPJX3LZfopdrvohDFxS_CFVWc2oqnvSkcbIgSluj5MDUHqFKImFBUGyprWyFpBpJFUWcZrvxybT-jxM5DAqYvuXwfL8CH1FZ-vnGNxQ_RVlA5JLtIvND1KNZME00RoWrk9ZKrzpnZG1vQ_BlWxoUFJbGGvGJ9KFn01WQlULzHvVJeDuGo8okvSmPUUPdDbCIaBJ0Yc0jI'}
    //const res6 = await penggunaHandler.verifyRequest(request)
    //console.log(res6)
    //const res7 = await kelasHandler.validateGedung('Labtek VII',1)
    //console.log(res7)
    const idgedung = 'Labtek V'
    const idkelas = '7602'
    const lantai = 1
    const jumlahlampu = 10
    const kapasitaskelas = 50
    //const res8 = await kelasHandler.addKelas(idkelas,idgedung,lantai,jumlahlampu,kapasitaskelas)
    //console.log(res8)
    //const res9 = await kelasHandler.editKelas(idkelas,idgedung,lantai,jumlahlampu,kapasitaskelas)
    //console.log(res9)
    //for (i = 1; i < 2; i++){
    //    let res10 = await sensorHandler.increasePeopleCount(idkelas)
    //    console.log(res10)
    // }
    //const res11 = await kelasHandler.editLampuMenyala(idkelas)
    //console.log(res11)
    const res12 = await statisticHandler.addStatistic(idkelas)
    console.log(res12)
}

main();