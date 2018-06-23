/**
 * Created by Administrator on 2017/12/21.
 */
const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/scores',(req,res)=>{

    const id = encodeURI(req.query.id);

    request({url:`https://h5.ele.me/restapi/ugc/v2/restaurants/${id}/ratings/scores`,gzip:true}, function (err,response,body) {
        if(body){
            res.send(JSON.parse(body))
        }else{
            res.send([])
        }
    });

});

router.get('/',(req,res)=>{

    const id = req.query.id;
    const offset = req.query.offset;
    let tagName = encodeURI(req.query.tag_name);
    if(tagName){
        tagName = '&tag_name='+tagName;
    }else{
        tagName = '';
    }

    request({url:`https://h5.ele.me/restapi/ugc/v3/restaurants/${id}/ratings?has_content=true${tagName}&offset=${offset}&limit=8`,gzip:true}, function (err,response,body) {
        if(body){
            res.send(JSON.parse(body))
        }else{
            res.send([])
        }
    });

});

router.get('/tags',(req,res)=>{

    const id = encodeURI(req.query.id);

    request({url:`https://h5.ele.me/restapi/ugc/v2/restaurants/${id}/ratings/tags`,gzip:true}, function (err,response,body) {
        if(body){
            res.send(JSON.parse(body))
        }else{
            res.send([])
        }
    });

});

module.exports = router;