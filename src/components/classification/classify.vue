<template>
  <div class="classify">
      <header v-if="false" @click="goSearch()">
          <div class="search1">
              <input type="text" disabled placeholder="请输入搜索内容">
              <div class="search"><img src="../../../static/images/cf_search.png" alt=""></div>
          </div>
      </header>
      <div class="search">
          <div class="header1">
              <div  class="sear" :class="isSearch==true?'searon':''">
                  <div class="search1" :class="isSearch==true?'search1on':''">
                      <div class="imgs">
                          <img v-if="isSearch" src="../../../static/images/cf_sea_sea.png" alt="">
                          <img v-if="isSearch==false" src="../../../static/images/cf_search.png" alt="">
                      </div>
                      <input @click="isSearch=true" type="text" id="sear"  v-model="goodsName" placeholder="请输入商品名称">
                  </div>
                  <div v-if="isSearch" class="cancel" @click="goBack()">取消</div>
              </div>
          </div>
          <div v-if="isSearch" class="contentmain">
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
                      </ul>
                  </div>
                  <div class="search_history">
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


      <div class="all_goods" v-if="isSearch==false">
          <div class="good_title">
              <ul id="classTitle">
                  <li v-for="(item,index) in classifyNav" :key="index"  :class="active=='cf'+index?'on':''"  @click="toggle('cf'+index)" @click.native.prevent="active = 'cf'+index">{{item.goodstypeName}}</li>
                  <!--<li :class="active=='m1'?'on':''"  @click="toggle('m1')" @click.native.prevent="active = 'm1'">4K高清</li>-->
              </ul>
          </div>
          <section class="good_items page-tab-container">
            <div class="page-loadmore-wrapper" style=" -ms-overflow-y: scroll;overflow-y: scroll;padding-bottom: 1rem;margin-top:1.53rem;max-width: 7.5rem;-webkit-overflow-scrolling: touch !important;">
              <mt-loadmore style="font-size: 0.3rem;"  :bottomDistance="70"  :bottom-method="loadBottom" :top-method="loadTop" :bottom-all-loaded="allLoaded" class="loadmore" ref="loadmore" :auto-fill="false">


                 <mt-tab-container class="page-tabbar-tab-container"  v-model="active" swipeable>
                  <mt-tab-container-item  v-for="(item,index) in classifyNav" :key="index" :id="'cf'+index" >
                      <!-- cell组件 -->
                      <mt-cell><!--:title=item1.title-->
                           <ul v-if="showNoMore==0" >
                              <li style="margin-top: 0.05rem;" v-for="(item1,index1) in goodsList" :key="index1" @click="lookDetail(item1.goodsId)" >
                                  <img class="item_img" :src="item1.goodspics" alt="">
                                  <div class="info">
                                      <div class="goodname">{{item1.goodsName}}</div>
                                      <div class="mess">
                                          <div class="mess_price">¥</div><div>{{item1.goodsPrice}}</div><div></div>
                                          <div class="shopping"><img @click="join(item1.goodsId)" src="../../../static/images/hy_shopping_cart.png" alt=""></div>
                                      </div>
                                  </div>
                              </li>


                              <li v-if="false">
                                  <img class="item_img" src="../../../static/images/hy_item2.png" alt="">
                                  <div class="info">
                                      <div class="goodname">70迈 智能记录仪</div>
                                      <div class="mess">
                                          <div class="mess_price">¥</div><div>1990</div><div>元</div>
                                          <div class="shopping"><img src="../../../static/images/hy_shopping_cart.png" alt=""></div>
                                      </div>
                                  </div>
                              </li>
                          </ul>
                          <div class="NoMore" v-if="showNoMore==1">
                              <div>暂无数据</div>
                          </div>
                      </mt-cell>
                  </mt-tab-container-item>
              </mt-tab-container>

              </mt-loadmore>
              <!--<div v-if="allLoaded && showNoMore==0" style="position:relative;width: 100%;font-size: 0.3rem;text-align: center;height:0.3rem;line-height: 0.3rem;padding: 0.1rem 0;">没有更多了</div>-->
          </div>
          </section>


        </div>
      <!-- 底部 -->
      <div class="footer" v-if="isSearch==false">
          <ul>
              <li @click="jump(0)">
                  <div>
                      <div class="top"><img src="../../../static/images/hy_index.png" alt=""></div>
                      <div class="bottom">首页</div>
                  </div>
              </li>
              <li  class="isActive" @click="jump(1)">
                  <div>
                      <div class="top"><img src="../../../static/images/hy_fenlei_show.png" alt=""></div>
                      <div class="bottom" style="color: #9d792a;">分类</div>
                  </div>
              </li>
              <li @click="jump(2)">
                  <div>
                      <div class="top"><img src="../../../static/images/hy_cart.png" alt=""></div>
                      <div class="bottom">购物车</div>
                  </div>
              </li>
              <li @click="jump(3)">
                  <div>
                      <div class="top"><img src="../../../static/images/hy_mine.png" alt=""></div>
                      <div class="bottom">我的</div>
                  </div>
              </li>
          </ul>
      </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      type: 1,
      type1: 2,
      active:'cf0',//左右滑动的 id
      classifyNav:[],//分类 导航栏
      classifyNavId:'',//分类ID
      goodsList:[],//商品
      allLoaded: true,
      scrollMode: "auto",
      page:1,
      pageSize:10,
      showNoMore:0,

        hot:[],//热词列表
        history:[],//历史词
        goodsName:'',//搜索词
        showSearch:0,//展示  0未搜索   1搜索热词   2搜索结果
        searchList:[],//第一次 查询
        searchList1:[],//第二次查询
        showDle:false,//删除框  显示
        searchName:'',//首页跳转过来
        isSearch:false,//是不是搜索页
    };
  },
  mounted:function () {
      this.$Indicator.close();
      sessionStorage.setItem('addressId','');
      sessionStorage.setItem('addressPca','');
      this.getClassifyNav();

      this.getSearchRes();
      this.getHot();
  },
  watch:{
      active:function () {

          //document.getElementsByClassName('mint-tab-container-wrap')[0].style.transform='';
          for(var i=0;i<this.classifyNav.length;i++){
              if('cf'+i==this.active){
                  this.classifyNavId=this.classifyNav[i].goodstypeId;

                  if(i>2&&i<this.classifyNav.length-2){
                      document.getElementById('classTitle').style.marginLeft=(2-i)*1.5+'rem';
                  }


                  this.page=1;
                  this.goodsList=[];
                  this.getData();
                  break;
              }
          }
        },

      goodsName:function () {
          this.searchList=[];
          if(this.goodsName==''){
              return;
          }
          this.search();
          if(this.showSearch==0 || this.showSearch==2){
              this.showSearch=1
          }
      },
      showSearch:function () {
          if(this.showSearch==0){
              this.getSearchRes();
              this.getHot();
          }
      }
    },
  methods: {
      goBack:function () {
          this.goodsName='';
          this.showSearch=0;
          this.isSearch=false;
          //this.$jumpRouter(sessionStorage.getItem('beforeSearch'));
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
      /*join:function (goodsId) {
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
      },*/


    jump:function (idx) {
          if(idx==0){
              this.$router.push("/index");
          }else if(idx==1){
              this.$router.push("/classify");
          }else if(idx==2){
              this.$router.push("/shopCart?goodsList=''");
          }else if(idx==3){
              this.$router.push("/mine");
          }

      },
    toggle:function(x){
        this.active = x;
    },
    goSearch:function () {
        sessionStorage.setItem('beforeSearch','/classify');
        this.$jumpRouter('/search')
    },
    getClassifyNav:function(){
        var that=this;
        this.$cfAjax('post', 'goodsInfo/getGoodsTypeInfo', function (res) {
            if(res.data.code==1){
                that.classifyNav=res.data.data;
                that.classifyNavId=res.data.data[0].goodstypeId;
                that.active='cf0';
                that.getData();
            }
        });


    },
    getData:function () {
        //debugger;
        var that=this;
        this.$cfAjax('post', 'goodsInfo/getGoodsInfoByType', 'goodstype',this.classifyNavId,'sEcho',1,'iDisplayStart',this.page,'iDisplayLength',this.pageSize,function (res) {
            if(res.data.aData.length==0 && that.page==1){
                that.showNoMore=1;
            }else{
                that.showNoMore=0;
            }
            if(that.pageSize>res.data.aData.length){
                that.allLoaded=true;
            }else{
                that.allLoaded=false;
            }
            for(var i=0;i<res.data.aData.length;i++){
                that.goodsList.push(res.data.aData[i]);
            }
        });
    },
    lookDetail:function (goodsId) {
      sessionStorage.setItem('goodsId',goodsId);
      sessionStorage.setItem('beforeGoodsDetail','/classify');
      this.$router.push({name:'goodsDetail',query:{goodsId:goodsId}});
    },
    join:function (goodsId) {
      event.stopPropagation();//阻止事件冒泡
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
    loadBottom() {
      var self=this
      // 加载更多数据
      setTimeout(function () {
          self.page++;
          self.getData();
          //self.scrollMode = "touch";
          self.$refs.loadmore.onBottomLoaded();
      }, 2000);
    },
    loadTop(){
      let self=this;
      setTimeout(function () {
          self.goodsList=[];
          self.page=1;
          self.getData();
          self.$refs.loadmore.onTopLoaded();
      }, 2000);

    },
  }
};
</script>

<style lang="scss" scoped>
    .mint-loadmore-top {
        background-color: white;
    }
    .classify{
        background-color: white;
        max-width:7.5rem;
        overflow-x:hidden;
        height: 100%;

        header{
            z-index: 999;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            font-size:0;
            background: #fff;
            height:0.84rem;
            width:100%;
            display: flex;
            .search1{
                margin: auto;
                border:0.04rem solid #DCDCDC;
                border-radius: 0.3rem;
                width:6.74rem;
                height:0.58rem;
                overflow: hidden;
                .search{
                    margin-top: 0.1rem;
                    margin-right: 0.3rem;
                    width: 0.32rem;
                    float: right;
                    img{
                        vertical-align: middle;
                        width: 100%;
                    }
                }
                input{
                    width: 70%;
                    height: 100%;
                    float: left;
                    border: 0;
                    outline: none;
                    margin:0;

                }
            }

            input::-webkit-input-placeholder{
                font-size:0.2rem;
                color: #DCDCDC;
            }
            input:-moz-placeholder{
                font-size:0.2rem;
                color: #DCDCDC;
            }
            input::-moz-placeholder{
                font-size:0.2rem;
                color: #DCDCDC;
            }
            input:-ms-input-placeholder{
                font-size:0.2rem;
                color: #DCDCDC;
            }
        }
        .all_goods{
            background: #fff;
            width:100%;

            .good_title{
                background-color: white;
                z-index: 999;
                position: fixed;
                top: 0.84rem;
                left: 0;
                right: 0;
                display: flex;
                margin: auto;
                overflow-x: auto;
                overflow-y: hidden;
                width:100%;
                height:0.69rem;
                border-top:0.03rem solid #DCDCDC;
                border-bottom:0.03rem solid #DCDCDC;
                font-size: 0.2rem;
                line-height: 0.69rem;
                /*overflow-x: scroll;*/


                overflow-x: hidden;
                ul{
                    height: 0.63rem;
                    display:flex;
                    justify-content: space-around;
                    /*white-space:nowrap;*/
                    li{
                        z-index: 33222;
                        display: inline-block;
                        white-space:nowrap;
                        text-align: center;
                        width: 1.5rem;
                    }
                    li.on{
                        color: #9D792A;
                        border-bottom:0.03rem solid #9D792A;
                    }
                }

            }
            .mint-cell-value{
                float: left;
            }
            .good_items{
                margin-top:0.19rem;
                font-size: 0.26rem;
                .mint-cell{
                }
                ul{
                    overflow: hidden;
                    width: 7.5rem;
                    li{
                        float: left;
                        margin-left: 0.2rem;
                        width: 3.4rem;
                        .info{
                            margin-top:0.26rem;
                            width:  3.4rem;
                            .goodname{
                                width:  3.4rem;
                                height: 0.4rem;
                                line-height: 0.4rem;
                                white-space: nowrap;
                                overflow:hidden;
                                text-overflow: ellipsis;    //文字隐藏后添加省略号
                                -o-text-overflow:ellipsis; //适用于opera浏览器
                                font-size:0.26rem;
                                margin-top: 0.1rem;
                                margin-bottom:0.2rem;
                            }
                            .mess{
                                display:flex;
                                margin-bottom: 0.49rem;
                                div:nth-child(1){
                                    font-size:0.3rem;
                                    color:#9D792A;
                                    font-family: PingFang-SC-Regular;
                                    margin-right:0.08rem;
                                }
                                div:nth-child(2){
                                    font-size:0.36rem;
                                    color:#9D792A;
                                    font-family: STHeitiSC-Light;
                                    margin-right:0.08rem;
                                }
                                div:nth-child(3){
                                    font-size:0.24rem;
                                    color:#858585;
                                    font-family: STHeitiSC-Light
                                }
                                .shopping{
                                    flex:1;
                                    margin-right:0.2rem;
                                    img{
                                        width:0.32rem;
                                        height:0.32rem;
                                        float: right;
                                    }
                                }
                            }
                        }
                        img{
                            width: 3.2rem;
                            height: 3.2rem;
                        }
                    }
                }
                .NoMore{
                    padding-top: 2rem;
                    width: 7rem;
                    height: 11rem;
                    div{
                        color: black;
                        width: 100%;
                        text-align: center;
                    }
                }
            }
        }
        /*=====底部====*/
        .footer{
            max-width: 7.5rem;
            z-index: 99;
            border-top: 1px solid #e8e8e8;
            padding: 0.1rem;
            background-color: #ffffff;
            height: 0.99rem;
            position: fixed;
            bottom:0;
            left: 0;
            right:0;
            margin: auto;
            ul{
                display: flex;
                justify-content: space-around;
                font-size: 0.2rem;
                li{
                    div{
                        .top{
                            height: 0.4rem;
                            text-align: center;
                            img{
                                height: 100%;
                            }
                        }
                        .bottom{
                            text-align: center;
                        }
                    }
                    .isActive{
                        div{
                            .bottom{
                                color: #9d792a;
                            }
                        }
                    }
                }
            }

        }
        .good_items{

            width: 100%;
            max-width: 7.5rem;
            overflow-y: auto;
            //height: 100%;
        }

        .mint-loadmore-bottom{
            display: none !important;
            font-size: 0 !important;
        }
        .is-dropped{
            height: 11rem;
        }
    }


    .search{
        z-index: 999;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        font-size:0;
        //background: #fff;
        height:0.84rem;
        width:100%;
        display: flex;
        //font-size: 0;
        background-color: #ffffff;
        .header1{
            border:0.04rem solid #DCDCDC;
            width:100%;
            height:0.87rem;
            .sear{
                width:7.50rem;
                height:100%;
                background-color: white;
                position:relative;
                display: flex;
                .search1{
                    overflow: hidden;
                    margin: auto;
                    width:7.04rem;
                    height:0.52rem;
                    background:rgba(255,255,255,1);
                    border-radius: 10px;
                    border: 1px solid #DCDCDC;
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
                .search1on{
                    border: none;
                    width: 6.04rem !important;
                }
                .cancel{
                    margin-right: 0.45rem;
                    height: 0.87rem;
                    line-height: 0.87rem;
                    font-size:0.28rem;
                    color:rgba(255,255,255,1);
                }
            }
            .searon{
                background-color: #9d792a;
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
