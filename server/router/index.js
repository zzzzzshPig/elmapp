
/**
 * Created by Administrator on 2018/1/18.
 */
const request = require('request');
const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.sendfile('./index.html');
});


module.exports = router;


