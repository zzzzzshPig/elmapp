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
        url:'https://h5.ele.me/restapi/eus/login/login_by_password',
        headers:{
            'Content-Type':'application/json',
            charset:'utf-8',
            Cookie:'ubt_ssid=cmm97rrgkr0easbdh8pogxzy5rqjso1w_2017-12-29; perf_ssid=p9nshrilncrtg9v6hsjhsyzy185m3p9v_2017-12-29; _utrace=2dd68fd9701b659770c4b319608cc368_2017-12-29; eleme__ele_me=daf0848f03530fe6c811f1e00feee720%3Ace01f796f3ca1855cc8804af5d9ca99c61ae7d91; track_id=1516224624%7C48d63781a3a9f728b06c181dc517dc74f0682a465499da384e%7C71ccef071ab8e9354bd881f395bca170',
            'x-shard':'loc=114.89412,30.39784'
        },
        json:true,
        body:{
            captcha_hash:req.body.captcha_hash,
            captcha_value:req.body.captcha_value,
            password:req.body.password,
            username:req.body.username
        },
        gzip:true
    };

    request.post(options,(err,res,body)=>{
        if(!err){
            if(res.headers['set-cookie']){
                result.send(res.headers['set-cookie']);
            }else{
                result.send(body);
            }
        }else{
            result.send('操作太快，休息一下吧');
        }
    });
});

router.post('/mobile_send_code',jsonParser,(req,result)=>{

    let options = {
        url:'https://h5.ele.me/restapi/eus/login/mobile_send_code',
        headers:{
            'Content-Type':'application/json',
            charset:'utf-8',
        },
        json:true,
        body:{
            captcha_hash:req.body.captcha_hash,
            captcha_value:req.body.captcha_value,
            mobile:req.body.mobile
        },
        gzip:true
    };

    request.post(options,(err,res,body)=>{
        if(!err){
            if(res.validate_token){
                result.send(res.validate_token);
            }else{
                result.send(body);
            }
        }else{
            result.send('操作太快，休息一下吧');
        }
    });
});

router.post('/login_by_mobile',jsonParser,(req,result)=>{

    let options = {
        url:'https://h5.ele.me/restapi/eus/login/login_by_mobile',
        headers:{
            'Content-Type':'application/json',
            charset:'utf-8',
        },
        json:true,
        body:{
            validate_code:req.body.validate_code,
            validate_token:req.body.validate_token,
            mobile:req.body.mobile
        },
        gzip:true
    };

    request.post(options,(err,res,body)=>{
        if(!err){
            if(res.headers['set-cookie']){
                result.send(res.headers['set-cookie']);
            }else{
                result.send(body);
            }
        }else{
            result.send('操作太快，休息一下吧');
        }
    });
});

module.exports = router;


