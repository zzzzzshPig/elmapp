/**
 * Created by Administrator on 2017/12/21.
 */
const express = require('express');
const router = express.Router();
const request = require('request');
const url = require('url');
const queryString = require('querystring');

router.get('/',(req,res)=>{

    let lat = Number(req.query.lat).toFixed(5);
    let lit = Number(req.query.lit).toFixed(5);

    request({url:`https://h5.ele.me/restapi/shopping/openapi/entries?latitude=${lat}&longitude=${lit}&templates[]=main_template&templates[]=favourable_template&templates[]=svip_template`,headers:{
        'x-shard':`loc=${lit},${lat}`
    },gzip:true}, function (err,response,body) {
        if(body){
            res.send(JSON.parse(body))
        }else{
            res.send([])
        }
    });

});

router.get('/shop',(req,res)=>{
    let link = JSON.parse(queryString.parse(url.parse(req.query.link).query).target).restaurant_category_id;
    let str = '';
    if(link){
        link.map(item=>{
            str+='&restaurant_category_ids[]='+item
        });
    }

    const offset = req.query.offset;
    const peisong = '&delivery_mode[]='+(req.query.peisong||'');
    const xiaofei = '&average_cost_ids[]='+(req.query.xiaofei||'');
    const huodong = '&activity_types[]='+(req.query.huodong||'');
    let shangjia = req.query.shangjia;
    let lat = Number(req.query.lat).toFixed(5);
    let lit = Number(req.query.lit).toFixed(5);

    //&support_ids[]=7&support_ids[]=5&support_ids[]=3
    if(shangjia){
        let str = '';
        shangjia.map(item=>{
            str += '&support_ids[]='+item;
        });
        shangjia = str;
    }else{
        shangjia = '';
    }

    request({url:`https://h5.ele.me/restapi/shopping/v3/restaurants?latitude=${lat}&longitude=${lit}&keyword=&offset=${offset}&limit=8&extras[]=activities&extras[]=tags&terminal=h5${peisong}${xiaofei}${huodong}${shangjia}&brand_ids[]=${str}`,gzip:true}, function (err,response,body) {
        if(body){
            res.send(JSON.parse(body))
        }else{
            res.send([])
        }
    });

});

module.exports = router;