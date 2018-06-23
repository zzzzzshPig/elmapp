<template>
    <div class="wm_waimai">
        <header class="wm_users_info">
            <div class="wm_info_item1" v-on:click="show_address">
                <div style="width: 0.7rem;"><img src="./img/address.png" alt="图片不见啦"/></div>
                <div class="wm_info_address">{{address}}</div>
                <div style="width:0.6rem;"><img src="./img/down.png" alt="图片不见啦"/></div>
            </div>
            <aside class="wm_info_item2">
                <div class="wm_info_item2_info">
                    <p class="wm_info_deg">3°</p>
                    <p class="wm_info_weather">晴天</p>
                </div>
                <img style="width:1.5rem;height:1.5rem;" src="./img/sun.png" alt="图片不见啦"/>
            </aside>
        </header>
        <div class="wm_search">
            <router-link to="/search"   class="wm_search_input">
                <span class="icon icon-search" style="font-size:0.7rem;color:#666;"></span>
                <span style="font-size:0.7rem;font-weight: 700;color:#666;margin-left:0.2rem;">搜索商家、商品名称</span>
            </router-link>
        </div>
        <div class="wm_keywords_box" style="overflow: hidden;">
            <div class="wm_keywords">
                <router-link :to="{path:'/searchfoods',query:{keyword:tuijian.text}}"  class="wm_keywords_item" :key="tuijian.id"  v-for="tuijian in tuijians">{{tuijian.text}}</router-link>
            </div>
        </div>
        <div class="swiper-container wm_swipe" id="swipe">
            <div class="swiper-wrapper wm_food_swipe">
                <div class="swiper-slide wm_food">
                    <div class="wm_food_row">
                        <router-link  :to="{path:'/fenlei',query:{name:item.name,restaurant_category_id:item.link}}" class="wm_food_index" :key="item.id" v-for="item,index in foods1">
                            <div class="wm_foodImg_box">
                                <img :src="find_img(item.image_hash)+'?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/'" alt="图片不见了"/>
                            </div>
                            <p>{{item.name}}</p>
                        </router-link>
                    </div>
                </div>
                <div class="swiper-slide wm_food" v-if="foods2.length">
                    <div class="wm_food_row">
                        <router-link  :to="{path:'/fenlei',query:{name:item.name,restaurant_category_id:item.link}}" class="wm_food_index" :key="item.id" v-for="item,index in foods2">
                            <div class="wm_foodImg_box">
                                <img :src="find_img(item.image_hash)+'?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/'" alt="图片不见了"/>
                            </div>
                            <p>{{item.name}}</p>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="swiper-pagination" v-if="foods2.length"></div>
        </div>
        <div class="wm_shoplist-title">推荐商家</div>
        <fenlei_food :shopInfos="shopinfos" :loading="loading" :notHave="notHave"></fenlei_food>
        <div style="height:2.5rem;"></div>
        <f_nav :index_i="0"></f_nav>
        <wma_address class="wm_address" @dingwei="dingwei" :p_address="address"></wma_address>
    </div>
</template>

