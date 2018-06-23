/**
 * Created by Administrator on 2018/1/18.
 */
const request = require('request');
const express = require('express');
const bodyParser  = require('body-parser');
const router = express.Router();

const jsonParser = bodyParser.json();

router.post('/',jsonParser,(req,result)=>{

    let options = {
        url:'https://h5.ele.me/restapi/eus/v3/captchas',
        headers:{
            'Content-Type':'application/json',
            charset:'utf-8',
        },
        json:true,
        body:{
            captcha_str:req.body.captcha_str,
        },
        gzip:true
    };

    request.post(options,(err,res,body)=>{
        if(!err){
            result.send(body);
        }else{
            result.send('操作太快，休息一下吧');
        }
    });
});

module.exports = router;


