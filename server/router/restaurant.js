/**
 * Created by Administrator on 2017/12/21.
 */
const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/',(req,res)=>{

    const id = req.query.id;

    request({url:`https://h5.ele.me/restapi/shopping/restaurant/${id}?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification&terminal=h5&latitude=30.39786&longitude=114.89204`,gzip:true}, function (err,response,body) {
        if(body){
            res.send(JSON.parse(body))
        }else{
            res.send([])
        }
    });

});

module.exports = router;