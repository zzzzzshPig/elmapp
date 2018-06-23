<template>
    <header class="h_header">
        <div class="h_back icon icon-left" v-on:click="back_page"></div>
        {{title}}
    </header>
</template>

<script>
    export default {
        name: 'h_header',
        data(){
            return {

            }
        },
        methods:{
            back_page(){
                history.back();
            },//返回上一个页面
        },
        props:{
            title:String
        }
    }
</script>

<style scoped>
    /* 顶部信息 */
    .h_header{
        position: relative;
        height:2.2rem;
        background-image: linear-gradient(90deg,#0af,#0085ff);
        border-bottom: 1px solid #0af;
        text-align: center;
        line-height: 2.2rem;
        font-size:.9rem;
        font-weight: bold;
        color:#fff;
    }
    .h_back{
        position: absolute;
        top:0;
        left:.63rem;
        font-size: .8rem;
    }
</style>