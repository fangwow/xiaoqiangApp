<template>
  <div class="search">
      <div class="header">
          <div class="sear">
              <div class="search1">
                  <div class="imgs">
                      <img src="../../../static/images/cf_sea_sea.png" alt="">
                  </div>
                  <input type="text" id="sear"  v-model="goodsName" placeholder="请输入商品名称" autofocus="autofocus">
              </div>
             <div class="cancel" @click="goBack()">取消</div>
          </div>
      </div>
      <div class="contentmain">
          <div v-if="showSearch==0" class="content">
              <div class="hotsearch">
                  <img src="../../../static/images/cf_sea_hot.png" alt="">
                  <span>热搜</span>
              </div>
              <div class="search_con">
                  <ul>
                      <li v-for="(item,index) in hot" :key="index" @click="search1(item.topsearchText)"><span >{{item.topsearchText}}</span></li>
                  </ul>
              </div>
              <div class="hotsearch">
                  <img src="../../../static/images/cf_sea_history.png" alt="">
                  <span>搜索历史</span>
              </div>
              <div class="search_con">
                  <ul>
                      <li v-for="(item,index) in history" :key="index" @click="search1(item.searchhistoryText)"><span>{{item.searchhistoryText}}</span></li>
                      <!--<li><span>小米</span></li>-->
                      <!--<li><span>飞利浦电视</span></li>-->
                      <!--<li><span>55puf60332／t3</span></li>-->
                      <!--<li><span>支架</span></li>-->
                  </ul>
              </div>
              <div class="search_history">
                  <!--<div class="history">-->
                      <!--<img src="../../../static/images/cf_sea_history.png" alt="">-->
                      <!--<span>搜索历史</span>-->
                  <!--</div>-->
                  <!--<div class="history_con">-->
                      <!--<ul>-->
                          <!--<li><span>电视机</span></li>-->
                          <!--<li><span>小米</span></li>-->
                          <!--<li><span>飞利浦电视</span></li>-->
                          <!--<li><span>55puf60332／t3</span></li>-->
                          <!--<li><span>支架</span></li>-->
                      <!--</ul>-->
                      <!--&lt;!&ndash;<ul>&ndash;&gt;-->
                          <!--&lt;!&ndash;<li>&ndash;&gt;-->
                              <!--&lt;!&ndash;<div>飞利浦电视</div>&ndash;&gt;-->
                              <!--&lt;!&ndash;<div>&ndash;&gt;-->
                                  <!--&lt;!&ndash;<span>55寸</span>&ndash;&gt;-->
                                  <!--&lt;!&ndash;<span>65寸</span>&ndash;&gt;-->
                                  <!--&lt;!&ndash;<span>80寸</span>&ndash;&gt;-->
                              <!--&lt;!&ndash;</div>&ndash;&gt;-->
                          <!--&lt;!&ndash;</li>&ndash;&gt;-->
                          <!--&lt;!&ndash;<li>&ndash;&gt;-->
                              <!--&lt;!&ndash;<div>55puf60332／t3</div>&ndash;&gt;-->
                              <!--&lt;!&ndash;<div>&ndash;&gt;-->
                                  <!--&lt;!&ndash;<span>夏普</span>&ndash;&gt;-->
                                  <!--&lt;!&ndash;<span>电视</span>&ndash;&gt;-->
                              <!--&lt;!&ndash;</div>&ndash;&gt;-->
                          <!--&lt;!&ndash;</li>&ndash;&gt;-->
                      <!--&lt;!&ndash;</ul>&ndash;&gt;-->
                  <!--</div>-->
                  <div class="clear_hist">
                      <img src="../../../static/images/cf_sea_clear.png" alt="">
                      <span @click="showDle=true">清空历史</span>
                  </div>
              </div>
          </div>
          <!--搜索列表-->
          <div v-if="showSearch==1" class="searchList">
              <ul>
                  <li v-for="(item,index) in searchList" :key="index" >
                      <div @click="search1(item.goodsName)">{{item.goodsName}}</div>
                  </li>
              </ul>
          </div>
          <!--搜索结果-->
          <div v-if="showSearch==2 && searchList1.length!=0" class="content1">
              <div class="sea_result">搜索结果</div>
              <ul>
                  <li v-for="(item,index) in searchList1" :key="index"  @click="lookDetail(item.goodsinformationId)">
                      <div class="goods"><img :src="item.goodspics" alt=""></div>
                      <div class="details">
                          <div class="describe">{{item.goodsName}}</div>
                          <div class="price">￥{{item.goodsPrice}}</div>
                      </div>
                      <div class="addshopcart" @click="join(item.goodsinformationId)"><img src="../../../static/images/cf_cart.png" alt=""></div>
                  </li>
                  <li v-if="false">
                      <div class="goods"><img src="../../../static/images/cf_sea_shop.png" alt=""></div>
                      <div class="details">
                          <div class="describe">Philips/飞利浦 55PUF60312345</div>
                          <div class="price">￥2999</div>
                      </div>
                      <div class="addshopcart"><img src="../../../static/images/cf_cart.png" alt=""></div>
                  </li>
              </ul>
          </div>

          <div v-if="showDle" class="public_shade delshade">
              <div class="public_center">
                  <div class="delTitle">中联电器</div>
                  <div class="delcontent">是否清空全部</div>
                  <div class="delbottom">
                      <div class="delbottomCancel" @click="showDle=false">否</div>
                      <div @click="clear()">是</div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
      return {
          hot:[],//热词列表
          history:[],//历史词
          goodsName:'',//搜索词
          showSearch:0,//展示  0未搜索   1搜索热词   2搜索结果
          searchList:[],//第一次 查询
          searchList1:[],//第二次查询
          showDle:false,//删除框  显示
          searchName:'',//首页跳转过来
      }
  },
  mounted:function () {
      //调起软键盘
      var openSoftKeyboard = function() {
          if(mui.os.ios) {
              var webView = plus.webview.currentWebview().nativeInstanceObject();
              webView.plusCallMethod({
                  "setKeyboardDisplayRequiresUserAction": false
              });
          } else {
              var webview = plus.android.currentWebview();
              plus.android.importClass(webview);
              webview.requestFocus();
              var Context = plus.android.importClass("android.content.Context");
              var InputMethodManager = plus.android.importClass("android.view.inputmethod.InputMethodManager");
              var main = plus.android.runtimeMainActivity();
              var imm = main.getSystemService(Context.INPUT_METHOD_SERVICE);
              imm.toggleSoftInput(0, InputMethodManager.SHOW_FORCED);
          }
      }
      /*--------------------调起键盘------------*/
      mui.plusReady(function() {
          //页面隐藏事件
          plus.webview.currentWebview().addEventListener("hide",function(e){
              document.getElementById("sear").value="";
              document.getElementById("sear").blur();//搜索框取消焦点，关闭软键盘
          });
          //页面显示事件
          plus.webview.currentWebview().addEventListener("show",function(e){
              setTimeout(function() {//自动打开软键盘，搜索框获取焦点
                  openSoftKeyboard();
                  document.getElementById("sear").focus();
              }, 600);
              return false;
          });
      })


      this.$Indicator.close();
      if(this.$route.query.searchName){
          this.goodsName=this.$route.query.searchName;
          this.showSearch=2;
          this.search1(this.goodsName);
      }
      this.getSearchRes();
      this.getHot();
     /* this.jq("#sear").click();
      this.jq("#sear").removeAttr("autofocus");
      this.jq("#sear").attr("autofocus","autofocus");
      this.jq("#sear").focus();*/
      document.getElementById('sear').focus();
  },
  watch:{
      goodsName:function () {
          this.searchList=[];
          this.search();
          if(this.showSearch==0 || this.showSearch==2){
              this.showSearch=1
          }
      }
  },
  computed:{
  },
  methods: {
      aa:function () {
        console.log("aaa");
      },
      goBack:function () {
          this.$jumpRouter(sessionStorage.getItem('beforeSearch'));
      },
      getSearchRes:function () {
          var that=this;
          this.$cfAjax('post', 'userInfo/getSearchhistory','token',localStorage.getItem('token'),function (res) {//ajax通用
              if(res.data.code===1){
                  that.history=res.data.data;
              }
          });
      },//搜索历史
      getHot:function () {
          var that=this;
          this.$cfAjax('get', 'banner/getTopsearchInfo',function (res) {//ajax通用
              if(res.data.code===1){
                  that.hot=res.data.data;
              }
          });
      },//热词http://192.168.1.155:7777/service/goodsInfo/getGoodsName?goodsName=as
      search:function () {
          var that=this;
          this.$cfAjax('post', 'goodsInfo/getGoodsName','goodsName',this.goodsName,function (res){
              if(res.data.code==1){
                  that.searchList=res.data.data;
              }
          });
      },
      search1:function (name) {
          this.goodsName=name;
          var that=this;
          this.$cfAjax('post', 'goodsInfo/addGoodsByName','token',localStorage.getItem('token'), 'goodsName',name,function (res) {
              that.showSearch=2;
              if(res.data.code==1){
                  that.searchList1=res.data.data;
              }
          });
      },
      clear:function () {
          var that=this;
          this.showDle=false;
          this.$cfAjax('post', 'userInfo/deleteSearchhistory','token',localStorage.getItem('token'),function (res) {//ajax通用

              if(res.data.code===1){
                  that.$Toast({
                      message: '清空成功',
                      position: 'bottom'
                  });
                  that.history=[];
                  that.getSearchRes();
                  return;
              }else{
                  that.$Toast({
                      message: res.data.msg,
                      position: 'bottom'
                  });
                  return;
              }
          });
      },//清空
      join:function (goodsId) {
          event.stopPropagation();
          if (localStorage.getItem('token')==''){
              this.$jumpRouter('/login');
              return;
          }
          var that=this;
          this.$cfAjax('post', 'shoppingTro/addShopping','type',1, 'token',localStorage.getItem('token'),'goodsInfo', goodsId,'yet', '1',function (res) {
              if(res.data.code==1){
                  that.$Toast({
                      message: '加入购物车成功',
                      position: 'bottom'
                  });
              }else{
                  that.$Toast({
                      message:res.data.msg,
                      position: 'bottom'
                  });
              }
          });
      },//加入购物车
      lookDetail:function (goodsId) {
          sessionStorage.setItem('goodsId',goodsId);
          sessionStorage.setItem('beforeGoodsDetail','/search');
          this.$router.push({name:'goodsDetail',query:{goodsId:goodsId}});
      },
  }
 }
