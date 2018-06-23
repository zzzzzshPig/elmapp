<template>
    <div class="sf_search_foods">
        <search class="sf_search" @get_food="get_food"></search>
        <paixu class="sf_paixu" :peisongfs="peisongfs" :xiaofei="xiaofei" :huodong="huodong" :shangjia="shangjia" :food="food" @search_food="search_food"></paixu>
        <main class="px_foods">
            <section class="px_foods_item" :key="item.id" v-for="item in food">
                <div class="px_shop_title">
                    <img :src="find_img(item.restaurant.image_path)+'?imageMogr/format/webp/thumbnail/64x/'" alt="图片不见了" class="px_foods_titleImg"/>
                    <router-link :to="{path:'/shop',query:{id:item.restaurant.id}}" class="px_foods_shopInfo px_shopLink">
                        <div class="px_shopInfo_top">
                            <div class="px_shopInfoTop_name">
                                <span class="pinpai" v-if="item.restaurant.is_premium">品牌</span>
                                <span v-html="highLight_word(item.restaurant.name)"></span>
                            </div>
                            <div class="zhuanSong" v-if="item.restaurant.delivery_mode&&item.restaurant.delivery_mode.text">蜂鸟专送</div>
                        </div>
                        <div class="px_shopInfo_bottom">
                            <p class="px_bottom_qisong">
                                <span>评价{{item.restaurant.rating}}</span>
                                <span>起送费¥{{item.restaurant.float_minimum_order_amount}}</span>
                                <span>配送费¥{{item.restaurant.float_delivery_fee}}</span>
                            </p>
                            <div class="px_bottom_time">
                                <span class="px_shopinfo_km">{{distance(item.restaurant.distance)}}</span>
                                <span class="px_shopinfo_minute">{{item.restaurant.order_lead_time}}分钟</span>
                            </div>
                        </div>
                    </router-link>
                </div>
                <ul class="px_foods_food">
                    <router-link :to="{path:'/shop',query:{id:item.restaurant.id}}" class="px_foods_foodItem px_shopLink" :key="food.id" v-for="food in item.foods">
                        <img :src="find_img(food.image_path)+'?imageMogr/format/webp/thumbnail/128x/'" alt="图片不见了" class="px_foods_foodImg" />
                        <div class="px_foodItem_info">
                            <div class="px_foodItem_infoName" v-html="highLight_word(food.name)"></div>
                            <div class="px_foodItem_infoSale">月售{{food.month_sales}}份 好评率{{food.satisfy_rate}}%</div>
                            <div class="px_foodItem_infoPrice">¥{{food.price}}
                                <del class="px_foodItem_oldPrice" v-if="food.original_price&&food.activities[0]">¥{{food.original_price}}</del>
                                <span v-if="food.activities.length" :class="food.activities[0].icon_name=='折'?'zekou':'manjian'">{{food.activities[0].tips}}</span>
                            </div>
                        </div>
                    </router-link>
                </ul>
                <div class="px_foods_more" v-if="item.foods.length>2" v-on:click="showlist($event,item.foods.length-2)">展开更多的{{item.foods.length-2}}个 <span class="icon icon-down"></span></div>
            </section>
            <section class="px_saixuan_open" v-on:click='hidden_sub'></section>
            <div style="height:2rem;">
                <div class="wm_loading" v-if="loading"><img src="./img/loading.gif" alt="图片不见了" style="width:.8rem;height:.8rem;vertical-align: top;margin-right:0.3rem;"/>加载中...</div>
                <div class="wm_loading" v-if="notHave">没有更多了哦~</div>
            </div>
        </main>
    </div>
</template>

