// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import store from './vuex/store'
import VueScroller from 'vue-scroller'
import '../static/js/adaptation.js'
import '../static/js/basil.js'
import setWechatTitle from '../static/utils/setWechatTitle.js'
var JQ = require('jquery');
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);
// 图片预览插件
import vuePicturePreview from 'vue-picture-preview'
Vue.use(vuePicturePreview)



var log = console.log.bind(console)

Vue.use(MintUI);
Vue.prototype.$Indicator=Indicator;
Vue.prototype.$Toast=Toast;
// Vue.prototype.$ajax = axios;
Vue.prototype.jq = JQ;
Vue.prototype.$saveTime=7;//保存登录状态的时间,以天为单位
Vue.prototype.$kefu="400-6700-003";//客服电话 显示
Vue.prototype.$kefu1="4006700003";//客服电话

//正式
Vue.prototype.$baseimgurl="http://manage.vanda360.com/ht/" ;//后台图片上传地址
Vue.prototype.$baseurl="https://api.vanda360.com/service/";
Vue.prototype.$baseurl1="http://manage.vanda360.com/" ;//图片路径


Vue.config.productionTip = false;
//常用的方法
Vue.prototype.$jumpRouter=function (routerPath) {
    this.$router.push(routerPath);
} //路由跳转
Vue.prototype.$goBack=function () {
    this.$router.go(-1);
}//路由回退一步

axios.interceptors.request.use(function (config) {
    config.url = 'http://192.168.31.171:8081' + config.url;
    // config.url = 'http://192.168.31.171:8081' + config.url;
    return config;
}, function (error) {
    return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
    let res = response.data;

    return response.data;
}, function (error) {
    console.log(error)
    // 对响应错误做点什么
    return Promise.reject(error);
});
Vue.prototype.ajax = axios;


Vue.prototype.$cfAjax1=function () {
    var reqData='';
    if(arguments.length>3){
        for(var i=2;i<arguments.length-1;i+=2){
            if(i==2){
                reqData+='?'+arguments[i]+'='+arguments[i+1];
            }else{
                var m=encodeURI(arguments[i+1]);
                reqData+='&'+arguments[i]+'='+m;
            }
        }
    }
    if(arguments[0]=="post"){

        this.ajax.post(this.$baseurl+arguments[1]+reqData)
            .then((response) => {
                arguments[arguments.length-1](response);//callback方法
            })
            .catch((response) => {
            })
    }else{
        this.ajax.get(this.$baseurl+arguments[1]+reqData)
            .then((response) => {
                arguments[arguments.length-1](response);//callback方法
            })
            .catch((response) => {
            })
    }

}//通用ajax   第一个参数get or post  第二个 链接  最后一个是回调函数  其他的参数名,参数值
Vue.prototype.$cfAjax=function () {
    function callback(){}
    callback=arguments[arguments.length-1];
    var reqData='{';
    if(arguments.length>3){
        for(var i=2;i<arguments.length-1;i+=2){
            if(i==2){
                reqData+='\"'+arguments[i]+'\":\"'+arguments[i+1]+'\"';
            }else{
                reqData+=','+'\"'+arguments[i]+'\":\"'+arguments[i+1]+'\"';
            }
        }
    }
    reqData+='}';
    if(arguments[0]=="post"){
        this.jq.ajax({
            url : this.$baseurl+arguments[1],
            data : JSON.parse(reqData),
            type : "POST",
            dataType : "json",
            success : function(json) {
                var data={
                    data:json
                }
                callback(data);//callback方法
            },
            error : function() {
                console.log("异常错误");
            }
        });
    }else{
        var reqData1='';
        if(arguments.length>3) {
            for (var i = 2; i < arguments.length - 1; i += 2) {
                if (i == 2) {
                    reqData1 += '?' + arguments[i] + '=' + arguments[i + 1];
                } else {
                    var m = encodeURI(arguments[i + 1]);
                    reqData1 += '&' + arguments[i] + '=' + m;
                }
            }
        }
        this.ajax.get(this.$baseurl+arguments[1]+reqData1)
            .then((response) => {
                arguments[arguments.length-1](response);//callback方法
            })
            .catch((response) => {
            })
    }

}//post用的JQ 通用ajax   第一个参数get or post  第二个 链接  最后一个是回调函数  其他的参数名,参数值
Vue.prototype.$timestampToTime=function(timestamp) {
    var Y,M,D,h,m,s;
    if(Math.floor(timestamp/1000000000000)>0){
        var date = new Date(timestamp);
    }else{
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    }
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = (date.getDate()< 10 ? '0'+date.getDate():date.getDate() ) + ' ';
    h = (date.getHours()< 10 ? '0'+date.getHours():date.getHours() )+ ':';
    m = (date.getMinutes()< 10 ? '0'+date.getMinutes():date.getMinutes() ) + ':';
    s = (date.getSeconds()< 10 ? '0'+date.getSeconds():date.getSeconds() );
    return Y+M+D+h+m+s;
}//时间戳转时间格式
Vue.prototype.$strToNode=function(str) {
    var dd = document.createElement("div");
    dd.innerHTML = str;
    return dd;
}//字符串转  node
Vue.use(Vuex);
Vue.use(VueScroller);
/* eslint-disable no-new */

import cf_loading from './components/cf_components/cf_loading.vue';
Vue.component('cf_loading', cf_loading);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
router.beforeEach(function (to, from, next) {
    if (to.meta.auth) {
        //var url = location.href.split('#')[0].toString();
        console.log(from.name);
        if (localStorage.getItem('phone')) {
            next()
        } else {
            next('/login')
        }
    } else {
        next()
    }
})

