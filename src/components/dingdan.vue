<template>
    <div class="dd_dingdan">
        <h_header class="dd_h_header" :title="'订单'"></h_header>
        <main class="dd_list" v-if="order.length">
            <router-link :key="item.id"  :to="{path:'/dingdan/info',query:{id:item.unique_id}}" class="dd_item" v-for="item in order">
                <div class="dd_item_top">
                    <img class="dd_item_top_img" :src="find_img(item.restaurant_image_hash)+'?imageMogr/format/webp/thumbnail/!64x64r/gravity/Center/crop/64x64/'" alt="图片不见了"/>
                    <div class="dd_item_top_shop">
                        <router-link :to="{path:'/shop',query:{id:item.restaurant_id}}" class="dd_item_top_shopName">{{item.restaurant_name}}<span class="dd_item_top_icon icon icon-right"></span></router-link>
                        <div class="dd_item_top_time">{{item.formatted_created_at}}</div>
                    </div>
                    <div class="dd_item_top_status">{{item.status_bar.title}}</div>
                </div>
                <div class="dd_item_middle">
                    <span class="dd_item_middle_name">{{item.basket.group[0][0].name+(item.basket.group[0].length-1?'等'+item.basket.group[0].length+'件物品':'')}}</span>
                    <strong class="dd_item_middle_num">¥{{item.total_amount.toFixed(2)}}</strong>
                </div>
                <div class="dd_item_bottom" v-if="item.operation_rebuy||item.operation_rate">
                    <button class="dd_item_bottom_reBuy dd_item_bottom_btn" v-if="item.operation_rebuy">再来一单</button>
                    <button class="dd_item_bottom_pinglun dd_item_bottom_btn" v-if="item.operation_rate">评价得10金币</button>
                </div>
            </router-link>
            <div style="height:2rem;">
                <div class="dd_loading" v-if="loading"><img src="./img/loading.gif" alt="图片不见了" style="width:.8rem;height:.8rem;vertical-align: top;margin-right:0.3rem;"/>加载中...</div>
                <div class="dd_loading" v-if="notMore">没有更多了哦~</div>
            </div>
        </main>
        <main class="dd_login" v-if="!user_id">
            <router-link to="/user_login" class="dd_login_btn">前去登录</router-link>
        </main>
        <f_nav :index_i="2"></f_nav>
    </div>
</template>

<script>
    import f_nav from './nav.vue';
    import h_header from './header.vue'
    export default {
        name: 'dd_dingdan',
        data(){
            return{
                user_id:'',
                sid:'',
                offset:0,
                order:[],
                loading:false,
                notMore:false,
            }
        },
        mounted(){
            let userInfo = localStorage.getItem('user_id');
            if(userInfo){
                this.user_id = userInfo.split(';')[0].split('=')[1];
                this.sid = userInfo.split('SID=')[1].split(';')[0];
                this.get_order();
            }

            $(()=>{
                let box = $('.dd_dingdan');

                box.scroll(()=>{
                    if(!this.notMore){
                        if(box.scrollTop()>=(box[0].scrollHeight-box.height())-2){
                            this.get_order();
                        }
                    }
                });
            });
        },
        methods:{
            get_order(){
                this.notHave = false;
                this.loading = true;
                $.get('/order',{
                    id:this.user_id,
                    sid:this.sid,
                    offset:this.offset,
                },data=>{
                    if(data.length){
                        data.map(item=>{
                            this.order.push(item);
                        });
                        this.offset += 8;
                        this.loading = false;
                    }else{
                        this.loading = false;
                        this.notMore = true;
                    }
                });
            },
            find_img(String_path){
                let path = String_path+'';
                let format = path.match(/(jpeg|png|jpg|bmp)/)[0];
                return `https://fuss10.elemecdn.com/${path.slice(0,1)}/${path.slice(1,3)}/${path.slice(3)}.${format}`;
            },//将返回的img路径改为有效的img路径  967284af9fb1b499192d2476648c3ccfjpeg  需要转化为 https://fuss10.elemecdn.com/9/67/284af9fb1b499192d2476648c3ccfjpeg.jpeg
        },
        components:{
            f_nav,
            h_header
        }
    }
</script>

<style>
    /* 未登录窗口 */
    .dd_login_btn{
        padding:.5rem 1rem;
        background-color: #2cdb80;
        border:none;
        color:#fff;
    }
    .dd_login{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    /* 加载中 */
    .dd_loading{
        width: 100%;
        padding:.6rem 0;
        text-align: center;
        font-size:.5rem;
        color: #666;
    }

    /* 数据主体 */
    .dd_item_bottom_reBuy{
        margin-right: .2rem;
        border: 1px solid #2395ff;
        color: #2395ff;
    }
    .dd_item_bottom_btn{
        background-color: transparent;
        padding: 1.333333vw 2.666667vw;
        border-radius: 3px;
    }
    .dd_item_bottom_pinglun{
        border: 1px solid #ff5339;
        color: #ff5339;
    }
    .dd_item_bottom{
        padding:.4rem 0;
        padding-right:.8rem;
        border-top:1px solid #eee;
        text-align: right;
        font-size:.6rem;
    }
    .dd_item_middle_name{
        color:#666;
    }
    .dd_item_middle_num{
        margin-right: .6rem;
    }
    .dd_item_middle{
        display: flex;
        justify-content: space-between;
        margin-top:.5rem;
        margin-left:11vw;
        padding:.7rem 0;
        border-top: 1px solid #eee;
        font-size: .65rem;
    }
    .dd_item_top_status{
        font-size:.65rem;
        margin-top:-.6rem;
        margin-right:.7rem;
    }
    .dd_item_top_icon{
        font-size: .5rem;
        transform: scale(.8);
    }
    .dd_item_top_time{
        margin-top: -.1rem;
        font-size: .5rem;
        color:#999;
    }
    .dd_item_top_shop{
        flex: 1;
        margin-left:.5rem;
    }
    .dd_item_top_shopName{
        overflow: hidden;
        max-width: 8rem;
        font-size:.8rem;
        color: #333;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .dd_item_top{
        display: flex;
        align-items: center;
    }
    .dd_item_top_img{
        width: 8.533333vw;
        height: 8.533333vw;
        margin-top:-.2rem;
        border: 1px solid #eee;
        border-radius: 3px;
    }
    .dd_list{
        margin-top:2.7rem;
        margin-bottom: 3rem;
    }
    .dd_item{
        display: block;
        margin-top:.5rem;
        padding: 3.733333vw 0 0 4vw;
        background-color: #fff;
        color:#333;
    }

    /* 整体属性 */
    .dd_dingdan{
        overflow-y: scroll;
        overflow-x: hidden;
        height:100%;
    }

    /* 头部信息 */
    .dd_h_header{
        z-index:99;
        position: fixed!important;
        top:0;
        left:0;
        width: 100%;
    }
</style>
