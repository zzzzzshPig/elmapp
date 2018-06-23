<template>
    <div class="ui_userInfo">
        <h_header :title="'账户信息'"></h_header>
        <main>
            <section class="ui_itemBox">
                <div class="ui_item">
                    <h3 class="ui_item_name">头像</h3>
                    <div class="ui_item_Img" v-html="info_img(info.avatar)"></div>
                    <span class="icon icon-right wd_arrow_right"></span>
                </div>
            </section>
            <section class="ui_itemBox">
                <div class="ui_item">
                    <h3 class="ui_item_name">用户名</h3>
                    <p class="ui_item_text">{{info&&info.username}}</p>
                </div>
            </section>
            <section class="ui_itemBox">
                <div class="ui_item_title">
                    帐号绑定
                </div>
                <div class="ui_item">
                    <h3 class="ui_item_name"><svg style="margin-right:.3rem;" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20"><path d="M702.699388 60.945047 321.284238 60.945047c-57.463044 0-104.022314 46.591131-104.022314 104.018052l0 693.454702c0 57.426921 46.560293 104.019075 104.022314 104.019075l381.416174 0c57.463044 0 104.022314-46.592155 104.022314-104.019075L806.722726 164.963099C806.722726 107.537202 760.163456 60.945047 702.699388 60.945047zM477.317197 95.617731l69.349233 0c9.582632 0 17.336541 7.754614 17.336541 17.33583 0 9.582239-7.753909 17.336854-17.336541 17.336854l-69.349233 0c-9.581609 0-17.336541-7.754614-17.336541-17.336854C459.980656 103.372346 467.735588 95.617731 477.317197 95.617731zM511.992325 920.077116c-24.482581 0-44.324277-19.840884-44.324277-44.322461 0-24.480554 19.84272-44.322461 44.324277-44.322461 24.481557 0 44.324277 19.84293 44.324277 44.322461C556.317626 900.237255 536.473882 920.077116 511.992325 920.077116zM737.373493 771.736603c0 9.582239-7.753909 17.33583-17.336541 17.33583L303.946674 789.072433c-9.582632 0-17.337564-7.753591-17.337564-17.33583L286.60911 182.299953c0-9.582239 7.754932-17.33583 17.337564-17.33583l416.090278 0c9.582632 0 17.336541 7.754614 17.336541 17.33583L737.373493 771.736603z" fill="#0097ff"></path></svg>手机</h3>
                    <p class="ui_item_text">{{info&&info.mobile}}</p>
                    <span class="icon icon-right wd_arrow_right"></span>
                </div>
            </section>
            <section class="ui_itemBox">
                <div class="ui_item_title">
                    安全设置
                </div>
                <div class="ui_item">
                    <h3 class="ui_item_name" style="font-weight: normal">登录密码</h3>
                    <p class="ui_item_text" style="color:#0097ff;">修改</p>
                    <span class="icon icon-right wd_arrow_right"></span>
                </div>
            </section>
            <section class="ui_item_exit" v-on:click="user_exit">退出登录</section>
        </main>
    </div>
</template>