<script>
    import paixu from './paixu.vue'
    import search from './search.vue'
    export default{
        name:'search_foods',
        data(){
            return{
                offset:8,//搜索偏移，下一页的意思
                keyword:this.$route.query.keyword,
                food:[],
                showFoods:false,
                loading:false,//显示 等待
                notHave:false,//显示 没有信息
                peisongfs:[''],
                xiaofei:[''],
                huodong:[''],
                shangjia:[],
            }
        },
        mounted(){
            $(()=>{
                let box = $('.px_foods');

                box.scroll(()=>{
                    let height = Math.floor(box[0].scrollHeight - box.height());
                    if(box.scrollTop()==height||box.scrollTop()>=height-1){//滑动到底部
                        this.search_food(this.peisongfs,this.xiaofei,this.huodong,this.shangjia);
                    }
                });
            });//滚动相关事件

            //设置食物列表高度
            $('.px_foods').height($(window).height()-$('.sf_paixu').innerHeight()-$('.sc_search').innerHeight())
        },
        methods:{
            get_food(food){
                this.food = food;
            },
            search_food(peisongfs,xiaofei,huodong,shangjia,clear){
                if(clear){
                    this.food = [];
                    this.offset = 0
                }

                this.notHave = false;
                this.loading = true;
                $.get('/search',{
                    keyword:this.keyword,
                    offset:this.offset,
                    peisong:peisongfs,
                    xiaofei:xiaofei,
                    huodong:huodong,
                    shangjia:shangjia,
                    lat:$.cookie('lat'),
                    lit:$.cookie('lit'),
                },data=>{
                    //获取第一个key的value 当搜索的店铺没有时候或者很少的时候 会有推荐食物，这里只取搜索的物品，也就是第一个，当用户输入为无结果时候 显示推荐店铺
                    let chunk = data['0']||data['1']||data['3'];
                    console.log(data);

                    //当chunk存在的时候，也就是返回有数据时才填充数据 否则就出现 没有更多的信息 的提示
                    if(chunk){
                        let length = chunk.restaurant_with_foods.length;
                        for(let i = 0;i<length;i++){
                            this.food.push(chunk.restaurant_with_foods[i]);
                        }
                        this.loading = false;
                        this.offset += 8;
                    }else{
                        this.loading = false;
                        this.notHave = true;
                    }
                });
            }, //搜索关键字的食物
            hidden_sub(){
                //如果被打开了就 隐藏
                if(this.show_sub.open){
                    this.show_sub.open.css('visibility','hidden');
                    this.show_sub.parent.css('overflow-y','scroll');

                    this.show_sub.shaixuan_sub.css({
                        opacity:'0',
                        height:'0',
                    });
                    this.show_sub.paixu_sub.css({
                        opacity:'0',
                        height:'0',
                    })
                }
            },// 隐藏 被打开的 筛选或排序 动画为height和opacity
            distance(km){
                return km>1000?(km/1000).toFixed(2)+'km':km+'m';
            },//将M转化为KM，只对 1K 以上有效
            find_img(String_path){
                let path = String_path+'';
                let format = path.match(/(jpeg|png|jpg|bmp)/)[0];
                return `https://fuss10.elemecdn.com/${path.slice(0,1)}/${path.slice(1,3)}/${path.slice(3)}.${format}`;
            },//将返回的img路径改为有效的img路径  967284af9fb1b499192d2476648c3ccfjpeg  需要转化为 https://fuss10.elemecdn.com/9/67/284af9fb1b499192d2476648c3ccfjpeg.jpeg
            highLight_word(text){
                return text.split(this.keyword).join(`<span style="color:#118dff;">${this.keyword}</span>`);
            },//高亮显示的字，搜索关键字
            showlist(e,num){
                //获取点击 dom
                let target = $(e.currentTarget);
                //获取点击dom的上一个同级元素  也就是 ul
                let list = target.prev();

                //如果是隐藏的 则高度限制取消，显示所有  否则就隐藏
                if(list.css('maxHeight')=='none'){
                    list.css('maxHeight','9rem');
                    target.html('展开更多的'+num+'个 <span class="icon icon-down"></span>');
                }else{
                    list.css('maxHeight','none');
                    target.html('收起 <span class="icon icon-up"></span>');
                }
            },//显示更多食物
        },
        components:{
            paixu,
            search
        }
    }

