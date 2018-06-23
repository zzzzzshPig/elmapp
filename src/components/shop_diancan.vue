<template>
    <div class="sdc_diancan">
        <!-- 食物渲染列表 -->
        <div class="sdc_diancan_box">
            <ul class="sdc_left" v-on:click="targetList">
                <li :class="index==0?'sdc_left_itemActive sdc_left_item':'sdc_left_item'"  v-for="item,index in menu">{{item.name}}</li>
            </ul>
            <div class="sdc_right">
                <ul class="sdc_right_list" v-for="item in menu">
                    <li class="sdc_right_itemTitle">
                        <h6 style="color:#666;">{{item.name}}</h6><span class="sdc_right_titleText">{{item.description}}</span>
                    </li>
                    <li class="sdc_right_item" :key="food.id" v-for="food in item.foods" v-on:click="show_foodInfo(food)">
                        <div class="sdc_right_foodImg" v-if="food.image_path">
                            <img :src="find_img(food.image_path)+'?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/'" alt="图片不见了"/>
                        </div>
                        <div class="sdc_right_foodInfo">
                            <div class="sdc_right_foodInfo_info">
                                <h3 class="sdc_right_foodInfo_title">{{food.name}}</h3>
                                <p class="sdc_right_foodInfo_text">{{food.description}}</p>
                                <p class="sdc_right_foodInfo_sale" v-if="Boolean(food.month_sales)">月售{{food.month_sales}}份 好评率{{food.satisfy_rate}}%</p>
                                <div class="sdc_right_foodInfo_huodong" v-if="food.activity">
                                    <span class="sdc_right_foodInfo_iconName">{{food.activity.benefit_text}}起</span>
                                    <span class="sdc_right_foodInfo_iconText">{{food.activity.applicable_quantity_text}}</span>
                                </div>
                            </div>
                            <div class="sdc_right_foodPrice sdc_price">
                                <span class="sdc_right_foodPrice_price">{{food.specfoods[0].price}}</span>
                                <span class="sdc_foodPrice_add" v-on:click="add_foodNum($event,food)">
                                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" ><path d="M483.555556 540.444444H250.311111v-56.888888h233.244445V250.311111h56.888888v233.244445h233.244445v56.888888H540.444444v233.244445h-56.888888V540.444444zM512 1024c284.444444 0 512-227.555556 512-512s-227.555556-512-512-512-512 227.555556-512 512 227.555556 512 512 512z" fill="#2395ff"></path>
                                    </svg>
                                </span>
                                <span class="sdc_foodPrice_delete" v-if="food.sdc_num" v-on:click="delete_foodNum($event,food)">
                                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" ><path d="M512.007466 0a511.992536 511.992536 0 1 0 511.992536 511.898644A512.555887 512.555887 0 0 0 512.007466 0m0 969.903336a458.004693 458.004693 0 1 1 458.004693-458.004692 458.474152 458.474152 0 0 1-458.004693 458.004692M696.223376 546.544755H329.387719a35.866706 35.866706 0 0 1-35.772814-35.772814 35.866706 35.866706 0 0 1 35.772814-35.772814h366.835657A35.866706 35.866706 0 0 1 732.371757 510.771941a35.866706 35.866706 0 0 1-36.148381 35.772814z" fill="#2395ff"></path>
                                    </svg>
                                </span>
                                <span class="sdc_foodPrice_num" v-if="food.sdc_num">{{food.sdc_num}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 购物车 -->
        <div class="sdc_buy" v-if="resData.length">
            <div class="sdc_buyBox" v-on:click="hide_buy_food"></div>
            <div class="sdc_buy_food" >
                <div class="sdc_buy_tip" v-if="resData[0].activities[0]">
                    {{(resData[0].activities[1]&&resData[0].activities[1].tips)||resData[0].activities[0].tips}}
                </div>
                <div class="sdc_buy_box" v-if="buy_food.length">
                    <div class="sdc_buy_box_title">
                        <span class="sdc_buy_box_h">已选商品</span>
                        <div class="sdc_buy_box_clear" v-on:click="clear_buy_food">
                            <svg class="sdc_lajitong" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M414.66 90.125h194.712q26.612 0 45.757 19.147t19.147 45.757v64.904h178.487q6.49 0 11.357 4.868t4.868 11.358v48.678h-713.943v-48.678q0-6.49 4.868-11.358t11.358-4.868h178.487v-64.904q0-26.611 19.147-45.757t45.757-19.147zM414.66 155.029v64.904h194.712v-64.904h-194.712zM804.084 349.739v519.231q0 26.611-19.147 45.757t-45.757 19.147h-454.326q-26.612 0-45.757-19.147t-19.147-45.757v-519.231h584.135zM284.853 414.644v454.326h64.904v-454.326h-64.904zM414.66 414.644v454.326h64.904v-454.326h-64.904zM544.468 414.644v454.326h64.904v-454.326h-64.904zM674.276 414.644v454.326h64.904v-454.326h-64.904z" p-id="2368" fill="#bbb"></path></svg>
                            清空
                        </div>
                    </div>
                    <ul class="sdc_buy_box_food">
                        <li class="sdc_buy_box_foodItem" v-for="buy in buy_food">
                            <span class="sdc_buy_box_foodName">{{buy.name}}</span>
                            <span class="sdc_buy_box_foodPrice sdc_price">{{buy.specfoods[0].price}}</span>
                            <div class="sdc_buy_box_foodBtn">
                                <span class="sdc_foodPrice_add" v-on:click="add_foodNum($event,buy)">
                                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" ><path d="M483.555556 540.444444H250.311111v-56.888888h233.244445V250.311111h56.888888v233.244445h233.244445v56.888888H540.444444v233.244445h-56.888888V540.444444zM512 1024c284.444444 0 512-227.555556 512-512s-227.555556-512-512-512-512 227.555556-512 512 227.555556 512 512 512z" fill="#2395ff"></path>
                                        </svg>
                                    </span>
                                <span class="sdc_foodPrice_delete" v-on:click="delete_foodNum($event,buy)">
                                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" ><path d="M512.007466 0a511.992536 511.992536 0 1 0 511.992536 511.898644A512.555887 512.555887 0 0 0 512.007466 0m0 969.903336a458.004693 458.004693 0 1 1 458.004693-458.004692 458.474152 458.474152 0 0 1-458.004693 458.004692M696.223376 546.544755H329.387719a35.866706 35.866706 0 0 1-35.772814-35.772814 35.866706 35.866706 0 0 1 35.772814-35.772814h366.835657A35.866706 35.866706 0 0 1 732.371757 510.771941a35.866706 35.866706 0 0 1-36.148381 35.772814z" fill="#2395ff" ></path>
                                        </svg>
                                    </span>
                                <span class="sdc_foodPrice_num">
                                    {{buy.sdc_num}}
                                </span>
                            </div>
                        </li>
                        <li class="sdc_buy_box_foodItem" v-if="packing_fee">
                            <span class="sdc_buy_box_canhe">餐盒</span>
                            <span class="sdc_buy_box_foodPrice sdc_price">{{packing_fee}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="sdc_buy_infoBox" v-on:click="show_buy_food">
                <div class="sdc_buy_car" :style="buyNum?'background-color: #3190e8;background-image: none;':'background-image: radial-gradient(circle,#363636 1.05rem,#444 0);'">
                    <div class="sdc_buy_img"></div>
                    <div class="sdc_buy_num" v-if="buyNum">{{buyNum}}</div>
                </div>
                <div class="sdc_buy_info">
                    <div class="sdc_buy_priceBox">
                        <p class="sdc_buy_price">¥{{Number((saleNum+packing_fee).toFixed(1))||0}}</p>
                        <div class="sdc_buy_peisong">配送费¥{{resData[0].float_delivery_fee}}</div>
                    </div>
                    <div class="sdc_buy_qisong">
                        {{com_qisong}}
                    </div>
                </div>
            </div>
        </div>
        <!-- 食物详细信息 -->
        <div class="sdc_foodInfoBox">
            <div class="sdc_foodInfo" v-on:click="hide_foodInfo">
                <div class="sdc_foodInfo_box" v-on:click="hide_foodInfo" v-for="info in foodInfo">
                    <img :src="find_img(info.image_path)+'?imageMogr/format/webp/thumbnail/!828x828r/gravity/Center/crop/828x828/'" alt="图片不见了" class="sdc_foodInfo_img"/>
                    <p class="sdc_foodInfo_description">{{info.description}}</p>
                    <div class="sdc_foodInfo_info">
                        <h5 class="sdc_foodInfo_name">{{info.name}}</h5>
                        <p class="sdc_foodInfo_tips">月售{{info.month_sales}}份 好评率{{info.satisfy_rate}}%</p>
                        <div class="sdc_right_foodInfo_huodong" v-if="info.activity">
                            <span class="sdc_right_foodInfo_iconName">{{info.activity.benefit_text}}起</span>
                            <span class="sdc_right_foodInfo_iconText">{{info.activity.applicable_quantity_detail_text}}</span>
                        </div>
                        <div class="sdc_foodInfo_PriceBox sdc_right_foodPrice sdc_price">
                            <span class="sdc_right_foodPrice_price">{{info.specfoods[0].price}}</span>
                            <span class="sdc_foodPrice_add" v-on:click="add_foodNum($event,info)">
                                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" ><path d="M483.555556 540.444444H250.311111v-56.888888h233.244445V250.311111h56.888888v233.244445h233.244445v56.888888H540.444444v233.244445h-56.888888V540.444444zM512 1024c284.444444 0 512-227.555556 512-512s-227.555556-512-512-512-512 227.555556-512 512 227.555556 512 512 512z" fill="#2395ff"></path>
                                </svg>
                            </span>
                            <span class="sdc_foodPrice_delete" v-if="info.sdc_num" v-on:click="delete_foodNum($event,info)">
                                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" ><path d="M512.007466 0a511.992536 511.992536 0 1 0 511.992536 511.898644A512.555887 512.555887 0 0 0 512.007466 0m0 969.903336a458.004693 458.004693 0 1 1 458.004693-458.004692 458.474152 458.474152 0 0 1-458.004693 458.004692M696.223376 546.544755H329.387719a35.866706 35.866706 0 0 1-35.772814-35.772814 35.866706 35.866706 0 0 1 35.772814-35.772814h366.835657A35.866706 35.866706 0 0 1 732.371757 510.771941a35.866706 35.866706 0 0 1-36.148381 35.772814z" fill="#2395ff"></path>
                                </svg>
                            </span>
                            <span class="sdc_foodPrice_num" v-if="info.sdc_num">{{info.sdc_num}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default{
        name:'diancan',
        data(){
            return{
                buyNum:0,
                saleNum:0,
                foodInfo:[],
                packing_fee:0,
                buy_food:[],
            }
        },
        mounted(){
            this.targetList.delay = true;

            $(()=>{
                let right = $('.sdc_right');
                let btn = $('.sv_shopMain_btn');
                let scroll = $('.sv_content');
                let box = $('.sv_shopMain_main');
                box.height($(window).height()-btn.height());

                let oldTop = right.scrollTop();
                let Top = 0;

                right.scroll(()=>{
                    if(this.targetList.delay){
                        Top = Math.max(right.scrollTop(),scroll.scrollTop()) + right.scrollTop() - oldTop;
                        oldTop = right.scrollTop();
                        scroll.scrollTop(Top);

                        let list = $('.sdc_right_list');
                        let left = $('.sdc_left_item');

                        list.map((index,item)=>{
                            let li = $(item);
                            if(li.position().top<1){
                                left.removeClass('sdc_left_itemActive');
                                left.eq(index).addClass('sdc_left_itemActive');
                            }
                        });
                    }
                });
            });//滚动相关事件
        },
        methods:{
            targetList(e){
                let target = $(e.target);

                //找到被点击项
                if(target.hasClass('sdc_left_item')){
                    //清除样式
                    let list = $('.sdc_left');
                    list.find('.sdc_left_itemActive').removeClass('sdc_left_itemActive');
                    target.addClass('sdc_left_itemActive');

                    //获取被点击的元素的下标 确定跳转位置
                    let index = target.index();
                    let food = $('.sdc_right_itemTitle').eq(index).position().top;//获取对应的title的top

                    let right = $('.sdc_right');
                    this.targetList.delay = false;

                    right.stop().animate({
                        scrollTop:food+right.scrollTop()
                    },200,()=>{
                        this.targetList.delay = true;
                    })
                }

            },//左侧导航跳转
            find_img(String_path){
                let path = String_path+'';
                let format = path.match(/(jpeg|png|jpg|bmp)/)[0];
                return `https://fuss10.elemecdn.com/${path.slice(0,1)}/${path.slice(1,3)}/${path.slice(3)}.${format}`;
            },//将返回的img路径改为有效的img路径  967284af9fb1b499192d2476648c3ccfjpeg  需要转化为 https://fuss10.elemecdn.com/9/67/284af9fb1b499192d2476648c3ccfjpeg.jpeg
            show_foodInfo(food){
                this.foodInfo.push(food);

                //显示动画 淡入效果  使用 animate.css 的 fadeIn 类
                let box = $('.sdc_foodInfoBox');

                box.fadeIn(300,()=>{
                });

            },//显示食物相信信息
            hide_foodInfo(e){
                let c_target = $(e.currentTarget);
                if(!c_target.hasClass('sdc_foodInfo_box')){
                    //显示动画 淡出效果 使用 animate.css 的 fadeOut 类
                    let box = $('.sdc_foodInfoBox');
                    box.fadeOut(300,()=>{
                        this.foodInfo = [];
                    });
                }else{
                    e.stopPropagation();
                }


            },//隐藏食物相信信息
            add_foodNum(e,food){
                //增加食物购买量和 打包盒 费用
                let specfoods = food.specfoods[0];
                food.sdc_num++;
                this.packing_fee = Number((this.packing_fee + specfoods.packing_fee).toFixed(1));
                this.buyNum++;
                this.saleNum = Number((this.saleNum + specfoods.price).toFixed(1));
                e.stopPropagation();

                //保存购买的食物  用于付款和 查看  如果买了一份 证明 买了这个食物，就添加
                if(food.sdc_num==1){
                    this.buy_food.push(food);
                }
            },//添加食物
            delete_foodNum(e,food){
                //去除食物购买量和 打包盒 费用
                let specfoods = food.specfoods[0];
                food.sdc_num--;
                this.packing_fee = Number((this.packing_fee - specfoods.packing_fee).toFixed(1));
                this.buyNum--;
                this.saleNum = Number((this.saleNum - specfoods.price).toFixed(1));
                e.stopPropagation();

                //去除购买的食物  用于付款和 查看  如果减少到一份都没有的话  就去掉这个food
                if(food.sdc_num==0){
                    let buy = $('.sdc_buy_box');
                    this.buy_food.map((item,index)=>{
                        if(item==food){
                            this.buy_food.splice(index,1);
                            buy.height('auto')
                        }
                    });
                    if(!this.buy_food.length){
                        this.hide_buy_food();
                    }
                }

            },//减少食物
            show_buy_food(){
                let buy = $('.sdc_buy_box');
                let box = $('.sdc_buyBox');

                if(this.buy_food.length)
                {
                    if(box.css('opacity')=='0'){//隐藏就显示
                        box.css('display','block');
                        let height = buy.height('auto').height()-0.2; //使元素高度自动，获取初始高度
                        buy.height(0); //归零，隐藏
                        buy.height(height);  //改变高度 播放动画
                        box.css('opacity','1');
                    }else{//显示就隐藏
                        buy.height(0);
                        box.css('opacity','0');

                        setTimeout(()=>{
                            box.css('display','none');
                        },300)
                    }
                }
            },//显示购买的食物
            hide_buy_food(){
                let box = $('.sdc_buyBox');
                let buy = $('.sdc_buy_box');

                buy.height(0);
                box.css('opacity','0');
                setTimeout(()=>{
                    box.css('display','none');
                },300)
            },//隐藏购买的食物
            clear_buy_food(){
                this.buy_food.map(item=>{
                    item.sdc_num = 0;
                });
                this.buyNum = 0;
                this.saleNum = 0;
                this.buy_food = [];
                this.hide_buy_food();
            },//清空购买的食物
        },
        props:{
            tip:String,
            menu:Array,
            resData:Array
        },
        computed:{
            com_qisong:{
                get(){
                    let qisong = this.resData[0].float_minimum_order_amount;
                    let box = $('.sdc_buy_qisong');
                    box.css('background-color','#535356');
                    if(this.saleNum==0){
                        return '¥'+qisong+'起送'
                    }else if(this.saleNum < qisong){
                        return '还差¥'+(qisong - this.saleNum)+'起送'
                    }else if(this.saleNum >= qisong){
                        box.css('background-color','#4cd964');
                        return '去结算'
                    }
                },
                set(){
                }
            }//计算 起送费
        }
    }
</script>

<style scoped>
    /* 购物车详细信息 */
    .sdc_buy_box_foodName{
        flex: 3.8;
    }
    .sdc_buy_box_foodPrice{
        flex:2;
        font-weight: bold;
        color: #f60;
    }
    .sdc_buy_box_food{
        padding:0 .6rem;
        background-color: #fff;
    }
    .sdc_buy_box_foodBtn{
        position: relative;
        flex:1;
        width:100%;
        height:100%;
    }
    .sdc_buy_box_canhe{
        flex:2.55;
    }
    .sdc_buy_box_foodItem{
        display: flex;
        border-bottom: 1px solid #f5f5f5;
        padding:.5rem  0;
    }
    .sdc_buy_box_clear{
        display: flex;
        align-items: center;
        font-size:.5rem;
    }
    .sdc_buy_box_h{
        flex:1;
        height:1rem;
        padding-left:.25rem;
        border-left:3px solid #2395ff;
        line-height: 1rem;
        font-size:.8rem;
    }
    .sdc_lajitong{
        width:.8rem;
        height:.8rem;
    }
    .sdc_buy_box_title{
        display: flex;
        align-items: center;
        padding:.5rem .6rem;
        background-color: #eceff1;
        color:#666;
    }


    /* 食物活动样式 */
    .sdc_right_foodInfo_iconText{
        padding:0 .2rem;
        color:#f07373;
        border:1px solid #ff3c15;
    }
    .sdc_right_foodInfo_iconName{
        padding:0 .2rem;
        color:#fff;
        background-image: linear-gradient(90deg,#ff7416,#ff3c15 98%);
    }
    .sdc_right_foodInfo_huodong{
        display: flex;
        margin-top: .2rem;
        line-height: .7rem;
        font-size:.5rem;
        transform: scale(.9);
        transform-origin: 0 0;
    }

    /* 食物详细信息 */
    .sdc_foodInfo_PriceBox{
        margin-top:.5rem;
    }
    .sdc_foodInfo_tips{
        margin-top:-.1rem;
        font-size:.5rem;
        color:#666;
    }
    .sdc_foodInfo_name{
        font-size:.7rem;
    }
    .sdc_foodInfo_info{
        padding:.5rem .7rem;
    }
    .sdc_foodInfo_description{
        position: absolute;
        top:14.7rem;
        left:.7rem;
        font-size:.5rem;
        color:#fff;
    }
    .sdc_foodInfo_img{
        width:100%;
        height: 85.333333vw;
    }
    .sdc_foodInfoBox{
        display: none;
    }
    .sdc_foodInfo{
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background-color: rgba(0,0,0,.5);
    }
    .sdc_foodInfo_box{
        overflow: hidden;
        position: relative;
        width: 85.333333vw;
        height: 114.133333vw;
        background-color: #fff;
        border-radius: .2rem;
    }

    /* 购物车 */
    .sdc_buyBox{
        display: none;
        opacity: 0;
        z-index:-1;
        position: fixed;
        top:0;
        left:0;
        width: 100%;
        height:100%;
        background:rgba(0,0,0,.4);
        transition:opacity .3s;
    }
    .sdc_buy_qisong{
        width:5.2rem;
        height:100%;
        background-color: #535356;
        text-align: center;
        line-height: 400%;
        font-weight: 700;
        font-size:.5rem;
    }
    .sdc_buy_price{
        font-size:.9rem;
    }
    .sdc_buy_peisong{
        margin-top:-.2rem;
        font-size:.5rem;
        color:#999;
        transform: scale(.9);
        transform-origin: 0 0;
    }
    .sdc_buy_priceBox{
        padding:.2rem 0;
    }
    .sdc_buy_info{
        display: flex;
        justify-content: space-between;
        width: 100%;
        height:100%;
        padding-left:4rem;
        color:#fff;
    }
    .sdc_buy_num{
        position: absolute;
        right: 0;
        top: -.1rem;
        line-height: 1;
        background-image: -webkit-gradient(linear,right top,left top,from(#ff7416),color-stop(98%,#ff3c15));
        background-image: -webkit-linear-gradient(right,#ff7416,#ff3c15 98%);
        background-image: linear-gradient(-90deg,#ff7416,#ff3c15 98%);
        color: #fff;
        border-radius: .3rem;
        padding: .1rem .22rem;
        content: attr(attr-quantity);
        font-size: .5rem;
    }
    .sdc_buy_img{
        height:100%;
        background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNTggNTgiPjxkZWZzPjxmaWx0ZXIgaWQ9ImEiIHdpZHRoPSIyMDAlIiBoZWlnaHQ9IjIwMCUiIHg9Ii01MCUiIHk9Ii01MCUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCI+PGZlT2Zmc2V0IGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRPdXRlcjEiLz48ZmVHYXVzc2lhbkJsdXIgaW49InNoYWRvd09mZnNldE91dGVyMSIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIiBzdGREZXZpYXRpb249IjEuNSIvPjxmZUNvbG9yTWF0cml4IGluPSJzaGFkb3dCbHVyT3V0ZXIxIiByZXN1bHQ9InNoYWRvd01hdHJpeE91dGVyMSIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjA4IDAiLz48ZmVNZXJnZT48ZmVNZXJnZU5vZGUgaW49InNoYWRvd01hdHJpeE91dGVyMSIvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48cGF0aCBpZD0iYiIgZD0iTTcuNjE0IDQuMDUxYy0xLjA2Ni4wODYtMS40NTItLjM5OC0xLjc1Mi0xLjU4NEM1LjU2MiAxLjI4LjMzIDUuODguMzMgNS44OGwzLjcxIDE5LjQ3NmMwIC4xNDgtMS41NiA3LjUxNS0xLjU2IDcuNTE1LS40ODkgMi4xOS4yOTIgNC4yNyAzLjU2IDQuMzIgMCAwIDM2LjkxNy4wMTcgMzYuOTIuMDQ3IDEuOTc5LS4wMTIgMi45ODEtLjk5NSAzLjAxMy0zLjAzOS4wMy0yLjA0My0xLjA0NS0yLjk3OC0yLjk4Ny0yLjk5M0w4LjgzIDMxLjE5MnMuODYtMy44NjUgMS4wNzctMy44NjVjMCAwLTUuNzg4LjEyMiAzMi4wNjUtMS45NTYuNjA2LS4wMzMgMi4wMTgtLjc2NCAyLjI5OC0xLjg0OCAxLjExMy00LjMxNyA0LjAwOC0xMy4yNiA0LjQ1OC0xNS42NC45MzItNC45MjUgMi4wNjEtOC41NTgtNC4yOC03LjQwNSAwIDAtMzUuNzY4IDMuNDg3LTM2LjgzMyAzLjU3M3oiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWx0ZXI9InVybCgjYSkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMgMikiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUuMDM4IDcuODA4KSI+PG1hc2sgaWQ9ImMiIGZpbGw9IiNmZmYiPjx1c2UgeGxpbms6aHJlZj0iI2IiLz48L21hc2s+PHVzZSBmaWxsPSIjRkZGIiB4bGluazpocmVmPSIjYiIvPjxwYXRoIGZpbGw9IiMyMDczQzEiIGQ9Ik01My45NjIgNy43NzRsLTUuNzAxIDE5LjMwNS00MC43OCAxLjU3NHoiIG1hc2s9InVybCgjYykiIG9wYWNpdHk9Ii4xIi8+PC9nPjxwYXRoIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2Utd2lkdGg9IjYiIGQ9Ik05LjM3NCAxOC43MjJTNy44NjggMTEuMjgzIDcuMzIzIDguNzFDNi43NzggNi4xMzYgNS44NiA1LjMzIDMuOTc4IDQuNTIgMi4wOTYgMy43MTMuMzY3IDIuMjg2LjM2NyAyLjI4NiIvPjxjaXJjbGUgY3g9IjQ2IiBjeT0iNTEiIHI9IjQiIGZpbGw9IiNGRkYiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjUxIiByPSI0IiBmaWxsPSIjRkZGIi8+PC9nPjwvc3ZnPg==')no-repeat;
        background-size: 50% 50%;
        background-position: 50% 50%;
    }
    .sdc_buy_car{
        position: absolute;
        top:-.45rem;
        left:.65rem;
        width:2.5rem;
        height:2.5rem;
        border:5px solid #444;
        /* 3190e8 */
        background-image: radial-gradient(circle,#363636 1.05rem,#444 0);
        border-radius: 100%;
        box-shadow: 0 -.2rem .2rem 0 rgba(0,0,0,.1);

    }
    .sdc_buy_food{
        display: flex;
        flex-wrap: wrap;
        height:100%;
    }
    .sdc_buy_infoBox{
        position: relative;
        height:2.4rem;
        background-color: rgba(61,61,63,.9);
    }
    .sdc_buy_box{
        width: 100%;
        height:0;
        transition: all .3s;
    }
    .sdc_buy_tip{
        width: 100%;
        padding:.1rem 0;
        background-color: #fffad6;
        border-top: 1px solid #f9e8a3;
        text-align: center;
        font-size:.5rem;
    }
    .sdc_buy{
        position: fixed;
        bottom:0;
        left:0;
        width: 100%;
    }

    /* 右侧列表 */
    .sdc_right_item{
        display: flex;
        padding:.5rem;
        padding-left:0;
        border-bottom:1px solid #eee;
        min-height:5.5rem;
    }
    .sdc_foodPrice_num{
        position: absolute;
        top:.1rem;
        right:1.5rem;
        text-align: center;
        font-weight: normal;
        font-size:.7rem;
        color: #666;
    }
    .sdc_foodPrice_delete{
        position: absolute;
        top:.1rem;
        right:2.5rem;
        width:.9rem;
        height:.9rem;
    }
    .sdc_foodPrice_add{
        position: absolute;
        top:.1rem;
        right:0;
        width:.9rem;
        height:.9rem;
    }
    .sdc_price::before{
        font-weight: 400;
        content: "\A5";
        font-size: .32rem;
        margin-right: .1rem;
        display: inline-block;
    }
    .sdc_right_foodPrice{
        position: relative;
        color:#f60;
    }
    .sdc_right_foodInfo_sale{
        font-size:.5rem;
        color:#666;
    }
    .sdc_right_foodInfo_text{
        overflow: hidden;
        width:9rem;
        font-size:.5rem;
        color:#999;
        text-overflow: ellipsis;
        white-space: nowrap;
        transform: scale(.9);
        transform-origin: 0 0;
    }
    .sdc_right_foodInfo_title{
        margin-top:-.1rem;
        font-size:.75rem;
    }
    .sdc_right_foodInfo_info{
        width: 100%;
        min-height:3rem;
    }
    .sdc_right_foodInfo{
        flex: 1;
        margin-left:.5rem;
    }
    .sdc_right_foodImg{
        width: 3.8rem;
        height:3.8rem;
    }
    .sdc_right_titleText{
        flex: 1;
        overflow: hidden;
        margin-left:.3rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size:.5rem;
        color:#999;
    }
    .sdc_right_itemTitle{
        display: flex;
        width: 100%;
        padding:.3rem 0;
        border-bottom: .01rem solid #f6f6f6;
    }
    .sdc_right_list{
        list-style: none;
        width: 100%;
    }
    .sdc_right{
        overflow-y: auto;
        overflow-x: hidden;
        position: relative;
        width:100%;
        height:100%;
        padding:0 .5rem 70px;
        background-color: #fff;
    }

    /* 左侧导航 */
    .sdc_left_itemActive{
        color:#333;
        background-color: #fff;
    }
    .sdc_left_item{
        padding:.78rem .4rem;
        border-bottom:1px solid #e8e8e8;
    }
    .sdc_left{
        overflow-y: scroll;
        list-style: none;
        width: 5rem;
        height:100%;
        padding:0 0 70px;
        background: #f8f8f8;
        font-size:.65rem;
        color:#666;
    }
    .sdc_diancan_box{
        display: flex;
        height:100%;
    }
    .sdc_diancan{
        height:100%;
    }
</style>