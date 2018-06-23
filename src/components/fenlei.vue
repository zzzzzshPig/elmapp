<template>
    <div class="fl_fenlei">
        <h_header class="fl_h_header" :title="$route.query.name"></h_header>
        <paixu class="fl_paixu" :food="food" :peisongfs="peisongfs" :xiaofei="xiaofei" :huodong="huodong" :shangjia="shangjia" @search_food="loadShop"></paixu>
        <fenlei_food :shopInfos="food" :loading="loading" :notHave="notHave"></fenlei_food>
    </div>
</template>

<style scoped>
    .fl_paixu{
        padding-top: 2.7rem !important;
    }

    .fl_h_header{
        z-index:99;
        position: fixed!important;
        top:0;
        left:0;
        width: 100%;
    }

    /* 整体布局 */
    .fl_fenlei{
        position:relative;
        overflow-y: scroll;
        overflow-x: hidden;
        z-index:99;
        width:100%;
        height:100%;
        background: #fff;
    }

</style>

<script>

    import paixu from './paixu.vue'
    import h_header from './header.vue';
    import fenlei_food from './fenlei_food.vue'

    export default{
        name:'fenlei',
        data(){
            return{
                offset:0,
                food:[],
                link:this.$route.query.restaurant_category_id,
                loading:false,//显示 等待
                notHave:false,//显示 没有信息
                peisongfs:[''],
                xiaofei:[''],
                huodong:[''],
                shangjia:[],
            }
        },
        mounted(){
            this.loadShop();

            $(()=>{
                let box = $('.fl_fenlei');

                box.scroll(()=>{
                    let scrollTop = box.scrollTop();
                    if(scrollTop>=(box[0].scrollHeight-box.height())-2){//滑动到底部
                        this.loadShop(this.peisongfs,this.xiaofei,this.huodong,this.shangjia);
                    }
                });//滚动加载
            });
        },
        methods:{
            loadShop(peisongfs,xiaofei,huodong,shangjia,clear){
                if(clear){
                    this.food = [];
                    this.offset = 0
                }
                this.loading = true;
                this.notHave = false;

                $.get('/fenlei/shop',{
                    link:this.link,
                    offset:this.offset,
                    peisong:peisongfs,
                    xiaofei:xiaofei,
                    huodong:huodong,
                    shangjia:shangjia,
                    lat:$.cookie('lat'),
                    lit:$.cookie('lit'),
                },data=>{
                    if(!data.items.length){
                        this.notHave = true;
                    }
                    data.items.map(item=>{
                        this.food.push(item);
                    });
                    this.loading = false;
                    this.offset+=8;
                });
            },//获取附近店铺信息
        },
        components:{
            paixu,
            h_header,
            fenlei_food
        }
    }

</script>