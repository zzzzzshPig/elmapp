<template>
    <div class="sv_shopview">
        <div class="sv_content" v-if="showpage">
            <div :key="item.id" v-for='item in resData' class="sv_header">
                <header class="sv_shophead_box" :style="'background-image:url('+find_img(item.image_path)+'?imageMogr/format/webp/thumbnail/!40p/blur/50x40/)'">
                    <span class="icon icon-left sv_shophead_back"  v-on:click="back"></span>
                    <img :src="find_img(item.image_path)+'?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/'" alt="图片不见了" class="sv_shophead_shopimg"/>
                </header>
                <div class="sv_shopinfo_box" v-on:click="show_shopInfo">
                    <div  class="sv_shopinfo_shopName">
                        <h3 class="sv_shopName_name">
                            <span class="pinpai" v-if="item.is_premium">品牌</span>{{item.name}}
                        </h3>
                        <p class="icon icon-caret sv_shopName_icon"></p>
                    </div>
                    <div class="sv_shopinfo_shuxing">
                        <span>{{item.rating}}</span>
                        <span>月售{{item.recent_order_num}}单</span>
                        <span>{{item.delivery_mode.text}} <i style="font-style:normal" v-if="item.order_lead_time">约{{item.order_lead_time}}分钟</i></span>
                        <span>距离{{distance(item.distance)}}</span>
                    </div>
                    <div class="sv_shopinfo_info">{{item.promotion_info||'欢迎光临，用餐高峰期请提前下单，谢谢。'}}</div>
                </div>
                <div class="sv_shopinfo_huodong" v-if="item.activities.length" v-on:click="show_huodong">
                    <div class="sv_huodong_text">
                        <span class="sv_shopinfo_qianzui" :style="iconColor((item.activities[1]&&item.activities[1].icon_color)||item.activities[0].icon_color)">{{(item.activities[1]&&item.activities[1].icon_name)||item.activities[0].icon_name}}</span>{{(item.activities[1]&&item.activities[1].tips)||item.activities[0].tips}}
                    </div>
                    <div class="sv_huodong_num">
                        <span>{{item.activities.length}}个优惠</span>
                        <span class="icon icon-caret" style="transform: scale(.7)"></span>
                    </div>
                </div>
                <div class="sv_show_box" v-show="show_huodongList" v-on:click="show_huodong">
                    <div class="sv_huodongList" v-on:click="show_huodong">
                        <div class="sv_huodongList_close" v-on:click="show_huodong">
                            <svg style="width:100%;height:100%;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1552" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z" p-id="1553"></path></svg>
                        </div>
                        <h3 style="text-align: center">优惠活动</h3>
                        <ul class="sv_huodongList_itemBox">
                            <li class="sv_huodongList_item"  :key="activity.id"  v-for="activity in item.activities">
                                <span class="sv_huodongList_qianzui" :style="'background-color:#'+activity.icon_color">{{activity.icon_name}}</span>{{activity.tips}}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="sv_show_box" v-show="show_shop" v-on:click="show_shopInfo">
                    <div class="sv_showInfo" v-on:click="show_shopInfo">
                        <h2 style="text-align: center;">{{item.name}}</h2>
                        <ul class="sv_showInfo_info">
                            <li>{{item.rating}} <p>评分</p></li>
                            <li>{{item.recent_order_num}} <p>月售</p></li>
                            <li>{{item.delivery_mode.text}} <p>约{{item.order_lead_time}}分钟</p></li>
                            <li>{{item.float_delivery_fee}}元 <p>配送费</p></li>
                            <li>{{item.distance}} <p>距离</p></li>
                        </ul>
                        <h3><span>公告</span></h3>
                        <p style="font-size:.7rem;">为了便于店家配送，保证您的及时用餐，请您填写详细的街道和楼栋地址，,理解万岁！如有问题需与商家交流，请点击订单右上角的电话符号，拨打该电话号码与店家直接沟通！</p>
                    </div>
                    <div class="sv_showInfo_close" v-on:click="show_shopInfo"></div>
                </div>
            </div>
            <div class="sv_shopMain_btn" v-on:click="show_main">
                <div class="sv_shopMain_diancan"><div class="sv_shopMain_click">点餐</div></div>
                <div class="sv_shopMain_pingjia"><div>评价</div></div>
                <div class="sv_shopMain_shangjia"><div>商家</div></div>
            </div>
            <div class="sv_shopMain_main">
                <shangjia class="sv_main_shangjia" v-show="show_shangjia" :data="resData"></shangjia>
                <pingjia  class="sv_main_pingjia" :scores="scores" :tags="tags" v-show="show_pingjia" ></pingjia>
                <diancan class="sv_main_diancan" :menu="menu" :resData="resData" v-show="show_diancan" ></diancan>
            </div>
        </div>
    </div>
