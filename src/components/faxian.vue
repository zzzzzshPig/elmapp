<template>
    <div class="faxian" v-if="discover">
        <h_header class="fx_h_header" :title="'发现'"></h_header>
        <main class="fx_main">
            <section class="fx_main_one">
                <a :href="get_link(item.content_url)" class="fx_main_one_item" v-for="item in discover[1].slice(0,3)">
                    <div class="fx_main_one_titleBox">
                        <p class="fx_main_one_title" :style="'color:'+item.title_color">{{item.title}}</p>
                        <p class="fx_main_one_text">{{item.subtitle}}</p>
                    </div>
                    <img class="fx_main_one_img" :src="find_img(item.main_pic_hash)+'?imageMogr/format/webp/'" alt="图片不见了"/>
                </a>
                <div class="fx_main_one_itemsBox">
                    <a :href="get_link(item.content_url)" class="fx_main_one_items" :key="item.id" v-for="item in discover[1].slice(3)">
                        <div class="fx_main_one_titleBox">
                            <p class="fx_main_one_title" :style="'color:'+item.title_color">{{item.title}}</p>
                            <p class="fx_main_one_text">{{item.subtitle}}</p>
                        </div>
                        <img class="fx_main_one_img" :src="find_img(item.main_pic_hash)+'?imageMogr/format/webp/'" alt="图片不见了"/>
                    </a>
                </div>
            </section>
            <a v-if="discover[2].length" :href="discover[2][0].content_url" class="fx_main_two">
                <img :src="find_img(discover[2][0].sub_pic_hash)+'?imageMogr/format/webp/'" alt="图片不见了"/>
            </a>

            <router-link to="/faxian/tuijian" class="fx_main_list">
                <div class="fx_main_list_top">
                    <span class="fx_main_list_icon fx_main_list_iconLeft"></span>
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20"><path d="M268.5 355.6h19.4v602.1h-19.4z" fill="#FF7878"></path><path d="M511.3 103.1c28.9 0 77.8 16.4 78.1 77.9 0.2 48 0 73.2-0.2 95.4l-0.1 20.8-0.2 39.1h252.7c19.1 0 35.7 7 46.6 19.8 11.2 13.2 15.4 31.1 12.1 51.8-9.6 60.5-52.3 399.4-57.9 443.8-13.5 35.1-50.8 67.4-78.5 67.4l-595.3-0.2c-25.3 0-45.8-20.5-45.8-45.6V426.4c0-25.2 14.6-51.3 38.9-51.3H301.8l8.9-5.1c59.8-34.1 105.4-101.8 122.1-181.2 16.6-79.3 45.4-85.7 78.5-85.7m0-38.9c-58.4 0-97.7 26.7-116.6 116.6-13.3 63.5-50.2 125.1-103.3 155.4H161.7c-46.8 0-77.8 43.5-77.8 90.2v446.8c0 46.7 37.9 84.5 84.7 84.5l595.3 0.2c46.8 0 99.3-46.4 116.6-97.1 0 0 48.2-383.3 58.3-446.8 10.8-68.1-36-116.6-97.1-116.6H627.9c0.2-29.4 0.6-53.1 0.3-116.6-0.2-76.5-58.4-116.6-116.9-116.6z" fill="#FF7878" ></path></svg>
                    <span>为你推荐</span>
                    <span class="fx_main_list_icon fx_main_list_iconRight"></span>
                </div>
                <p class="fx_main_list_title">你的口味我都懂得</p>
                <food_list :food="food"></food_list>
                <router-link to="/faxian/tuijian" class="fx_main_list_more">查看更多 <span class="icon icon-right"></span></router-link>
            </router-link>
            <section class="fx_main_list">
                <div class="fx_main_list_top">
                    <span class="fx_main_list_icon fx_main_list_iconLeft"></span>
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20"><path d="M707.1 505.7H547.9V249.8c0-1.1-0.9-2-2-2h-60.5c-1.1 0-2 0.9-2 2v318.3c0 1.1 0.9 2 2 2H707c1.1 0 2-0.9 2-2v-60.5c0.1-1-0.8-1.9-1.9-1.9z" fill="#d81e06"></path><path d="M804.2 835.5C882.4 759.3 931 653 931 535.5c0-95-31.8-182.7-85.3-253.1 23.6-24 36.9-56.1 36.9-90.3 0-71.1-57.8-128.9-128.9-128.9-50.4 0-94.9 28.8-116 72.6-39.7-12.5-81.9-19.3-125.7-19.3s-86 6.8-125.7 19.3c-21.1-43.5-65.6-72.6-116-72.6-71.1 0-128.9 57.8-128.9 128.9 0 34.3 13.6 66.6 36.9 90.3C124.8 352.7 93 440.5 93 535.5c0 110.5 43 211.1 113.1 286.1l-93.2 93.2c-0.8 0.8-0.8 2.1 0 2.8l42.8 42.8c0.8 0.8 2.1 0.8 2.8 0l95.2-95.2c71.2 55.9 161 89.3 258.3 89.3 90.3 0 174-28.7 242.5-77.5l83.3 83.3c0.8 0.8 2.1 0.8 2.8 0l42.8-42.8c0.8-0.8 0.8-2.1 0-2.8l-79.2-79.2z m-50.5-707.9c35.5 0 64.5 28.9 64.5 64.5 0 15.6-5.6 30.3-15.5 41.9-30.8-29.7-66.2-54.8-104.9-74 11.2-19.7 32.3-32.4 55.9-32.4z m-483.4 0c23.7 0 44.7 12.8 55.9 32.3-38.7 19.2-74.1 44.3-104.9 74-9.8-11.5-15.5-26.3-15.5-41.9 0-35.5 28.9-64.4 64.5-64.4zM157.5 535.5C157.5 340 316.5 181 512 181s354.5 159 354.5 354.5S707.5 890 512 890 157.5 730.9 157.5 535.5z" fill="#d81e06"></path></svg>
                    <span>限时好礼</span>
                    <span class="fx_main_list_icon fx_main_list_iconRight"></span>
                </div>
                <p class="fx_main_list_title">金币换好礼</p>
                <div class="fx_main_list_shop">
                    <a :href="item.url" class="fx_main_list_shopItem" v-for="item in suggest" :key="item.id">
                        <span class="fx_main_list_shopTitle">{{item.corner_marker}}</span>
                        <img class="fx_main_list_shopImg" :src="find_img(item.image_hash)+'?imageMogr/format/webp/'" alt="图片不见了"/>
                        <p class="fx_main_list_shopName">{{item.title}}</p>
                        <p class="fx_main_list_shopJinbi">{{item.points_required}}金币<del class="fx_main_list_shopPrice">¥{{item.original_price}}</del></p>
                    </a>
                </div>
                <a href="https://h5.ele.me/exchange/" class="fx_main_list_more">查看更多 <span class="icon icon-right"></span></a>
            </section>
        </main>
        <f_nav :index_i="1"></f_nav>
    </div>
