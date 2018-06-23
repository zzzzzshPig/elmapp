import Vue from 'vue'
import Router from 'vue-router'
import wode from '@/components/wode'
import faxian from '@/components/faxian'
import waimai from '@/components/waimai'
import dingdan from '@/components/dingdan'
import searchfoods from '@/components/search_foods'
import search from '@/components/search_search'
import fenlei from '@/components/fenlei'
import shopview from '@/components/shop'
import login from '@/components/login'
import hongbao from '@/components/hongbao'
import jinbi from '@/components/jinbi'
import userInfo from '@/components/userInfo'
import hbHistory from '@/components/hbHistory'
import user_address from '@/components/user_address'
import dingdan_info from '@/components/dingdan_info'
import not_found from '@/components/Not_found'
import dingdan_zuizong from '@/components/dingdan_zuizong'
import faxian_tuijian from '@/components/faxian_tuijian'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/faxian/tuijian',
            name: 'fxt_faxian_tuijian',
            component: faxian_tuijian
        },
        {
            path: '/dingdan/zuizong',
            name: 'dz_dingdan_zuizong',
            component: dingdan_zuizong
        },
        {
            path: '*',
            component: not_found
        },
        {
            path: '/dingdan/info',
            name: 'di_dingdan_info',
            component: dingdan_info
        },
        {
            path: '/wode/user_address',
            name: 'ua_address',
            component: user_address
        },
        {
            path: '/wode/hongbao/hbHistory',
            name: 'bh_hbHistory',
            component: hbHistory
        },
        {
            path: '/wode/info',
            name: 'ui_userInfo',
            component: userInfo
        },
        {
            path: '/wode/hongbao',
            name: 'hb_hongbao',
            component: hongbao
        },
        {
            path: '/wode/jinbi',
            name: 'jn_jinbi',
            component: jinbi
        },
        {
            path: '/user_login',
            name: 'user_login',
            component: login
        },
        {
            path: '/shop',
            name: 'shop',
            component: shopview
        },
        {
            path: '/fenlei',
            name: 'fenlei',
            component: fenlei
        },
        {
            path: '/search',
            name: 'search',
            component: search
        },
        {
            path: '/searchfoods',
            name: 'searchfoods',
            component: searchfoods
        },
        {
            path: '/',
            name: 'index',
            component: waimai
        },
        {
          path: '/wode',
          name: 'w_wode',
          component: wode
        },
        {
          path: '/faxian',
          name: 'faxian',
          component: faxian
        },
        {
            path: '/waimai',
            name: 'waimai',
            component: waimai
        },
        {
            path: '/dingdan',
            name: 'dd_dingdan',
            component: dingdan
        }
    ]
})
