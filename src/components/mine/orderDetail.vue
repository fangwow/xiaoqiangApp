<template>
  <div class="orderDetail" v-if="show">
      <div class="public_header header">
          <a @click="$jumpRouter('/myOrder?state=0')"><img src="../../../static/images/cf_back.png" alt=""></a>
          订单详情
      </div>

      <div class="content1">
          <div class="address">
              <div class="name" v-if="orderInfo.shAddress==null">{{shippingaddress.consigneeName}}</div>
              <div class="phone" v-if="orderInfo.shAddress==null">{{shippingaddress.consigneeTel}}</div>
              <div class="addre" v-if="orderInfo.shAddress==null">{{shippingaddress.shippingAddress}}</div>
              <div class="name" v-if="orderInfo.shAddress!=null">{{orderInfo.shName}}</div>
              <div class="phone" v-if="orderInfo.shAddress!=null">{{orderInfo.shPhoneNumber}}</div>
              <div class="addre" v-if="orderInfo.shAddress!=null">{{orderInfo.shAddress}}</div>
              <div class="orderStatus">
                  <div class="left">订单状态:</div>
                  <div class="right" v-if="orderInfo.orderStatus=='E'"><img src="../../../static/images/yh-jingshi.png" alt="">&nbsp;已取消</div>
                  <div class="right" v-if="orderInfo.orderStatus=='F'"><img src="../../../static/images/yh-jingshi.png" alt="">&nbsp;已过期</div>
                  <div class="right" v-if="orderInfo.orderStatus=='D'"><img src="../../../static/images/cf_orderDetail4.png" alt="">&nbsp;已完成</div>
                  <div class="right" v-if="orderInfo.orderStatus=='A'"><img src="../../../static/images/cf_orderDetail1.png" alt="">&nbsp;待付款</div>
                  <div class="right" v-if="orderInfo.orderStatus=='B'"><img src="../../../static/images/cf_orderDetail2.png" alt="">&nbsp;待发货</div>
                  <div class="right" v-if="orderInfo.orderStatus=='C'" ><img src="../../../static/images/cf_orderDetail3.png" alt="">&nbsp;待收货</div>
              </div>
              <div class="orderNumber">
                  <div class="left">订单编号:</div>
                  <div class="right">{{orderInfo.orderNo}}</div>
              </div>
              <div class="orderTime">
                  <div class="left">订单日期:</div>
                  <div class="right">{{$timestampToTime(orderInfo.orderTime)}}</div>
              </div>

              <div class="logist" v-if="logisticsMsg==1">
                  <div class="logistCompany">物流信息:&nbsp;&nbsp;&nbsp;{{logistics.logisticsCompany}}</div>
                  <div class="logistNumber">物流单号:&nbsp;&nbsp;&nbsp;{{logistics.logisticsOddnumber}}</div>
                  <div class="logistDetail">
                      <div class="item" v-for="(item,index) in logisticsInfo.Traces" :key="index" >
                          <div class="left">{{item.AcceptTime}}</div>
                          <div class="right" style="margin-left: 0.2rem">{{item.AcceptStation}}</div>
                      </div>
                      <!--<div class="item">-->
                          <!--<div class="left">11-25 22:10</div>-->
                          <!--<div class="right">已经揽件</div>-->
                      <!--</div>-->
                  </div>
              </div>
          </div>
          <div class="shoplist">
              <ul>
                  <li v-for="(item,index) in goodsList" :key="index">
                      <div class="left"><img :src="item.goodspicSpec" alt=""></div>
                      <div class="right">
                          <div class="top">
                              <div class="title">{{item.goodsName}}</div>
                              <div class="spec">{{item.goodsColer}},{{item.goodsModel}}</div>
                          </div>
                          <div class="bottom">
                              <div class="pri">￥{{item.goodsMoney}}</div>
                              <div v-if="orderInfo.orderStatus=='D'">
                                  <div v-if="item.orderGoodsSaleAfterStatus==null" class="button" style="background-color: #ff5a5a;" @click="applySale(item.orderDetailId,item.goodsNum)">申请售后</div>
                                  <div v-if="item.orderGoodsSaleAfterStatus=='A'" class="button" style="background-color: #ffb554;">售后申请中</div>
                                  <div v-if="item.orderGoodsSaleAfterStatus=='B'" class="button" style="background-color: #ffb554;">处理中</div>
                                  <div v-if="item.orderGoodsSaleAfterStatus=='C'" class="button" style="background-color: #72d777;">售后完成</div>
                              </div>
                          </div>
                      </div>
                  </li>
              </ul>
          </div>
          <div class="bottom1">
              <div class="number">共 <i style="color: #f16530">{{orderInfo.goodsNumber}}</i> 件商品</div>
              <div class="totalMoney">
                  <div class="left">合计:</div>
                  <div class="right">￥{{Math.floor((orderInfo.orderMoney+orderInfo.zlmoneyCount-orderInfo.freight)*100)/100}}</div>
              </div>
              <div class="zlmoney" v-if="orderInfo.zlmoneyCount">
                  <div class="left">恒通币</div>
                  <div class="right">-￥{{orderInfo.zlmoneyCount}}</div>
              </div>
              <div class="frieight" v-if="false" >
                  <div class="left">运费</div>
                  <div class="right">￥{{orderInfo.freight}}</div>
              </div>
              <div class="endmoney">
                  <div class="left">
                      <div>实付金额:</div>
                      <div>网上支付</div>
                  </div>
                  <div class="right">￥{{orderInfo.orderMoney}}</div>
              </div>
              <div class="bill">
                  <div class="left">
                      <div>发票信息:</div>
                      <div v-if="!invoiceInfo">未开发票</div>
                      <div v-if="invoiceInfo">{{invoiceInfo.invoiceHead}}</div>
                  </div>
                  <div class="right" v-if="false">￥{{Math.floor((orderInfo.orderMoney+orderInfo.zlmoneyCount)*100)/100}}</div>
              </div>
              <div class="remark">
                  <div class="left">
                      <div>买家备注:</div>
                      <div v-if="!remark">买家没有说什么</div>
                      <div v-if="remark">{{remark}}</div>
                  </div>
                  <div class="right"></div>
              </div>
          </div>
      </div>
      <div v-if="showKefu" class="public_shade kefu">
          <div class="content public_center">
              <div class="top">联系电话</div>
              <div class="phone">{{$kefu}}</div>
              <div class="bottom">
                  <div class="left" @click="showKefu=false">取消</div>
                  <div class="public_line"></div>
                  <div class="right"><a style="color: #000;" :href="'tel:'+$kefu1" class="call">呼叫</a></div>
              </div>
          </div>
      </div>
      <div v-if="showAfterSale" class="public_shade AfterSale">
          <div class="content public_center">
              <div class="top">请填写商品售后数量</div>
              <div class="phone">
                  <input type="text" maxlength="4" v-model="saleNum" placeholder="请输入商品数量">
              </div>
              <div class="bottom">
                  <div class="left" @click="showAfterSale=false">取消</div>
                  <div class="public_line"></div>
                  <div v-if="saleNum!='' && saleNum!=0" class="right" @click="sure()">确认</div>
                  <div v-if="saleNum=='' || saleNum==0" class="right" >确认</div>
              </div>
          </div>
      </div>
      <div class="footer">
          <div class="left"  @click="showKefu=true">
              <img src="../../../static/images/cf_kefu.png" alt="">
              联系客服
          </div>
          <div class="right" v-if="orderInfo.orderStatus=='D'" @click="againPay(orderInfo)" >
              再次购买
          </div>
          <div class="right" v-if="orderInfo.orderStatus=='A'" @click="goPay(orderInfo.orderNo,orderInfo.orderMoney)" >
              去付款
          </div>
          <div class="right" v-if="orderInfo.orderStatus=='B'" @click="close(orderInfo.orderId)" >
              取消订单
          </div>
          <div class="right" v-if="orderInfo.orderStatus=='C'" @click="sureOrder(orderInfo.orderId)" >
              确认收货
          </div>
      </div>

      <div v-if="false" class="public_shade kefu">
          <div class="content public_center">
              <div class="top">温馨提示</div>
              <div class="phone" style="font-size: 0.26rem">您的金额将退回恒通币余额</div>
              <div class="bottom">
                  <div class="left" @click="showKefu=false">取消</div>
                  <div class="public_line"></div>
                  <div class="right">确定</div>
              </div>
          </div>
      </div>

      <cf_loading :show="loading" :title="'loading...'"></cf_loading>
  </div>
