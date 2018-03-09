const express = require('express');
const config = require('./config/index');
const axios = require('axios');

const app = express();

const router=express.Router();

const port = process.env.PORT||config.build.port;
router.get('/disc',(req,res)=>{
    var url='https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
    axios.get(url,{
      headers: {
        referer: 'https://y.qq.com/w/taoge.html?ADTAG=newyqq.taoge&id=3763712896',
        host : 'c.y.qq.com',
        origin:'https://c.y.qq.com/'
      },
      params: req.query
    }).then(result=>{
      res.json(result.data)
    })
  });
  router.get('/lyric',(req,res)=>{
    var url="https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg";
    axios.get(url,{
      headers:{
        host : 'c.y.qq.com',
        referer:'https://y.qq.com/portal/player.html',
        origin:'https://c.y.qq.com/'
      },
      params:req.query
    }).then(result=>{
      var ret=result.data;
      if (typeof ret === 'string') {
        var reg = /^\w+\(({[^()]+})\)$/
        var matches = ret.match(reg)
        if (matches) {
          ret = JSON.parse(matches[1])
        }
      }
      res.json(ret);
    })
  })
app.use('/api',router);
app.use(express.static('./dist'));
module.exports=app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:'+port+'\n');
})