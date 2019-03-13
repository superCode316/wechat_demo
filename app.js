let express = require('express');
let wechat = require('wechat');
let axios = require('axios');
let utils = require('./utils');
let config = require('./config');
let app = express();
let configs = {
    token:getToken(),
    appid:'wxbc7b7ffb371c2ad1'
};

function getToken(){
    axios.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxbc7b7ffb371c2ad1&secret=e4874ab0747c7b87afbcd6cfabc6e3e7')
        .then(res=>{
            console.log('get token from server');
            return res.data.access_token;
        })
}

app.use(express.query());
app.use(utils.sign(config));
app.use('wechat',wechat(configs,(req,res,next)=>{
    let message = req.weixin;
    console.log(message)
}));
app.get('/',(req,res)=>{
    console.log(req);
});
app.listen(8000,()=>{
    console.log('server start listening to port 8000......')
});