</script>

<style scoped>
    /* 加载中 */
    .wm_loading{
        width: 100%;
        padding:.6rem 0;
        text-align: center;
        font-size:.5rem;
        color: #666;
    }

    /* 全局样式 */
    .zekou{
        background: linear-gradient(-135deg, rgb(255, 130, 45) 0%, rgb(255, 42, 0) 100%); color: rgb(255, 255, 255);
        height:.9rem;
        padding:0 .1rem;
        line-height: .9rem;
        font-size:.5rem;
        transform: scale(.9);
    }
    .manjian{
        height:.9rem;
        padding:0 .1rem;
        border:.01rem solid rgb(240, 115, 115);
        line-height: .9rem;
        font-size:.5rem;
        color:rgb(240, 115, 115);
        transform: scale(.9);
    }
    .pinpai{
        padding:.05rem .1rem;
        background:linear-gradient(-139deg,#fff100,#ffe339);
        font-weight: 700;
        font-size: .5rem;
        text-align: center;
        white-space: nowrap;
        color:#6f3f15;
        border-radius: .12rem;
    }
    .px_shopLink{
        color: #444444;
        text-decoration: none;
    }

    /* 主体内容 */
    .px_foods{
        overflow-y: scroll;
        position: relative;
        height:100%;
        background: #fff;
        transition: background .3s;
    }
    .px_foods_item{
        font-size:.5rem;
    }
    .px_shop_title{
        display: flex;
        align-items: center;
        height:3.3rem;
        padding:0 .8rem;
        border-bottom:.01rem solid #f6f6f6;
    }
    .px_foods_titleImg{
        width:1.9rem;
        height:1.9rem;
    }
    .px_foods_shopInfo{
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        width:100%;
        margin-left: .3rem;
    }
    .px_shopInfo_top{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        width:100%;
    }
    .px_shopInfoTop_name{
        font-size:.7rem;
    }
    .px_shopInfo_bottom{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        width:100%;
    }
    .px_bottom_time{
        transform:scale(.9);
    }
    .px_bottom_time span+span:before{
        content: '|';
        margin-right:.16rem;
    }
    .px_bottom_qisong{
        display: flex;
        text-align: left;
        margin-left:-.34rem;
        transform: scale(.9);
    }
    .px_bottom_qisong span+span:before{
        margin:0 .13rem 0 0;
        color: #ddd;
        content: "|";
    }
    .px_foods_food{
        overflow: hidden;
        list-style: none;
        max-height:9rem;
        padding:0 .8rem;
    }
    .px_foods_foodItem{
        display: flex;
        align-items: center;
        height:4.5rem;
        padding:.7rem 0;
        border-bottom:.01rem solid #f6f6f6;
    }
    .px_foods_foodImg{
        width:3rem;
        height:3rem;
        margin-right:.6rem;
    }
    .px_foodItem_info{
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        width: 80%;
        height:3.4rem;
    }
    .px_foodItem_infoName{
        width: 100%;
        font-size:.7rem;
    }
    .px_foodItem_infoSale{
        width: 100%;
        color:#666;
    }
    .px_foodItem_infoPrice{
        display: flex;
        align-items: center;
        width: 100%;
        font-size: .75rem;
        color:#ff5339;
    }
    .px_foodItem_oldPrice{
        display:block;
        margin-top:.1rem;
        color:#999;
        transform:scale(.8);
    }
    .px_foods_more{
        padding:.6rem 0;
        text-align: center;
    }

    /* 整体布局 */
    .sf_search_foods{
        z-index:99;
        position: relative;
        overflow: hidden;
        width:100%;
        height:100%;
        background: #fff;
    }

    .sf_search{
        background: #fff;
    }
</style>