<script>
    import f_nav from './nav.vue';
    import Swiper from '../../static/swiper-4.1.0.min.js'
    import fenlei_food from './fenlei_food.vue'
    import wma_address from './waimai_address.vue'
    import cookie from '../../static/cookie.js'

    export default {
        name: 'wm_waimai',
        data(){
            return {
                address:'加载中...',
                tuijians:[],
                foods1:[],
                foods2:[],
                shopinfos:[],
                offset:0,
                loading:false,
                notHave:false,
                lat:'',
                lit:'',
            }
        },
        mounted(){
            let delay = Date.now();

            this.dingwei();
            //滚动相关事件
            $(()=>{
                let search = $('.wm_search');
                let box = $('.wm_waimai');
                let searchTop = search.offset().top;

                box.scroll(()=>{
                    let scrollTop = box.scrollTop();
                    if(scrollTop>=(box[0].scrollHeight-box.height())-2){
                        this.loadShop();
                    }

                    if(scrollTop>=searchTop){
                        search.addClass('wm_search_scroll');
                    }else{
                        search.removeClass('wm_search_scroll');
                    }
                })
            })
        },
        methods:{
            find_img(String_path){
                let path = String_path+'';
                let format = path.match(/(jpeg|png|jpg|bmp)/)[0];
                return `https://fuss10.elemecdn.com/${path.slice(0,1)}/${path.slice(1,3)}/${path.slice(3)}.${format}`;
            },//将返回的img路径改为有效的img路径  967284af9fb1b499192d2476648c3ccfjpeg  需要转化为 https://fuss10.elemecdn.com/9/67/284af9fb1b499192d2476648c3ccfjpeg.jpeg
            loadShop(clear){
                this.loading = true;
                this.notHave = false;
                if(clear){
                    this.offset=0;
                    this.shopinfos = [];
                }

                $.get('/shop',{
                    lat:this.lat,
                    lit:this.lit,
                    offset:this.offset,
                },data=>{
                    this.shopinfos = this.shopinfos.concat(data.items);
                    if(!data.items.length){
                        this.notHave = true;
                    }
                    this.loading = false;
                    this.offset+=8;
                });
            },//获取附近店铺信息
            show_address(){
                $('.wm_waimai').css('overflowY','hidden');
                let dom = $('.wm_address');
                dom.css('display','block');
                dom.removeClass('slideOutRight');
                dom.addClass('animated slideInRight');
            },//显示收货地址
            dingwei(clear){
                let callback = ()=>{
                    $.cookie('lat',this.lat);
                    $.cookie('lit',this.lit);
                    $.cookie('address',this.address);

                    //获取推荐列表
                    $.get('/tuijian',data=>{
                        //暂时性死区
                        let randomArr=()=>{
                            //取10随机数
                            let arr = [];
                            for(let Arri = 0;Arri<10;Arri++){
                                //取 0 - 18之间的值 因为只有18个参数 取不到18
                                let num = Math.floor(Math.random()*data.length);

                                //找得到元素就重新找  找不到就添加进数组
                                !(arr.indexOf(num)+1)?arr.push(num):Arri--;
                            }

                            //取随机数下标的值
                            let arr1 = [];
                            arr.map(item=>{
                                arr1.push(data[item])
                            });

                            this.tuijians = arr1;
                        };

                        if(!(data === 'err'))
                        {
                            randomArr();
                        }
                    });
                    //获取食品分类列表
                    $.get('/fenlei',{
                        lat:this.lat,
                        lit:this.lit
                    },data=>{
                        this.foods1 = data[0].entries.splice(0,8);
                        this.foods2 = data[0].entries;
                        this.$nextTick(function(){
                            //滑动插件
                            let swipe = $('#swipe');
                            if(swipe.length){
                                new Swiper(swipe, {
                                    loop : true,
                                    pagination: {
                                        el: '.swiper-pagination',
                                        bulletActiveClass : 'my-bullet-active',
                                    },
                                });
                            }
                        })
                    });

                    this.loadShop(clear);
                };

                if(!$.cookie('lat')){
                    let lat_lit = new Promise((res,rej)=>{
                        //获取城市信息 http://cangdu.org:8001/v1/cities?type=guess 可以获取所在城市经纬度
                        $.get('http://cangdu.org:8001/v1/cities?type=guess',data=>{
                            res(data);
                        });

                        //定位两秒还没有反映的话就执行默认定位
                        setTimeout(()=>{
                            rej();
                        },2000)
                    });//获取经纬度

                    let address = data=>{
                        this.lat = data.latitude;//纬度
                        this.lit = data.longitude;//经度
                        return new Promise((res,rej)=>{
                            // 根据经纬度详细定位具体位置  http://cangdu.org:8001/v2/pois/31.22967,121.4762
                            $.get('http://cangdu.org:8001/v2/pois/'+data.latitude+','+data.longitude,data2=>{
                                if(data2.message=='获取数据失败'){
                                    rej();
                                }else{
                                    res(data2);
                                }
                            });
                        });
                    };//获取详细地址

                    lat_lit.then(address).then(data=>{
                        this.address = data.name;
                        callback();
                    },()=>{
                        this.address = '鄂城区鄂州市统计局(沿湖路东)';
                        callback();
                    });

                    lat_lit.catch(()=>{
                        this.lat = '30.39085';//纬度
                        this.lit = '114.89495';//经度
                        this.address = '鄂城区鄂州市统计局(沿湖路东)';
                        callback();
                    });
                }else{
                    this.lat = $.cookie('lat');
                    this.lit = $.cookie('lit');
                    this.address = $.cookie('address');
                    callback();
                }
            }
        },
        components:{
            f_nav,
            fenlei_food,
            wma_address
        }
    }
