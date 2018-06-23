<template>
    <div class="di_dingdan_info" v-if="ps_info&&zhunshi&&info">
        <h_header class="di_h_header" :title="'订单详情'"></h_header>
        <main>
            <section class="di_main_one">
                <img class="di_main_one_img" :src="find_img(info.restaurant_image_hash)+'?imageMogr/format/webp/thumbnail/!160x160r/gravity/Center/crop/160x160/'" alt="图片不见了"/>
                <div v-if="zhunshi.description">
                    <span class="di_main_one_zhunshi">准时达订单<img class="di_main_one_zhunshiIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAALVBMVEUAAAD///////////////////////////////////////////////////////+hSKubAAAADnRSTlMA878i7tiafkMwDLU9triRayUAAAB1SURBVAjXY2Bg4EgVDGtgAAJmvXfv3j0yALKOPKxcNV3OByjkpwzkGj0xYGB6xMCwm4FBT4GhT5iB4R0Dg+ELhrwCsBj7M4a4CQwgwPmUQW4BA8NtBgauh2DWOxALLPsOJAvW8Q6kA2EKwmSEbQgXIFyFcCkACxwt83wsnQUAAAAASUVORK5CYII=" alt="图片不见了"/>
                    </span>
                    <p class="di_main_one_zhunshiText">{{zhunshi.description}}</p>
                </div>
                <router-link :to="{path:'/dingdan/zuizong',query:{id:$route.query.id}}" class="di_main_one_status">订单已完成 <span class="di_main_one_statusIcon icon icon-right"></span></router-link>
                <p class="di_main_one_des">感谢你对饿了么的信任，期待再次光临</p>
                <button class="di_main_one_btn di_main_one_shouhou">申请售后</button>
                <button class="di_main_one_btn di_main_one_rate">评价得金币</button>
            </section>
            <section class="di_main_two">
                <router-link :to="{path:'/shop',query:{id:info.restaurant_id}}" class="di_main_two_shop">
                    <img class="di_main_two_shopImg" :src="find_img(info.restaurant_image_hash)+'?imageMogr/format/webp/thumbnail/!160x160r/gravity/Center/crop/160x160/'" alt="图片不见了"/>
                    <span class="di_main_two_shopName">{{info.restaurant_name}}</span>
                    <span class="di_main_two_shopIcon icon icon-right"></span>
                </router-link>
                <ul class="di_main_two_list">
                    <li class="di_main_two_item" v-for="item in info.basket.group[0]" :key="item.id">
                        <div class="di_main_two_itemShop">
                            <span>{{item.name}}</span>
                            <span>x{{item.quantity}}</span>
                        </div>
                        <span class="di_main_two_itemPrice">¥{{item.price}}</span>
                    </li>
                    <li class="di_main_two_item" v-if="info.basket.packing_fee">
                        <div class="di_main_two_itemShop">
                            <span>{{info.basket.packing_fee.name}}</span>
                            <span>x{{info.basket.packing_fee.quantity}}</span>
                        </div>
                        <span class="di_main_two_itemPrice">¥{{info.basket.packing_fee.price}}</span>
                    </li>
                    <li class="di_main_two_item" v-if="info.basket.deliver_fee">
                        <div class="di_main_two_itemShop">
                            <span>{{info.basket.deliver_fee.name}}</span>
                            <span>x{{info.basket.deliver_fee.quantity}}</span>
                        </div>
                        <span class="di_main_two_itemPrice">¥{{info.basket.deliver_fee.price}}</span>
                    </li>
                    <li class="di_main_two_item" v-for="item in info.basket.extra" :key="item.id">
                        <div class="di_main_two_itemhd">
                            <span class="di_main_two_itemIcon" :style="item.icon?'background-color:#'+item.icon.icon_color:''">{{item.icon?item.icon.icon_name:'减'}}</span>
                            <span>{{item.name}}</span>
                        </div>
                        <span class="di_main_two_itemhdPrice">-¥{{(item.price+'').split('-')[1]||0}}</span>
                    </li>
                    <li class="di_main_two_item" v-if="info.basket.hongbao">
                        <div class="di_main_two_itemhd">
                            <span class="di_main_two_itemIcon" :style="'background-color:#'+info.basket.hongbao.icon.icon_color">{{info.basket.hongbao.icon.icon_name}}</span>
                            <span>{{info.basket.hongbao.name}}</span>
                        </div>
                        <span class="di_main_two_itemhdPrice">-¥{{(info.basket.hongbao.price+'').split('-')[1]||0}}</span>
                    </li>
                </ul>
                <div class="di_main_two_itemPriceAdd">
                    <span style="margin-right:.4rem;">实付</span><span class="di_main_two_itemPriceAdd_price">¥{{info.total_amount}}</span>
                </div>
            </section>
            <section class="di_main_three">
                <div class="di_main_three_title">
                    配送信息
                </div>
                <ul class="di_main_three_list">
                    <li class="di_main_three_item">
                        <span class="di_main_three_itemTitle">送达时间</span>
                        <div class="di_main_three_itemText">
                            <p>{{info.deliver_time}}</p>
                        </div>
                    </li>
                    <li class="di_main_three_item">
                        <span class="di_main_three_itemTitle">送货地址</span>
                        <div class="di_main_three_itemText">
                            <p>{{info.consignee}}</p>
                            <p>{{info.phone}}</p>
                            <p>{{info.address}}</p>
                        </div>
                    </li>
                    <li class="di_main_three_item">
                        <span class="di_main_three_itemTitle">配送方式</span>
                        <div class="di_main_three_itemText">
                            <p>{{ps_info.delivery_company}}</p>
                        </div>
                    </li>
                    <li class="di_main_three_item" v-if="ps_info.rider_name">
                        <span class="di_main_three_itemTitle">配送骑手</span>
                        <div class="di_main_three_itemText">
                            <p>{{ps_info.rider_name+'，'+ps_info.rider_phone}}</p>
                        </div>
                    </li>
                </ul>
            </section>
            <section class="di_main_three di_main_four">
                <div class="di_main_three_title">
                    订单信息
                </div>
                <ul class="di_main_three_list">
                    <li class="di_main_three_item">
                        <span class="di_main_three_itemTitle">订单号</span>
                        <div class="di_main_three_itemText">
                            <p>{{$route.query.id}}</p>
                        </div>
                    </li>
                    <li class="di_main_three_item">
                        <span class="di_main_three_itemTitle">支付方式</span>
                        <div class="di_main_three_itemText">
                            <p>{{info.pay_method}}</p>
                        </div>
                    </li>
                    <li class="di_main_three_item">
                        <span class="di_main_three_itemTitle">下单时间</span>
                        <div class="di_main_three_itemText">
                            <p>{{info.formatted_created_at}}</p>
                        </div>
                    </li>
                    <li class="di_main_three_item" v-if="info.description">
                        <span class="di_main_three_itemTitle">订单备注</span>
                        <div class="di_main_three_itemText">
                            <p>{{info.description}}</p>
                        </div>
                    </li>
                </ul>
            </section>
        </main>
    </div>
