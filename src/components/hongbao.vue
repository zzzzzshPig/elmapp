<template>
    <div class="hb_hongbao">
        <h_header class="hb_h_header" :title="'我的优惠'"></h_header>
        <main>
            <section class="hb_head">
                <div class="hb_head_hb" v-on:click="is_hongbao=true">
                    <span :class="is_hongbao?'hb_head_text hb_head_active':'hb_head_text'">红包 {{hongbao.length}} 个</span>
                </div>
                <div class="hb_head_djj" v-on:click="is_hongbao=false">
                    <span :class="is_hongbao?'hb_head_text':'hb_head_text hb_head_active'">商家代金卷 {{daijinquan.length}} 张</span>
                </div>
            </section>
            <section v-if="is_hongbao">
                <section class="hb_ad">
                    <a href="https://h5.ele.me/commend/#/" class="hb_ad_box">
                        <div class="hb_ad_text">
                            <h4 class="hb_ad_title">推荐有奖</h4>
                            <p class="hb_ad_tip">5元现金拿不停</p>
                        </div>
                        <img class="hb_ad_img" src="http://shadow.elemecdn.com/faas/h5/static/commend.ca533b7.png" alt="图片不见了"/>
                    </a>
                    <a href="https://h5.ele.me/freelunch/#/" class="hb_ad_box hb_shadow">
                        <div class="hb_ad_text">
                            <h4 class="hb_ad_title">免费霸王餐</h4>
                            <p class="hb_ad_tip">领20元红包</p>
                        </div>
                        <img class="hb_ad_img" src="data:image/png;base64,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" alt="图片不见了"/>
                    </a>
                </section>
                <section class="hb_item hb_shadow" v-for="item in hongbao" :key="item.id">
                    <div :class="item.name=='超级会员专享'?'hb_item_info hb_item_svip':'hb_item_info'" >
                        <div class="hb_item_price">
                            <span class="hb_item_price_num" :style="item.name=='超级会员专享'?'color:#a17c3b':''">{{item.amount}}</span>
                            <p class="hb_item_price_text">{{item.description_map.sum_condition}}</p>
                        </div>
                        <div class="hb_item_person">
                            <h4 class="hb_item_person_title">{{item.name}}</h4>
                            <div class="hb_item_person_time">{{item.description_map.validity_periods}}</div>
                            <div class="hb_item_person_tip">{{item.description_map.phone}}</div>
                        </div>
                        <div class="hb_item_time">{{item.description_map.validity_delta}}</div>
                    </div>
                    <div :class="item.name=='超级会员专享'?'hb_item_tips hb_item_svip':'hb_item_tips'">
                        <p class="hb_item_tips_tip" v-for="info in item.limit_map" :key="info.id">{{info}}</p>
                    </div>
                </section>
                <section class="hb_notMore" v-if="notMore">
                    没有更多了~
                </section>
                <section class="hb_other">
                    <router-link class="hb_other_link" to="/wode/hongbao/hbHistory">查看历史红包</router-link>
                    <a href="https://h5.ele.me/service/#hongbao" class="hb_other_link">红包说明</a>
                </section>
            </section>
            <section class="hb_djqBox" v-if="!is_hongbao">
                <section class="hb_djqItem hb_shadow" v-for="item in daijinquan">
                    <div class="hb_djqItem_price">
                        <span class="hb_djqItem_price_num">{{item.reduce_amount}}</span>
                    </div>
                    <div class="hb_djqItem_person">
                        <h4 class="hb_djqItem_person_title">{{item.name}}</h4>
                        <div class="hb_djqItem_person_tips" v-for="info in item.details">{{info}}</div>
                    </div>
                    <router-link :to="{path:'/shop',query:{id:item.restaurant_id}}" class="hb_djqItem_btn">进店使用</router-link>
                </section>
                <section class="hb_djqItem_other">
                    <a class="hb_djqItem_more" href="https://h5.ele.me/coupon/#entry_id=211">更多好券，去领券中心看看</a>
                </section>
                <section class="hb_djqItem_other">
                    <a class="hb_djqItem_shuoming" href="https://h5.ele.me/service/#coupon">店铺红包说明</a>
                </section>
            </section>
        </main>
    </div>
</template>

<script>
    import h_header from './header.vue';

    export default {
        name: 'hb_hongbao',
        data(){
            return {
                is_hongbao:true,
                hongbao:[],
                notMore:false,
                user_id:'',
                sid:'',
                offset:0,
                daijinquan:[],
            }
        },
        methods:{
            get_hongbao(){
                $.get('/user_info/hongbao',{
                    user_id:this.user_id,
                    sid:this.sid,
                    offset:this.offset
                },data=>{
                    if(data.length){
                        if(data.length<20){
                            this.notMore = true;
                        }
                        data.map(item=>{
                            this.hongbao.push(item);
                        });
                        this.offset+=20;
                    }else if(data.message){
                        this.$router.push('/wode');
                    }
                });
            },//获取用户红包信息
            get_coupons(){
                $.get('/user_info/coupons',{
                    user_id:this.user_id,
                    sid:this.sid,
                },data=>{
                    this.daijinquan = data;
                });
            },//获取用户商家代金券
        },
        mounted(){
            let userInfo = localStorage.getItem('user_id');
            if(userInfo){
                this.user_id = userInfo.split(';')[0].split('=')[1];
                this.sid = userInfo.split('SID=')[1].split(';')[0];
                this.get_hongbao();
                this.get_coupons();
            }

            $(()=>{
                let win = $(window);
                let dom = $(document);
                win.scroll(()=>{
                    if(!this.notMore){
                        if(win.scrollTop()>(dom.height()-win.height())-2){
                            this.get_hongbao();
                        }
                    }
                });
            });//滚动事件
        },
        components:{
            h_header
        }
    }
