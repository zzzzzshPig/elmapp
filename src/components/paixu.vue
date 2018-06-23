<template>
    <div class="px_search_foods">
        <div class="px_paixu px_saixuan_box_child" v-on:click="show_sub($event)">综合排序 <span class="icon icon-down"></span></div>
        <div class="px_saixuan px_saixuan_box_child" v-on:click="show_sub($event)">筛选 <img src="./img/shaixuan.png" alt="图片不见了" style="width:.7rem;height:.7rem;vertical-align: middle;"/></div>
        <div class="px_paixu_sub">
            <div class="px_sub_item"><div class="px_sub_img"><img src="./img/paixu.png" alt="图片不见了" style="width: .6rem;height:.6rem;
        margin-left:.8rem;"/></div><div class="px_sub_text" v-on:click="pingjia">评价最好</div></div>
            <div class="px_sub_item"><div class="px_sub_img"><img src="./img/xiaoliang.png" alt="图片不见了" style="width: .8rem;height:.8rem;
        margin-left:.7rem;"/></div><div class="px_sub_text" v-on:click="xiaoliang">销量最高</div></div>
            <div class="px_sub_item"><div class="px_sub_img"><img src="./img/jiage.png" alt="图片不见了"/></div><div class="px_sub_text" v-on:click="qisong">起送最低价</div></div>
            <div class="px_sub_item"><div class="px_sub_img"><img src="./img/time.png" alt="图片不见了" style="width: 1rem;height:1rem;margin-left:.6rem;"/></div><div class="px_sub_text" style="border:none;" v-on:click="peisong">配送最快</div></div>
        </div>
        <div class="px_shaixuan_sub" v-on:click="shaixuan">
            <div class="px_shaixuan_item">
                <div class="px_shaixuan_title">
                    配送方式
                </div>
                <div class="px_shaixuan_content">
                    <div class="px_shaixuan_content_item">
                        <svg  viewBox="0 0 1024 1024" class="px_shaixuan_contentsvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M882.023 211.692l-525.539 514.815-219.87-214.506c-26.815-26.815-69.713-26.815-96.527 0s-26.815 69.713 0 91.165l262.769 257.409c16.090 10.724 32.174 21.451 48.265 21.451s37.537-5.363 48.265-21.451l573.804-557.717c26.815-26.815 26.815-69.713 0-91.165-21.451-26.815-64.353-26.815-91.165 0z" p-id="1539" fill="#1296db"></path></svg>
                        <img src="./img/fengniao.png" alt="图片不见了" style="width:.77rem;height:.77rem;margin-top:-.2rem;margin-right:.42rem;vertical-align: middle;"/>蜂鸟专送
                    </div>
                </div>
            </div>
            <div class="px_shaixuan_item">
                <div class="px_shaixuan_title">
                    人均消费
                </div>
                <div class="px_shaixuan_content">
                    <div class="px_shaixuan_content_item">
                        <svg  viewBox="0 0 1024 1024" class="px_shaixuan_contentsvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M882.023 211.692l-525.539 514.815-219.87-214.506c-26.815-26.815-69.713-26.815-96.527 0s-26.815 69.713 0 91.165l262.769 257.409c16.090 10.724 32.174 21.451 48.265 21.451s37.537-5.363 48.265-21.451l573.804-557.717c26.815-26.815 26.815-69.713 0-91.165-21.451-26.815-64.353-26.815-91.165 0z" p-id="1539" fill="#1296db"></path></svg>¥20以下
                    </div>
                    <div class="px_shaixuan_content_item">
                        <svg  viewBox="0 0 1024 1024" class="px_shaixuan_contentsvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M882.023 211.692l-525.539 514.815-219.87-214.506c-26.815-26.815-69.713-26.815-96.527 0s-26.815 69.713 0 91.165l262.769 257.409c16.090 10.724 32.174 21.451 48.265 21.451s37.537-5.363 48.265-21.451l573.804-557.717c26.815-26.815 26.815-69.713 0-91.165-21.451-26.815-64.353-26.815-91.165 0z" p-id="1539" fill="#1296db"></path></svg>
                        ¥20~¥40
                    </div>
                    <div class="px_shaixuan_content_item">
                        <svg  viewBox="0 0 1024 1024" class="px_shaixuan_contentsvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M882.023 211.692l-525.539 514.815-219.87-214.506c-26.815-26.815-69.713-26.815-96.527 0s-26.815 69.713 0 91.165l262.769 257.409c16.090 10.724 32.174 21.451 48.265 21.451s37.537-5.363 48.265-21.451l573.804-557.717c26.815-26.815 26.815-69.713 0-91.165-21.451-26.815-64.353-26.815-91.165 0z" p-id="1539" fill="#1296db"></path></svg>
                        ¥40以上
                    </div>
                </div>
            </div>
            <div class="px_shaixuan_item">
                <div class="px_shaixuan_title">
                    <svg  viewBox="0 0 1024 1024" class="px_shaixuan_contentsvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M882.023 211.692l-525.539 514.815-219.87-214.506c-26.815-26.815-69.713-26.815-96.527 0s-26.815 69.713 0 91.165l262.769 257.409c16.090 10.724 32.174 21.451 48.265 21.451s37.537-5.363 48.265-21.451l573.804-557.717c26.815-26.815 26.815-69.713 0-91.165-21.451-26.815-64.353-26.815-91.165 0z" p-id="1539" fill="#1296db"></path></svg>
                    优惠活动
                </div>
                <div class="px_shaixuan_content">
                    <div class="px_shaixuan_content_item">
                        <svg  viewBox="0 0 1024 1024" class="px_shaixuan_contentsvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M882.023 211.692l-525.539 514.815-219.87-214.506c-26.815-26.815-69.713-26.815-96.527 0s-26.815 69.713 0 91.165l262.769 257.409c16.090 10.724 32.174 21.451 48.265 21.451s37.537-5.363 48.265-21.451l573.804-557.717c26.815-26.815 26.815-69.713 0-91.165-21.451-26.815-64.353-26.815-91.165 0z" p-id="1539" fill="#1296db"></path></svg>
                        <span class="huodong_xin huodong">新</span>新用户优惠
                    </div>
                    <div class="px_shaixuan_content_item">
                        <svg  viewBox="0 0 1024 1024" class="px_shaixuan_contentsvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M882.023 211.692l-525.539 514.815-219.87-214.506c-26.815-26.815-69.713-26.815-96.527 0s-26.815 69.713 0 91.165l262.769 257.409c16.090 10.724 32.174 21.451 48.265 21.451s37.537-5.363 48.265-21.451l573.804-557.717c26.815-26.815 26.815-69.713 0-91.165-21.451-26.815-64.353-26.815-91.165 0z" p-id="1539" fill="#1296db"></path></svg>
                        <span class="huodong_te huodong">特</span>特价商品
                    </div>
                    <div class="px_shaixuan_content_item">
                        <svg  viewBox="0 0 1024 1024" class="px_shaixuan_contentsvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M882.023 211.692l-525.539 514.815-219.87-214.506c-26.815-26.815-69.713-26.815-96.527 0s-26.815 69.713 0 91.165l262.769 257.409c16.090 10.724 32.174 21.451 48.265 21.451s37.537-5.363 48.265-21.451l573.804-557.717c26.815-26.815 26.815-69.713 0-91.165-21.451-26.815-64.353-26.815-91.165 0z" p-id="1539" fill="#1296db"></path></svg>
                        <span class="huodong_jian huodong">减</span>下单立减
                    </div>
                    <div class="px_shaixuan_content_item">
                        <svg  viewBox="0 0 1024 1024" class="px_shaixuan_contentsvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M882.023 211.692l-525.539 514.815-219.87-214.506c-26.815-26.815-69.713-26.815-96.527 0s-26.815 69.713 0 91.165l262.769 257.409c16.090 10.724 32.174 21.451 48.265 21.451s37.537-5.363 48.265-21.451l573.804-557.717c26.815-26.815 26.815-69.713 0-91.165-21.451-26.815-64.353-26.815-91.165 0z" p-id="1539" fill="#1296db"></path></svg>
                        <span class="huodong_zeng huodong">赠</span>赠品优惠
                    </div>
                    <div class="px_shaixuan_content_item">
                        <svg viewBox="0 0 1024 1024" class="px_shaixuan_contentsvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M882.023 211.692l-525.539 514.815-219.87-214.506c-26.815-26.815-69.713-26.815-96.527 0s-26.815 69.713 0 91.165l262.769 257.409c16.090 10.724 32.174 21.451 48.265 21.451s37.537-5.363 48.265-21.451l573.804-557.717c26.815-26.815 26.815-69.713 0-91.165-21.451-26.815-64.353-26.815-91.165 0z" p-id="1539" fill="#1296db"></path></svg>
                        <span class="huodong_fan huodong">返</span>下单返红包
                    </div>
                    <div class="px_shaixuan_content_item">
                        <svg  viewBox="0 0 1024 1024" class="px_shaixuan_contentsvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M882.023 211.692l-525.539 514.815-219.87-214.506c-26.815-26.815-69.713-26.815-96.527 0s-26.815 69.713 0 91.165l262.769 257.409c16.090 10.724 32.174 21.451 48.265 21.451s37.537-5.363 48.265-21.451l573.804-557.717c26.815-26.815 26.815-69.713 0-91.165-21.451-26.815-64.353-26.815-91.165 0z" p-id="1539" fill="#1296db"></path></svg>
                        <span class="huodong_ling huodong">领</span>进店领红包
                    </div>
                </div>
            </div>
            <div class="px_shaixuan_item">
                <div class="px_shaixuan_title">
                    商家属性(可多选)
                </div>
                <div class="px_shaixuan_content">
                    <div class="px_shaixuan_content_item">
                        <svg  viewBox="0 0 1024 1024" class="px_shaixuan_contentsvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M882.023 211.692l-525.539 514.815-219.87-214.506c-26.815-26.815-69.713-26.815-96.527 0s-26.815 69.713 0 91.165l262.769 257.409c16.090 10.724 32.174 21.451 48.265 21.451s37.537-5.363 48.265-21.451l573.804-557.717c26.815-26.815 26.815-69.713 0-91.165-21.451-26.815-64.353-26.815-91.165 0z" p-id="1539" fill="#1296db"></path></svg>
                        <span class="shangjia shangjia_pin">品</span>品牌支付
                    </div>
                    <div class="px_shaixuan_content_item">
                        <svg  viewBox="0 0 1024 1024" class="px_shaixuan_contentsvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M882.023 211.692l-525.539 514.815-219.87-214.506c-26.815-26.815-69.713-26.815-96.527 0s-26.815 69.713 0 91.165l262.769 257.409c16.090 10.724 32.174 21.451 48.265 21.451s37.537-5.363 48.265-21.451l573.804-557.717c26.815-26.815 26.815-69.713 0-91.165-21.451-26.815-64.353-26.815-91.165 0z" p-id="1539" fill="#1296db"></path></svg>
                        <span class="shangjia shangjia_bao">保</span>食安保
                    </div>
                    <div class="px_shaixuan_content_item">
                        <svg  viewBox="0 0 1024 1024" class="px_shaixuan_contentsvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M882.023 211.692l-525.539 514.815-219.87-214.506c-26.815-26.815-69.713-26.815-96.527 0s-26.815 69.713 0 91.165l262.769 257.409c16.090 10.724 32.174 21.451 48.265 21.451s37.537-5.363 48.265-21.451l573.804-557.717c26.815-26.815 26.815-69.713 0-91.165-21.451-26.815-64.353-26.815-91.165 0z" p-id="1539" fill="#1296db"></path></svg>
                        <span class="shangjia shangjia_xin">新</span>新店
                    </div>
                    <div class="px_shaixuan_content_item">
                        <svg  viewBox="0 0 1024 1024" class="px_shaixuan_contentsvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M882.023 211.692l-525.539 514.815-219.87-214.506c-26.815-26.815-69.713-26.815-96.527 0s-26.815 69.713 0 91.165l262.769 257.409c16.090 10.724 32.174 21.451 48.265 21.451s37.537-5.363 48.265-21.451l573.804-557.717c26.815-26.815 26.815-69.713 0-91.165-21.451-26.815-64.353-26.815-91.165 0z" p-id="1539" fill="#1296db"></path></svg>
                        <span class="shangjia shangjia_piao">票</span>开发票
                    </div>
                    <div class="px_shaixuan_content_item">
                        <svg  viewBox="0 0 1024 1024" class="px_shaixuan_contentsvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M882.023 211.692l-525.539 514.815-219.87-214.506c-26.815-26.815-69.713-26.815-96.527 0s-26.815 69.713 0 91.165l262.769 257.409c16.090 10.724 32.174 21.451 48.265 21.451s37.537-5.363 48.265-21.451l573.804-557.717c26.815-26.815 26.815-69.713 0-91.165-21.451-26.815-64.353-26.815-91.165 0z" p-id="1539" fill="#1296db"></path></svg>
                        <span class="shangjia shangjia_fu">付</span>在线支付
                    </div>
                </div>
            </div>
            <div class="px_shaixuan_btn">
                <div class="px_btn_clear" v-on:click="clear_shaixuan">
                    清空
                </div>
                <div class="px_btn_enter" v-on:click="enter_shaixuan">
                    确定
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

    /* 筛选 */
    .px_shaixuan_contentsvg{
        display: none;
        width:.77rem;
        height:.77rem;
        margin-top:-.2rem;
        margin-right:.42rem;
        vertical-align: middle;
    }
    .px_shaixuan_sub{
        overflow: hidden;
        opacity:0;
        z-index:40;
        position: absolute;
        top:2rem;
        left:0;
        width:100%;
        height:0;
        background:  #fafafa;
        border-top:1px solid #f6f6f6;
        transition:all .3s;
    }
    .px_shaixuan_title{
        padding:.4rem .78rem;
        background: #fafafa;
        font-size:.5rem;
    }
    .px_shaixuan_content{
        display: flex;
        flex-wrap: wrap;
        background: #fff;
        color:#000;
    }
    .px_shaixuan_content_item{
        width: 33.3%;
        padding:.38rem .8rem;
        border-bottom: .01rem solid #f6f6f6;
        border-right:.01rem solid #f6f6f6;
    }
    .px_shaixuan_content_item:nth-child(3n){
        border-right:none;
    }
    .px_shaixuan_btn{
        display: flex;
        margin-top:.6rem;
    }
    .px_shaixuan_btn div{
        width: 50%;
        height:2rem;
        text-align: center;
        line-height: 2rem;
        font-size:.8rem;
    }
    .px_btn_clear{
        background: #fff;
        color:#ddd;
    }
    .px_btn_enter{
        background: #00d762;
        color:#fff;
    }
    .px_saixuan_open{
        visibility: hidden;
        position: absolute;
        top:0;
        left:0;
        z-index:30;
        width:100%;
        height:100%;
        background: rgba(0,0,0,.2);
    }

    /* 综合排序 */
    .px_saixuan_box_child{
        width:50%;
        text-align: center;
    }
    .px_paixu_sub{
        overflow: hidden;
        opacity:0;
        z-index:40;
        position: absolute;
        top:2rem;
        left:0;
        width:100%;
        height:0;
        background: #fff;
        border-top:1px solid #f6f6f6;
        transition:all .3s;
    }
    .px_sub_item{
        display: flex;
        align-items: center;
        width: 100%;
        height:2.5rem;
        font-size:.5rem;
    }
    .px_sub_text{
        width: 100%;
        padding:.8rem 0;
        border-bottom:1px solid #f6f6f6;
    }
    .px_sub_img img{
        width:.9rem;
        height:.9rem;
        margin-left:.7rem;
        margin-top:.3rem;
    }
    .px_sub_img{
        width: 2.25rem;
    }

    /* 整体布局 */
    .px_search_foods{
        position: relative;
        display: flex;
        align-items: center;
        width:100%;
        padding:.5rem 0;
        background: #fff;
        border-bottom: .01rem solid #f6f6f6;
        font-size:.65rem;
        color:#666;
    }
