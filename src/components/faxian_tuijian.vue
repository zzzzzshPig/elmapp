<template>
    <div class="fxt_faxian_tuijian">
        <h_header class="fxt_h_header" :title="'为你推荐'"></h_header>
        <div class="fxt_foodItem">
            <food_list :food="food"></food_list>
        </div>
        <div style="height:2rem;">
            <div class="fxt_loading" v-if="loading"><img src="./img/loading.gif" alt="图片不见了" style="width:.8rem;height:.8rem;vertical-align: top;margin-right:0.3rem;"/>加载中...</div>
            <div class="fxt_loading" v-if="notMore">没有更多了哦~</div>
        </div>
    </div>
</template>

<style scoped>
    .fxt_faxian_tuijian{
        z-index:99;
        position: relative;
        overflow-y: scroll;
        overflow-x: hidden;
        height: 100%;
    }

    /* 加载中 */
    .fxt_loading{
        width: 100%;
        padding:.6rem 0;
        background-color: #fff;
        text-align: center;
        font-size:.5rem;
        color: #666;
    }

    /* 头部信息 */
    .fxt_h_header{
        z-index:99;
        position: fixed!important;
        top:0;
        left:0;
        width: 100%;
    }

    .fxt_foodItem{
        padding-top: 2.2rem;
        background-color: #fff;
    }
</style>

<script>
    import h_header from './header.vue'
    import food_list from './faxian_food.vue'

    export default{
        name:'fxt_faxian_tuijian',
        data(){
            return{
                offset:0,
                lat:$.cookie('lat'),
                lit:$.cookie('lit'),
                food:[],
                id:'',
                notMore:false,
                loading:true,
            }
        },
        mounted(){
            let user_id = localStorage.getItem('user_id');
            if(user_id) {
                this.id = user_id.split(';')[0].split('=')[1];
            }

            this.get_food();

            let box = $('.fxt_faxian_tuijian');
            box.scroll(()=>{
                if(!this.notMore){
                    if(box.scrollTop()>=(box[0].scrollHeight-box.height())-2){
                        this.get_food();
                    }
                }
            });
        },
        methods:{
            get_food(){
                this.loading = true;
                this.notMore = false;
                $.get('/discover/recommendation',{
                    lat:this.lat,
                    lit:this.lit,
                    user_id:this.id,
                    offset:this.offset,
                    limit:20
                },data=>{
                    if(data.items){
                        if(data.items.length<20){
                            this.notMore = true;
                        }
                        data.items.map(item=>{
                            this.food.push(item);
                        });
                        this.offset+=20;
                        this.loading = false;
                    }else{
                        this.loading = false;
                        this.notMore = true;
                    }
                });
            }
        },
        components:{
            h_header,
            food_list
        }
    }
</script>