</template>

<script>
export default {
  data () {
      return {
          show:false,
          showKefu:false,//客服的遮罩
          showAfterSale:false,//售后的遮罩
          logisticsInfo:{},//物流 json串
          logistics:{},
          orderInfo:{},//订单
          shippingaddress:{},//地址
          saleNum:'',//售后数量
          maxNum:'',//最大数量
          goodsList:[],//商品列表
          invoiceInfo:'',//发票
          remark:'',
          orderId:'',
          logisticsMsg:0,//物流的状态
      }
  },
watch:{
    saleNum:function () {
        this.saleNum=this.saleNum.replace(/\D/g,'');
        if(parseInt(this.saleNum)>this.maxNum){
            this.saleNum=this.maxNum;
        }
    }
},
    mounted:function () {
        this.getData();
  },
  computed:{
  },
  methods: {
      getData:function () {
          var that=this;
          this.$cfAjax('post', 'orderInfo/updateOrderInfoByOrderId', 'token',localStorage.getItem('token'),'orderId', sessionStorage.getItem('orderId'),function (res) {
              that.show=true;
              if(res.data.code==1){
                  that.invoiceInfo=res.data.data.invoiceInfo;
                  that.logisticsMsg=res.data.data.logisticsMsg;
                  if(that.logisticsMsg==1){
                      that.logisticsInfo=JSON.parse(res.data.data.logisticsInfo.logisticsInfo);
                      that.logistics=res.data.data.logisticsInfo;
                  }
                  that.orderInfo=res.data.data.orderInfo;
                  that.shippingaddress=res.data.data.shippingaddress;
                  that.goodsList=res.data.data.orderInfo.goodsList;
                  that.remark=that.orderInfo.remark;
                  that.orderId=that.orderInfo.orderId;


              }else{
                  that.$Toast({
                      message:res.data.msg,
                      position: 'bottom'
                  });
              }
          });
      },
      applySale:function (orderDetailId,maxNum) {
          this.maxNum=maxNum;

          sessionStorage.setItem('orderDetailId',orderDetailId);
          this.showAfterSale=true;
      },
      sure:function () {
          if(this.saleNum<=0){
              this.showAfterSale=false;
              this.$Toast({
                  message:'售后数量不能为0',
                  position: 'bottom'
              });

              return;
          }
          if(this.saleNum>this.maxNum){
              this.showAfterSale=false;
              this.$Toast({
                  message:'售后数量不能超过总数量',
                  position: 'bottom'
              });
              return;
          }
          this.$jumpRouter('/chooseServer?number='+this.saleNum)
      },
      againPay:function (item) {
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
      goPay:function (orderNumber,totalMoney) {
          this.$jumpRouter('pay?orderNumber='+orderNumber+'&totalMoney='+totalMoney+'')
      },//去支付  跳页面  ok
      sureOrder:function (orderId) {
          var that=this;
          this.$cfAjax('post', 'orderInfo/confirmReceipt', 'token',localStorage.getItem('token'),'orderId', orderId,function (res) {

              if(res.data.code==1){
                  that.$Toast({
                      message:'确认收货成功',
                      position: 'bottom'
                  });
                  that.$goBack();
              }else{
                  that.$Toast({
                      message:res.data.msg,
                      position: 'bottom'
                  });
              }
          });
          //alert('确认收货')
      },//确认收货 ok
      close:function (orderId) {
          var that=this;
          this.$cfAjax('post', 'orderInfo/orderCancel', 'token',localStorage.getItem('token'),'orderId', orderId,function (res) {
              if(res.data.code==1){
                  that.$Toast({
                      message:'取消订单成功',
                      position: 'bottom'
                  });
                  that.$goBack();
              }else{
                  that.$Toast({
                      message:res.data.msg,
                      position: 'bottom'
                  });
              }
          });
      },//取消订单  0k
  }
 }
</script>

<style lang="scss" scoped>
    .orderDetail{
        padding-top: 0.9rem;
        font-size: 0.26rem;
        .header{
            border-bottom: 1.5px solid #f0f2f5;
        }
        .content1{
            position: fixed;
            top: 0.8rem;
            bottom: 1rem;
            left: 0;
            right: 0;
            width: 100%;
            max-width: 7.5rem;
            overflow-y: auto;
            margin: auto;

            .address{
                font-size: 0.22rem;
                padding: 0.1rem 0.3rem 0;
                background-color: white;
                .name{
                    margin-top: 0.3rem;
                }
                .phone{
                    color: #f27242;
                }
                .orderStatus{
                    display: flex;
                    height: 0.3rem;
                    line-height: 0.3rem;
                    margin-top: 0.3rem;
                    .left{
                        margin-right: 0.15rem;
                    }
                    .right{
                        color:#f27242;
                    }
                    img{
                        vertical-align: middle;
                        margin-top: -0.05rem;
                        height: 90%;
                    }
                }
                .orderNumber,.orderTime{
                    margin: 0.05rem 0;
                    display: flex;
                    .left{
                        margin-right: 0.15rem;
                    }
                }
                .logist{
                    margin-top: 0.3rem;
                    padding-bottom: 0.2rem;
                    .logistDetail{
                        .item{
                            //display: flex;
                            //margin: 0 0.05rem;
                            .left{
                               // margin-right: 0.15rem;
                            }
                        }
                    }
                }
            }
            .shoplist{
                border-bottom: 2px solid #f0f2f5;
                border-top: 2px solid #f0f2f5;
                padding: 0.2rem 0.3rem;
                //margin: 0.05rem 0;
                background-color: #ffffff;
                width: 100%;
                max-width: 7.5rem;
                ul{
                    li{
                        padding-top: 0.2rem;
                        height: 2rem;
                        font-size: 0.21rem;
                        color: #9d792a;
                        display: flex;
                        justify-content: space-between;
                        //border-bottom: 1px solid #eeeeee;
                        .left{
                            margin-right: 0.2rem;
                            height: 1.75rem;
                            line-height: 1.75rem;
                            width: 1.75rem;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .right{
                            width: 5rem;
                            .top{
                                .title{
                                    color: #000000;
                                    font-size: 0.2rem;
                                    width: 70%;
                                    overflow: hidden;
                                    text-overflow:ellipsis;
                                    white-space: nowrap;
                                }
                                .spec{
                                    color: #000000;
                                    font-size: 0.2rem;
                                    width: 70%;
                                    overflow: hidden;
                                    text-overflow:ellipsis;
                                    white-space: nowrap;
                                    margin: 0;
                                }

                            }
                            .bottom{
                                margin-top: 0.4rem;
                                display: flex;
                                justify-content: space-between;
                                .pri{
                                    color: #f16530;
                                    font-size: 0.28rem;
                                    vertical-align: middle;
                                    height: 0.5rem;
                                    line-height: 0.5rem;
                                }
                                .button{
                                    //padding: 0.05rem 0.15rem;
                                    width: 1.33rem;
                                    height: 0.5rem;
                                    line-height: 0.5rem;
                                    color: white;
                                    font-size: 0.24rem;
                                    border-radius: 10px;
                                    text-align: center;
                                }
                            }
                        }

                    }
                }
            }
            .bottom1{
                //padding: 0.1rem 0.3rem 0;
                background-color: white;
                .number{
                    margin:0.1rem 0.3rem 0;
                    border-bottom: 1px solid #f0f2f5;
                    padding: 0.1rem 0;
                }
                .totalMoney{
                    display: flex;
                    justify-content: space-between;
                    margin:0 0.3rem;
                    border-bottom: 1px solid #f0f2f5;
                    padding: 0.1rem 0;
                    .right{
                        color: #f16530;
                    }
                }
                .zlmoney{
                    display: flex;
                    justify-content: space-between;
                    padding:0.1rem 0.3rem;
                    border-bottom: 2px solid #f0f2f5;
                    .right{
                        color: #6abf7e;
                    }
                }
                .frieight{
                    display: flex;
                    justify-content: space-between;
                    margin:0 0.3rem;
                    padding: 0.1rem 0;
                    border-bottom: 1px solid #f0f2f5;
                    .right{
                        color: #f16530;
                    }
                }
                .endmoney{
                    display: flex;
                    justify-content: space-between;
                    padding:0.1rem 0.3rem;
                    border-bottom: 2px solid #f0f2f5;
                    .right{
                        padding: 0.2rem 0;
                        color: #f16530;
                    }
                }
                .bill{
                    display: flex;
                    justify-content: space-between;
                    margin:0 0.3rem;
                    padding: 0.1rem 0;
                    border-bottom: 1px solid #f0f2f5;
                    .right{
                        padding: 0.2rem 0;
                    }
                }
                .remark{
                    display: flex;
                    justify-content: space-between;
                    padding:0.1rem 0.3rem;
                    border-bottom: 2px solid #f0f2f5;
                    .right{
                        padding: 0.2rem 0;
                    }
                }
            }
        }

        .footer{
            position: fixed;
            bottom:0;
            left:0;
            right:0;
            width: 100%;
            margin: auto;
            max-width: 7.5rem;
            height: 0.99rem;
            line-height: 1rem;
            display: flex;
            background-color: white;
            .left{
                flex:1;
                text-align: center;
                img{
                    vertical-align: middle;
                    height: 0.34rem;
                }
            }
            .right{
                width: 50%;
                font-size: 0.3rem;
                text-align: center;
                height: 0.99rem;
                line-height: 0.99rem;
                background-color: #f16530;
                color: white;
            }
        }
        .kefu{
            .content{
                background-color: white;
                width: 5.4rem;
                height: 3.1rem;
                font-size: 0.26rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .top{
                    margin-top: 0.45rem;
                    color: #323232;
                    font-size: 0.26rem;
                    text-align: center;
                }
                .phone{
                    color: #333333;
                    font-size: 0.46rem;
                    text-align: center;
                }
                .bottom{
                    display: flex;
                    justify-content: space-between;
                    height: 1rem;
                    line-height: 1rem;
                    border-top: 1px solid #e6e6e6;
                    width: 100%;
                    .left{
                        width: 50%;
                        text-align: center;
                    }
                    .right{
                        width: 50%;
                        text-align: center;
                    }
                }
            }

        }
        .AfterSale{
            .content{
                background-color: white;
                width: 5.4rem;
                height: 3.1rem;
                font-size: 0.26rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .top{
                    margin: 0.25rem 0;
                    color: #323232;
                    font-size: 0.26rem;
                    text-align: center;
                }
                .phone{
                    padding:0 0.3rem;
                    color: #333333;
                    font-size: 0.46rem;
                    text-align: center;
                }
                .bottom{
                    display: flex;
                    justify-content: space-between;
                    height: 1rem;
                    line-height: 1rem;
                    border-top: 1px solid #e6e6e6;
                    width: 100%;
                    .left{
                        width: 50%;
                        text-align: center;
                    }
                    .right{
                        width: 50%;
                        text-align: center;
                    }
                }
            }

        }
    }
</style>
