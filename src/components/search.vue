<template>
    <div class="sc_search">
        <span class="icon icon-left" style="width:7%;" v-on:click='back_page()'></span>
        <div class="search-input">
            <label class="icon icon-search" for="search" style="font-size:.7rem;margin-left:.3rem;"></label>
            <input type="search" id='search' placeholder='输入商家、商品名称' class="sc_searchbox_search" v-on:keydown="enter"/>
        </div>
        <span v-on:click="search_word" class="sc_searchbox_button">搜索</span>
    </div>
</template>

<script>

    export default {
        name: 'sc_search',
        data(){
            return{
                foods:[],//存放食物数据
            }
        },
        mounted(){
            //搜索跳转参数
            let keyword = this.$route.query.keyword;
            if(keyword){
                this.searchWord({
                    keyword:keyword,
                    lat:$.cookie('lat'),
                    lit:$.cookie('lit'),
                })
            }
        },
        methods:{
            back_page(){
                this.$router.push('/');
            },
            enter(e){
                if(e.keyCode==13){
                    this.search_word();
                }
            },
            searchWord(data){
                /*
                 peisong:this.peisongfs[0],
                 xiaofei:this.xiaofei[0],
                 huodong:this.huodong[0],
                 shangjia:shangjia,
                 */
                //存储本地数据 历史搜索
                if(typeof(Storage)!=="undefined"){
                    let arr = localStorage.getItem('searchHistory');
                    arr = String(arr).split(',');
                    //去除 null
                    if(arr[0]=='null'){
                        arr.shift();
                    }
                    //判断存入的信息是否重复  不重复即存入
                    if( !(arr.indexOf(data.keyword)+1) ){
                        if(arr.length>=10)
                        {
                            arr.pop();
                        }
                        arr.unshift(data.keyword)
                    }
                    localStorage.setItem('searchHistory',arr);
                }

                $(search).val(data.keyword);//显示搜索文字

                //发送 ajax 获取数据
                $.get('/search',data,data=>{
                    //获取第一个key的value 当搜索的店铺没有时候或者很少的时候 会有推荐食物，这里只取搜索的物品，也就是第一个，当用户输入为无结果时候 显示推荐店铺
                    let chunk = data['0']||data['1']||data['3'];

                    //当chunk存在的时候，也就是返回有数据时才填充数据 否则就出现 没有更多的信息 的提示
                    if(chunk){
                        let length = chunk.restaurant_with_foods.length;
                        for(let i = 0;i<length;i++){
                            this.foods.push(chunk.restaurant_with_foods[i]);
                        }
                    }
                    this.$emit('get_food',this.foods);
                });
            },//搜索 用户 输入关键字
            search_word(){
                let val = $(search).val().trim();
                if(this.$route.query.keyword!=val){
                    if(val)
                    {
                        location.href = 'http://'+location.host+'/#/searchfoods?keyword='+val;
                        location.reload();
                    }
                }
            },
        }
    }
</script>

<style scoped>

    /* 搜索框 */
    .sc_search{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding:.6rem .3rem;
    }
    .search-input{
        width:76%;
    }
    .sc_searchbox_search{
        background:#f8f8f8 !important;
        border:none !important;
        text-indent:.3rem;
        font-size:.6rem !important;
        border-radius: .05rem !important;
    }
    .sc_searchbox_button{
        width:10%;
        font-size:.8rem;
        font-weight:bold;
    }

</style>
