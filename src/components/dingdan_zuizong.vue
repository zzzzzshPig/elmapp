<template>
    <div class="dz_dingdan_zuizong" v-if="timeline.length">
        <h_header class="dz_h_header" :title="'订单跟踪'"></h_header>
        <ul class="dz_main">
            <li class="dz_main_item" :key="item.id" v-for="item in timeline">
                <div class="dz_main_item_text">
                    <img v-if="!item.in_processing" class="dz_main_item_img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAARVBMVEUAAAAxkuoxkekxkOgykOgxkekxkOgykekxkOkzkepAn/8ykOgxkOj////h7/txs++fzPT1+f3O5fq21/Z1te9Gm+s1kui7yDEvAAAADHRSTlMAiPPp4tm/dlM8CKjZ4AF5AAAAv0lEQVQoz4VT2RLDIAj0qFdiNEbN/39qC+ROZ9gX0B1gFRAngrRGKWNlEC8MTscD2g131n/iDR9/ZWV8QZ7sGP9gfMSuraZSUm3rLd7TKadpQ8p041EzqZqnC2bSB/rdzr5596M1Zp4ewPxaiICqqO6Se88L1Ud9gWS3PeNZp5F4C6ZibNyA8RU8KwyYdJQ7hCTwjFBgClz0ne5wKuAphmaSM9KYhzHfwnwq0xKmocw4MMPEjCIzyMwaMEvErOAXfUMi8dXxrXwAAAAASUVORK5CYII=" alt="图片不见了"/>
                    <p :style="item.in_processing?'':'color:#3190e8'">{{item.title}}</p>
                    <span class="dz_main_item_time">
                        {{item.formatted_time}}
                    </span>
                </div>
                <p class="dz_main_item_p">{{item.description}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    import h_header from './header.vue'
    export default {
        name: 'dz_dingdan_zuizong',
        data(){
            return{
                user_id:'',
                sid:'',
                timeline:[],
            }
        },
        mounted(){
            let userInfo = localStorage.getItem('user_id');
            if(userInfo){
                this.user_id = userInfo.split(';')[0].split('=')[1];
                this.sid = userInfo.split('SID=')[1].split(';')[0];

                $.get('/order/info/zuizong',{
                    id:this.$route.query.id,
                    user_id:this.user_id,
                    sid:this.sid,
                },data=>{
                    this.timeline = data;
                });
            }
        },
        components:{
            h_header
        }
    }
</script>

<style>
    .dz_main_item_img{
        position: absolute;
        top:.4rem;
        left:-1.15rem;
        width: 4vw;
        height: 4vw;
    }
    .dz_main_item_p{
        margin-top: -.2rem;
        font-size: .5rem;
        color: #999;
    }
    .dz_main_item_time{
        font-size: .5rem;
        color: #999;
    }
    .dz_main_item_text{
        display: flex;
        justify-content: space-between;
        flex: 1;
    }
    .dz_main_item::before{
        position: absolute;
        top:.5rem;
        left:-.85rem;
        content: '';
        width:5px;
        height:5px;
        background-color: #e6e6e6;
        border-radius: 50%;
    }
    .dz_main_item:last-child{
        padding-bottom: 0;
    }
    .dz_main_item{
        display: flex;
        flex-direction: column;
        position: relative;
        padding-left:1.2rem;
        padding-bottom: 1.95rem;
        margin-left:.69rem;
        font-size: .8rem;
    }
    .dz_main{
        list-style: none;
        margin:0 1.5rem;
        padding-top:4.1rem;
        border-left:1px solid #eee;
    }
    .dz_dingdan_zuizong{
        z-index:99;
        position: relative;
        width: 100%;
        height:100%;
        overflow-y: scroll;
        overflow-x: hidden;
        background-color: #fff;
    }

    /* 头部信息 */
    .dz_h_header{
        z-index:99;
        position: fixed!important;
        top:0;
        left:0;
        width: 100%;
    }
</style>
