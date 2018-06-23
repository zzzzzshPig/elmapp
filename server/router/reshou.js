/**
 * Created by Administrator on 2017/12/21.
 */
const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{

    let arr = [ { text: '海燕麻辣烫' },
        { text: '山东水饺' },
        { text: '鸡' },
        { text: '鸡排' },
        { text: '粥' },
        { text: '全家福饺子' },
        { text: '东北饺子' },
        { text: '水饺' },
        { text: '奶茶' },
        { text: '烧烤' },
        { text: '周黑鸭' },
        { text: '汤圆' },
        { text: '寿司' },
        { text: '肯德基' },
        { text: '西餐' },
        { text: '麦当劳' },
        { text: '米线' },
        { text: '良品铺子' },
        { text: '螃蟹' },
        { text: '面' },
        { text: '酸菜鱼' },
        { text: '海参炒面' } ];

    res.send(arr);
});

module.exports = router;