</template>

<script>
    import f_nav from './nav.vue';
    import h_header from './header.vue'
    import food_list from './faxian_food.vue'

    export default {
        name: 'app',
        data(){
            return{
                discover:'',
                lat:$.cookie('lat'),
                lit:$.cookie('lit'),
                food:[],
                suggest:[]
            }
        },
        mounted(){
            $.get('/discover',{
                lat:this.lat,
                lit:this.lit,
            },data=>{
                this.discover = data;
            });

            let user_id = localStorage.getItem('user_id');
            let id = '';
            if(user_id) {
                id = user_id.split(';')[0].split('=')[1];
            }
            $.get('/discover/recommendation',{
                lat:this.lat,
                lit:this.lit,
                user_id:id,
                offset:0,
                limit:6
            },data=>{
                this.food = data.items;
            });

            $.get('/discover/suggest',data=>{
                this.suggest = data.slice(0,3);
            });
        },
        methods:{
            find_img(String_path){
                let path = String_path+'';
                let format = path.match(/(jpeg|png|jpg|bmp)/)[0];
                return `https://fuss10.elemecdn.com/${path.slice(0,1)}/${path.slice(1,3)}/${path.slice(3)}.${format}`;
            },//将返回的img路径改为有效的img路径  967284af9fb1b499192d2476648c3ccfjpeg  需要转化为 https://fuss10.elemecdn.com/9/67/284af9fb1b499192d2476648c3ccfjpeg.jpeg
            get_link(link){
                let result = '';
                if(/http/.test(link)){
                    result = link;
                }else{
                    result = 'https://h5.ele.me'+link;
                }
                return result
            },//获取链接地址
        },
        components:{
            f_nav,
            h_header,
            food_list,
        }
    }
</script>

