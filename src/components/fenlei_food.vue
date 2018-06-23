<template>
    <main class="wm_shoplist">
        <section v-on:click="showlist($event,index,item.id)" class="wm_shoplist_item" :key="item.id" v-for="(item,index) in shopInfos">
            <div class="wm_shopInfo" :data-item="item = item.restaurant">
                <img :src="find_img(item.image_path)+'?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/'" alt="图片不见了" class="wm_shopInfo_img"/>
                <div class="wm_shopInfo_info_box">
                    <div class="wm_info_nameBox">
                        <h2 class="wm_info_name"><span class="pinpai" v-if="item.is_premium">品牌</span>{{item.name}}</h2>
                        <span class="wm_info_bao" :key="support.id" v-for="support in item.supports" :style="'color:#'+support.icon_color">{{support.icon_name}}</span>
                    </div>
                    <div class="wm_shopInfo_info_box1">
                        <div class="wm_info_box1_box">
                            <div class="rateYo" :data-rateyo-rating="item.rating" :data-loadStar="loadStar(index,item.rating)" data-rateyo-normal-fil="#666" data-rateyo-star-width="12px"></div>
                            <p class="wm_shopsale wm_shoplist_color">{{item.rating?item.rating:''}} 月售{{item.recent_order_num}}</p>
                        </div>
                        <div class="zhuanSong" v-if="item.delivery_mode" style="margin-top:.04rem;">蜂鸟专送</div>
                    </div>
                    <div class="wm_shopInfo_info_box2 wm_shoplist_color">
                        <div class="wm_qisong">¥{{item.float_minimum_order_amount}}起送<span class="wm_peisong">配送费¥{{item.float_delivery_fee}}</span></div>
                        <div class="wm_howFar">
                            <div class="wm_Far">{{distance(item.distance)}}<span class="wm_peisong">{{item.order_lead_time}}分钟</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wm_otherInfo">
                <div class="wm_otherInfo_koubei"></div>
                <div class="WM_otherInfo_huodong">
                    <div class="WM_huodong_one" v-if="item.recommend.reason">
                        <img src="./img/koubei.png" alt="图片不见了" style="width:.5rem;height:.5rem;margin-right:.1rem;"/><span style="color:red;" >口碑人气好店</span>
                    </div>
                    <div class="WM_huodong_two">
                        <div class="WM_huodong_two_box1">
                            <div class="WM_cuxiao wm_shoplist_color" :key="i.id" v-for="i in item.activities">
                                <span class="wm_huodong_bg" :style="'background: #'+i.icon_color">{{i.icon_name}}</span>{{i.tips}}
                            </div>
                        </div>
                        <div class="WM_huodonglist" v-if="item.activities.length<=2?false:true">{{item.activities.length}}个活动<span class="icon icon-caret wm_icon_listdowm"></span></div>
                    </div>
                </div>
            </div>
        </section>
        <div style="height:2rem;">
            <div class="wm_loading" v-if="loading"><img src="./img/loading.gif" alt="图片不见了" style="width:.8rem;height:.8rem;vertical-align: top;margin-right:0.3rem;"/>加载中...</div>
            <div class="wm_loading" v-if="notHave">没有更多了哦~</div>
        </div>
    </main>
</template>

<script>
    import rate from '../../static/jquery.rateyo.min'

    export default{
        name:'flf_fenlei_food',
        data(){
            return{

            }
        },
        methods:{
            distance(km){
                return km>1000?(km/1000).toFixed(2)+'km':km+'m';
            },//将M转化为KM，只对 1K 以上有效
            showlist(e,index,id){
                if($(e.target).hasClass('WM_huodonglist')||$(e.target).hasClass('icon'))
                {
                    let shoplist = $('.WM_huodong_two').eq(index);

                    let icon = shoplist.find('.WM_huodonglist span');

                    icon.toggleClass('icon-up');
                    icon.toggleClass('icon-caret');

                    if(shoplist.css('overflow')==='visible'){
                        shoplist.css({
                            'overflow':'hidden',
                            'maxHeight':'2.3rem',
                        })
                    }else{
                        shoplist.css({
                            'overflow':'visible',
                            'maxHeight':'none',
                        })
                    }
                }else{
                    this.$router.push('/shop?id='+id);
                }
            },
            loadStar(index,roteing){
                //加载星星  在每次V-for的时候渲染
                if(!!roteing)
                {
                    setTimeout(()=>{
                        $('.wm_shoplist').find('.rateYo').eq(index).rateYo({
                            readOnly: true,
                            ratedFill: "#e7b314"
                        });
                    },0)
                }

            },
            find_img(String_path){
                let path = String_path+'';
                let format = path.match(/(jpeg|png|jpg|bmp)/)[0];
                return `https://fuss10.elemecdn.com/${path.slice(0,1)}/${path.slice(1,3)}/${path.slice(3)}.${format}`;
            },//将返回的img路径改为有效的img路径  967284af9fb1b499192d2476648c3ccfjpeg  需要转化为 https://fuss10.elemecdn.com/9/67/284af9fb1b499192d2476648c3ccfjpeg.jpeg
        },
        props:{
            shopInfos:Array,
            loading:Boolean,
            notHave:Boolean,
        }
    }
