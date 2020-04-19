const pengguna = require('../dbInterface/pengguna.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
require('dotenv').config()

async function hashPassword (password) {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        res = {}
        res.Status = 'Success'
        res.Message = hashedPassword
    }
    catch (e) {
        res.Status = 'Failed'
        res.Message =  'Hashing failed'
        res.Detail = e
        console.log(e)
    }
    finally {
        console.log(res)
        return res
    }
}

async function comparePassword(plainTextPassword,hashedPassword){
    try {
        const isMatched = await bcrypt.compare(plainTextPassword,hashedPassword) 
        res = {}
        res.Status = 'Success'
        res.Message = isMatched
    }
    catch (e) {
        res.Status = 'Failed'
        res.Message =  'Hashing comparison failed'
        res.Detail = e
        console.log(e)
    }
    finally{
        console.log(res)
        return res
    }
}

async function registerUser(username,password){
    const hashResult = await hashPassword(password)
    if (hashResult.Status == 'Success'){
        res = await pengguna.register(username,hashResult.Message)
        if(res.Status == 'Success'){
            res.Code = 200
        }
        //failed in insertion
        else {
            res.Code = 500
        }
        return res
    }
    //failed in hashing
    else {
        hashResult.Code = 500 
        return hashResult
    }
    
}

//validate username and password
async function validateCredentials(username,password){
    const passwordSearchResult = await pengguna.getPassword(username)
    if (passwordSearchResult.Status == 'Failed'){
        res = passwordSearchResult
        res.Code = 500
        return res
    }
    //username found in DB
    else {
        const compare = await comparePassword(password,passwordSearchResult.Message.password) 
        //hashing function failed
        if (compare.Status == 'Failed'){
            compare.Code = 500
        }
        else {
            compare.Code = 200
        }
        return compare
    }
}

//validate username and password then give token
async function login(username,password){
    try {
        res = {}
        const isCredentialValid = await validateCredentials(username,password)
        //generate token only when username and password are validated
        if ((isCredentialValid.Status == 'Success') && (isCredentialValid.Message)){
            const privateKey = fs.readFileSync(__dirname + '/jwtRS256.key') //absolute path of current directory
            const passphrase = process.env.PASSPHRASE
            const token = await jwt.sign({username:username}, {key: privateKey, passphrase: passphrase}, {algorithm: 'RS256'}, {expiresIn: '24h'}); 
            res.Token = token
            res.Message = 'User authentication successful'
            res.Code = isCredentialValid.Code
        }
        else {
            if (isCredentialValid.Status == 'Failed'){
                res.Message = isCredentialValid.Message
                res.Code = 401
            }
            if (!(isCredentialValid.Message)){
                res.Status = 'Failed'
                res.Message = 'Wrong password'
                res.Code = 401
            }
        }
    }
    catch (e) {
        res.Status = 'Failed'
        res.Code = 500
        res.Message = 'Internal server error'
        res.Detail = e
    }
    finally {
        return res
    }
}

async function verifyJWT(token){
    try {
        res = {}
        const publicKey = fs.readFileSync(__dirname + '/jwtRS256.key.pub')
        const decoded = await jwt.verify(token, publicKey, {algorithms : ['RS256']})
        res.Status = 'Success'
        res.Code = 200
        res.Message = decoded
    }
    catch (e) {
        res.Status = 'Failed'
        res.Code = 401
        res.Message = 'Invalid token'
    }
    finally {
        return res
    }
}
//validate function in the authorization headers
async function verifyRequest(req){
    res = {}
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (typeof token === 'undefined'){
        res.Status = 'Failed'
        res.Code = 403
        res.Message = 'No auth header'
    }
    else {    
        if (token.startsWith('Bearer ')){
            //Remove Bearer from string
            token = token.slice(7, token.length);
        }
        if (token){
            const verifyResult = await verifyJWT(token)
            res.Status = verifyResult.Status
            res.Code = verifyResult.Code
            res.Message = verifyResult.Message
        }
    }
    return res
}

module.exports = {
    registerUser : registerUser,
    login : login,
    verifyRequest : verifyRequest
}
