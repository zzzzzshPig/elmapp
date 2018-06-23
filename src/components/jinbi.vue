<template>
    <div class="jn_jinbi" v-if="jinbi_shop.length">
        <header class="jn_head">
            <p class="jn_head_Num">{{info.point}}<span class="icon icon-right jn_head_right"></span></p>
            <p class="jn_head_guide">当前金币 <a class="jn_head_icon" href="https://h5.ele.me/service/#ecoin"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" p-id="1514" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M481.5 65.5c-229.2 0-415 185.8-415 415s185.8 415 415 415 415-185.8 415-415-185.8-415-415-415z m0 766.2c-193.6 0-351.2-157.5-351.2-351.2s157.5-351.2 351.2-351.2 351.2 157.5 351.2 351.2-157.6 351.2-351.2 351.2z" fill="#ffffff"></path><path d="M481.5 257.1c-77.2 0-141.6 54.8-156.4 127.7h66.5c13.2-37.1 48.3-63.8 89.9-63.8 52.8 0 95.8 43 95.8 95.8 0 41.6-26.8 76.7-63.8 89.9v5.9h-63.8v127.7h63.8v-67.1c72.9-14.8 127.7-79.2 127.7-156.4-0.1-88.3-71.6-159.7-159.7-159.7zM449.5 704h63.8v63.8h-63.8z" fill="#ffffff"></path></svg></a></p>
        </header>
        <main>
            <section class="jn_main_head">
                <h4 class="jn_main_head_title">兑换商品</h4>
                <small class="jn_main_head_small">好物随心换</small>
            </section>
            <section class="jn_main_list">
                <a :href="item.url" class="jn_main_item" v-for="item in jinbi_shop" :key="item.id">
                    <p class="jn_main_item_name">{{item.title}}</p>
                    <div class="jn_main_item_price">
                        <span class="jn_main_price_num">{{item.points_required}}</span>
                        <span class="jn_main_price_text">金币</span>
                        <span class="jn_main_price_hd">{{item.corner_marker}}</span>
                    </div>
                    <img  class="jn_main_item_img" :src="find_img(item.image_hash)+'?imageMogr/format/webp/thumbnail/!315x195r/gravity/Center/crop/315x195/'" alt="图片不见了"/>
                </a>
            </section>
            <a class="jn_main_more" href="https://home.m.duiba.com.cn/chome/index?from=login&spm=14695.1.1.1">查看更多 <span class="jn_main_more_icon icon icon-right"></span></a>
        </main>
    </div>
</template>

<script>
    export default {
        name: 'jn_jinbi',
        data(){
            return {
                jinbi_shop:[],
                info:''
            }
        },
        methods:{
            find_img(String_path){
                let path = String_path+'';
                let format = path.match(/(jpeg|png|jpg|bmp)/)[0];
                return `https://fuss10.elemecdn.com/${path.slice(0,1)}/${path.slice(1,3)}/${path.slice(3)}.${format}`;
            },//将返回的img路径改为有效的img路径  967284af9fb1b499192d2476648c3ccfjpeg  需要转化为 https://fuss10.elemecdn.com/9/67/284af9fb1b499192d2476648c3ccfjpeg.jpeg
        },
        mounted(){
            let user_id = localStorage.getItem('user_id');
            let sid = user_id.split('SID=')[1].split(';')[0];
            let id = user_id.split(';')[0].split('=')[1];

            $.get('/user_info',{
                id:id,
                sid:sid
            },data=>{
                this.info = data;
            });
            $.get('/user_info/suggest',data=>{
                this.jinbi_shop = data;
            });
        },
    }
</script>

