/**
 * Created by Administrator on 2017/12/21.
 */
const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{

        let arr = [ { text: '薯条' },
            { text: '华莱士' },
            { text: '披萨' },
            { text: '奶茶' },
            { text: '烤肉饭' },
            { text: '鸭血' },
            { text: '麻辣烫' },
            { text: '水果粥' },
            { text: '炒饭' },
            { text: '小米米' },
            { text: '麦当劳' },
            { text: '肯德基' },
            { text: '沙拉' },
            { text: '火锅' },
            { text: '西餐' },
            { text: '茶' },
            { text: '粥' },
            { text: '蛋糕' } ];

        res.send(arr);

});

module.exports = router;