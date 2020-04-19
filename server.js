const express = require('express'),
    bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const penggunaHandler = require('./handler/pengguna.js');
const gedungHandler = require('./handler/gedung.js');
const kelasHandler = require('./handler/kelas.js');
const serverErrorHandler = require('./errorHandler/server.js');

//app setting
app.use(cors());
app.use(bodyParser.json({limit: '5mb'}));

//routes and HTTP verbs
//user
app.post('/api/v1/login', async (req,res)=> {
    try {
        const loginResult = await penggunaHandler.login(req.body.username,req.body.password)
        res.status(loginResult.Code)
        res.json(loginResult)
    }
    catch (e) {
        const errorResult = await serverErrorHandler.serverError(e)
        res.status(errorResult.Code)
        res.json(errorResult)
    }
})

app.post('/api/v1/register', async (req,res) => {
    try {
        const registerResult = await penggunaHandler.registerUser(req.body.username,req.body.password)
        res.status(registerResult.Code)
        res.json(registerResult)
    }
    catch (e) {
        const errorResult = await serverErrorHandler.serverError(e)
        res.status(errorResult.Code)
        res.json(errorResult)
    }
})
//gedung
app.post('/api/v1/gedung/add', async (req,res) => {
    try {
        const verifyUser = await penggunaHandler.verifyRequest(req)
        console.log(verifyUser)
        if (verifyUser.Status == 'Success'){
            const addResult = await gedungHandler.addGedung(req.body.idgedung,req.body.jumlahlantai)
            res.status(addResult.Code)
            res.json(addResult)
        }
        else {
            res.status(verifyUser.Code)
            res.json(verifyUser)
        }
    }
    catch (e) {
        const errorResult = await serverErrorHandler.serverError(e)
        res.status(errorResult.Code)
        res.json(errorResult)
    }
})

app.get('/api/v1/gedung/list', async (req,res) => {
    try {
        const verifyUser = await penggunaHandler.verifyRequest(req)
        console.log(verifyUser) 
        if (verifyUser.Status == 'Success'){
            // check query string on URL
            if (typeof req.query.idgedung == 'undefined'){
                const listResult = await gedungHandler.listGedung()
                res.status(listResult.Code)
                res.json(listResult)
            }
            else {
                const singleResult = await gedungHandler.detailGedung(req.query.idgedung)
                res.status(singleResult.Code)
                res.json(singleResult)
            }
        }
        else {
            res.status(verifyUser.Code)
            res.json(verifyUser)
        }
    }
    catch (e) {
        const errorResult = await serverErrorHandler.serverError(e)
        res.status(errorResult.Code)
        res.json(errorResult)
    }
})

// kelas
app.post('/api/v1/kelas/add', async (req,res) => {
    try {
        const verifyUser = await penggunaHandler.verifyRequest(req)
        console.log(verifyUser)
        if (verifyUser.Status == 'Success'){
            const addResult = await kelasHandler.addKelas(req.body.idkelas,req.body.idgedung,req.body.lantai,req.body.jumlahlampu,req.body.kapasitaskelas)
            res.status(addResult.Code)
            res.json(addResult)
        }
        else {
            res.status(verifyUser.Code)
            res.json(verifyUser)
        }
    }
    catch (e) {
        const errorResult = await serverErrorHandler.serverError(e)
        res.status(errorResult.Code)
        res.json(errorResult)
    } 
})
//run server
app.listen(3000, function(){
    console.log('Maid cafe is listening at port 3000')
});