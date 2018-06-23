<template>
    <div class="bh_hbHistory">
        <h_header class="hb_h_header" :title="'历史红包'"></h_header>
        <section class="hb_item hb_shadow" v-for="item in expired_hongbaos" :key="item.id">
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
                <svg class="bh_item_used" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" >
                    <path fill="#d7d7d7" d="M844.498824 279.491765c-125.289412-180.705882-373.458824-225.28-552.96-99.990588-180.705882 125.289412-225.28 373.458824-99.990588 552.96 125.289412 180.705882 373.458824 225.28 552.96 99.990588C925.214118 707.162353 969.788235 458.992941 844.498824 279.491765zM721.618824 802.334118c-163.84 114.447059-389.12 73.487059-503.567059-90.352941C104.809412 548.141176 144.564706 322.861176 309.609412 208.414118c163.84-114.447059 389.12-73.487059 503.567059 90.352941C926.418824 463.811765 886.663529 689.091765 721.618824 802.334118zM785.468235 320.451765c-102.4-148.178824-305.995294-184.32-454.174118-81.92-148.178824 102.4-184.32 305.995294-81.92 454.174118 102.4 148.178824 305.995294 184.32 454.174118 81.92C851.727059 671.021176 889.072941 467.425882 785.468235 320.451765zM696.32 762.578824c-142.155294 98.785882-336.112941 63.849412-434.898824-78.305882-98.785882-142.155294-63.849412-336.112941 78.305882-434.898824 142.155294-98.785882 336.112941-63.849412 434.898824 78.305882C873.411765 469.835294 838.475294 663.792941 696.32 762.578824zM680.658824 692.705882l-21.684706 9.637647-21.684706-10.842353 2.409412 24.094118-16.865882 16.865882 24.094118 4.818824 10.842353 21.684706 12.047059-21.684706 24.094118-3.614118-16.865882-18.070588L680.658824 692.705882zM365.025882 339.727059l12.047059-21.684706 24.094118-3.614118L385.505882 296.357647l3.614118-24.094118-21.684706 9.637647-21.684706-10.842353 2.409412 24.094118-16.865882 16.865882 24.094118 4.818824L365.025882 339.727059zM760.169412 604.762353 738.484706 614.4l-21.684706-10.842353 2.409412 24.094118-16.865882 16.865882 24.094118 4.818824 10.842353 21.684706 12.047059-21.684706 24.094118-3.614118-16.865882-18.070588L760.169412 604.762353zM460.197647 268.649412l10.842353 21.684706 12.047059-21.684706 24.094118-3.614118-16.865882-18.070588 3.614118-24.094118-21.684706 9.637647-21.684706-10.842353 2.409412 24.094118-16.865882 16.865882L460.197647 268.649412zM795.105882 524.047059l3.614118-24.094118-21.684706 9.637647-21.684706-10.842353 2.409412 24.094118-16.865882 16.865882 24.094118 4.818824 10.842353 21.684706 12.047059-21.684706 24.094118-3.614118L795.105882 524.047059zM568.621176 263.830588l10.842353 21.684706 12.047059-20.48 24.094118-3.614118-16.865882-18.070588 3.614118-24.094118-21.684706 9.637647L558.983529 216.847059l2.409412 24.094118-16.865882 16.865882L568.621176 263.830588zM579.463529 731.256471l-21.684706 9.637647-21.684706-10.842353 2.409412 24.094118-16.865882 16.865882 24.094118 4.818824 10.842353 21.684706 12.047059-21.684706 24.094118-3.614118-16.865882-18.070588L579.463529 731.256471zM278.287059 393.938824l10.842353 21.684706 12.047059-21.684706 24.094118-3.614118-16.865882-18.070588 3.614118-24.094118-21.684706 9.637647-21.684706-10.842353 2.409412 24.094118-16.865882 16.865882L278.287059 393.938824zM479.472941 725.232941 457.788235 734.870588l-21.684706-10.842353 2.409412 24.094118L421.647059 766.192941l24.094118 4.818824 10.842353 21.684706 12.047059-21.684706 24.094118-3.614118-16.865882-18.070588L479.472941 725.232941zM280.696471 467.425882l3.614118-24.094118-21.684706 9.637647-21.684706-10.842353 2.409412 24.094118-16.865882 16.865882 24.094118 4.818824 10.842353 21.684706 12.047059-21.684706 24.094118-3.614118L280.696471 467.425882zM467.425882 601.148235c-2.409412-6.023529-6.023529-14.456471-12.047059-25.298824-4.818824 1.204706-9.637647 3.614118-14.456471 3.614118 6.023529 9.637647 9.637647 18.070588 12.047059 24.094118 2.409412 7.228235 0 13.251765-8.432941 18.070588l-66.258824 46.983529c-8.432941 6.023529-14.456471 3.614118-20.48-4.818824l-27.708235-39.755294 80.715294-56.621176 6.023529 8.432941 10.842353-8.432941L384.301176 505.976471l-109.628235 75.896471 7.228235 9.637647 97.581176-67.463529 24.094118 34.936471-80.715294 56.621176-13.251765-18.070588-12.047059 8.432941 49.392941 69.872941c9.637647 14.456471 21.684706 16.865882 36.141176 7.228235l72.282353-50.597647C468.630588 624.037647 472.244706 613.195294 467.425882 601.148235zM555.369412 533.684706C555.369412 533.684706 555.369412 533.684706 555.369412 533.684706c0-9.637647-4.818824-20.48-12.047059-34.936471l27.708235-19.275294 3.614118 6.023529 10.842353-7.228235-30.117647-43.369412-36.141176 25.298824-9.637647-13.251765 43.369412-30.117647-6.023529-9.637647-43.369412 30.117647-13.251765-18.070588-10.842353 7.228235 13.251765 18.070588-43.369412 30.117647 6.023529 9.637647 43.369412-30.117647 9.637647 13.251765-36.141176 25.298824 26.503529 37.345882 34.936471-24.094118c6.023529 10.842353 8.432941 20.48 8.432941 27.708235-9.637647-1.204706-19.275294-3.614118-27.708235-7.228235l-6.023529 10.842353c9.637647 4.818824 20.48 7.228235 32.527059 8.432941-3.614118 10.842353-10.842353 24.094118-21.684706 38.550588 4.818824 1.204706 9.637647 2.409412 13.251765 3.614118 12.047059-15.661176 19.275294-30.117647 21.684706-43.369412 20.48-1.204706 42.164706-7.228235 66.258824-20.48 0-4.818824 0-10.842353 0-16.865882C596.329412 524.047059 574.644706 532.48 555.369412 533.684706zM501.157647 515.614118l-13.251765-19.275294 26.503529-18.070588c6.023529 8.432941 9.637647 14.456471 13.251765 19.275294L501.157647 515.614118zM537.298824 490.315294c-6.023529-9.637647-10.842353-15.661176-13.251765-19.275294l26.503529-18.070588 13.251765 19.275294L537.298824 490.315294zM439.717647 458.992941l-12.047059 3.614118c10.842353 30.117647 16.865882 59.030588 18.070588 85.534118 3.614118 2.409412 7.228235 4.818824 12.047059 8.432941 0-9.637647 0-18.070588-1.204706-28.912941l53.007059 77.101176 9.637647-7.228235-67.463529-96.376471C448.150588 487.905882 444.536471 473.449412 439.717647 458.992941zM674.635294 421.647059l39.755294-27.708235 16.865882 25.298824c3.614118 4.818824 2.409412 9.637647-2.409412 13.251765-4.818824 3.614118-10.842353 7.228235-19.275294 12.047059 3.614118 3.614118 7.228235 7.228235 9.637647 9.637647 8.432941-4.818824 14.456471-9.637647 21.684706-14.456471 9.637647-7.228235 12.047059-15.661176 3.614118-26.503529l-74.691765-107.218824-110.832941 77.101176 33.731765 48.188235c12.047059 18.070588 20.48 32.527059 25.298824 43.369412 4.818824 12.047059 7.228235 24.094118 7.228235 36.141176 4.818824 1.204706 9.637647 2.409412 14.456471 3.614118 1.204706-19.275294-4.818824-38.550588-15.661176-57.825882l39.755294-27.708235 30.117647 43.369412 10.842353-7.228235L674.635294 421.647059zM666.202353 324.065882l18.070588 25.298824-39.755294 27.708235L626.447059 351.774118 666.202353 324.065882zM577.054118 385.505882l38.550588-26.503529 18.070588 25.298824-38.550588 26.503529L577.054118 385.505882zM619.218824 445.741176c-4.818824-8.432941-10.842353-16.865882-16.865882-25.298824l38.550588-26.503529 18.070588 25.298824L619.218824 445.741176zM650.541176 386.710588l39.755294-27.708235 18.070588 25.298824-39.755294 27.708235L650.541176 386.710588z"></path></svg>
            </div>
            <div :class="item.name=='超级会员专享'?'hb_item_tips hb_item_svip':'hb_item_tips'">
                <p class="hb_item_tips_tip" v-for="info in item.limit_map" :key="info.id">{{info}}</p>
            </div>
        </section>
        <section class="hb_notMore" v-if="notMore">
            没有更多了~
        </section>
    </div>
