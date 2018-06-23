<template>
    <div class="ua_address">
        <h_header class="ua_h_header" :title="'我的地址'"></h_header>
        <main class="ua_main">
            <section class="ua_item" v-for="item in address" :key="item.id">
                <div class="ua_item_top">
                    <span class="ua_item_name">{{item.name}}</span><span class="ua_item_sex">{{item.sex==2?'女':'男'}}</span><span class="ua_item_phone">{{item.phone}}</span>
                </div>
                <div class="ua_item_bottom">
                    <span v-if="item.tag" :style="tag_color(item.tag)" class="ua_item_tag">{{item.tag}}</span>
                    <span class="ua_item_address">{{item.address+item.address_detail}}</span>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
    import h_header from './header.vue'

    export default {
        name: 'ua_address',
        data(){
            return {
                address:[],
                user_id:'',
                sid:''
            }
        },
        mounted(){
            let userInfo = localStorage.getItem('user_id');
            if(userInfo){
                this.user_id = userInfo.split(';')[0].split('=')[1];
                this.sid = userInfo.split('SID=')[1].split(';')[0];
            }

            $.get('/user_info/user_address',{
                user_id:this.user_id,
                sid:this.sid,
            },data=>{
                if(!data.message){
                    this.address = data;
                }else{
                    alert('登录信息已过期,请重新登录');
                    this.$router.push('/wode');
                }
            });
        },
        methods:{
            tag_color(tag){
                if(tag=='家'){
                    return 'color:#ff5722;border-color:#ff5722;'
                }else if(tag=='公司'){
                    return 'color:#3190e8;border-color:#3190e8;'
                }else if(tag=='学校'){
                    return 'color:#00d762;border-color:#00d762;'
                }
            }
        },
        components:{
            h_header
        }
    }
</script>

<style>
    .ua_address{
        z-index:99;
        position: relative;
        height:100%;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    /* 数据信息 */
    .ua_item_bottom{
        display: flex;
        align-items: center;
    }
    .ua_item_address{
        flex: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-left: .1rem;
        font-size: .7rem;
    }
    .ua_item_tag{
        min-width: 1.1rem;
        height:.8rem;
        padding:0 .1rem;
        border: 1px solid;
        line-height: .8rem;
        text-align: center;
        font-size: .5rem;
        transform: scale(.9);
        border-radius: 2px;
    }
    .ua_item_sex{
        margin:0 .3rem 0 .2rem;
    }
    .ua_item_name{
        font-weight: bold;
    }
    .ua_item:not(:first-child){
        border-top: 1px solid #ddd;
    }
    .ua_item{
        min-height: 18.133333vw;
        padding:.6rem .8rem;
    }
    .ua_main{
        margin-top:2.2rem;
        background-color: #fff;
    }

    /* 头部信息 */
    .ua_h_header{
        position: fixed!important;
        top:0;
        left:0;
        width: 100%;
    }
</style>
