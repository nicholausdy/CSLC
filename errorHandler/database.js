async function databaseError(e) {
    if (e.code == '23505'){
        message = 'Primary key already exists'
        return message
    }
    else if (e.code == '23503'){
        message = 'Kelas belum terdaftar'
        return message
    }
    else if (e.code == 'ECONNREFUSED'){
        message = 'Database connection error'
        return message
    }
    else {
        message = 'Unknown error encountered'
        return message
    }
}

module.exports = {
    databaseError : databaseError
}