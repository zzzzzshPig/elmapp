
/**
     * Created by Administrator on 2018/1/18.
     */
const request = require('request');
const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{

    //ubt_ssid=cmm97rrgkr0easbdh8pogxzy5rqjso1w_2017-12-29; perf_ssid=p9nshrilncrtg9v6hsjhsyzy185m3p9v_2017-12-29; _utrace=2dd68fd9701b659770c4b319608cc368_2017-12-29; eleme__ele_me=daf0848f03530fe6c811f1e00feee720%3Ace01f796f3ca1855cc8804af5d9ca99c61ae7d91; track_id=1516224624%7C48d63781a3a9f728b06c181dc517dc74f0682a465499da384e%7C71ccef071ab8e9354bd881f395bca170; USERID=39413459; SID=b84KAwfaNWCUzGP77EIf14xAFOPMNJq37i6Q

    let options = {
        url:`https://h5.ele.me/restapi/eus/v1/users/${req.query.id}`,
        headers:{
            'Content-Type':'application/json',
            Charset:'utf-8',
            Cookie:`ubt_ssid=cmm97rrgkr0easbdh8pogxzy5rqjso1w_2017-12-29; perf_ssid=p9nshrilncrtg9v6hsjhsyzy185m3p9v_2017-12-29; _utrace=2dd68fd9701b659770c4b319608cc368_2017-12-29; eleme__ele_me=daf0848f03530fe6c811f1e00feee720%3Ace01f796f3ca1855cc8804af5d9ca99c61ae7d91; track_id=1516224624%7C48d63781a3a9f728b06c181dc517dc74f0682a465499da384e%7C71ccef071ab8e9354bd881f395bca170; USERID=${req.query.id}; SID=${req.query.sid}`,
        },
        gzip:true
    };

    request(options, (err,response,body)=>{

        if(body){
            res.send(JSON.parse(body))
        }else{
            res.send([])
        }
    });
});//用户信息

router.get('/hongbao',(req,res)=>{

    let options = {
        url:`https://h5.ele.me/restapi/promotion/v3/users/${req.query.user_id}/hongbaos?offset=${req.query.offset}&limit=20`,
        headers:{
            'Content-Type':'application/json',
            Charset:'utf-8',
            Cookie:`cookie:ubt_ssid=cmm97rrgkr0easbdh8pogxzy5rqjso1w_2017-12-29; perf_ssid=p9nshrilncrtg9v6hsjhsyzy185m3p9v_2017-12-29; _utrace=2dd68fd9701b659770c4b319608cc368_2017-12-29; eleme__ele_me=daf0848f03530fe6c811f1e00feee720%3Ace01f796f3ca1855cc8804af5d9ca99c61ae7d91; track_id=1516224624%7C48d63781a3a9f728b06c181dc517dc74f0682a465499da384e%7C71ccef071ab8e9354bd881f395bca170; USERID=${req.query.user_id}; SID=${req.query.sid}`,
        },
        gzip:true
    };

    request(options, (err,response,body)=>{
        if(body){
            res.send(JSON.parse(body))
        }else{
            res.send([])
        }
    });
});//用户红包

router.get('/coupons',(req,res)=>{

    let options = {
        url:`https://h5.ele.me/restapi/promotion/v1/users/${req.query.user_id}/coupons`,
        headers:{
            'Content-Type':'application/json',
            Charset:'utf-8',
            Cookie:`cookie:ubt_ssid=cmm97rrgkr0easbdh8pogxzy5rqjso1w_2017-12-29; perf_ssid=p9nshrilncrtg9v6hsjhsyzy185m3p9v_2017-12-29; _utrace=2dd68fd9701b659770c4b319608cc368_2017-12-29; eleme__ele_me=daf0848f03530fe6c811f1e00feee720%3Ace01f796f3ca1855cc8804af5d9ca99c61ae7d91; track_id=1516224624%7C48d63781a3a9f728b06c181dc517dc74f0682a465499da384e%7C71ccef071ab8e9354bd881f395bca170; USERID=${req.query.user_id}; SID=${req.query.sid}`,
        },
        gzip:true
    };

    request(options, (err,response,body)=>{
        if(body){
            res.send(JSON.parse(body))
        }else{
            res.send([])
        }
    });
});//用户代金券

router.get('/expired_hongbaos',(req,res)=>{

    let options = {
        url:`https://h5.ele.me/restapi/promotion/v3/users/${req.query.user_id}/expired_hongbaos?limit=20&offset=${req.query.offset}`,
        headers:{
            'Content-Type':'application/json',
            Charset:'utf-8',
            Cookie:`ubt_ssid=cmm97rrgkr0easbdh8pogxzy5rqjso1w_2017-12-29; perf_ssid=p9nshrilncrtg9v6hsjhsyzy185m3p9v_2017-12-29; _utrace=2dd68fd9701b659770c4b319608cc368_2017-12-29; eleme__ele_me=daf0848f03530fe6c811f1e00feee720%3Ace01f796f3ca1855cc8804af5d9ca99c61ae7d91; track_id=1516224624%7C48d63781a3a9f728b06c181dc517dc74f0682a465499da384e%7C71ccef071ab8e9354bd881f395bca170; USERID=${req.query.user_id}; SID=${req.query.sid}`,
        },
        gzip:true
    };

    request(options, (err,response,body)=>{
        if(body){
            res.send(JSON.parse(body))
        }else{
            res.send([])
        }
    });
});//用户历史红包

router.get('/suggest',(req,res)=>{

    let options = {
        url:`https://h5.ele.me/restapi/member/gifts/suggest`,
        gzip:true
    };

    request(options, (err,response,body)=>{
        if(body){
            res.send(JSON.parse(body))
        }else{
            res.send([])
        }
    });
});//金币商品

router.get('/user_address',(req,res)=>{

    let options = {
        url:`https://h5.ele.me/restapi/member/v1/users/${req.query.user_id}/addresses`,
        headers:{
            'Content-Type':'application/json',
            Charset:'utf-8',
            Cookie:`ubt_ssid=cmm97rrgkr0easbdh8pogxzy5rqjso1w_2017-12-29; perf_ssid=p9nshrilncrtg9v6hsjhsyzy185m3p9v_2017-12-29; _utrace=2dd68fd9701b659770c4b319608cc368_2017-12-29; eleme__ele_me=daf0848f03530fe6c811f1e00feee720%3Ace01f796f3ca1855cc8804af5d9ca99c61ae7d91; track_id=1516224624%7C48d63781a3a9f728b06c181dc517dc74f0682a465499da384e%7C71ccef071ab8e9354bd881f395bca170; USERID=${req.query.user_id}; SID=${req.query.sid}`,
        },
        gzip:true
    };

    request(options, (err,response,body)=>{
        if(body){
            res.send(JSON.parse(body))
        }else{
            res.send([])
        }
    });
});//金币商品

module.exports = router;


