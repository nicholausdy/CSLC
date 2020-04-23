const express = require('express'),
    bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const penggunaHandler = require('./handler/pengguna.js');
const gedungHandler = require('./handler/gedung.js');
const kelasHandler = require('./handler/kelas.js');
const jadwalHandler = require('./handler/jadwal.js');
const sensorHandler = require('./handler/sensor.js');
const serverErrorHandler = require('./errorHandler/server.js');
//const https = require('https');
//const fs = require('fs');
//app setting
app.use(cors());
app.use(bodyParser.json({limit: '5mb'}));

///////NOTES: selain endpoint login dan register, hrs pake header 'Authorization: ' atau 'x-access-content: ' dengan isinya token. 
///////Token diperoleh pas login

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
// /api/v1/gedung/list -> get all ; /api/v1/gedung/list?idgedung=Labtek+V -> get one
app.get('/api/v1/gedung/list', async (req,res) => {
    try {
        const verifyUser = await penggunaHandler.verifyRequest(req)
        console.log(verifyUser) 
        if (verifyUser.Status == 'Success'){
            // check query string on URL
            if (typeof req.query.idgedung === 'undefined'){
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

app.put('/api/v1/kelas/edit', async (req,res) => {
    try {
        const verifyUser = await penggunaHandler.verifyRequest(req)
        console.log(verifyUser)
        if (verifyUser.Status == 'Success'){
            const editResult = await kelasHandler.editKelas(req.body.idkelas,req.body.idgedung,req.body.lantai,req.body.jumlahlampu, req.body.kapasitaskelas)
            res.status(editResult.Code)
            res.json(editResult)
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
// /api/v1/kelas/list -> get all ; /api/v1/kelas/list?idkelas=7601 -> get one
app.get('/api/v1/kelas/list', async (req,res) => {
    try {
        const verifyUser = await penggunaHandler.verifyRequest(req)
        console.log(verifyUser) 
        if (verifyUser.Status == 'Success'){
            // check query string on URL
            if (typeof req.query.idkelas === 'undefined'){
                const listResult = await kelasHandler.listKelas()
                res.status(listResult.Code)
                res.json(listResult)
            }
            else {
                const singleResult = await kelasHandler.detailKelas(req.query.idkelas)
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
// /api/v1/kelas/remove?idkelas=7601 -> delete one
app.delete('/api/v1/kelas/remove', async (req,res) => {
    try {
        const verifyUser = await penggunaHandler.verifyRequest(req)
        console.log(verifyUser) 
        if (verifyUser.Status == 'Success'){
            //check query string on URL
            if (typeof req.query.idkelas === 'undefined'){
                res.status(400)
                let noQueryResult = {};
                noQueryResult.Status = 'Failed'
                noQueryResult.Code = 400
                noQueryResult.Message = 'Invalid URL'
                res.json(noQueryResult)
            }
            else {
                const deleteResult = await kelasHandler.removeKelas(req.query.idkelas)
                res.status(deleteResult.Code)
                res.json(deleteResult)
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

//jadwal
app.post('/api/v1/jadwal/add', async (req,res) => {
    try {
        const verifyUser = await penggunaHandler.verifyRequest(req)
        console.log(verifyUser)
        if (verifyUser.Status == 'Success'){
            const addResult = await jadwalHandler.addJadwal(req.body.idkelas,req.body.idkuliah,req.body.namakuliah,req.body.hari,req.body.jammulai,req.body.jamselesai)
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
// isi json (perubahan yang ingin dimasukkan) lihat yang req.body; yg ada di URL path itu record yang mau diubah
app.put('/api/v1/jadwal/edit/:idkelas/:idkuliah/:hari', async (req,res) => {
    try {
        const verifyUser = await penggunaHandler.verifyRequest(req)
        console.log(verifyUser)
        if (verifyUser.Status == 'Success'){
            const editResult = await jadwalHandler.editJadwal(req.params.idkelas,req.body.idkuliah,req.body.namakuliah,req.body.hari,req.body.jammulai,req.body.jamselesai,req.params.idkuliah,req.params.hari)
            res.status(editResult.Code)
            res.json(editResult)
            
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

app.delete('/api/v1/jadwal/remove/:idkelas/:idkuliah/:hari', async (req,res) => {
    try {
        const verifyUser = await penggunaHandler.verifyRequest(req)
        console.log(verifyUser)
        if (verifyUser.Status == 'Success'){
            const deleteResult = await jadwalHandler.removeJadwal(req.params.idkelas,req.params.idkuliah,req.params.hari)
            res.status(deleteResult.Code)
            res.json(deleteResult)
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
// /api/v1/jadwal/list -> get all ; /api/v1/jadwal/list?idkelas=7601 -> get one
app.get('/api/v1/jadwal/list', async (req,res) => {
    try {
        const verifyUser = await penggunaHandler.verifyRequest(req)
        console.log(verifyUser) 
        if (verifyUser.Status == 'Success'){
            //check query string on URL
            if (typeof req.query.idkelas === 'undefined'){
                const showAllResult = await jadwalHandler.listAllJadwal()
                res.status(showAllResult.Code)
                res.json(showAllResult)
            }
            else {
                const showResult = await jadwalHandler.listJadwal(req.query.idkelas)
                res.status(showResult.Code)
                res.json(showResult)
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
// /api/v1/kelas/counter/7603/increase
// Action: increase, decrease, show 
// no login required hence no token
app.put('/api/v1/kelas/counter/:idkelas/:action', async (req,res) => {
    try {
        if (req.params.action == 'increase'){
            const counterResult = await sensorHandler.increasePeopleCount(req.params.idkelas)
            if (counterResult.Status == 'Success'){
                const modifyResult = await kelasHandler.editLampuMenyala(req.params.idkelas)
                if (modifyResult.Status == 'Success'){
                    res.status(modifyResult.Code)
                    res.json(modifyResult)
                }
            }
            else {
                res.status(counterResult.Code)
                res.json(counterResult)
            }
        }
        else if (req.params.action == 'decrease'){
            const counterResult = await sensorHandler.decreasePeopleCount(req.params.idkelas)
            if (counterResult.Status == 'Success'){
                const modifyResult = await kelasHandler.editLampuMenyala(req.params.idkelas)
                if (modifyResult.Status == 'Success'){
                    res.status(modifyResult.Code)
                    res.json(modifyResult)
                }
            }
            else {
                res.status(counterResult.Code)
                res.json(counterResult)
            }
        }
        else if (req.params.action == 'show'){
            const counterResult = await sensorHandler.detailSensor(req.params.idkelas)
            res.status(counterResult.Code)
            res.json(counterResult)
        }
        else {
            res.status(404)
            let noQueryResult = {};
            noQueryResult.Status = 'Failed'
            noQueryResult.Message = 'Invalid URL'
            res.json(noQueryResult)
        }
    }
    catch (e) {
        const errorResult = await serverErrorHandler.serverError(e)
        res.status(errorResult.Code)
        res.json(errorResult)
    }
})

app.get('/api/v1/kelas/petalampu/:idkelas', async (req,res) => {
    try {
        const verifyUser = await penggunaHandler.verifyRequest(req)
        console.log(verifyUser) 
        if (verifyUser.Status == 'Success'){
            const petaResult = await kelasHandler.getArrayLampu(req.params.idkelas)
            res.status(petaResult.Code)
            res.json(petaResult)
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
app.listen(3000, () => {
    console.log('Maid cafe serving at port 3000')
})