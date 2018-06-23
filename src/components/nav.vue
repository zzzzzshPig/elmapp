<template>
    <div class="f_nav">
        <nav class="bar bar-tab v-footer" style="position: fixed;bottom:0;">
            <router-link :to="item.link" class="tab-item" href="#" :key='item.id' v-for="item in items">
                <span class="icon" style="width:1.4rem;"><img :src="item.img" alt="图片不见了"/></span>
                <span class="tab-label" :style="item.style">{{item.title}}</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    import waimai from './img/eleme.png'
    import faxian from './img/faxian.png'
    import dingdan from './img/dingdan.png'
    import wode from './img/wode.png'
    import waimai_c from './img/eleme_c.png'
    import faxian_c from './img/faxian_c.png'
    import dingdan_c from './img/dingdan_c.png'
    import wode_c from './img/wode_c.png'

    let arr = [waimai,faxian,dingdan,wode];
    let arr_c = [waimai_c,faxian_c,dingdan_c,wode_c];

    export default {
        name: 'f_nav',
        data(){
            return{
                items: [
                    {
                        title: '外卖',
                        img:waimai,
                        link:'/waimai',
                        style:'color:#666;',
                    },
                    {
                        title: '发现',
                        img:faxian,
                        link:'/faxian',
                        style:'color:#666;',
                    },
                    {
                        title: '订单',
                        img:dingdan,
                        link:'/dingdan',
                        style:'color:#666;',
                    },
                    {
                        title: '我的',
                        img:wode,
                        link:'/wode',
                        style:'color:#666;',
                    }
                ]
            }
        },
        mounted(){
            this.items[this.index_i].img = arr_c[this.index_i];
            this.items[this.index_i].style = 'color:#0089dc';
        },
        methods:{

        },
        props:{
            index_i:Number,
        }
    }
</script>

<style scoped>
    .v-footer{
        z-index:20;
        position: relative;
    }
</style>
