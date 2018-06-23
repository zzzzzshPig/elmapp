/**
 * Created by Administrator on 2017/12/16.
 */
const express = require('express');
const app = express();
const tuijian = require('./router/tuijian'); //推荐搜索关键字
const reshou = require('./router/reshou');  //热搜
const fenlei = require('./router/fenlei'); //食品种类分类
const shop = require('./router/shopinfo'); //附近商店
const search = require('./router/search'); //搜索商店
const restaurant = require('./router/restaurant'); //搜索餐厅
const rating = require('./router/rating'); //搜索餐厅评价
const restaurant_food = require('./router/restaurant_food'); //搜索餐厅食物
const user_login = require('./router/login');//用户登录
const user_info = require('./router/user');//获取用户信息
const captchas = require('./router/captchas');//获取验证码
const order = require('./router/order');//获取用订单信息
const faxian = require('./router/faxian');//获取发现信息
const index = require('./router/index');//主页
const address = require('./router/address');

app.listen(80,()=>{
    console.log('我就不告诉你80端口已经开启了');
});

app.use(express.static(__dirname));

app.use('/',index);
app.use('/tuijian',tuijian);
app.use('/address',address);
app.use('/hotSearch',reshou);
app.use('/fenlei',fenlei);
app.use('/shop',shop);
app.use('/search',search);
app.use('/restaurant',restaurant);
app.use('/rating',rating);
app.use('/restaurant_food',restaurant_food);
app.use('/userLogin',user_login);
app.use('/user_info',user_info);
app.use('/captchas',captchas);
app.use('/order',order);
app.use('/discover',faxian);