</script>

<style scoped>
    /* 商家代金券 */
    .hb_djqItem_btn{
        width:2.7rem;
        height:1rem;
        margin-right:1rem;
        border: 1px solid #ff0025;
        text-align: center;
        font-size:.5rem;
        color:#ff0025;
        border-radius: 10px;
        white-space: nowrap;
        transform: scale(.9);
    }
    .hb_djqItem_person_tips{
        line-height: .7rem;
        font-size:.5rem;
        color:#999;
    }
    .hb_djqItem_person_title{
        overflow: hidden;
        width:8rem;
        margin-bottom:.1rem;
        font-size:.8rem;
        color:#333;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .hb_djqItem_price_num::before{
        position: relative;
        top:-.05rem;
        left:-.1rem;
        content: "\A5";
        vertical-align: baseline;
        font-size: .75rem;
    }
    .hb_djqItem_price_num{
        font-size:1.5rem;
        font-weight: bold;
        color:#ef4661;
    }
    .hb_djqItem_price{
        display: flex;
        justify-content: center;
        width:4rem;
    }
    .hb_djqItem_person{
        flex: 1;
    }
    .hb_djqItem_more{
        display: inline-block;
        margin-top:.15rem;
        padding:.35rem 1.5rem;
        background-color: #fff;
        font-size: .6rem;
        color:#333;
        border-radius: 3px;
    }
    .hb_djqItem_shuoming{
        display: inline-block;
        margin-top: .9rem;
        font-size: .5rem;
        color: #999;
    }
    .hb_djqItem_other{
        text-align: center;
    }
    .hb_djqBox{
        margin-top:4.7rem;
    }
    .hb_djqItem{
        display: flex;
        align-items: center;
        margin:.55rem;
        padding:.8rem 0;
        background-color: #fff;
        border-radius: 4px;
    }

    /* 红包信息 */
    .hb_item_svip{
        color: #a17c3b;
        background: #fff4be url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNTM4IDI0NCI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik03MDIgMjAzLjU0NlYzMDJhNCA0IDAgMCAxLTQgNEg0YTQgNCAwIDAgMS00LTR2LTk4LjQ1NGM0LjY0LTEuNTg1IDgtNi4yMzUgOC0xMS43MjQgMC01LjQ5LTMuMzYtMTAuMTQtOC0xMS43MjRWNGE0IDQgMCAwIDEgNC00aDY5NGE0IDQgMCAwIDEgNCA0djE3Ni4wOThjLTQuNjQgMS41ODQtOCA2LjIzNC04IDExLjcyNHMzLjM2IDEwLjE0IDggMTEuNzI0eiIvPjxsaW5lYXJHcmFkaWVudCBpZD0iYiIgeDE9IjcxLjUyOSUiIHgyPSIxNy4yODclIiB5MT0iMzkuMjYyJSIgeTI9Ijk1Ljg1MiUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGRkYxQjUiIHN0b3Atb3BhY2l0eT0iMCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI0ZGRjFCNyIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJkIiB4MT0iNzEuNTI5JSIgeDI9IjMwLjQ5NCUiIHkxPSIzOS4yNjIlIiB5Mj0iNzguMjIlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjRkZERTUyIiBzdG9wLW9wYWNpdHk9IjAiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNGRkQzNTMiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iZSIgeDE9IjcwLjA1NyUiIHgyPSIxNy4zNiUiIHkxPSIyMS4wMzMlIiB5Mj0iODguNyUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGOUYwQzEiIHN0b3Atb3BhY2l0eT0iMCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI0ZGRjdEOSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEpIj48bWFzayBpZD0iYyIgZmlsbD0iI2ZmZiI+PHVzZSB4bGluazpocmVmPSIjYSIvPjwvbWFzaz48dXNlIGZpbGw9IiNGRkYiIGZpbGwtb3BhY2l0eT0iMCIgeGxpbms6aHJlZj0iI2EiLz48cGF0aCBmaWxsPSJ1cmwoI2IpIiBkPSJNNTM4LjAyNi0uODl2MjQ0LjIwMkgyOTMuODIzeiIgbWFzaz0idXJsKCNjKSIgb3BhY2l0eT0iLjI0MyIvPjxwYXRoIGZpbGw9InVybCgjZCkiIGQ9Ik01MjYuNDg0IDEuOTc3djE4OC43MThIMzU0LjA5NnoiIG1hc2s9InVybCgjYykiIG9wYWNpdHk9Ii4xMTkiLz48cGF0aCBmaWxsPSJ1cmwoI2QpIiBkPSJNMTczLjM4OC05Mi4xNThWOTYuNTYxSDF6IiBtYXNrPSJ1cmwoI2MpIiBvcGFjaXR5PSIuMDc2Ii8+PHBhdGggZD0iTTE3NS43MDYgMWg0Ni41Nkw0Ny41NiAxOTEuODEzSDF6IiBtYXNrPSJ1cmwoI2MpIi8+PHBhdGggZmlsbD0idXJsKCNlKSIgZD0iTTMyMy43MDYgMWg0Ni41NkwxOTUuNTYgMTkxLjgxM0gxNDl6IiBtYXNrPSJ1cmwoI2MpIiBvcGFjaXR5PSIuNDc0Ii8+PC9nPjwvc3ZnPg==) 0 0 no-repeat  !important;
    }
    .hb_item_tips::before{
        content: '';
        position: absolute;
        top:-.3rem;
        left:-.4rem;
        width:.6rem;
        height:.6rem;
        background-color: #f5f5f5;
        border-radius: .2rem;
    }
    .hb_item_tips::after{
        content: '';
        position: absolute;
        top:-.3rem;
        right:-.4rem;
        width:.6rem;
        height:.6rem;
        background-color: #f5f5f5;
        border-radius: .2rem;
    }
    .hb_item_tips_tip{
        transform: scale(.9);
        transform-origin: 0 0;
    }
    .hb_item_tips{
        position: relative;
        padding:.4rem .7rem .5rem;
        background: #fcfcfc;
        border-top: 1px dashed #ddd;
        font-size:.5rem;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }
    .hb_item_time{
        font-size:.5rem;
        color:#ff0025;
    }
    .hb_item_person_tip{
        margin-top:-.2rem;
        font-size:.5rem;
        transform: scale(.9);
        transform-origin: 0 0;
    }
    .hb_item_person_time{
        font-size:.5rem;
        transform: scale(.9);
        transform-origin: 0 0;
    }
    .hb_item_person_title{
        overflow: hidden;
        width:8rem;
        font-size:.8rem;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .hb_item_person{
        flex: 1;
        margin-left: .6rem;
    }
    .hb_item_price{
        min-width:4rem;
        text-align: center;
    }
    .hb_item_price_text{
        margin-top:-.1rem;
        font-size: .5rem;
    }
    .hb_item_price_num::before{
        position: relative;
        top:.15rem;
        content: "\A5";
        vertical-align: super;
        font-size: .75rem;
    }
    .hb_item_price_num{
        line-height: 1rem;
        font-size:1.5rem;
        font-weight: bold;
        color:#ff0025;
    }
    .hb_item_info{
        position: relative;
        display: flex;
        align-items: center;
        background-color: #fff;
        padding:.9rem .7rem .7rem .5rem;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }
    .hb_item{
        margin:.55rem;
        color:#666;
    }

    /* 红包底部 */
    .hb_other_link:first-child::after{
        content: '|';
        margin:0 .3rem;
        color:#999;
    }
    .hb_other_link{
        color:#999;
    }
    .hb_other{
        display: flex;
        justify-content: center;
        padding-top:.8rem;
        font-size: .4rem;
    }
    .hb_notMore{
        margin:1rem 0;
        text-align: center;
        font-size: .65rem;
    }

    /* 广告信息 */
    .hb_ad_tip{
        font-size: .5rem;
        color:#999;
    }
    .hb_ad_title{
        font-size: .75rem;
        color:#666;
    }
    .hb_ad_img{
        width:3.8rem;
        height:2.5rem;
    }
    .hb_ad_box{
        display: flex;
        align-items: center;
        width: 49%;
        padding-left:.8rem;
        background-color: #fff;
        border-radius: 2px;
    }
    .hb_ad{
        margin-top:4.2rem;
        display: flex;
        justify-content: space-between;
        height:4.25rem;
        padding:.55rem .55rem 0;
    }


    /* 整体 */
    .hb_hongbao{
        z-index:99;
        position: relative;
        background-color: #f5f5f5;
        height: 100%;
    }
    .hb_shadow{
        box-shadow: 0 .08rem .08rem rgba(0,0,0,.1);
    }


    /* 头部信息 */
    .hb_h_header{
        position: fixed!important;
        top:0;
        left:0;
        width: 100%;
    }
    .hb_head_text{
        opacity: 0.69;
        padding-bottom: .2rem;
    }
    .hb_head_active{
        opacity: 1 !important;
        border-bottom: 2px solid #fff;
        border-radius: 1px;
    }
    .hb_head{
        position: fixed;
        top:2.2rem;
        left:0;
        display: flex;
        align-items: center;
        width: 100%;
        height: 2rem;
        background-image: linear-gradient(90deg, #00aaff, #0085ff);
        text-align: center;
        font-size: .7rem;
        color:#fff;
    }
    .hb_head_hb{
        flex: 1;
    }
    .hb_head_djj{
        flex: 1;
    }
</style>
