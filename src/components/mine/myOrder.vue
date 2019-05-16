<template>
  <div class="myOrder">
      <div class="public_header">
          <router-link to="/mine"><img src="../../../static/images/cf_back.png" alt=""></router-link>
          我的订单
      </div>
      <div class="nav">
          <ul>
              <li :class="active=='m'+0?'on':''"  @click="toggle(0)" @click.native.prevent="active = 'm0'">全部订单</li>
              <li :class="active=='m'+1?'on':''"  @click="toggle(1)" @click.native.prevent="active = 'm1'">待付款</li>
              <li :class="active=='m'+2?'on':''"  @click="toggle(2)" @click.native.prevent="active = 'm2'">待发货</li>
              <li :class="active=='m'+3?'on':''"  @click="toggle(3)" @click.native.prevent="active = 'm3'">待收货</li>
              <li :class="active=='m'+4?'on':''"  @click="toggle(4)" @click.native.prevent="active = 'm4'">已完成</li>
          </ul>
      </div>
      <div class="page-loadmore-wrapper" style="background-color: white; position: fixed;top:1.6rem;bottom: 0.01rem; -ms-overflow-y: scroll;overflow-y: scroll;left: 0;right:0;padding-bottom: 0.25rem;max-width: 7.5rem;margin: auto;-webkit-overflow-scrolling: touch !important;">
          <mt-loadmore style="font-size: 0.3rem;"  :bottomDistance="70"  :bottom-method="loadBottom" :top-method="loadTop" :bottom-all-loaded="allLoaded" class="loadmore" ref="loadmore" :auto-fill="false">
              <div class="order page-tab-container">
                  <mt-tab-container class="page-tabbar-tab-container"  v-model="active" swipeable>
                      <mt-tab-container-item  v-for="(item,index) in orderList1" :key="index" :id="'m'+index" >
                          <!-- cell组件 -->
                          <mt-cell><!--:title=item1.title-->
                              <ul v-if="showNoMore==0">
                                  <li v-for="(item1,index1) in orderList" :key="index1" @click="seeOrder(item1.orderId)">
                                      <div class="orderNumber">
                                          <div class="left">订单号:{{item1.orderNo}}</div>
                                          <div class="right" @click="del(item1.orderId)" v-if="item1.orderStatus=='A' || item1.orderStatus=='D'|| item1.orderStatus=='E' || item1.orderStatus=='F'"><img src="../../../static/images/cf_del.png" alt="" >删除</div>
                                      </div>
                                      <div class="bottom">
                                          <div class="goods" v-for="(item2,index2) in item1.goodsList" :key="index2">
                                              <div class="left">
                                                  <img :src="item2.goodspicSpec" alt="">
                                              </div>
                                              <div class="right">
                                                  <div class="top">
                                                      <div class="title">{{item2.goodsName}}</div>
                                                      <div class="spec">{{item2.goodsColer}},{{item2.goodsModel}}</div>
                                                  </div>
                                                  <div class="bottom">
                                                      <div class="price">x&nbsp;{{item2.goodsNum}}</div>
                                                      <div class="pri"><span class="price">￥{{item2.goodsMoney}}</span>&nbsp;元</div>
                                                  </div>
                                              </div>
                                          </div>
                                          <div class="num">
                                              <div>共 <i style="font-size: 0.22rem;">{{item1.goodsNumber}}</i> 件商品</div>
                                              <div>合计:<i>¥{{item1.orderMoney}}</i>元</div>
                                          </div>
                                          <!--待付款-->
                                          <!--     -->
                                          <div class="btn" v-if="item1.orderStatus=='A'">
                                              <div></div>
                                              <div class="button" @click="close(item1.orderId)">
                                                  <img src="../../../static/images/cf_cancelOrder.png" alt="">取消订单
                                              </div>
                                              <div class="public_line"></div>
                                              <div class="button" @click="goPay(item1.orderId,item1.orderNo,item1.orderMoney)">
                                                  <img src="../../../static/images/cf_goPay.png" alt="">去付款
                                              </div>
                                              <div></div>
                                          </div>
                                          <!--代发货-->
                                          <div class="btn" v-if="item1.orderStatus=='B'">
                                              <div></div>
                                              <div class="button" @click="warn(item1.orderId)">
                                                  <img src="../../../static/images/cf_bell.png" alt="">提醒发货
                                              </div>
                                              <div class="public_line"></div>
                                              <div class="button" @click="seeOrder(item1.orderId)">
                                                  <img src="../../../static/images/cf_price.png" alt="">查看订单
                                              </div>
                                              <div></div>
                                              <!--jumpRouter('orderDetail')"-->
                                          </div>
                                          <div class="btn" v-if="item1.orderStatus=='C'">
                                              <div class="orderStatus">
                                                  订单状态: <span>已发货</span>
                                              </div>
                                              <div class="public_line"></div>
                                              <div class="button"  @click="seeOrder(item1.orderId)">
                                                  <img src="../../../static/images/cf_logis.png" alt="">查看物流
                                              </div>
                                              <div class="public_line"></div>
                                              <div class="button"  @click="sureOrder(item1.orderId)" >
                                                  <img src="../../../static/images/cf_sureOrder.png" alt="">确认收货
                                              </div>
                                              <div></div>
                                          </div>
                                          <!--已完成-->
                                          <div class="btn" v-if="item1.orderStatus=='D'">
                                              <div></div>
                                              <div class="orderStatus">
                                                  订单状态: <span>已完成</span>
                                              </div>
                                              <div class="public_line"></div>
                                              <div class="button"  @click="seeOrder(item1.orderId)">
                                                  <img src="../../../static/images/cf_logis.png" alt="">查看订单
                                              </div>
                                              <div class="public_line"></div>
                                              <div @click="againPay(item1)" class="button" >
                                                  <img src="../../../static/images/cf_againPay.png" alt="">再次购买
                                              </div>
                                              <div></div>
                                          </div>
                                          <!--已取消-->
                                          <div class="btn" v-if="item1.orderStatus=='E'">
                                              <div></div>
                                              <div class="orderStatus">
                                                  订单状态: <span>已取消</span>
                                              </div>
                                              <div class="public_line"></div>
                                              <div @click="againPay(item1)" class="button" >
                                                  <img src="../../../static/images/cf_againPay.png" alt="">再次购买
                                              </div>
                                              <div></div>
                                          </div>
                                          <!--已过期-->
                                          <div class="btn" v-if="item1.orderStatus=='F'">
                                              <div></div>
                                              <div class="orderStatus">
                                                  订单状态: <span>已过期</span>
                                              </div>
                                              <div class="public_line"></div>
                                              <div @click="againPay(item1)" class="button" >
                                                  <img src="../../../static/images/cf_againPay.png" alt="">再次购买
                                              </div>
                                              <div></div>
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
              </div>
          </mt-loadmore>
         <!-- <div v-if="allLoaded && showNoMore==0" style="position:relative;width: 100%;font-size: 0.3rem;text-align: center;height:0.3rem;line-height: 0.3rem;padding: 0.1rem 0;">没有更多了</div>-->
      </div>

      <div v-if="showDle" class="public_shade delshade">
          <div class="public_center">
              <div class="delTitle">中联电器</div>
              <div class="delcontent">是否删除</div>
              <div class="delbottom">
                  <div class="delbottomCancel" @click="showDle=false">否</div>
                  <div @click="del1()">是</div>
              </div>
          </div>
      </div>

      <!--<div v-if="loading" class="loading public_shade" style="top: 0;z-index: 2222;background-color: rgba(0,0,0,0.1)"></div>-->
      <cf_loading :show="loading" :title="'loading...'"></cf_loading>
  </div>
