const express = require('express'),
    bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const penggunaHandler = require('./handler/pengguna.js');

//app setting
app.use(cors());
app.use(bodyParser.json({limit: '5mb'}));

//routes and HTTP verbs
app.post('/api/v1/login', async (req,res)=> {
    const loginResult = await penggunaHandler.login(req.body.username,req.body.password)
    res.status(loginResult.Code)
    res.json(loginResult)
})

app.post('/api/v1/register', async (req,res) => {
    const registerResult = await penggunaHandler.registerUser(req.body.username,req.body.password)
    res.status(registerResult.Code)
    res.json(registerResult)
})

//run server
app.listen(3000, function(){
    console.log('Maid cafe is listening at port 3000')
});