</template>

<script>
    import h_header from './header.vue'
    export default {
        name: 'bh_hbHistory',
        data(){
            return {
                user_id:'',
                sid:'',
                offset:0,
                notMore:false,
                expired_hongbaos:[],
            }
        },
        methods:{
            get_hongbao(){
                $.get('/user_info/expired_hongbaos',{
                    user_id:this.user_id,
                    sid:this.sid,
                    offset:this.offset
                },data=>{
                    if(data.length){
                        if(data.length<20){
                            this.notMore = true;
                        }
                        data.map(item=>{
                            this.expired_hongbaos.push(item);
                        });
                        this.offset+=20;
                    }else if(data.message){
                        alert('登录信息已过期,请重新登录');
                        this.$router.push('/wode');
                    }
                });
            },//获取用户红包信息
        },
        mounted(){
            let userInfo = localStorage.getItem('user_id');
            if(userInfo){
                this.user_id = userInfo.split(';')[0].split('=')[1];
                this.sid = userInfo.split('SID=')[1].split(';')[0];
                this.get_hongbao();
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
    /* 头部信息 */
    .hb_h_header{
        z-index: 2;
        position: fixed!important;
        top:0;
        left:0;
        width: 100%;
    }

    /* 整体 */
    .bh_hbHistory{
        z-index:99;
        position: relative;
        padding-top:2.2rem;
        background-color: #f5f5f5;
    }

    /* 红包信息 */
    .hb_item_svip{
        color: #a17c3b;
        background: #fff4be url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNTM4IDI0NCI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik03MDIgMjAzLjU0NlYzMDJhNCA0IDAgMCAxLTQgNEg0YTQgNCAwIDAgMS00LTR2LTk4LjQ1NGM0LjY0LTEuNTg1IDgtNi4yMzUgOC0xMS43MjQgMC01LjQ5LTMuMzYtMTAuMTQtOC0xMS43MjRWNGE0IDQgMCAwIDEgNC00aDY5NGE0IDQgMCAwIDEgNCA0djE3Ni4wOThjLTQuNjQgMS41ODQtOCA2LjIzNC04IDExLjcyNHMzLjM2IDEwLjE0IDggMTEuNzI0eiIvPjxsaW5lYXJHcmFkaWVudCBpZD0iYiIgeDE9IjcxLjUyOSUiIHgyPSIxNy4yODclIiB5MT0iMzkuMjYyJSIgeTI9Ijk1Ljg1MiUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGRkYxQjUiIHN0b3Atb3BhY2l0eT0iMCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI0ZGRjFCNyIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJkIiB4MT0iNzEuNTI5JSIgeDI9IjMwLjQ5NCUiIHkxPSIzOS4yNjIlIiB5Mj0iNzguMjIlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjRkZERTUyIiBzdG9wLW9wYWNpdHk9IjAiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNGRkQzNTMiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iZSIgeDE9IjcwLjA1NyUiIHgyPSIxNy4zNiUiIHkxPSIyMS4wMzMlIiB5Mj0iODguNyUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGOUYwQzEiIHN0b3Atb3BhY2l0eT0iMCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI0ZGRjdEOSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEpIj48bWFzayBpZD0iYyIgZmlsbD0iI2ZmZiI+PHVzZSB4bGluazpocmVmPSIjYSIvPjwvbWFzaz48dXNlIGZpbGw9IiNGRkYiIGZpbGwtb3BhY2l0eT0iMCIgeGxpbms6aHJlZj0iI2EiLz48cGF0aCBmaWxsPSJ1cmwoI2IpIiBkPSJNNTM4LjAyNi0uODl2MjQ0LjIwMkgyOTMuODIzeiIgbWFzaz0idXJsKCNjKSIgb3BhY2l0eT0iLjI0MyIvPjxwYXRoIGZpbGw9InVybCgjZCkiIGQ9Ik01MjYuNDg0IDEuOTc3djE4OC43MThIMzU0LjA5NnoiIG1hc2s9InVybCgjYykiIG9wYWNpdHk9Ii4xMTkiLz48cGF0aCBmaWxsPSJ1cmwoI2QpIiBkPSJNMTczLjM4OC05Mi4xNThWOTYuNTYxSDF6IiBtYXNrPSJ1cmwoI2MpIiBvcGFjaXR5PSIuMDc2Ii8+PHBhdGggZD0iTTE3NS43MDYgMWg0Ni41Nkw0Ny41NiAxOTEuODEzSDF6IiBtYXNrPSJ1cmwoI2MpIi8+PHBhdGggZmlsbD0idXJsKCNlKSIgZD0iTTMyMy43MDYgMWg0Ni41NkwxOTUuNTYgMTkxLjgxM0gxNDl6IiBtYXNrPSJ1cmwoI2MpIiBvcGFjaXR5PSIuNDc0Ii8+PC9nPjwvc3ZnPg==) 0 0 no-repeat  !important;
    }
    .bh_item_used{
        position: absolute;
        top:.1rem;
        right:.2rem;
        width:3.8rem;
        height:3.8rem;
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
        color:#666;
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
        opacity: .5;
        margin:.7rem .55rem 0;
        color:#666;
    }
    .hb_notMore{
        margin:1rem 0 0;
        padding-bottom: 1rem;
        text-align: center;
        font-size: .65rem;
    }

</style>
