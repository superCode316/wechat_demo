let utils = {};
let sha1 = require('sha1');

//检查微信签名认证中间件
utils.sign = function (config){
    return function(req, res, next){
        config = config || {};
        var q = req.query;
        var token = config.wechat.token;
        var signature = q.signature; //微信加密签名
        var nonce = q.nonce; //随机数
        var timestamp = q.timestamp; //时间戳
        var echostr = q.echostr; //随机字符串
        /*
             1）将token、timestamp、nonce三个参数进行字典序排序
            2）将三个参数字符串拼接成一个字符串进行sha1加密
            3）开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
        */
        var str = [token, timestamp, nonce].sort().join('');
        var sha = sha1(str);
        if (req.method === 'GET') {

            if (sha === signature) {
                res.send(echostr+'')
            }else{
                res.send('err');
            }
        }
        else if(req.method === 'POST'){
            if (sha !== signature) {
                return;
            }
            next();
        }
    }
};

module.exports = utils;
