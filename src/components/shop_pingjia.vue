<template>
    <div class="spj_pingjia">
        <header :key="score.id" v-for="score,index in scores">
            <div v-if="!score.overall_score" style="width:100%;margin-bottom:.5rem;padding:.5rem;background-color:#fff;text-align: center">
                <p style="font-size:.5rem;">该商家近期的评价不足，无法计算综合得分</p>
                <p style="font-size:.5rem;color:#7e7e7e;">亲，在订单确认送达后记得来评价哦~~</p>
            </div>
            <div v-if="score.overall_score" class="spj_pingjia_head" >
                <div class="spj_head_left">
                    <strong class="spj_head_zonghe spj_head_pingfen">{{score.overall_score&&score.overall_score.toFixed(1)}}</strong>
                    <p class="spj_head_zonghepingjia">综合评价</p>
                    <p class="spj_head_tonghang">高于周边商家{{score.compare_rating&&(score.compare_rating*100).toFixed(1)}}%</p>
                </div>
                <div class="spj_head_right">
                    <div class="spj_head_fuwu">
                        <span>服务态度</span>
                        <div class="rateYo" :data-rateyo-rating="score.service_score&&score.service_score.toFixed(1)" data-rateyo-normal-fil="#666" data-rateyo-star-width="12px"></div>
                        <span class="spj_head_pingfen">{{score.service_score&&score.service_score.toFixed(1)}}</span>
                    </div>
                    <div class="spj_head_food">
                        <span>菜品评价</span>
                        <div class="rateYo" :data-rateyo-rating="score.overall_score&&score.overall_score.toFixed(1)" :data-loadStar="loadStar()"  data-rateyo-normal-fil="#666" data-rateyo-star-width="12px"></div>
                        <span class="spj_head_pingfen">{{score.overall_score&&score.overall_score.toFixed(1)}}</span>
                    </div>
                    <div class="spj_head_time">
                        <span>送达时间</span>
                        &nbsp;&nbsp;&nbsp;<span>{{score.deliver_time}}分钟</span>
                    </div>
                </div>
            </div>
        </header>
        <main class="spj_main">
            <ul class="spj_title">
                <li class="spj_title_item" :key="tag.id" v-for="tag in tags" v-on:click="searchTag(tag.name)">{{tag.name}}({{tag.count}})</li>
            </ul>
            <section class="spj_main_item" :key="rate.id" v-for="rate,index in rating">
                <img src="https://fuss10.elemecdn.com/c/f5/d0b0f2fc83f3ac3e4a0cfae891256png.png?imageMogr/format/webp/thumbnail/!60x60r/gravity/Center/crop/60x60/" alt="图片不见了" class="spj_item_userImg"/>
                <div class="spj_item_info">
                    <span class="spj_item_userName">{{rate.username}}</span><span class="spj_item_time">{{rate.rated_at}}</span>
                    <div class="rateYoBox">
                        <div class="rateYo rateYo_s" :data-rateyo-rating="rate.rating" :data-loadStar="loadStar(index,true)"  data-rateyo-normal-fil="#666" data-rateyo-star-width="12px"></div>
                        <span class="spj_item_orderTime">{{rate.time_spent_desc}}</span>
                    </div>
                    <p class="spj_item_text">{{rate.rating_text}}</p>
                    <img :src="find_img(img.image_hash)" alt="图片不见了" class="spj_item_foodImg" :key="img.id" v-for="img in rate.order_images"/>
                    <ul class="spj_item_biaoqianBox">
                        <li class="spj_item_biaoqian" :key="biaoqian.id" v-for="biaoqian in rate.food_ratings">{{biaoqian.rate_name}}</li>
                    </ul>
                </div>
            </section>
        </main>
    </div>
</template>