</template>

<script>

    import shangjia from './shop_shangjia.vue';
    import pingjia from './shop_pingjia.vue';
    import diancan from './shop_diancan.vue';
    import animate from 'animate.css';

    export default{
        name:'shopview',
        data(){
            return{
                showpage:false,
                resData:[],
                show_huodongList:false,
                show_shop:false,
                show_diancan:true,
                show_pingjia:false,
                show_shangjia:false,
                scores:[],
                tags:[],
                menu:[],
            }
        },
        mounted(){

            if(!this.$route.query.id){
                this.$router.push('/not_found');
                return false;
            }

            let user_id = localStorage.getItem('user_id');
            let sid = '';
            let id = '';

            if(user_id) {
                id=user_id.split(';')[0].split('=')[1];
                sid = user_id.split('SID=')[1].split(';')[0];
            }
            $.get('/restaurant_food',{
                id:this.$route.query.id,
                sid:sid,
                user_id:id,
            },data=>{
                data.map(item=>{
                    item.foods.map(f_item=>{
                        f_item.sdc_num = 0;
                    })
                });
                this.menu = data;
            });

            this.searchRes(this.$route.query.id);

            //请求 综合评价
            $.get('/rating/scores',{
                id:this.$route.query.id
            },data=>{
                this.scores.push(data);
            });

            //请求评价标签
            $.get('/rating/tags',{
                id:this.$route.query.id
            },data=>{
                this.tags = data;
            });
            //请求餐馆食物
        },
        methods:{
            back(){
                window.history.back();
            },//返回上一步
            show_main(event){
                let target = $(event.target);
                $('.sv_shopMain_btn').find('.sv_shopMain_click').removeClass('sv_shopMain_click');
                if(target.text()=='点餐'){
                    this.show_diancan = true;
                    this.show_pingjia = false;
                    this.show_shangjia = false;
                    $('.sv_shopMain_diancan').find('div').addClass('sv_shopMain_click');
                }else if(target.text()=='评价'){
                    this.show_diancan = false;
                    this.show_pingjia = true;
                    this.show_shangjia = false;
                    $('.sv_shopMain_pingjia').find('div').addClass('sv_shopMain_click');
                }else if(target.text()=='商家'){
                    this.show_diancan = false;
                    this.show_pingjia = false;
                    this.show_shangjia = true;
                    $('.sv_shopMain_shangjia').find('div').addClass('sv_shopMain_click');
                }
            },//根据点击显示不同组件
            searchRes(id){
                $.get('/restaurant',{
                    id:id,
                },data=>{
                    if(data.message!="餐厅不存在"){
                        this.showpage = true;
                    }
                    this.resData[0] = data;
                });
            },//搜索餐馆信息
            find_img(String_path){
                let path = String_path+'';
                let format = path.match(/(jpeg|png|jpg|bmp)/)[0];
                return `https://fuss10.elemecdn.com/${path.slice(0,1)}/${path.slice(1,3)}/${path.slice(3)}.${format}`;
            },//将返回的img路径改为有效的img路径  967284af9fb1b499192d2476648c3ccfjpeg  需要转化为 https://fuss10.elemecdn.com/9/67/284af9fb1b499192d2476648c3ccfjpeg.jpeg
            iconColor(color){
                return 'background-color:#'+color;
            },//返回background颜色
            show_huodong(e){
                let list = $('.sv_huodongList');
                let target = $(e.currentTarget);
                e.stopPropagation();
                if(!target.hasClass('sv_huodongList'))
                {
                    if(this.show_huodongList){
                        list.removeClass('bounceInUp');
                        list.addClass('animated bounceOutDown').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', ()=>{
                            if(list.hasClass('bounceOutDown'))
                            {
                                this.show_huodongList = false;
                                list.removeClass('animated bounceOutDown');
                                $('.sv_shopview').css('overflow','');
                            }
                        });
                    }else{
                        $('.sv_shopview').css('overflow','hidden');
                        this.show_huodongList = true;
                        list.addClass('animated bounceInUp');
                    }
                }
            },//显示和隐藏活动栏
            show_shopInfo(e){
                let list = $('.sv_showInfo');
                let target = $(e.currentTarget);
                e.stopPropagation();
                if(!target.hasClass('sv_showInfo'))
                {
                    if(this.show_shop){
                        list.removeClass('zoomIn');
                        list.addClass('animated zoomOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', ()=>{
                            if(list.hasClass('zoomOut'))
                            {
                                this.show_shop = false;
                                $('.sv_shopview').css('overflow','');
                                list.removeClass('animated zoomOut');
                            }
                        });
                    }else{
                        $('.sv_shopview').css('overflow','hidden');
                        this.show_shop = true;
                        list.addClass('animated zoomIn');
                        list.removeClass('zoomOut');
                    }
                }
            },//显示隐藏商家信息
            distance(km){
                return km>1000?(km/1000).toFixed(2)+'km':km+'m';
            },//将M转化为KM，只对 1K 以上有效
        },
        components:{
            shangjia,
            pingjia,
            diancan,
        },
        created(){
        }
    }