</style>

<script>
    import duigou from './img/duigou.png'
    import fengniao from './img/fengniao.png'

    export default{
        name:'search_foods',
        data(){
            return{
            }
        },
        methods:{
            show_sub(e){
                //只执行一次 将获取的对象放在原型上
                if(!this.show_sub.once){
                    //获取需要的 dom
                    this.show_sub.paixu_sub = $('.px_paixu_sub');
                    this.show_sub.shaixuan_sub = $('.px_shaixuan_sub');
                    this.show_sub.open = $('.px_saixuan_open');
                    this.show_sub.child = $('.px_saixuan_box').children().eq(0).find('span');
                    this.show_sub.parent = $('.px_foods');

                    //显示 筛选
                    this.show_sub.shaixuan = ()=>{
                        //如果排序被打开，那么就调用 this.show_sub.paixu 函数使其隐藏
                        if(this.show_sub.paixu_sub.css('opacity')=='1'){
                            this.show_sub.paixu();
                        }

                        //如果 隐藏就显示 显示就隐藏
                        if(this.show_sub.shaixuan_sub.css('opacity')=='0'){
                            this.show_sub.shaixuan_sub.css({
                                opacity:'1',
                                height:'19.4rem',
                            })
                        }else{
                            this.hidden_sub();
                            return false;
                        }

                        //背景变黑 不可以下拉
                        this.show_sub.open.css('visibility','visible');
                        this.show_sub.parent.css('overflow-y','hidden');
                    };

                    //显示 排序
                    this.show_sub.paixu = ()=>{

                        //箭头上下变换
                        this.show_sub.child.toggleClass('icon-down');
                        this.show_sub.child.toggleClass('icon-up');

                        //如果筛选被打开，那么就调用 this.show_sub.shaixuan 函数使其隐藏
                        if(this.show_sub.shaixuan_sub.css('opacity')=='1'){
                            this.show_sub.shaixuan();
                        }

                        //如果 隐藏就显示 显示就隐藏
                        if(this.show_sub.paixu_sub.css('opacity')=='0'){
                            this.show_sub.paixu_sub.css({
                                opacity:'1',
                                height:'10rem'
                            })
                        }else{
                            this.hidden_sub();
                            return false;
                        }

                        //背景变黑 不可以下拉
                        this.show_sub.open.css('visibility','visible');
                        this.show_sub.parent.css('overflow-y','hidden');
                    };
                }

                this.show_sub.once = 1;//封闭 上面的if

                this.show_sub.indexN = $(e.currentTarget).index();//获取点击的 dom的index  判断是哪个按钮被点击

                //判断点击的是那个按钮
                if(!this.show_sub.indexN){
                    this.show_sub.paixu();
                }else{
                    this.show_sub.shaixuan();
                }

            },//显示 筛选和排序 列表  动画为height和opacity
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
            clear_shaixuan(){
                //清空样式
                this.peisongfs.click_i&&this.shaixuan.change(this.peisongfs,this.peisongfs.click_i);
                this.xiaofei.click_i&&this.shaixuan.change(this.xiaofei,this.xiaofei.click_i);
                this.huodong.click_i&&this.shaixuan.change(this.huodong,this.huodong.click_i);

                //清空商家属性
                let shangjia = $('.px_shaixuan_item').eq(3).find('.px_shaixuan_content_item');

                shangjia.css({
                    'background':'#fff',
                    'color':'#000',
                });
                (shangjia.find('img').length?shangjia.find('img'):shangjia.find('span')).css('display','inline');
                shangjia.find('svg').css('display','none');

                //被点击的dom清空
                this.peisongfs.click_i = false;
                this.xiaofei.click_i = false;
                this.huodong.click_i = false;

                //参数清空
                this.peisongfs[0] = 0;
                this.xiaofei[0] = 0;
                this.huodong[0] = 0;
                this.shangjia=[];

            },//清空筛选的选择
            enter_shaixuan(){
                this.hidden_sub();
                this.shangjia.map((item,index)=>{
                    if(item==0){
                        this.shangjia[index] = 8;
                    }else if(item==1){
                        this.shangjia[index] = 7;
                    }else if(item==2){
                        this.shangjia[index] = 5;
                    }else if(item==3){
                        this.shangjia[index] = 4;
                    }else if(item==4){
                        this.shangjia[index] = 3;
                    }
                });
                this.$emit('search_food',this.peisongfs,this.xiaofei,this.huodong,this.shangjia,true);
            },//确认筛选项
            pingjia(){
                this.hidden_sub();
                this.food.sort((a,b)=>{
                    let f1 = parseFloat(a.restaurant.rating);
                    let f2 = parseFloat(b.restaurant.rating);
                    return f2-f1;
                });
            },//评价排序
            xiaoliang(){
                this.hidden_sub();
                this.food.sort((a,b)=>{
                    let f1 = parseFloat(a.restaurant.recent_order_num);
                    let f2 = parseFloat(b.restaurant.recent_order_num);
                    return f2-f1;
                });
            },//销量排序
            qisong(){
                this.hidden_sub();
                this.food.sort((a,b)=>{
                    return a.restaurant.float_minimum_order_amount - b.restaurant.float_minimum_order_amount;
                })
            },//起送最快
            peisong(){
                this.hidden_sub();
                this.food.sort((a,b)=>{
                    return a.restaurant.order_lead_time - b.restaurant.order_lead_time;
                })
            },//配送最快
            shaixuan(e){
                const target = $(e.target);
                //  如果是 可以被点击的 dom
                if(target.hasClass('px_shaixuan_content_item')){
                    let parents = target.parents('.px_shaixuan_item');//祖辈元素
                    let ps_index = parents.index();//祖辈元素的索引

                    if(ps_index==4){//点击的是按钮则不执行后面
                        return;
                    }

                    if(!this.shaixuan.once){
                        this.shaixuan.change = function(oldtarget,newtarget,index){
                            /*
                             第一个参数是 之前点击的 dom 没有则不执行if
                             第二个参数是 当前被点击的dom
                             第三个参数是 点击参数的下标  是发送请求的参数
                             */
                            //获取点击 dom 的原始图片和隐藏的svg
                            let newimg = newtarget.find('img').length?newtarget.find('img'):newtarget.find('span');
                            let newsvg = newtarget.find('svg');

                            //如果已经被点击过了 则
                            if(oldtarget.click_i){
                                //获取之前点击的 dom 和 dom下面的图片和svg
                                let oldtarget_i = oldtarget.click_i;
                                let oldimg = oldtarget_i.find('img').length?oldtarget_i.find('img'):oldtarget_i.find('span');
                                let oldsvg = oldtarget_i.find('svg');
                                //不论新点击的是哪个个dom 都将之前点击的dom样式 复原
                                oldtarget_i.css({
                                    'background':'#fff',
                                    'color':'#000',
                                });
                                oldimg.css('display','inline');
                                oldsvg.css('display','none');

                                //如果重复点击 则清空点击的dom 下次判断则跳过这个if
                                if(oldtarget_i.index()==newtarget.index()){
                                    oldtarget.click_i = false;
                                    oldtarget[0]='';//如果没有被点击的元素 则清空数组
                                }else{//如果点击的是其他的 则使新dom 改变样式 并且将点击的dom变成点击后的dom
                                    newtarget.css({
                                        'background':'#edf5ff',
                                        'color':'#3190e8',
                                    });
                                    newimg.css('display','none');
                                    newsvg.css('display','inline');
                                    oldtarget.click_i = newtarget;
                                    oldtarget[0] = index+1;//如果有被点击的元素 则获取当前索引 并+1
                                }
                            }else{//如果没有被点击过 则将点击的dom  样式改变 并且将点击的dom变成点击后的dom
                                newtarget.css({
                                    'background':'#edf5ff',
                                    'color':'#3190e8',
                                });
                                newimg.css('display','none');
                                newsvg.css('display','inline');
                                oldtarget.click_i = newtarget;
                                oldtarget[0] = index+1;//如果有被点击的元素 则获取当前索引 并+1
                            }

                        };//改变点击时候的样式
                    }//只执行一次

                    this.shaixuan.once = 1;//门 只执行一次

                    let p_index = target.index();//父辈元素的索引
                    //判断点击的 dom  是四个列表里面的哪一个
                    if(ps_index==0){
                        this.shaixuan.change(this.peisongfs,target,p_index);
                    }else if(ps_index==1){
                        this.shaixuan.change(this.xiaofei,target,p_index);
                    }else if(ps_index==2){
                        this.shaixuan.change(this.huodong,target,p_index);
                    }else if(ps_index==3){//可多选项
                        let img = target.find('img').length?target.find('img'):target.find('span');
                        let svg = target.find('svg');
                        let index = target.index();

                        if(svg.css('display')=='none'){
                            target.css({
                                'background':'#edf5ff',
                                'color':'#3190e8',
                            });
                            img.css('display','none');
                            svg.css('display','inline');
                            this.shangjia.push(index);
                        }else{
                            target.css({
                                'background':'#fff',
                                'color':'#000',
                            });
                            img.css('display','inline');
                            svg.css('display','none');
                            let indexOf = this.shangjia.indexOf(index);
                            this.shangjia.splice(indexOf,1);
                        }
                    }
                }
            },//事件代理 给父级添加一个事件 监听target
        },
        props:{
            food:Array,
            peisongfs:Array,
            xiaofei:Array,
            huodong:Array,
            shangjia:Array,
        },
    }

</script>