<script>
    import h_header from './header.vue';
    export default {
        name: 'ui_userInfo',
        data(){
            return {
                info:''
            }
        },
        mounted(){
            let user_id = localStorage.getItem('user_id');
            let user_info = localStorage.getItem('user_info');
            if(user_id){
                this.info = JSON.parse(user_info)
            }else{
                alert('登录信息已过期,请重新登录');
                this.$router.push('/login');
            }
        },
        methods:{
            back_page(){
                history.back();
            },//返回上一个页面
            info_img(String_imgPath){
                let result = '';

                let defaultHtml = '<svg style="padding-top:.3rem;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><path d="M507.7504 3.4816c18.44736 0.00512 36.82304 2.2272 54.74304 6.6048a269.79328 269.79328 0 0 1 51.22048 17.75104 231.84384 231.84384 0 0 1 42.61888 25.37472 154.0096 154.0096 0 0 1 28.93824 28.42624 223.90784 223.90784 0 0 1 36.36224 71.51616 523.5712 523.5712 0 0 1 16.03584 74.56768 635.32544 635.32544 0 0 1 5.07904 82.11456 38.7072 38.7072 0 0 1 10.56256 13.17376 77.66016 77.66016 0 0 1 5.8624 18.26304c1.68448 9.03168 1.95072 18.26304 0.78336 27.37664a111.90272 111.90272 0 0 1-8.21248 33.97632 70.68672 70.68672 0 0 1-14.07488 19.7888 46.03392 46.03392 0 0 1-17.98656 11.14624 1026.44736 1026.44736 0 0 1-9.37984 32.45568c-3.52256 8.79616-7.04512 17.39776-10.95168 25.8816a70.4256 70.4256 0 0 1-14.08 19.7888 970.0352 970.0352 0 0 0-29.71136 25.88672 63.01696 63.01696 0 0 0-15.25248 36.01408 136.06912 136.06912 0 0 0-1.95584 30.9248c0.91136 10.8288 3.6864 21.40672 8.21248 31.2832a98.24768 98.24768 0 0 0 21.89824 29.91104 138.00448 138.00448 0 0 0 41.84064 25.37984 437.12512 437.12512 0 0 0 52.00384 18.26304 564.13696 564.13696 0 0 1 54.74304 18.76992 194.80064 194.80064 0 0 1 47.31392 26.3936 85.5552 85.5552 0 0 1 29.32736 43.01312 227.2768 227.2768 0 0 1 7.04 40.07936 492.9024 492.9024 0 0 1 2.34496 48.20992 280.6784 280.6784 0 0 1-3.51744 45.6704 90.63424 90.63424 0 0 1-9.77408 32.45568 56.07936 56.07936 0 0 1-27.37664 14.19776 529.83808 529.83808 0 0 1-55.13216 13.68576c-22.28736 4.38272-46.53056 8.28928-73.90208 11.72992a2105.78944 2105.78944 0 0 1-81.3312 8.64256 2471.8848 2471.8848 0 0 1-78.98624 5.59616c-25.02656 1.36704-46.91968 2.03264-65.30048 2.03264s-39.8848-0.6656-64.51712-2.03264c-24.63744-1.37216-49.664-3.21024-75.85792-5.59616a2881.6896 2881.6896 0 0 1-77.81376-8.13568c-25.80992-3.05152-49.26976-6.25664-70.37952-9.61536-21.11488-3.36384-38.71232-6.76352-53.57056-10.1632A70.56384 70.56384 0 0 1 138.24 974.12096a89.30304 89.30304 0 0 1-14.85824-49.69984 402.64704 402.64704 0 0 1 4.3008-107.5712 85.4784 85.4784 0 0 1 28.15488-57.32352 183.36256 183.36256 0 0 1 54.35392-31.27808 706.6624 706.6624 0 0 1 64.51712-20.80256 199.86432 199.86432 0 0 0 59.04384-26.3936 139.49952 139.49952 0 0 0 30.49984-25.37984 83.16416 83.16416 0 0 0 15.24736-24.36096 62.94016 62.94016 0 0 0 5.08416-25.37984c0-8.78592-0.39424-18.60096-1.1776-29.44512a56.86272 56.86272 0 0 0-15.25248-37.03296 526.3616 526.3616 0 0 0-29.71136-27.91936 62.54592 62.54592 0 0 1-13.29664-19.7888 1870.37184 1870.37184 0 0 1-10.55744-25.8816 999.89504 999.89504 0 0 1-9.37984-32.45568 42.4704 42.4704 0 0 1-13.29152-7.1168 79.34464 79.34464 0 0 1-12.51328-14.19264 84.8896 84.8896 0 0 1-11.3408-26.3936 71.15776 71.15776 0 0 1-4.3008-31.27808c0.66048-8.30464 2.37056-16.49152 5.08416-24.36608a67.41504 67.41504 0 0 1 12.51328-21.30944 509.34784 509.34784 0 0 1 3.90656-77.1072 474.47552 474.47552 0 0 1 13.69088-69.99552 218.40896 218.40896 0 0 1 30.1056-66.97984 187.74016 187.74016 0 0 1 40.66816-46.1824 202.9568 202.9568 0 0 1 45.7472-27.91936 190.01856 190.01856 0 0 1 46.91968-13.68576 301.07136 301.07136 0 0 1 45.3632-3.5584V3.4816z m0 0" fill="#ddd" ></path></svg>';

                let path = String_imgPath;

                if(path){
                    let format = path.match(/(jpeg|png|jpg|bmp)/)[0];
                    result = `<img src="https://fuss10.elemecdn.com/${path.slice(0,1)}/${path.slice(1,3)}/${path.slice(3)}.${format}?imageMogr/format/webp/thumbnail/!96x96r/gravity/Center/crop/96x96/">`;
                }else {
                    result = defaultHtml;
                }

                return result;
            },//有登录信息就获取用户图片 否则就显示默认  用户没有设置图片也显示默认
            user_exit(){
                localStorage.removeItem('user_id');
                this.$router.push('/wode');
            }//用户退出登录
        },
        components:{
            h_header
        }
    }
</script>

<style scoped>
    .ui_userInfo{
        z-index:99;
        position: relative;
        height:100%;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    /* 退出登录 */
    .ui_item_exit{
        margin-top:1rem;
        padding:.65rem 0;
        background-color: #fff;
        font-weight: bold;
        text-align: center;
        color:#ff5339;
    }

    /* 右箭头 */
    .wd_arrow_right{
        margin-left: .2rem;
        font-size:.5rem;
        font-weight: bold;
        color:#bbb;
    }

    /* 头像 */
    .ui_item_Img{
        overflow:hidden;
        width:2.5rem;
        height:2.5rem;
        background-color:#fff;
        border-radius: 50%;
    }

    /* 可视项 */
    .ui_item_title{
        padding:.7rem .7rem .2rem;
        font-size:.6rem;
        color:#999;
    }
    .ui_item:first-child{
        padding:.5rem .7rem;
        border-bottom:1px solid #eee;
    }
    .ui_item{
        display: flex;
        align-items: center;
        padding:.6rem .7rem;
        background-color: #fff;
    }
    .ui_item_name{
        display: flex;
        align-items: center;
        flex:1;
        font-size:.8rem;
    }
</style>