</script>

<style src="../../static/jquery.rateyo.min.css"></style>
<style scoped>
    /* 品牌标签 */
    .pinpai{
        margin-right: .3rem;
        padding:.05rem .1rem;
        background:linear-gradient(-139deg,#fff100,#ffe339);
        font-weight: 700;
        font-size: .5rem;
        text-align: center;
        white-space: nowrap;
        color:#6f3f15;
        border-radius: .12rem;
    }

    /* 加载中 */
    .wm_loading{
        width: 100%;
        padding:.6rem 0;
        text-align: center;
        font-size:.5rem;
        color: #666;
    }

    /* 商店列表 */
    .wm_shoplist{
        background: #fff;
        font-size:.5rem;
        color:#666;
    }
    .wm_shoplist_item{
        padding:.6rem .5rem;
        border-bottom:1px solid #eee;
    }
    .wm_shopInfo{
        display: flex;
        justify-content:space-between;
        height:3.2rem;
    }
    .wm_shopInfo_img{
        width:3.2rem !important;
        height:3.2rem !important;
        border:1px solid #dcdcdc;
    }
    .wm_shopInfo_info_box{
        display: flex;
        align-items: center;
        flex: 1;
        flex-wrap: wrap;
        height:1rem;
        margin-left: .5rem;
    }
    .wm_info_nameBox{
        display: flex;
        align-items: center;
        flex: 1;
    }
    .wm_info_name{
        flex: 1;
        overflow: hidden;
        font-size:.75rem;
        color:#333;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .wm_info_bao{
        padding:0 .1rem;
        border: 1px solid #ddd;
        font-size:.5rem;
        transform: scale(.9);
    }
    .wm_info_box1_box{
        display: flex;
        align-items: center;
    }
    .wm_shopInfo_info_box1{
        display: flex;
        justify-content: space-between;
        width:100%;
        height:.78rem;
        margin-top:.3rem;
    }
    .rateYo{
        position: relative;
        z-index:0;
        margin: 0 .2rem 0 0 !important;
        padding:0 !important;
    }
    .wm_shopInfo_info_box2{
        display: flex;
        width:100%;
        margin-top:.35rem;
        justify-content: space-between;
    }
    .wm_peisong::before{
        margin: 0 .8vw;
        color: #ddd;
        content: "|";
    }
    .wm_howFar{
        color:#999;
    }
    .wm_otherInfo{
        padding-left:3.7rem;
    }
    .WM_otherInfo_huodong{
        margin-top:.5rem;
    }
    .wm_huodong_bg{
        padding:.05rem .1rem;
        margin-right:.3rem;
        color:#fff;
        border-radius: .1rem;
        -webkit-tap-highlight-color: transparent;
    }
    .WM_huodong_two_box1{
        flex: 1;
    }
    .WM_huodong_two{
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        margin-top:.4rem;
        padding-top:.2rem;
        max-height:2.3rem;
        border-top: 1px dotted #d9d9d9;
    }
    .WM_cuxiao{
        overflow: hidden;
        padding-top:.2rem;
        width: 100%;
        height:1rem;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .WM_huodonglist{
        margin-top:.2rem;
        font-size:.5rem;
        color:#999;
    }
    .wm_shoplist_color{
        color:#666;
    }
    .wm_icon_listdowm{
        margin-left:.1rem;
    }
</style>