</template>

<script>
export default {
  data () {
      return {
          loading:false,
          state:0,
          active:'m0',
          orderList1:[
              {
                 title:'全部订单',
              },
              {
                  title:'待付款',
              },
              {
                  title:'待发货',
              },
              {
                  title:'待收货',
              },
              {
                  title:'已完成',
              }
          ],
          orderList:[],
          stat:'',//订单状态 未付A,待发B,已发C,已完成D,已取消E,传字母
          page:1,
          pageSize:10,
          showDle:false,//删除框  显示
          delId:'',//删除Id
          allLoaded:false,
          showNoMore:0,
      }
  },
  mounted:function () {

      this.state=this.$route.query.state;
      this.active='m'+this.state;
      if(this.state==0){
          this.getOrder();
      }
  },
  watch:{
      active:function () {
            if(this.active=='m0'){
                this.stat='';
            }else if(this.active=='m1'){
                this.stat='A';
            }else if(this.active=='m2'){
                this.stat='B';
            }else if(this.active=='m3'){
                this.stat='C';
            }else if(this.active=='m4'){
                this.stat='D';
            }
          this.orderList=[];
          this.page=1;
          this.getOrder();
        }
    },
  computed:{
  },
  methods: {
      toggle:function(x){
          this.active = 'm'+x;
      },

      del:function (orderId) {
          event.stopPropagation();//阻止事件冒泡
          this.delId=orderId;
          this.showDle=true;
      },//删除   0k
      del1:function () {
          event.stopPropagation();//阻止事件冒泡
          //http://192.168.1.178:7777/service/orderInfo/deleteOrder?token=72d7e475-f82a-4434-a07c-4e53c479eb4a&orderId=6a22623a-e20e-4c73-830c-6db9b6828f30
          var that=this;
          this.$cfAjax('post', 'orderInfo/deleteOrder', 'token',localStorage.getItem('token'),'orderId', this.delId,function (res) {

              that.showDle=false;
              if(res.data.code==1){
                  that.$Toast({
                      message:'删除订单成功',
                      position: 'bottom'
                  });
                  that.orderList=[];
                  that.getOrder();
              }else{
                  that.$Toast({
                      message:res.data.msg,
                      position: 'bottom'
                  });
              }
          });

      },//删除   0k
      close:function (orderId) {
          event.stopPropagation();//阻止事件冒泡
          var that=this;
          this.$cfAjax('post', 'orderInfo/orderCancel', 'token',localStorage.getItem('token'),'orderId', orderId,function (res) {

              if(res.data.code==1){
                  that.$Toast({
                      message:'取消订单成功',
                      position: 'bottom'
                  });
                  that.orderList=[];
                  that.page=1;
                  that.getOrder();
              }else{
                  that.$Toast({
                      message:res.data.msg,
                      position: 'bottom'
                  });
              }
          });
      },//取消订单  0k
      goPay:function (orderId,orderNumber,totalMoney) {
          event.stopPropagation();//阻止事件冒泡
          sessionStorage.setItem('orderId',orderId);
          this.$jumpRouter('pay?orderNumber='+orderNumber+'&totalMoney='+totalMoney+'')
      },//去支付  跳页面  ok
      seeOrder:function (orderId) {
          event.stopPropagation();//阻止事件冒泡
          sessionStorage.setItem('orderId',orderId);
          this.$jumpRouter('/orderDetail');
      },//查看订单   //查看物流 跳页面  0k
      warn:function (orderId) {
          event.stopPropagation();//阻止事件冒泡
          //http://192.168.1.178:7777/service/orderInfo/remindDelivery?token=72d7e475-f82a-4434-a07c-4e53c479eb4a&orderId=6a22623a-e20e-4c73-830c-6db9b6828f30
          var that=this;
          this.$cfAjax('post', 'orderInfo/remindDelivery', 'token',localStorage.getItem('token'),'orderId', orderId,function (res) {

              if(res.data.code==1){
                  that.$Toast({
                      message:'提醒发货成功',
                      position: 'bottom'
                  });
              }else{
                  that.$Toast({
                      message:res.data.msg,
                      position: 'bottom'
                  });
              }
          });
      },//提醒订单  ok
      sureOrder:function (orderId) {
          event.stopPropagation();//阻止事件冒泡
          var that=this;
          this.$cfAjax('post', 'orderInfo/confirmReceipt', 'token',localStorage.getItem('token'),'orderId', orderId,function (res) {

              if(res.data.code==1){
                  that.$Toast({
                      message:'确认收货成功',
                      position: 'bottom'
                  });
                  that.orderList=[];
                  that.page=1;
                  that.getOrder();
              }else{
                  that.$Toast({
                      message:res.data.msg,
                      position: 'bottom'
                  });
              }
          });
          //alert('确认收货')
      },//确认收货 ok
      againPay:function (item) {
          event.stopPropagation();//阻止事件冒泡
          var that=this;
          that.loading=true;
          this.$cfAjax('post', 'orderInfo/subOrderAgain', 'token',localStorage.getItem('token'),'orderId', item.orderId,function (res) {
              //debugger;
              that.loading=false;

              if(res.data.code==1){
                  //拿到orderId 跳转
                  //sessionStorage.setItem('orderId',res.data.data.orderId);
                  //that.$jumpRouter('/finalOrder');
                  var goosdId='';
                  for(var i=0;i<item.goodsList.length;i++){
                      if(i==0){
                          goosdId+=item.goodsList[i].goodsinformationId;
                      }else{
                          goosdId+=','+item.goodsList[i].goodsinformationId;
                      }

                  }
                  that.$jumpRouter('/shopCart?goodsList='+goosdId)
              }else{
                  that.$Toast({
                      message:res.data.msg,
                      position: 'bottom'
                  });
              }
          });

         // alert('再次购买')
      },//再次购买  0k

      getOrder:function () {
          //event.stopPropagation();//阻止事件冒泡
          var that=this;
          this.$ajax.post(this.$baseurl+'orderInfo/getOrderInfoList?stat='+this.stat+'&type=Q&token='+localStorage.getItem('token')+'&iDisplayLength='+this.pageSize+'&iDisplayStart='+this.page)
              .then((res) => {

                  if(res.data.aData.length==0 && that.page==1){
                      that.showNoMore=1;
                  }else{
                      that.showNoMore=0;
                  }
                  //that.orderList=res.data.aData;
                  if(that.pageSize>res.data.aData.length){
                      that.allLoaded=true;
                  }else{
                      that.allLoaded=false;
                  }
                  for(var i=0;i<res.data.aData.length;i++){
                      that.orderList.push(res.data.aData[i]);
                  }
              })
              .catch((res) => {
              })
//          this.$ajax.post(this.$baseimgurl+'ordersInfoManage/getOrderInfoList.htm?stat='+this.stat+'&token='+localStorage.getItem('token')+'&iDisplayLength='+this.pageSize+'&iDisplayStart='+this.page)
//              .then((res) => {
//                  console.log(res)
//                  this.orderList=res.data.data;
//              })
//              .catch((res) => {
//              })
      },//获取订单信息

      loadBottom() {
          var self=this
          // 加载更多数据
          setTimeout(function () {
              self.page++;
              self.getOrder();
              //self.scrollMode = "touch";
              self.$refs.loadmore.onBottomLoaded();
          }, 2000);

//                this.allLoaded = true;// 若数据已全部获取完毕
//                this.$broadcast('onBottomLoaded', id);
//                self.$refs.loadmore.onBottomLoaded();

//                this.$nextTick(function () {
//                    // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，
//                    // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，
//                    // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好
//                    this.scrollMode = "touch";
//                });

      },
      loadTop(){
          let self=this;
          setTimeout(function () {
              self.orderList=[];
              self.page=1;
              self.getOrder();
              self.$refs.loadmore.onTopLoaded();
          }, 2000);

      }

  }
 }