</template>

<script>
    import h_header from './header.vue'
    export default {
        name: 'di_dingdan_info',
        data(){
            return{
                user_id:'',
                sid:'',
                ps_info:'',
                zhunshi:'',
                info:''
            }
        },
        mounted(){
            let userInfo = localStorage.getItem('user_id');
            if(userInfo){
                this.user_id = userInfo.split(';')[0].split('=')[1];
                this.sid = userInfo.split('SID=')[1].split(';')[0];
                $.get('/order/info',{
                    id:this.$route.query.id,
                    user_id:this.user_id,
                    sid:this.sid,
                },data=>{
                    this.info = data;
                });

                $.get('/order/info/ontime',{
                    id:this.$route.query.id,
                    user_id:this.user_id,
                    sid:this.sid,
                },data=>{
                    this.zhunshi = data;
                });

                $.get('/order/info/distribution',{
                    id:this.$route.query.id,
                    user_id:this.user_id,
                    sid:this.sid,
                },data=>{
                    this.ps_info = data;
                });
            }
        },
        methods:{
            find_img(String_path){
                let path = String_path+'';
                let format = path.match(/(jpeg|png|jpg|bmp)/)[0];
                return `https://fuss10.elemecdn.com/${path.slice(0,1)}/${path.slice(1,3)}/${path.slice(3)}.${format}`;
            },//将返回的img路径改为有效的img路径  967284af9fb1b499192d2476648c3ccfjpeg  需要转化为 https://fuss10.elemecdn.com/9/67/284af9fb1b499192d2476648c3ccfjpeg.jpeg
        },
        components:{
            h_header
        }
    }
</script>

