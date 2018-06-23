<template>
    <div class="nf_not_found">
        <div style="width: 100%;text-align: center">跑错位置啦，请返回~</div>
        <button class="nf_not_found_btn" v-on:click="back">
            返回首页
        </button>
    </div>
</template>

<script>
    export default {
        name: 'nf_not_found',
        data(){
            return{
            }
        },
        methods:{
            back(){
                this.$router.push('/waimai');
            }
        }
    }
</script>
<style>
    .nf_not_found_btn{
        margin-top:.4rem;
        padding:.3rem 1.5rem;
        background-color: #db2930;
        border:none;
        color:#fff;
    }
    .nf_not_found{
        z-index:99;
        position: relative;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        width: 100%;
        height:100%;
        background-color: #fff;
    }
</style>
