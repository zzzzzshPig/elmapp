
/**
 * Created by Administrator on 2018/1/18.
 */
const request = require('request');
const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{

    let user_id = req.query.user_id;
    let sid = req.query.sid;

    let options = {
        url:`https://h5.ele.me/restapi/member/v1/users/${user_id}/addresses`,
        gzip:true,
        headers:{
            'content-type':'application/json',
            cookie:`ubt_ssid=cmm97rrgkr0easbdh8pogxzy5rqjso1w_2017-12-29; perf_ssid=p9nshrilncrtg9v6hsjhsyzy185m3p9v_2017-12-29; _utrace=2dd68fd9701b659770c4b319608cc368_2017-12-29; eleme__ele_me=daf0848f03530fe6c811f1e00feee720%3Ace01f796f3ca1855cc8804af5d9ca99c61ae7d91; track_id=1516224624%7C48d63781a3a9f728b06c181dc517dc74f0682a465499da384e%7C71ccef071ab8e9354bd881f395bca170; USERID=${user_id}; SID=${sid}`,
        },
    };

    request(options, (err,response,body)=>{
        if(body){
            res.send(JSON.parse(body))
        }else{
            res.send([])
        }
    });
});//搜索用户地址

router.get('/search',(req,res)=>{

    let user_id = req.query.user_id;
    let sid = req.query.sid;
    let lat = req.query.lat;
    let lit = req.query.lit;
    let keyword = encodeURI(req.query.keyword);

    let options = {
        url:`https://h5.ele.me/restapi/bgs/poi/search_poi_nearby?keyword=${keyword}&offset=0&limit=20&latitude=${lat}&longitude=${lit}`,
        gzip:true,
        headers:{
            'content-type':'application/json',
            'x-shard':`loc=${lit},${lat}`,
            cookie:`ubt_ssid=cmm97rrgkr0easbdh8pogxzy5rqjso1w_2017-12-29; perf_ssid=p9nshrilncrtg9v6hsjhsyzy185m3p9v_2017-12-29; _utrace=2dd68fd9701b659770c4b319608cc368_2017-12-29; eleme__ele_me=daf0848f03530fe6c811f1e00feee720%3Ace01f796f3ca1855cc8804af5d9ca99c61ae7d91; track_id=1516224624%7C48d63781a3a9f728b06c181dc517dc74f0682a465499da384e%7C71ccef071ab8e9354bd881f395bca170; USERID=${user_id}; SID=${sid}`,
        },
    };

    request(options, (err,response,body)=>{
        if(body){
            res.send(JSON.parse(body))
        }else{
            res.send([])
        }
    });
});//用户搜索地址

module.exports = router;


