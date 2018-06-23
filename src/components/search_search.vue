<template>
    <main class="sf_search_search">
        <search></search>
        <section class="ss_historybox" v-if="show_history">
            <div class="ss_title">
                <h3 style="font-size:.8rem;margin-top:-0.2rem;">历史搜索</h3>
                <img src="./img/lajitong.png" alt="图片不见了" style="width:.8rem;height:.8rem;" v-on:click="delete_history"/>
            </div>
            <div class="ss_itemBox">
                <router-link class="ss_item" :key="item.id" v-for="item in historyItems" :to="{path:'/searchfoods',query:{keyword:item}}">{{item}}</router-link>
            </div>
        </section>
        <section class="ss_hotsearchbox">
            <div class="ss_title">
                <h3 style="font-size:.8rem;margin-top:-0.2rem;">热门搜索</h3>
            </div>
            <div class="ss_itemBox">
                <!--  v-on:click="$emit('search_search',item)" -->
                <router-link class="ss_item" :to="{path:'/searchfoods',query:{keyword:item}}" :key="item.id" v-for="item in hotItems">{{item}}</router-link>
            </div>
        </section>
    </main>
</template>

<script>
    import search from './search.vue'

    //获取热搜列表
    function getHotSearch(data){

        //暂时性死区
        let randomArr=()=>{
            //取10随机数
            let arr = [];
            for(let Arri = 0;Arri<10;Arri++){
                let num = Math.floor(Math.random()*data.length);

                //找得到元素就重新找  找不到就添加进数组
                !(arr.indexOf(num)+1)?arr.push(num):Arri--;
            }

            //取随机数下标的值
            let arr1 = [];
            arr.map(item=>{
                arr1.push(data[item].text)
            });

            this.hotItems = arr1;
        };

        if(!(data === 'err'))
        {
            randomArr();
        }

    }

    //获取本地搜索历史
    function get_history(){
        let history = localStorage.getItem('searchHistory');

        //去除 null
        if(!history){
            history = '';
        }

        this.historyItems = history.split(',');
    }

    export default{
        name:'search_search',
        data(){
            return {
                searchText:'',
                historyItems:[],
                hotItems:[],
                show_history:true,
            }
        },
        mounted(){
            //获取本地搜索历史
            get_history.call(this);
            if(!localStorage.getItem('searchHistory')){
                this.show_history = false;
            }

            //获取热搜词条
            $.get('/hotSearch',data=>{
                getHotSearch.call(this,data);
            });
        },
        methods:{
            delete_history(){
                localStorage.removeItem('searchHistory');
                this.historyItems = [];
                this.show_history = false;
            }
        },
        components:{
            search,
        }
    }
</script>

<style scoped>
    /* 整体布局 */
    .sf_search_search{
        z-index:99;
        position: relative;
        width:100%;
        height:100%;
        background: #fff;
    }

    /* 搜索历史 */
    .ss_title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:.4rem .6rem;
    }
    .ss_itemBox{
        padding:.3rem .5rem;
    }
    .ss_item{
        display: inline-block;
        margin:.3rem .15rem;
        padding:0 .5rem;
        background: #f7f7f7;
        line-height:1.6rem;
        font-size:.6rem;
        color:#666;
        border-radius: .1rem;
    }

</style>