</script>

<style lang="scss" scoped>
    .myOrder{
        padding-top: 0.88rem;
        .nav{
            background-color: #ffffff;
            // margin:0 0.2rem 0 0.2rem;
            display: flex;
            left: 0;
            right: 0;
            top: 0.44rem;
            margin: auto;
            overflow-x: auto;
            overflow-y: hidden;
            width:100%;
            height:0.71rem;
            border-top:0.03rem solid #DCDCDC;
            border-bottom:0.03rem solid #DCDCDC;
            font-size: 0.2rem;
            line-height: 0.71rem;
            ul{
                width: 100%;
                max-width: 7.5rem;
                height: 0.65rem;
                display:flex;
                justify-content: space-around;
                /*white-space:nowrap;*/
                li{
                    z-index: 33222;
                    //display: inline-block;
                    white-space:nowrap;
                    text-align: center;
                    //width: 1.5rem;
                }
                li.on{
                    color: #9D792A;
                    border-bottom:0.03rem solid #9D792A;
                }
            }

        }
        .order{

            font-size: 0.26rem;
            width: 100%;
            max-width: 7.5rem;
            .oneOrder{
                padding:0 0.25rem;
                background-color: #ffffff;
                margin-bottom: 0.2rem;
                .orderNumber{
                    padding: 0.15rem 0;
                    display: flex;
                    justify-content: space-between;
                    border-top:1px solid transparent;
                    border-bottom: 1px solid #eeeeee;
                    .right{
                        color: #9D792A;
                        font-size: 0.22rem;
                        img{
                            vertical-align: middle;
                            width: 0.26rem;
                            height: 0.26rem;
                            margin-right: 0.3rem;

                        }
                    }
                }
                .bottom{
                    .goods{
                        width: 100%;
                        padding: 0.2rem 0;
                        height: 2rem;
                        font-size: 0.21rem;
                        color: #9d792a;
                        display: flex;
                        justify-content: space-between;
                        border-bottom: 1px solid #eeeeee;
                        .left{
                            margin-right: 0.2rem;
                            height: 1.58rem;
                            line-height: 1.58rem;
                            width: 1.58rem;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .right{
                            width: 5rem;
                            .top{
                                .title{
                                    width: 90%;
                                    color: #282828;
                                    font-size: 0.26rem;
                                    overflow: hidden;
                                    text-overflow:ellipsis;
                                    white-space: nowrap;
                                }
                                .spec{
                                    color: #666666;
                                    font-size: 0.24rem;
                                    width: 90%;
                                    overflow: hidden;
                                    text-overflow:ellipsis;
                                    white-space: nowrap;
                                }

                            }
                            .bottom{
                                margin-top: 0.35rem;
                                display: flex;
                                justify-content: space-between;
                                .imgs{
                                    height: 0.42rem;
                                    img{
                                        height: 100%;
                                    }
                                }
                                .pri{
                                    color:#666666;
                                }
                                .price{
                                    color:#9D792A;
                                    font-size: 0.4rem;
                                }

                            }
                        }

                    }
                    .num{
                        padding: 0.2rem 0;
                        display: flex;
                        justify-content: space-between;
                        border-bottom: 1px solid #eeeeee;
                        //margin-bottom: 0.2rem;
                        color: #666666;
                        font-size: 0.20rem;
                        i{
                            color: #F16530;
                            font-size: 0.3rem;
                        }
                    }
                    .btn{
                        display: flex;
                        justify-content: space-between;
                        padding: 0.2rem 0;
                        font-size: 0.26rem;
                        color: #333333;
                        .orderStatus{
                            font-size: 0.2rem;
                            span{
                                color: #E41316;
                            }
                        }
                        .button{
                            img{
                                vertical-align: middle;
                                width: 0.26rem;
                                height: 0.26rem;
                                margin-right: 0.3rem;

                            }
                        }
                    }
                }

            }
            ul{

                li{
                    padding:0 0.25rem;
                    background-color: #ffffff;
                    margin-bottom: 0.2rem;
                    .orderNumber{
                        padding: 0.15rem 0;
                        display: flex;
                        justify-content: space-between;
                        border-top:1px solid transparent;
                        border-bottom: 1px solid #eeeeee;
                        .right{
                            color: #9D792A;
                            font-size: 0.22rem;
                            img{
                                vertical-align: middle;
                                width: 0.26rem;
                                height: 0.26rem;
                                margin-right: 0.3rem;

                            }
                        }
                    }
                    .bottom{
                        //border-bottom: 1px solid #b8bbbf;
                        .goods{
                            width: 100%;
                            padding: 0.2rem 0;
                            height: 2rem;
                            font-size: 0.21rem;
                            color: #9d792a;
                            display: flex;
                            justify-content: space-between;
                            border-bottom: 1px solid #eeeeee;
                            .left{
                                margin-right: 0.2rem;
                                height: 1.58rem;
                                line-height: 1.58rem;
                                width: 1.58rem;
                                img{
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            .right{
                                width: 5rem;
                                .top{
                                    .title{
                                        width: 90%;
                                        color: #282828;
                                        font-size: 0.26rem;
                                        overflow: hidden;
                                        text-overflow:ellipsis;
                                        white-space: nowrap;
                                        height: 0.4rem;
                                        line-height: 0.4rem;
                                    }
                                    .spec{
                                        height: 0.4rem;
                                        line-height: 0.4rem;
                                        color: #666666;
                                        font-size: 0.24rem;
                                        width: 90%;
                                        overflow: hidden;
                                        text-overflow:ellipsis;
                                        white-space: nowrap;
                                    }

                                }
                                .bottom{
                                    margin-top: 0.35rem;
                                    display: flex;
                                    justify-content: space-between;
                                    .imgs{
                                        height: 0.42rem;
                                        img{
                                            height: 100%;
                                        }
                                    }
                                    .pri{
                                        color:#666666;
                                    }
                                    .price{
                                        color:#9D792A;
                                        font-size: 0.4rem;
                                    }

                                }
                            }

                        }
                        .num{
                            padding: 0.2rem 0;
                            display: flex;
                            justify-content: space-between;
                            border-bottom: 1px solid #eeeeee;
                            //margin-bottom: 0.2rem;
                            color: #666666;
                            font-size: 0.20rem;
                            i{
                                color: #F16530;
                                font-size: 0.3rem;
                            }
                        }
                        .btn{
                            display: flex;
                            justify-content: space-between;
                            padding: 0.2rem 0;
                            font-size: 0.26rem;
                            color: #333333;
                            .orderStatus{
                                font-size: 0.2rem;
                                span{
                                    color: #E41316;
                                }
                            }
                            .button{
                                img{
                                    vertical-align: middle;
                                    width: 0.26rem;
                                    height: 0.26rem;
                                    margin-right: 0.3rem;

                                }
                            }
                        }
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