<style scoped>
    /* 用户评论 */
    .spj_item_text{
        margin:.2rem 0;
        font-size:.7rem;
    }
    .spj_item_biaoqian{
        display: inline-block;
        max-width: 4rem;
        margin:.1rem;
        padding:.1rem .5rem;
        border:.01rem solid #f6f6f6;
        font-size:.5rem;
        color:#6d7885;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border-radius: .1rem;
    }
    .spj_item_biaoqianBox{
        list-style: none;
    }
    .spj_item_orderTime{
        font-size:.5rem;
        color:#999;
    }
    .spj_item_time{
        margin-left:.3rem;
        font-size:.6rem;
        color:#bbb;
    }
    .spj_item_userName{
        font-size:.7rem;
    }
    .spj_item_info{
        padding-left:2.2rem;
    }
    .spj_item_foodImg{
        width:3.5rem;
        height:3.5rem;
        margin:.2rem .2rem .1rem;
    }
    .rateYoBox{
        display: flex;
        align-items: center;
    }
    .rateYo{
        position: relative;
        z-index:0;
    }
    .rateYo_s{
        margin:0 .1rem 0 0 !important;
        padding:0 !important;
    }
    .spj_main_item{
        position: relative;
        padding:.7rem 0;
        border-top:0.01rem solid #f6f6f6;
    }
    .spj_item_userImg{
        position: absolute;
        top:.78rem;
        left:0;
        width:1.5rem;
        height:1.5rem;
    }

    /* 评价标签 */
    .spj_title_item{
        display: inline-block;
        list-style: none;
        margin:0 .15rem;
        padding:.27rem .5rem;
        font-size: .6rem;
        border-radius: .1rem;
    }
    .spj_title_item:nth-child(1){
        background: #0097ff;
        color:#fff;
    }
    .spj_title_item:nth-child(2){
        background: #ebf5ff;
        color:#6d7885;
    }
    .spj_title_item:nth-child(3){
        background: #f5f5f5;
        color:#aaa;
    }
    .spj_title_item:nth-child(4){
        background: #ebf5ff;
        color:#6d7885;
    }
    .spj_main{
        padding:.65rem .65rem 0;
        background: #fff;
    }
    .spj_title{
        padding-bottom:.6rem;
    }

    /* 顶部信息 */
    .spj_head_pingfen{
        color:#f60;
    }
    .spj_head_food{
        margin-top:0.25rem;
    }
    .spj_head_time{
    }
    .rateYo{
        margin:0 .4rem;
    }
    .spj_head_right span{
        font-size:.6rem;
    }
    .spj_head_tonghang{
        display: block;
        font-size:.5rem;
        color:#999;
        transform: scale(.9);
    }
    .spj_head_zonghepingjia{
        margin-top:-.2rem;
        font-size:.6rem;
    }
    .spj_head_zonghe{
        font-size:1.2rem;
        line-height: 1.2;
    }
    .spj_head_right>div{
        display: flex;
        align-items: center;
    }
    .spj_head_right{
        padding-left:1.1rem;
    }
    .spj_head_left{
        padding-right:.4rem;
        border-right:.01rem solid #ddd;
        text-align: center;
    }
    .spj_pingjia_head{
        display: flex;
        margin-bottom:.5rem;
        padding:.7rem;
        background-color: #fff;
    }

    /* 整体布局 */
    .spj_pingjia{
        overflow-y: auto;
        height:100%;
        background-color: #f5f5f5;
    }
</style>

<script>
    import rate from '../../static/jquery.rateyo.min'
    export default{
        name:'pingjia',
        data(){
            return{
                rating:[],
                offset:0
            }
        },
        mounted(){
            this.get_rating('全部');
            this.get_rating.delay = true;

            $(()=>{
                let pingjia = $('.spj_pingjia');
                let scroll = $('.sv_content');
                let oldTop = pingjia.scrollTop();
                let Top = 0;

                pingjia.scroll(()=>{
                    Top = Math.max(pingjia.scrollTop(),scroll.scrollTop()) + pingjia.scrollTop() - oldTop;
                    oldTop = pingjia.scrollTop();

                    scroll.scrollTop(Top);

                    if(pingjia.scrollTop()>=(pingjia[0].scrollHeight-pingjia.height())-2){
                        if(this.get_rating.delay){
                            this.get_rating.delay = false;
                            this.get_rating(this.get_rating.searchTag);
                        }
                    }
                });
            });//滚动相关事件
        },
        methods:{
            loadStar(index,gate){
                if(!gate){
                    this.$nextTick(()=>{
                        let rateYos = $('.spj_head_right').find('.rateYo');
                        rateYos.eq(0).rateYo({
                            readOnly: true,
                            ratedFill: "#e7b314"
                        });
                        rateYos.eq(1).rateYo({
                            readOnly: true,
                            ratedFill: "#e7b314"
                        });
                    });
                }else{
                    if(index == this.rating.length-1)
                    {
                        this.$nextTick(()=>{
                            let rateYos = $('.spj_main_item').find('.rateYo');
                            rateYos.rateYo({
                                readOnly: true,
                                ratedFill: "#e7b314"
                            });
                        });
                    }
                }
            },
            find_img(String_path){
                let path = String_path+'';
                let format = path.match(/(jpeg|png|jpg|bmp)/)[0];
                return `https://fuss10.elemecdn.com/${path.slice(0,1)}/${path.slice(1,3)}/${path.slice(3)}.${format}`;
            },//将返回的img路径改为有效的img路径  967284af9fb1b499192d2476648c3ccfjpeg  需要转化为 https://fuss10.elemecdn.com/9/67/284af9fb1b499192d2476648c3ccfjpeg.jpeg
            searchTag(String_name){
                if(this.get_rating.searchTag==String_name){
                    return false;
                }
                this.rating = [];
                this.offset=0;
                this.get_rating.delay = false;
                this.get_rating(String_name);
            },
            get_rating(String_name){
                this.get_rating.searchTag = String_name;
                $.get('/rating',{
                    id:(window.location.href+'').split('id=')[1],
                    offset:this.offset,
                    tag_name:String_name
                },data=>{
                    data.map(item=>{
                        this.rating.push(item);
                    });
                    this.get_rating.delay = true;
                    this.offset+=8;
                });
            },
        },
        props:{
            tags:Array,
            scores:Array,
        }
    }
</script>