<style scoped>

    /* 限时好礼 */
    .fx_main_list_shopPrice{
        margin-left: .2rem;
        font-size: .5rem;
        color: #aaa;
    }
    .fx_main_list_shopJinbi{
        margin-top: .3rem;
        font-size:.65rem;
        color: #ff5339;
    }
    .fx_main_list_shopName{
        overflow: hidden;
        font-size:.65rem;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .fx_main_list_shopTitle{
        position: absolute;
        top:0;
        left:0;
        padding:.05rem .1rem;
        background: #413d3c;
        font-size: .6rem;
        color:#fff;
    }
    .fx_main_list_shopImg{
        width: 5.6rem;
        height: 5.5rem;
    }
    .fx_main_list_shopItem:active{
        color:#333;
    }
    .fx_main_list_shopItem{
        position: relative;
        width: 33%;
        color:#333;
    }
    .fx_main_list_shop{
        display: flex;
        justify-content: center;
        width: 100%;
        padding-top:1.3rem;
        padding-left:.6rem;
    }

    /* 为你推荐和限时好礼共用 */
    .fx_main_list_more .icon{
        transform: scale(.7);
        transform-origin:  0 30%;
    }
    .fx_main_list_more:active{
        color:#999;
    }
    .fx_main_list_more{
        display: block;
        margin-top:1rem;
        text-align: center;
        font-size: .6rem;
        color: #999;
    }
    .fx_main_list_title{
        margin-top: -.2rem;
        text-align: center;
        font-size: .5rem;
        color: #999
    }
    .fx_main_list_iconLeft:after{
        content: '';
        position: absolute;
        top:-.14rem;
        left:.46rem;
        width: .26rem;
        height: .26rem;
        background-color: #000;
        border-radius: .3rem;
    }
    .fx_main_list_iconRight:before{
        content: '';
        position: absolute;
        top:-.14rem;
        left:-.1rem;
        width: .26rem;
        height: .26rem;
        background-color: #000;
        border-radius: .3rem;
    }
    .fx_main_list_icon{
        position: relative;
        display: inline-block;
        width: 4vw;
        height:0;
        margin:0 .3rem;
        border: 1px solid #333;
    }
    .fx_main_list_top{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .fx_main_list{
        display: block;
        margin-top:.6rem;
        padding:1rem .3rem;
        background-color: #fff;
        color:#333;
    }


    /* 第二部分 */
    .fx_main_two{
        display: block;
        height: 24vw;
        margin: .6rem 0 0;
    }

    /* 第一部分Nav */
    .fx_main_one_titleBox{
        max-width: 30vw;
    }
    .fx_main_one_itemsBox{
        display: flex;
        flex-wrap: wrap;
    }
    .fx_main_one_items:nth-last-child(2):not(:nth-child(even)){
        border-bottom:none !important;
    }
    .fx_main_one_items:nth-last-child(1){
        border-bottom:none !important;
    }
    .fx_main_one_items:nth-child(even){
        border-bottom: 1px solid #eee;
    }
    .fx_main_one_items:nth-child(Odd){
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
    }
    .fx_main_one_items{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        width: 50%;
        height:21.333333vw;
        color:#999;
        padding:.8rem .8rem .3rem .8rem;
    }
    .fx_main_one_item:first-child .fx_main_one_img{
        align-self: flex-end;
        width: 20vw;
        height:20vw;
    }
    .fx_main_one_text{
        overflow: hidden;
        margin-top: .2rem;
        font-size: .6rem;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .fx_main_one_title{
        overflow: hidden;
        font-size: .8rem;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .fx_main_one_img{
        width: 12vw;
        height: 12vw;
    }
    .fx_main_one{
        position: relative;
        background-color: #fff;
    }
    .fx_main_one_item:first-child{
        flex-direction: column;
        height: 42.666667vw;
        padding-top: 1rem;
        padding-right: .6rem;
        border-bottom: 1px solid #eee;
        border-right:1px solid #eee;
    }
    .fx_main_one_item:active{
        color:#999;
    }
    .fx_main_one_items:active{
        color:#999;
    }
    .fx_main_one_item:nth-child(2){
        position: absolute;
        top:0;
        right:0;
    }
    .fx_main_one_item:nth-child(3){
        position: absolute;
        top:21.333333vw;
        right:0;
        border-top:1px solid #eee;
        border-bottom: 1px solid #eee;
    }
    .fx_main_one_item{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        width: 50%;
        height:21.333333vw;
        color:#999;
        padding:.8rem .8rem .3rem .8rem;
    }

    /* 主体 */
    .fx_main{
        height: 100%;
        margin-bottom: .6rem;
    }
    .faxian{
        overflow-y: scroll;
        overflow-x: hidden;
        height: 100%;
        padding-top: 2.2rem;
        padding-bottom: 2.5rem;
        background-color: #f5f5f5;
    }

    /* 头部信息 */
    .fx_h_header{
        z-index:99;
        position: fixed!important;
        top:0;
        left:0;
        width: 100%;
    }
</style>
