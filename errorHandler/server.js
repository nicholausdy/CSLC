async function serverError(e) {
    let error = {};
    error.Status = 'Failed'
    error.Code = 500
    error.Message = 'Internal server error encountered'
    error.Detail = e
    console.log(e)
    return error
}

module.exports = {
    serverError : serverError
}