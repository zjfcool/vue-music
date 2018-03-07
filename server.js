const express = require('express');
const config = require('./config/index');
const port = process.env.PORT||config.build.port;

const app = express();

app.use(express.static('./dist'));
module.exports=app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:'+port+'\n');
})