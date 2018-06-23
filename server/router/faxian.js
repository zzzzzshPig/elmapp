
/**
 * Created by Administrator on 2018/1/18.
 */
const request = require('request');
const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{

    let lat = Number(req.query.lat).toFixed(5);
    let lit = Number(req.query.lit).toFixed(5);

    let options = {
        url:`https://h5.ele.me/restapi/member/v1/discover?platform=1&block_index=0&latitude=${lat}&longitude=${lit}`,
        gzip:true
    };

    request(options, (err,response,body)=>{
        if(body){
            res.send(JSON.parse(body))
        }else{
            res.send([])
        }
    });
});//发现  顶部nav

router.get('/recommendation',(req,res)=>{

    let lat = Number(req.query.lat).toFixed(5);
    let lit = Number(req.query.lit).toFixed(5);
    let user_id = req.query.user_id;
    let offset = req.query.offset;
    let limit = req.query.limit;

    let options = {
        url:`https://h5.ele.me/restapi/shopping/v1/find/recommendation?latitude=${lat}&longitude=${lit}&offset=${offset}&limit=${limit}&user_id=${user_id}`,
        gzip:true
    };

    request(options, (err,response,body)=>{
        if(body){
            res.send(JSON.parse(body))
        }else{
            res.send([])
        }
    });
});//推荐食物

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
});//限时好礼


module.exports = router;


