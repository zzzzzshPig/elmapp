/**
 * Created by Administrator on 2017/12/21.
 */
const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/',(req,res)=>{

    const id = req.query.id;
    let sid = '';
    let user_id = '';
    if(req.query.sid){
        sid = '; SID='+req.query.sid;
    }
    if(req.query.user_id){
        user_id = '; USERID='+req.query.user_id;
    }

    let options = {
        url:`https://h5.ele.me/restapi/shopping/v2/menu?restaurant_id=${id}`,
        headers:{
            'Content-Type':'application/json',
            charset:'utf-8',
            cookie:'ubt_ssid:cmm97rrgkr0easbdh8pogxzy5rqjso1w_2017-12-29; perf_ssid=p9nshrilncrtg9v6hsjhsyzy185m3p9v_2017-12-29; _utrace=2dd68fd9701b659770c4b319608cc368_2017-12-29; eleme__ele_me=daf0848f03530fe6c811f1e00feee720%3Ace01f796f3ca1855cc8804af5d9ca99c61ae7d91; track_id=1516224624%7C48d63781a3a9f728b06c181dc517dc74f0682a465499da384e%7C71ccef071ab8e9354bd881f395bca170'+user_id+sid,
            'x-shard':'shopid='+id
        },
        gzip:true
    };

    request(options, function (err,response,body) {
        if(body){
            res.send(JSON.parse(body))
        }else{
            res.send([])
        }
    });

});

module.exports = router;