<style>
    /* 主体信息 four */
    .di_main_four{
        margin:.5rem !important;
    }

    /* 主体信息 three*/
    .di_main_three_itemText{
        display: flex;
        flex: 1;
        flex-direction: column;
    }
    .di_main_three_itemTitle::after{
        content: ':';
        margin: 0 .2rem;
    }
    .di_main_three_item:not(:first-child){
        border-top:1px solid #eee;
    }
    .di_main_three_item{
        display: flex;
        padding:.4rem 0;
    }
    .di_main_three_list{
        list-style: none;
        margin-left:.8rem;
        font-size: .7rem;
        color:#666;
    }
    .di_main_three_title{
        padding:.4rem .6rem;
        border-top:1px solid #eee;
        border-bottom:1px solid #eee;
        font-size: .75rem;
    }
    .di_main_three{
        margin:0 .5rem;
        background-color: #fff;
    }

    /* 主体信息 two*/
    .di_main_two_itemPriceAdd_price{
        font-weight: 500;
        font-size:1rem;
    }
    .di_main_two_itemPriceAdd{
        padding:.8rem 0 .2rem;
        margin-top: .1rem;
        border-top: 1px solid #eee;
        text-align: right;
        font-size: .7rem;
    }
    .di_main_two_itemhdPrice{
        color: #ff5339;
    }
    .di_main_two_itemhd{
        flex: 1;
    }
    .di_main_two_itemIcon{
        margin-right:.2rem;
        padding:0 .1rem;
        background-color:rgb(240, 115, 115);
        line-height: .95rem;
        color:#fff;
        border-radius: 4px;
    }
    .di_main_two_itemShop{
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex: 1;
        max-width:13.5rem;
        margin-right: 1rem;
    }
    .di_main_two_item{
        display: flex;
        align-items: center;
        padding:.5rem 0;
        border-top: 1px solid #eee;
        font-size: .7rem;
    }
    .di_main_two_list{
        margin-top:.6rem;
        padding:.1rem 0;
        border-top: 2px solid #eee;
        border-bottom: 2px solid #eee;
        list-style: none;
    }
    .di_main_two_shopIcon{
        font-weight: bold;
        font-size: .5rem;
        transform: scale(.9);
    }
    .di_main_two_shopName{
        flex: 1;
        margin-left:.4rem;
        font-size: .7rem;
    }
    .di_main_two_shop{
        display: flex;
        align-items: center;
        color:#333;
    }
    .di_main_two_shopImg{
        width: 5.333333vw;
        height: 5.333333vw;
    }
    .di_main_two{
        margin:0 .5rem;
        padding:.7rem;
        border-top: 1px solid #eee;
        background-color: #fff;
    }

    /* 主体信息 one*/
    .di_main_one_rate{
        background-color: #ff5339;
        border:1px solid #ff5339;
        color: #fff;
    }
    .di_main_one_shouhou{
        border:1px solid #ccc;
        background-color: #fff;
    }
    .di_main_one_btn{
        width: 28vw;
        max-width: 28vw;
        margin:.5rem .05rem;
        padding:.25rem 0;
        font-size: .65rem;
        white-space: nowrap;
        border-radius: 4px;
    }
    .di_main_one_des{
        font-size: .65rem;
        color:#999;
        transform: translateY(-10%);
    }
    .di_main_one_statusIcon{
        font-size: .5rem;
    }
    .di_main_one_status{
        display: block;
        font-weight: bold;
        font-size:.95rem;
        color:#333;
        transform: translateY(-10%);
    }
    .di_main_one_zhunshiText{
        font-size:.5rem;
        color: #ccc;
        transform: scale(.8) translateY(-40%);
    }
    .di_main_one_zhunshiIcon{
        position: absolute;
        top:.1rem;
        right:.2rem;
        width: .6rem;
        height: .6rem;
    }
    .di_main_one_zhunshi{
        display: inline-block;
        position: relative;
        padding:0 1rem 0 .2rem;
        background-color: #ccc;
        font-weight: bold;
        font-size: .5rem;
        color:#fff;
        transform: scale(.8) translateY(-30%);
        border-radius: 2px;
    }
    .di_main_one_img{
        width: 21.333333vw;
        height: 21.333333vw;
        border-radius: 50%;
    }
    .di_main_one{
        margin:2.2rem .5rem 0;
        padding:.4rem;
        background-color: #fff;
        text-align: center;
    }

    /* 头部信息 */
    .di_h_header{
        z-index:99;
        position: fixed!important;
        top:0;
        left:0;
        width: 100%;
    }

    .di_dingdan_info{
        z-index:99;
        position: relative;
        height:100%;
        overflow-y: scroll;
        overflow-x: hidden;
    }
</style>