</script>
<style>
    .my-bullet-active{
        background: #7c7c7c !important;
    }
</style>
<style src="../../static/swiper-4.1.0.min.css"></style>
<style scoped>
    /* 全局 */
    .wm_waimai{
        position:relative;
        overflow-y: scroll;
        overflow-x: hidden;
        height:100%;
    }

    /* 收货地址 */
    .wm_address{
        display: none;
        animation-duration: .3s;
    }

    /* 位置信息和天气信息 */
    .wm_users_info{
        display: flex;
        padding:0.5rem 0.7rem 0;
        background: linear-gradient(90deg,#0af,#0085ff);
        justify-content:space-between;
    }
    .wm_info_item1{
        display: flex;
        width:60%;
        align-items: center;
    }
    .wm_info_address{
        overflow: hidden;
        margin:0 0.1rem;
        max-width:80%;
        font-weight:700;
        color:#fff;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .wm_info_item2{
        display: flex;
        align-items: center;
    }
    .wm_info_item2_info{
        display: flex;
        flex-flow: column nowrap;
        text-align: right;
    }
    .wm_info_deg{
        font-weight: normal;
        font-size:0.7rem;
        color:#fff;
    }
    .wm_info_weather{
        font-size:0.3rem;
        color:#fff;
    }

    /* 搜索框 */
    .wm_search{
        position: absolute;
        top:2.2rem;
        width: 100%;
        padding:0.4rem 0.8rem;
        background: linear-gradient(90deg,#0af,#0085ff);
    }
    .wm_search_scroll{
        z-index:99;
        position: fixed;
        top:0;
        left:0;
        width:100%;
    }
    .wm_search_input{
        display: flex;
        justify-content:center;
        align-items: center;
        height:2.1em;
        background:#fff;
        border-radius: 0.05rem;
    }

    /* 推荐关键字 */
    .wm_keywords_box{
        height:1rem;
        padding:2.4rem 0.8rem 1.7rem;
        background: linear-gradient(90deg,#0af,#0085ff);
    }
    .wm_keywords{
        overflow-x: auto;
        padding:0 0 2rem;
        text-align: center;
        white-space: nowrap;
    }
    .wm_keywords_item{
        margin-right:.8rem;
        font-size:.5rem;
        color:#fff;
    }

    /* 商品分类 */
    .wm_swipe{
        width: 100%;
        height:9.5rem;
        padding-left:.3rem;
        padding-right:.3rem;
        background: #fff;
    }
    .wm_food{
        margin:0;
    }
    .wm_food_row{
        display: flex;
        flex-wrap: wrap;
    }
    .wm_food_index{
        width:25%;
        height:3.4rem;
        margin-top:0.5rem;
        text-align: center;
    }
    .wm_foodImg_box{
        display: inline-block;
        width:2.3rem;
        height:2.3rem;
    }
    .wm_food_index p{
        line-height:0.56;
        font-size:0.6rem;
        color:#666;
    }

    /* 推荐商家 */
    .wm_shoplist-title{
        display: flex;
        justify-content: center;
        align-items: center;
        width:100%;
        margin-top:.4rem;
        padding:.4rem 0;
        background: #fff;
        text-align: center;
        font-size:.75rem;
    }
    .wm_shoplist-title::before{
        display: block;
        content: "";
        width: 1rem;
        height: .1rem;
        margin-right: .6rem;
        background-color: #999;
        box-sizing: inherit;
        -webkit-tap-highlight-color: transparent;
    }
    .wm_shoplist-title::after{
        display: block;
        content: "";
        width: 1rem;
        height: .1rem;
        margin-left: .6rem;
        background-color: #999;
        box-sizing: inherit;
        -webkit-tap-highlight-color: transparent;
    }

</style>
