/**
 * Created by Administrator on 2017/12/21.
 */
const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/',(req,res)=>{

    const keyword = encodeURI(req.query.keyword);
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

    //average_cost_ids[]=1  人均消费
    //delivery_mode[]=1 蜂鸟专送
    //activity_types[]=1  优惠活动

    //https://h5.ele.me/restapi/shopping/v3/restaurants?latitude=30.39784&longitude=114.89412&keyword=&offset=0&limit=8&extras[]=activities&extras[]=tags&terminal=h5&brand_ids[]=&restaurant_category_ids[]=

    //https://h5.ele.me/restapi/shopping/v3/restaurants?latitude=30.39784&longitude=114.89412&keyword=&offset=0&limit=8&extras[]=activities&extras[]=tags&terminal=h5&brand_ids[]=&restaurant_category_ids[]=

    //https://h5.ele.me/restapi/shopping/v3/restaurants?latitude=31.23037&longitude=121.473701&keyword=&offset=0&limit=8&extras[]=activities&extras[]=tags&terminal=h5&brand_ids[]=&restaurant_category_ids[]=214

    //eleme://restaurants?search_source=1&activity_id=10022833&target=%7B%22category_schema%22%3A%7B%22complex_category_ids%22%3A%5B245%2C246%2C247%2C270%5D%7D%2C%22restaurant_category_id%22%3A%5B245%2C246%2C247%2C270%5D%7D&navType=0&color_type=1&target_name=%E6%9E%9C%E8%94%AC%E7%94%9F%E9%B2%9C&entry_id=20008841&page_type=1&business_flag=0&animation_type=1"

    request({url:`https://h5.ele.me/restapi/shopping/v2/restaurants/search?offset=${offset}&limit=8&keyword=${keyword}&latitude=${lat}&longitude=${lit}&search_item_type=3&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5${peisong}${xiaofei}${huodong}${shangjia}`,gzip:true}, function (err,response,body) {
        if(body){
            res.send(JSON.parse(body).inside)
        }else{
            res.send([])
        }
    });

    //data.inside
});

module.exports = router;