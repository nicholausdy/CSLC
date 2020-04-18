const penggunaHandler = require('./handler/pengguna.js')

async function main(){
    const user = 'william'
    const pass = 'william'
    //const res = await penggunaHandler.registerUser(user,pass)
    //console.log(res)
    //const res2 = await penggunaHandler.validateCredentials(user,pass)
    //console.log(res2)
    //const res3 = await penggunaHandler.login(user,pass)
    //console.log(res3)
    const res4 = await penggunaHandler.verifyJWT('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IndpbGxpYW0iLCJpYXQiOjE1ODcyMzU0MTR9.Z0AVUVKjEIkZ0N5LVRC9ViMnzICtSUiqC-d6mPpXlYB34zyJkoonc_3TxcB6RzAPB1gCQlOeQAbo1jZ59nB4OwinmyHUKMg-bM0XZmpXnsPFI0dfSeTV5svAj6O5IepHjVoDP1091ajA618ycaAx5aGH9YBRkgNKB2WSvn46PC0ZbikWxgOZf9GCUL6BIAFeYlLRzHLe8bbMwoZmc69-x1I1HyUvcaebk3sDMQJhUw4Ys6mSqyK3sWgnIaSKdGgsPi1u9vxJY5fLXQHSrFYs92p0rmPlJ0AxAbvyFCix-NAtzMlJaWsAEvQEMdFUoD8R2RD-P-QWhkEBHhN-fiiLfqIKs9bogwCp1Pm9cZ4cEGaR0Zv4P3K-qgD6SeFqHOKyfrUp1P9KIJZFk4ZDHPTSq52goOYui4jX4sq8IbPjBTln4Lo4pzbhkDk4VnopAoL6D5eOfvibki5WAC1Lof5JSuQ8Q22aqsaCr4KyfZgpMNS9iuqmfta7I9WqOEjb3MSt0cy1g3mv15uFZ-LDQxoGfZnHt88f6YPESprhtgrhC5iM4fJQah7q_g7LpuywpHbFGnevkKU3ZnO8E5T73J-QYaT0BlAf3PFIg2xk8JRwPh6_XKTZL_UXVsWCcnhDwZ2ZeznjzwZfpZelYaOizuepEJ0D8-Dc6zbLoJDS6BRlBD8')
    console.log(res4)
}

main();