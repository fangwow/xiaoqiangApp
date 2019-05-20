import Vue from 'vue'
import Router from 'vue-router'

import aaaaa from '@/components/mine/pages/AAAA'//头部模板


// -------------------------登录-----------------register1
import login from '@/components/login/login' // 登录
import register from '@/components/login/register' // 注册第一步

// -------------------------首页-----------------
import index from '@/components/index/index'// 首页search
// 整车
import Item1 from '@/components/index/tab/item1.vue'
import order from '@/components/dingdan/dingdan'// 订单
import orderInfo from '@/components/dingdan/orderInfo'// 订单详情
import wancheng from '@/components/dingdan/wancheng'// 已完成订单
import yichangdingdan from '@/components/dingdan/yichangdingdan'// 已完成订单

import pinche from '@/components/pinche/index'// 拼车
import pincheList from '@/components/pinche/pincheList'// 拼车列表
import pincheInfo from '@/components/pinche/pincheInfo'// 拼车详情
import yuyuebaojia from '@/components/pinche/yuyuebaojia'// 预约报价
import shangmen from '@/components/pinche/shangmen'// 预约报价


// -------------------------我的-----------------
import mypage from '@/components/mine/mine'//我的
import infos from '@/components/mssage/index'//消息
import infoss from '@/components/mssage/mssageInfo'//详细消息
import invitationCode from '@/components/mine/pages/yaoqingma'//邀请码
import myoney from '@/components/mine/pages/myoney'//我的钱包
import mingxi from '@/components/mine/pages/mingxi'//交易明细
import tixian from '@/components/mine/pages/tixian'//提现
import shimingrenzheng from '@/components/mine/pages/shimingrenzheng'//实名认证
import opinion from '@/components/mine/pages/yijian'//意见
import ourselves from '@/components/mine/pages/guanyuwomen'//关于我们
import myContract from '@/components/mine/pages/wodehets'//订单合同
import wodehetong from '@/components/mine/pages/wodehetong'//我的合同
import jiedanzhong from '@/components/mine/pages/jiedanzhong'//接单中
import baojia from '@/components/mine/pages/baojia'//接单中
import tianjiabaojia from '@/components/mine/pages/tianjiabaojia'//接单中
import myBankard from '@/components/mine/pages/myBankard'//我的银行卡
import bangdingka from '@/components/mine/pages/bangdingka'//我的银行卡
import share from '@/components/mine/pages/share'//分享

// -------------------------购物车-----------------
import demo from '@/components/demo/index'//demo

// 我的发票
import addmyFapiao from '@/components/mine/pages/addmyFapiao.vue' //新增发票
import myFapiao from '@/components/mine/pages/myFapiao.vue' //我的发票
import fapiaoInfo from '@/components/mine/pages/fapiaoInfo.vue'  //发票详情
// 整车支付
import zhengchezhifu from '@/components/index/zhengchezhifu.vue'
// 图片放大
import imgPreview from '@/components/demo/img-preview.vue'
// 司机接单信息
import sijijiedanInfo from '@/components/mine/pages/sijijiedanInfo.vue'
// 在途
import zaitu from '@/components/demo/zaitu.vue'
Vue.use(Router);

export default new Router({
    routes:
        [{
            path: '/',
            redirect: '/index'
        }, {
            path: '/login',
            name: 'login',
            component: login
        }, {
            path: '/register',
            name: 'register',
            component: register
        }, {
            path: '/order',
            name: 'order',
            component: order
        }, {
            path: '/orderInfo',
            name: 'orderInfo',
            component: orderInfo
        }, {
            path: '/yichangdingdan',
            name: 'yichangdingdan',
            component: yichangdingdan
        }, {
            path: '/shangmen',
            name: 'shangmen',
            component: shangmen
        }, {
            path: '/wancheng',
            name: 'wancheng',
            component: wancheng
        }, {
            path: '/pinche',
            name: 'pinche',
            component: pinche
        }, {
            path: '/pincheList',
            name: 'pincheList',
            component: pincheList
        }, {
            path: '/pincheInfo',
            name: 'pincheInfo',
            component: pincheInfo
        }, {
            path: '/yuyuebaojia',
            name: 'yuyuebaojia',
            component: yuyuebaojia
        }, {
            path: '/demo',
            name: 'demo',
            component: demo
        }, {
            path: '/invitationCode',
            name: 'invitationCode',
            component: invitationCode
        }, {
            path: '/myoney',
            name: 'myoney',
            component: myoney
        }, {
            path: '/mingxi',
            name: 'mingxi',
            component: mingxi
        }, {
            path: '/tixian',
            name: 'tixian',
            component: tixian
        }, {
            path: '/index',
            name: 'index',
            component: index
        }, {
            path: '/infos',
            name: 'infos',
            component: infos
        }, {
            path: '/infoss',
            name: 'infoss',
            component: infoss
        }, {
            path: '/ID',
            name: 'shimingrenzheng',
            component: shimingrenzheng
        }, {
            path: '/opinion',
            name: 'opinion',
            component: opinion
        }, {
            path: '/mypage',
            name: 'mypage',
            component: mypage,
        }, {
            path: '/ourselves',
            name: 'ourselves',
            component: ourselves,
        }, {
            path: '/myContract',
            name: 'myContract',
            component: myContract,
        }, {
            path: '/wodehetong',
            name: 'wodehetong',
            component: wodehetong,
        }, {
            path: '/jiedanzhong',
            name: 'jiedanzhong',
            component: jiedanzhong,
        }, {
            path: '/mybaojia',
            name: 'mybaojia',
            component: baojia,
        }, {
            path: '/aaaaa',
            name: 'aaaaa',
            component: aaaaa,
        }, {
            path: '/tianjiabaojia',
            name: 'tianjiabaojia',
            component: tianjiabaojia
        }, {
            path: '/myBankard',
            name: 'myBankard',
            component: myBankard
        }, {
            path: '/bangdingka',
            name: 'bangdingka',
            component: bangdingka
        }, {
            path: '/share',
            name: 'share',
            component: share
        },{
            path: '/addmyFapiao',   //新增发票  订单id  79d3db423c0f4828975507052c23581f
            name: 'addmyFapiaoe',
            component: addmyFapiao
        },{
            path: '/myFapiao',   
            name: 'myFapiaoe',
            component: myFapiao
        },{
            path: '/fapiaoInfo',
            name: 'fapiaoInfoe',
            component: fapiaoInfo
        },{
            path: '/parent',
            name: 'parent',
            component: parent
        },{
            path: '/zhengchezhifu',
            name: 'zhengchezhifu',
            component: zhengchezhifu
        },{
            name: 'img-preview',
            path: '/img-preview',
            component: imgPreview
        },{
            name: 'sijijiedanInfo',
            path: '/sijijiedanInfo',
            component: sijijiedanInfo
        },{
            name: 'zaitu',
            path: '/zaitu',
            component: zaitu
        }]
})