</script>

<style lang="scss" scoped>
    .search{
        font-size: 0;
        background-color: #ffffff;
        .header{
            width:100%;
            height:0.87rem;
            .sear{
                width:7.50rem;
                height:100%;
                background:rgba(199,167,97,1);
                position:relative;
                display: flex;
                .search1{
                    margin: auto;
                    width:6.04rem;
                    height:0.52rem;
                    background:rgba(255,255,255,1);
                    border-radius: 10px;
                    display: flex;
                    .imgs{
                        height: 100%;
                        img{
                            margin-top: 0.13rem;
                            width:0.27rem;
                            height:0.27rem;
                            margin-left: 0.2rem;
                            vertical-align: middle;
                        }
                    }
                    input{

                        font-size:0.28rem;
                        height: 100%;
                        width: 90%;
                        border-radius: 10px;
                        border: none;
                    }
                }
                .cancel{
                    margin-right: 0.22rem;
                    height: 0.87rem;
                    line-height: 0.87rem;
                    font-size:0.28rem;
                    color:rgba(255,255,255,1);

                }
            }
        }
        .contentmain{
            position: fixed;
            left: 0;
            top:0.88rem;
            bottom:0;
            right: 0;
            width:100%;
            margin: auto;
            max-width: 7.5rem;
            overflow-y: auto;
            background-color: white;
            .content{
                background-color: white;
                width:100%;
                padding-left:0.4rem;
                //padding-bottom: 0.4rem;
                .hotsearch{
                    width:100%;
                    height:0.8rem;
                    line-height:0.8rem;
                    background:rgba(255,255,255,1);
                    border-bottom: 1px solid #ddd;
                    img{
                        width:0.21rem;
                        height:0.23rem;
                    }
                    span{
                        font-size:0.24rem;
                        font-family:PingFangSC-Regular;
                        color:rgba(102,102,102,1);
                        margin-left:0.1rem;
                    }
                }
                .search_con{
                    width:100%;
                    padding-left:0.18rem;
                    margin-top:0.31rem;
                    ul{
                        li{
                            margin-top: 0.15rem;
                            line-height:0.42rem;
                            display:inline-block;
                            padding-left:0.2rem;
                            padding-right:0.2rem;
                            background:rgba(240,242,245,1);
                            border-radius: 0.08rem;
                            margin-right:0.17rem;
                            span{
                                font-size:0.24rem;
                                font-family:PingFangSC-Regular;
                                color:rgba(102,102,102,1);
                            }
                        }
                    }
                }
                .search_history{
                    .history{
                        width:7.1rem;
                        height:0.8rem;
                        background:rgba(255,255,255,1);
                        border-bottom:1px solid #ddd;
                        line-height:0.8rem;
                        img{
                            width:0.22rem;
                            height:0.22rem;
                        }
                        span{
                            margin-left:0.08rem;
                            font-size:0.24rem;
                            font-family:PingFangSC-Regular;
                            color:rgba(102,102,102,1);
                        }
                    }
                    .history_con{
                        ul{
                            li{
                                //display:flex;
                                width:7.1rem;
                                //height:0.8rem;
                                line-height:0.8rem;
                                background:rgba(255,255,255,1);
                                border-bottom: 1px solid #ddd;
                                margin-top: 0.15rem;
                               // align-items: center;
                                div:nth-child(1){
                                    display: inline-block;
                                    font-size:0.28rem;
                                    font-family:PingFangSC-Regular;
                                    color:rgba(102,102,102,1);
                                }
                                div:nth-child(2){
                                    display: inline-block;
                                    float: right;
                                    margin-right: 0;
                                    span{
                                        margin-right:0.25rem;
                                        font-size:0.24rem;
                                        font-family:PingFangSC-Regular;
                                        color:rgba(102,102,102,1);
                                        background:rgba(240,242,245,1);
                                        border-radius: 8px;
                                        height:0.42rem;
                                        line-height:0.42rem;
                                        padding-left:0.15rem;
                                        padding-right:0.15rem;
                                    }
                                }
                            }
                        }
                    }
                    .clear_hist{
                        margin-top: 0.1rem;
                        margin-left:-0.4rem;
                        text-align: center;
                        height:0.92rem;
                        line-height:0.92rem;
                        img{
                            width:0.23rem;
                            height:0.24rem;
                        }
                        span{
                            margin-left:0.11rem;
                            font-size:0.24rem;
                            font-family:PingFangSC-Regular;
                            color:rgba(153,153,153,1);
                        }
                    }
                }
            }
            .searchList{
                font-size: 0.26rem;
                ul{
                    padding:0 0.4rem 0.4rem;
                    li{
                        //padding-left: 0.1rem;
                        padding: 0.1rem;
                        //height: 0.8rem;
                        //line-height: 0.8rem;
                        border-bottom: 1px solid #DDDDDD;
                    }
                }
            }
            .content1{
                padding-left:0.4rem;
                background-color: white;
                .sea_result{
                    margin-top: 0.24rem;
                    font-size:0.26rem;
                    font-family:PingFang-SC-Regular;
                    color:rgba(102,102,102,1);
                }
                ul{
                    li{
                        border-bottom: 1px solid #ddd;
                        display:flex;
                        width:100%;
                        height:1.9rem;
                        padding-top:0.25rem;
                        .goods{
                            img{
                                width:1.4rem;
                                height:1.4rem;
                            }
                        }
                        .details{
                            position: relative;
                            margin:0 0.58rem 0 0.3rem;
                            width:4.12rem;
                            height:1.35rem;
                            .describe{
                                font-size:0.28rem;
                                font-family:PingFang-SC-Medium;
                                color:rgba(40,40,40,1);
                            }
                            .price{
                                position:absolute;
                                font-size:0.24rem;
                                font-family:PingFang-SC-Medium;
                                color:rgba(40,40,40,1);
                                bottom: -0.1rem;
                            }
                        }
                        .addshopcart{
                            margin-top:1.1rem;
                            img{
                                width:0.33rem;
                                height:0.28rem;
                            }
                        }
                    }
                }
            }

        }
        .delshade{
            font-size: 0.26rem;
            .public_center{
                width: 6rem;
                height: 3.5rem;
                background-color: white;
                .delTitle{
                    height: 1rem;
                    line-height: 1rem;
                    text-align: center;
                }
                .delcontent{
                    border-top: 1px solid #b8bbbf;
                    height: 1.5rem;
                    line-height: 1.5rem;
                    text-align: center;
                }
                .delbottom{
                    border-top: 1px solid #b8bbbf;
                    height: 1rem;
                    display: flex;
                    div{
                        height: 1rem;
                        line-height: 1rem;
                        width: 50%;
                        text-align: center;
                    }
                    .delbottomCancel{
                        border-right: 1px solid #b8bbbf;
                    }
                }
            }
        }
    }
</style>