<style scoped>
    .jn_jinbi{
        z-index:99;
        position: relative;
        height:100%;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    /* 查看更多 */
    .jn_main_more_icon{
        font-size:.5rem;
        transform: scale(.7);
    }
    .jn_main_more{
        display: flex;
        justify-content: center;
        padding:.5rem 0;
        background-color: #fff;
        border-top: 1px solid #eee;
        text-align: center;
        font-size: .6rem;
        color: #999;
    }

    /* 数据列表 */
    .jn_main_price_hd{
        padding: 0 1.066667vw;
        height: 3.466667vw;
        border-radius: .533333vw;
        background: #f94843;
        color: #fff;
        font-size: .5rem;
    }
    .jn_main_price_text{
        font-size: .5rem;
        color: #999;
    }
    .jn_main_price_num{
        font-weight: 600;
        font-size: .7rem;
        color: #ff5339;
    }
    .jn_main_item_name{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: .7rem;
        color:#333;
    }
    .jn_main_item_img{
        width: 42vw;
        height: 26vw;
    }
    .jn_main_list{
        display: flex;
        flex-wrap: wrap;
    }
    .jn_main_item:nth-child(2n){
        border-left: 1px solid #eee;
    }
    .jn_main_item{
        width: 50%;
        height: 45.333333vw;
        padding: 2.666667vw 4vw;
        border-top: 1px solid #eee;
        box-sizing: border-box;
    }
    .jn_main_list{
        background-color: #fff;
    }

    /* 主体头部 */
    .jn_main_head_title{
        font-size:.75rem;
    }
    .jn_main_head_small{
        font-size: .5rem;
        color:#999;
        transform: scale(.9);
        transform-origin:50% 0;
        line-height: 3.2vw;
    }
    .jn_main_head{
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        height:16vw;
        background: #fff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXwAAABkCAMAAACyy3u6AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAB4UExURf/////qn//qoP///rzf///++v/pmv/kh//+/P/WRv/khv///f/qo//jg//rpv/sq//YTrrd///pnf/99Pv+///22qHtrv/usv/ol//0zsjk///nj/745P7xwtHp///wu/b8+67wuNX32ubz//vbadzu/8j1z/roqlMMaS0AAAPLSURBVHja7d3bctsgFAVQJBmEkNAFWZVv8iVxkv//w7oaG9SSl07rQ0v2emJ43GEO+EBsBgDwOw5i5Axo8YzN+k1hkD6tw7Up2YyboioZEOpNW/F7+lWbYu2T4psilWwmTYH0aXFR2LWP9IkMH72NPHmkn2DXJdEUgtu1X9tdF+lT4KatbfptI90s0n8+WRfGL/ayxtqnMBd7V3n+jV2X9z1ncfP2V161gtvZhLMg+HYU+71otj2L1+Fx0Elt+jItFukbyQLYCq3VjdabLYsVv7qc3a6bFqk3S0melM7vlI62zSebVnj7qz9LbNIqd/RYxpp+tTzkJ67yGDtLvusOSuVLOtrKwyuXc+KGNn36XZcnOv+J2vQs5rXvR+7NkhlUbtmlH3H6G7fKK2kjt+kbO0vhpL3wm4zFitet4HaYuKEJ0d8vKy98JTiLVulaa9L108p6OftBd62gvPD3PYvP0Psne1M0iyL0GIorZzSk+CLhC1vsm9bY4VXYoStCJ6rws69SdsblpmrscDmbSDaTWcANd8xYfHhaVNKVGzt0s6JoSkZryFX0R03/SFOkn5x5Ulv3qcha/5J9hFXHNRL89kISsr1w+HnpKzWwSPHUu8VyPQU3S2qr1CJ7PbFo8dRrJHh/E0Odfm77mjqfJIuX/LSRwJPlbE1deepca6W0VunAIuXfo5hPh6I9MFrlcKrFpjoNnEVONoVxjYTEv0fhU4AMMikzFjlX1t3rBbybIj/z+K8XUqRPtuva4calL5A+xdpfPM9fvJfFm0Hqpn7TblxT30gGJLuuf69rPhjQ7rou/YwBhTlyd6veM6A981QS6Yfs79vhxCBUl+2AQyYx/nE94WwZDOc44AD8gbLvsWsEMlT7fbLFN2iEMKn5HnDE7k1vUOrx4AmojTqf6QR1n5rcqMcLYzQpqJUC4f8DZQffGEbvkKvHQ0t4qvP58yd/SucTehVPdX6/XN7X/tofhRix7p8re/9288J8Jcr9s50v324uCDqA7B4+ansQ97IDIaxfLpcXLPxQsr8R/fqGQQjrt91qtXtD/AGcd13Xrbpud2ZAbL3rVrNuh7VP7bVb3XVvDGgdb+Fj6YerOhbCR/goO0C74b4yIHbEUTOc9bGbHfEhK4TX4253fCVc9/hlgC+on8R+bya8qAngIPT8iNUgfXK90PlM44fIyE0/sscT4iC4ceHXuP2j1e+V+1kA1B2EHz//C+p1g7JDbPsIX2k8paTGa33PvsF/q5Hrm/lDlhrxISsAOTTCjAMKfiAlkgcAAAAAAPg/fAfJ8j4/TEYE4wAAAABJRU5ErkJggg==) 50% 50% no-repeat;
        background-size: 50.666667vw 13.333333vw;
    }

    /* 头部信息 */
    .jn_head_icon{
        width: 13px;
        height:13px;
        margin-left: .2rem;
    }
    .jn_head_guide{
        display: flex;
        align-items: center;
        margin-top: -.4rem;
        font-size:.6rem;
    }
    .jn_head_right{
        font-weight: normal;
        margin-top: -.3rem;
        margin-left: .3rem;
        font-size: .7rem;
    }
    .jn_head_Num{
        font-size: 2.1rem;
        font-weight: bold;
    }
    .jn_head{
        padding:.9rem 1.5rem 0;
        height:29.333333vw;
        background-image: linear-gradient(90deg,#0af,#0085ff);
        color:#fff;
    }
</style>
