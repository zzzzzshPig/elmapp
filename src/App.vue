<template>
    <div class="elm_app">
        <router-view/>
    </div>
</template>

<script>

    export default {
        name: 'app',
        data(){
            return{

            }
        },
        methods:{

        }
    }
</script>

<style>
    *{
        margin:0;
        padding:0;
        font-family: 'Helvetica Neue',Tahoma,Arial,PingFangSC-Regular,'Hiragino Sans GB','Microsoft Yahei',sans-serif;
    }
    p{
        margin:0;
        padding:0;
    }
    img{
        width:100%;
        height:100%;
    }
    body,html{
        height:100%;
    }
    body{
        overflow-y: scroll;
    }
    .elm_app{
        height:100%;
    }
</style>
