<template>
    <div class="wma_address">
        <header class="wma_header">
            <div class="wma_back icon icon-left" v-on:click="back_page"></div>
            选择收货地址
        </header>
        <main class="wma_main">
            <section class="wma_searchBox">
                <div class="search-input">
                    <label class="icon icon-search" for="searchAddress" style="font-size:.7rem;margin-left:.3rem;"></label>
                    <input type="search" id='searchAddress' placeholder='请输入地址' class="sc_searchbox_search" v-on:search="enter"/>
                </div>
            </section>
            <div class="wma_mainX">
                <section class="wma_nowAddress">
                    <p class="wma_nowAddress_title">当前地址</p>
                    <p class="wma_nowAddress_text">{{p_address}}</p>
                </section>
                <section class="wma_userAddress" v-if="user_id">
                    <p class="wma_nowAddress_title">收货地址</p>
                    <div class="wma_nowAddress_text" :key="item.id" v-for="item in A_address" v-on:click="target_userseo(item)">
                        <p>{{item.name}}<span class="wma_nowAddress_phone">{{item.phone}}</span></p>
                        <p class="wma_nowAddress_address">{{item.address}}</p>
                    </div>
                </section>
                <section class="wma_search_main" v-if="search_enter">
                    <section class="wma_search_main_item" v-on:click="target_searchgeo(item)" :key="item.id" v-for="item in S_address">
                        <p class="wma_search_main_address">{{item.name}}</p>
                        <div class="wma_search_main_info">
                            {{item.address}}
                        </div>
                    </section>
                </section>
            </div>
        </main>
    </div>
</template>

<script>
    import h_header from './header.vue'
    import Geo_hash from '../../static/geohash'

    export default{
        name:'wma_address',
        data(){
            return{
                user_id:'',
                sid:'',
                lat:'',
                lit:'',
                A_address:[],
                S_address:[],
                search_enter:false,
            }
        },
        mounted(){
            let userInfo = localStorage.getItem('user_id');
            if(userInfo){
                this.user_id = userInfo.split(';')[0].split('=')[1];
                this.sid = userInfo.split('SID=')[1].split(';')[0];
            }

            this.lat = $.cookie('lat');
            this.lit = $.cookie('lit');

            $.get('/address',{
                user_id:this.user_id,
                sid:this.sid,
            },data=>{
                this.A_address = data;
            });
        },
        methods:{
            back_page(){
                let box = $('.wma_address');
                $('.wm_waimai').css('overflowY','scroll');
                box.removeClass('slideInRight');
                box.addClass('slideOutRight');
            },
            target_userseo(data){
                let lat = Geo_hash(data.st_geohash).latitude[0].toFixed(5);
                let lit = Geo_hash(data.st_geohash).longitude[0].toFixed(5);
                let address = data.address;

                $.cookie('lat',lat);
                $.cookie('lit',lit);
                $.cookie('address',address);

                this.$emit('dingwei',true);
                this.back_page();
            },
            target_searchgeo(data){
                $.cookie('lat',data.latitude);
                $.cookie('lit',data.longitude);
                $.cookie('address',data.address);
                this.$emit('dingwei',true);
                this.search_enter = false;
                this.back_page();
            },
            enter(){
                let text = $('#searchAddress').val().trim();
                if(text){
                    this.search_enter = true;
                    this.search_address(text);
                }
            },
            search_address(text){
                $.get('/address/search',{
                    user_id:this.user_id,
                    id:this.sid,
                    keyword:text,
                    lat:this.lat,
                    lit:this.lit,
                },data=>{
                    this.S_address = data;
                });
            }
        },
        components:{
            h_header
        },
        props:{
            p_address:String,
        }
    }
</script>

<style scoped>
    /* 搜索的地址 */
    .wma_search_main_info{
        font-size: .6rem;
        font-weight: normal;
    }
    .wma_search_main_item:last-child{
        border: none;
    }
    .wma_search_main_item{
        padding:.6rem .7rem;
        border-bottom: 1px solid #eee;
        font-size: .75rem;
        font-weight: bold;
    }
    .wma_search_main{
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        background-color: #fff;
    }
    .wma_mainX{
        position: relative;
    }

    /* 收货地址 */
    .wma_nowAddress_address{
        font-size: .6rem;
        font-weight: normal;
    }
    .wma_nowAddress_phone{
        margin-left: .2rem;
        font-size:.5rem;
        font-weight: normal;
        color: #666;
    }


    /* 当前地址 */
    .wma_nowAddress_text:last-child{
        border: none;
    }
    .wma_nowAddress_text{
        padding:.45rem .8rem;
        background-color: #fff;
        border-bottom: 1px solid #eee;
        font-size:.75rem;
        font-weight: bold;
    }
    .wma_nowAddress_title{
        padding:.8rem .8rem .4rem;
        font-size: .65rem;
        color: #666;
    }

    /* 搜索框 */
    .wma_searchBox{
        padding:.5rem .8rem;
        padding-top: 2.7rem;
        background-color: #fff;
    }
    .search-input{
        width:100%;
        height:1.7rem;
    }
    .sc_searchbox_search{
        height:100%;
        background:#f8f8f8 !important;
        border:none !important;
        text-indent:.3rem;
        font-size:.6rem !important;
        border-radius: .05rem !important;
    }

    .wma_main{
        overflow-y: scroll;
        height:100%;
    }
    .wma_address{
        z-index:99;
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height:100%;
        background-color: #f5f5f5;
    }
    .wma_header{
        z-index:10;
        position: fixed;
        top:0;
        left:0;
        width: 100%;
        height:2.2rem;
        background-image: linear-gradient(90deg,#0af,#0085ff);
        border-bottom: 1px solid #0af;
        text-align: center;
        line-height: 2.2rem;
        font-size:.9rem;
        font-weight: bold;
        color:#fff;
    }
    .wma_back{
        position: absolute;
        top:0;
        left:.63rem;
        font-size: .8rem;
    }
</style>