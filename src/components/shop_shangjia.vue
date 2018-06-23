<template>
    <div class="ssj_shangjia">
        <div :key="item.id" v-for="item in data">
            <div class="ssj_peisongInfo ssj_item">
                <div class="ssj_title">
                    配送信息
                </div>
                <div class="ssj_info">
                    由{{item.delivery_mode.text}}提供配送，约{{item.order_lead_time}}分钟送达，距离{{distance(item.distance)}}
                    <br/>
                    配送费￥{{item.float_delivery_fee}}
                </div>
            </div>
            <div class="ssj_huodongAndfuwu ssj_item">
                <div class="ssj_title">
                    活动与服务
                </div>
                <div class="ssj_info" :key="huodong.id" v-for="huodong in item.activities">
                    <span :style="iconColor(huodong.icon_color)" class="ssj_info_qianzui">{{huodong.icon_name}}</span>{{huodong.tips}}
                </div>
                <div class="ssj_info" v-if="item.supports" :key="support.id"  v-for="support in item.supports">
                    <span :style="'border-radius:.1rem;padding:0 .3rem;margin-right:.2rem;border:0.01rem solid #'+support.icon_color+';color:#'+support.icon_color">{{support.icon_name}}</span>{{support.description}}
                </div>
            </div>
            <div class="ssj_shangjiashijing ssj_item" v-if="item.albums">
                <div class="ssj_title">
                    商家实景
                </div>
                <div class="ssj_imgBox":key="img.id"   v-for="img in item.albums">
                    <img :src="find_img(img.cover_image_hash)" alt="图片不见了" class="ssj_imgBox_img"/>
                    <div class="ssj_imgBox_text">
                        {{img.name}}({{img.count}}张)
                    </div>
                </div>
            </div>
            <div class="ssj_shangjiaInfo ssj_item">
                <div class="ssj_title">
                    商家信息
                </div>
                <div class="ssj_info">
                   <p style="line-height:.8rem;">{{item.description||'暂无简介'}}</p>
                </div>
                <ul class="ssj_shangjiaInfo">
                    <li class="ssj_shangjiaInfo_item">
                        <span class="ssj_shangjiaInfo_title">商家电话</span>
                        <span>{{get_phone(item.phone)}}<span class="icon icon-right" style="margin-top:-.1rem;color:#ccc;"></span></span>
                    </li>
                    <li class="ssj_shangjiaInfo_item">
                        <span class="ssj_shangjiaInfo_title">地址</span>
                        <span style="width:80%;text-align: right;">{{item.address}}</span>
                    </li>
                    <li class="ssj_shangjiaInfo_item">
                        <span class="ssj_shangjiaInfo_title">营业时间</span>
                        <span>{{item.opening_hours[0]}}</span>
                    </li>
                </ul>
            </div>
            <div class="ssj_yingyezhizao ssj_item">
                <a :href="'https://h5.ele.me/shop/certification/#/?restaurant_id='+item.authentic_id" class="ssj_title" style="display: flex;justify-content: space-between;">
                    <span>营业资质</span><span class="icon icon-right" style="color:#ccc;"></span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name:'shangjia',
        data(){
            return{

            }
        },
        methods:{
            distance(km){
                return km>1000?(km/1000).toFixed(2)+'km':km+'m';
            },//将M转化为KM，只对 1K 以上有效
            iconColor(color){
                return 'background-color:#'+color;
            },
            get_phone(String_phone){
                return (String_phone+'').split(' ')[0]
            },
            find_img(String_path){
                let path = String_path+'';
                let format = path.match(/(jpeg|png|jpg|bmp)/)[0];
                return `https://fuss10.elemecdn.com/${path.slice(0,1)}/${path.slice(1,3)}/${path.slice(3)}.${format}`;
            },//将返回的img路径改为有效的img路径  967284af9fb1b499192d2476648c3ccfjpeg  需要转化为 https://fuss10.elemecdn.com/9/67/284af9fb1b499192d2476648c3ccfjpeg.jpeg
        },
        props:{
            data:Array
        }
    }
</script>

<style>
    .ssj_info_qianzui{
        margin-right: .2rem;
        padding:0 .3rem;
        color:#fff;
        box-shadow: 0 0 .1rem;
        border-radius: .05rem;
    }
    .ssj_shangjiaInfo_title{
        font-weight: bold;
        color:#333;
    }
    .ssj_shangjiaInfo_item{
        display: flex;
        justify-content: space-between;
        list-style: none;
        margin-top:.6rem;
        padding-top:.6rem;
        border-top:.01rem solid #f6f6f6;
        font-size: .65rem;
        color:#666;
    }
    .ssj_imgBox_text{
        position: absolute;
        left:0;
        bottom:.3rem;
        width: 100%;
        background-color: rgba(0,0,0,.6);
        text-align: center;
        font-size:.6rem;
        color:#fff;
    }
    .ssj_imgBox{
        display: inline-block;
        position: relative;
        top:0;
        left:0;
        margin-top:.4rem;
        margin-right:.4rem;
    }
    .ssj_imgBox_img{
        width:3.9rem;
        height:3.9rem;
    }
    .ssj_info{
        padding-top:.6rem;
        font-size:.65rem;
        color:#666;
    }
    .ssj_title{
        font-size:.78rem;
        font-weight: bold;
        color:#333;
    }
    .ssj_item{
        margin-bottom:.55rem;
        padding:.8rem .78rem .7rem;
        background-color: #fff;
    }
    .ssj_shangjia{
        background-color: #f5f5f5;
    }
</style>