</script>

<style scoped>
    /* 全局样式 */
    .pinpai{
        margin-right:.3rem;
        padding:.05rem .15rem;
        background:linear-gradient(-139deg,#fff100,#ffe339);
        font-weight: 700;
        font-size: .6rem;
        text-align: center;
        white-space: nowrap;
        color:#6f3f15;
        border-radius: .12rem;
    }

    /* 商家信息显示框 */
    .sv_showInfo>h3{
        position: relative;
        width: 4rem;
        margin:1rem auto .4rem;
        background-image: linear-gradient(90deg,#fff,#333 50%,#fff);
        background-size: 100% 1px;
        background-repeat: no-repeat;
        background-position: 50%;
        text-align: center;
        font-weight: normal;
        font-size:.6rem;
        color:#999;
    }
    .sv_showInfo>h3>span{
        position: relative;
        background: #fff;
        padding:0 .1rem;
    }
    .sv_showInfo_info>li{
        width:20%;
        text-align: center;
    }
    .sv_showInfo_info>li>p{
        font-weight: normal;
        font-size: .5rem;
        color:#999;
    }
    .sv_showInfo_info{
        display: flex;
        list-style: none;
        margin: .5rem -1rem 0;
        font-weight: bold;
        font-size: .78rem;
    }
    .sv_showInfo_close{
        width:1.5rem;
        height:1.5rem;
        margin:1.5rem auto 0;
        background-image: url('https://fuss10.elemecdn.com/8/ba/bcfa8cc62b20e044bd2ea1c1c7f3dpng.png?imageMogr/format/webp/');
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .sv_showInfo{
        position: relative;
        width:94%;
        margin-top:8.8rem;
        margin-left:3%;
        padding:1rem 1.2rem;
        background-color:#fff;
        border-radius: .2rem;
        animation-duration:.5s;
    }

    /* 优惠活动显示框 */
    .sv_huodongList_item{
        margin-top:.54rem;
    }
    .sv_huodongList_qianzui{
        margin-right: .3rem;
        padding:.05rem .3rem;
        color:#fff;
        border-radius: .1rem;
    }
    .sv_huodongList_itemBox{
        list-style: none;
        margin-top:.6rem;
        font-size:.65rem;
    }
    .sv_huodongList_close{
        position: absolute;
        top:.6rem;
        right:.6rem;
        width:1.3rem;
        height:1.3rem;
    }
    .sv_show_box{
        overflow: hidden;
        z-index:99;
        position: fixed;
        top:0;
        left:0;
        width: 100%;
        height:100%;
        background-color: rgba(0,0,0,.5);
    }
    .sv_huodongList{
        position: absolute;
        bottom:0;
        left:0;
        width: 100%;
        padding:1rem 1.3rem 3.7rem;
        background-color: #f5f5f5;
        animation-duration:1s;
    }

    /* 食物菜单 */
    .sv_shopMain_click{
        border-bottom: .1rem solid #00b0ff;
        font-weight: bold;
        color:#333;
    }
    .sv_shopMain_btn{
        position: relative;
        display: flex;
        align-items: flex-end;
        width:100%;
        height:2rem;
        background: #fff;
        border-bottom:1px solid #f6f6f6;
        font-size: .7rem;
        color:#666;
    }
    .sv_shopMain_btnFixed{
        z-index:99;
        position: fixed;
        top:0;
        left:0;
        margin-top:0;
    }
    .sv_shopMain_btn>div{
        display: flex;
        align-items: flex-end;
        justify-content: center;
        width:100%;
        height:100%;
        text-align: center;
    }
    .sv_shopMain_btn>div>div{
        height:1.5rem;
    }
    .sv_shopMain_main{
        height:32rem;
    }

    /* 商家信息 */
    .sv_huodong_num{
        display: flex;
    }
    .sv_shopinfo_qianzui{
        margin-right:.2rem;
        padding:0 .2rem;
        color:#fff;
        box-shadow: 0 0 .1rem;
        border-radius: .05rem;
    }
    .sv_huodong_text{
        overflow: hidden;
        flex: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .sv_shopinfo_huodong{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin:-.1rem 1.2rem 0;
        padding:.2rem .4rem;
        border:1px solid #f6f6f6;
        font-size:.5rem;
    }
    .sv_shopinfo_info{
        overflow: hidden;
        display: inline-block;
        width: 11rem;
        margin:.27rem 0;
        font-size:.5rem;
        color:#999;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .sv_shopName_icon{
        width:1rem;
        font-size:.6rem;
        transform: rotate(-90deg);
    }
    .sv_shopName_name{
        overflow: hidden;
        display: flex;
        align-items: center;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .sv_shopinfo_shopName{
        display: flex;
        justify-content: center;
        align-items:center;
    }
    .sv_shopinfo_shuxing span+span:before{
        content: " \B7 ";
        opacity: .2;
    }
    .sv_shopinfo_shuxing{
        overflow: hidden;
        font-size:.5rem;
    }
    .sv_shopinfo_box{
        padding:1.43rem .8rem 0;
        text-align: center;
    }

    /* 头部信息 */
    .sv_header{
        padding-bottom:.8rem;
    }
    .sv_shophead_shopimg{
        position: relative;
        width: 3.2rem;
        height:3.2rem;
        margin-top:1.2rem;
        border-radius:.1rem;
        box-shadow: 0 0 .1rem 0 rgba(0,0,0,.2);
    }
    .sv_shophead_back{
        position: absolute;
        top:.2rem;
        left:.62rem;
        font-weight: bold;
        color:#fff;
    }
    .sv_shophead_box{
        position: relative;
        height:3.4rem;
        background-size: cover;
        text-align: center;
    }
    .sv_shophead_box::before{
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color:  rgba(119,103,137,.43);
    }

    /* 整体布局 */
    .sv_shopview{
        z-index:99;
        position: relative;
        overflow-x: hidden;
        width:100%;
        height:100%;
        background: #fff;
    }
    .sv_content{
        overflow-y: auto;
        width:100%;
        height:100%;
        padding-right:1rem;
        box-sizing: content-box;
    }

</style>