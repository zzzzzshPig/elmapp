<template>
    <div class="fxf_faxian_food">
        <router-link :to="{path:'/shop',query:{id:item.food.restaurant_id}}" class="fxf_item" :key="item.id" v-for="item in food">
            <img class="fxf_item_img" :src="find_img(item.food.image_path)+'?imageMogr/format/webp/thumbnail/!345x345r/gravity/Center/crop/345x345/'" alt="图片不见了"/>
            <p class="fxf_item_imgTitle">与您浏览过的美食相关的推荐</p>
            <div class="fxf_item_info">
                <h4 class="fxf_item_foodName">{{item.food.name}}</h4>
                <p class="fxf_item_rate">月售{{item.food.month_sales}}份 好评率{{item.food.satisfy_rate}}%</p>
                <div class="fxf_item_price"><span class="fxf_item_icon">¥</span>{{item.food.price}} <p class="fxf_item_tag" v-if="item.food.activities" :style="'color:#'+item.food.activities[0].icon_color+';border-color:#'+item.food.activities[0].icon_color">{{item.food.activities[0].tips}}</p></div>
            </div>
            <div class="fxf_item_shopNameBox">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="13" height="13"><path d="M864 179.2c12.8 0 19.2 6.4 25.6 19.2l32 204.8c-25.6 19.2-57.6 32-89.6 32-32 0-64-12.8-89.6-32-19.2-12.8-38.4-25.6-64-25.6s-44.8 6.4-64 25.6c-38.4 19.2-70.4 32-102.4 32s-64-12.8-89.6-32c-19.2-12.8-38.4-25.6-64-25.6s-44.8 6.4-64 25.6c-32 19.2-64 32-96 32s-64-12.8-89.6-32l32-204.8c0-12.8 12.8-19.2 25.6-19.2h697.6m0-64h-704c-38.4 0-76.8 32-83.2 76.8L44.8 409.6c0 12.8 0 25.6 12.8 32l6.4 12.8c38.4 32 83.2 51.2 134.4 51.2s96-19.2 134.4-51.2c6.4-6.4 12.8-12.8 19.2-12.8s19.2 0 25.6 6.4c38.4 38.4 89.6 51.2 134.4 51.2s96-19.2 134.4-51.2c6.4-6.4 12.8-6.4 25.6-6.4 6.4 0 19.2 0 25.6 6.4 38.4 32 83.2 51.2 134.4 51.2s96-19.2 134.4-51.2c12.8-6.4 12.8-19.2 12.8-32L947.2 192c-6.4-44.8-44.8-76.8-83.2-76.8zM793.6 928H230.4c-70.4 0-121.6-44.8-121.6-96V576c0-19.2 12.8-32 32-32s25.6 12.8 25.6 32v256c0 19.2 25.6 38.4 57.6 38.4h569.6c38.4 0 57.6-19.2 57.6-38.4V576c0-19.2 12.8-32 32-32s32 12.8 32 32v256c0 51.2-51.2 96-121.6 96z" fill="#999" ></path></svg>
                <span class="fxf_item_shopName">{{item.food.restaurant_name}}</span>
            </div>
        </router-link>
    </div>
</template>

<style scoped>
    .fxf_item_shopName{
        overflow: hidden;
        margin-left: .3rem;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .fxf_item_shopNameBox{
        display: flex;
        align-items: center;
        padding:.4rem .4rem;
        border-top: 1px solid #eee;
        font-size: .5rem;
        color: #999;
    }
    .fxf_item_price{
        font-weight: bold;
        font-size: .82rem;
        color: #ff6000;
    }
    .fxf_item_tag{
        display: inline-block;
        padding:0 .05rem;
        border: 1px solid #f66d6b;
        line-height: .7rem;
        font-weight: normal;
        font-size: .5rem;
        border-radius: 3px;
        transform: scale(.9) translateY(-10%);
    }
    .fxf_item_icon{
        margin-right: .1rem;
        font-weight: normal;
        font-size: .5rem;
    }
    .fxf_item_rate{
        font-size: .5rem;
        color: #666;
        transform: scale(.9);
        transform-origin: 0 0;
    }
    .fxf_item_foodName{
        overflow: hidden;
        font-size: .75rem;
        color: #333;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .fxf_item_info{
        padding:.2rem .5rem;
    }
    .fxf_item_imgTitle{
        position: relative;
        z-index:2;
        width:111%;
        margin-top:-1.2rem;
        background-color: rgba(0,0,0,.6);
        text-align: center;
        font-size:.5rem;
        color:#fff;
        transform: scale(.9);
        transform-origin: 0 100%;
    }
    .fxf_item_img{
        width: 46vw;
        height: 46vw;
    }
    .fxf_item{
        overflow: hidden;
        width:49%;
        margin-top: .4rem;
        border:1px solid #eee;
    }
    .fxf_faxian_food{
        display: flex;
        justify-content: space-between;
        padding:0 .3rem;
        flex-wrap: wrap;
    }

</style>

<script>
    export default{
        name:'fxf_faxian_food',
        data(){
            return {

            }
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
        props:{
            food:Array
        }
    }
</script>