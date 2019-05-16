<template>
  <div class="finalOrder" v-if="show">
      <div class="public_header header">
          <a @click="$goBack()"><img src="../../../static/images/cf_back.png" alt=""></a>
          结算
      </div>
      <div class="content1">
          <div class="address">
              <div class="name">收货地址</div>
              <div class="address-name">{{name}}</div>
              <div class="phone">{{phone}}</div>
              <div class="addre">{{addressAll}}</div>
              <img v-if="false" src="../../../static/images/cf_go.png" alt=""  @click="jumpRouter('/address?state=1')">
          </div>
          <div class="shoplist">
              <p style="color:rgba(40,40,40,1);font-size:0.3rem;">商品信息</p>
              <ul>
                  <li v-for="(item,index) in orderObj.orderGoodsInfolist" :key="index" >
                      <div class="left"><img :src="item.goodspicSpec" alt=""></div>
                      <div class="right">
                          <div class="top">
                              <div class="title">{{item.goodsName}}</div>
                              <div class="spec">{{item.skuInfo.goodsColor}},{{item.skuInfo.goodsType}}</div>
                          </div>
                          <div class="bottom">
                              <div class="pri">x{{item.goodsCount}}</div>
                              <div class="button">￥{{item.goodsPrice}}</div>
                          </div>
                      </div>
                  </li>
              </ul>
          </div>
          <div class="bottom1">
              <div class="number">
                  <p class="p1">共 <i style="color: #f16530">{{orderObj.allGoodsCount}}</i> 件商品</p>
                  <p class="p2">小计：<i style="color: #f16530">￥{{orderObj.allGoodsPrice}}</i></p>
              </div>
              <div class="zlmoney">
                  <div class="left">
                      <img src="../../../static/images/cf_sel.png" alt="">
                      &nbsp;&nbsp;恒通币&nbsp;&nbsp;&nbsp;&nbsp;
                      <span>
                          可用{{orderObj.zlmoney}}
                      </span>&nbsp;&nbsp;&nbsp;&nbsp;
                      <input type="text" maxlength="5" v-model="zlmoney">
                  </div>
                  <div class="right" v-if="zlmoney">-￥{{zlmoney}}</div>
                  <div class="right" v-if="!zlmoney">-￥{{0}}</div>
              </div>
              <div class="frieight" v-if="false">
                  <div class="left">运费</div>
                  <div class="right">￥{{orderObj.freightPrice}}</div>
              </div>
              <div class="frieight">
                  <div class="left">实付金额</div>
                  <div class="right">￥{{Math.floor((orderObj.totalMoney-zlmoney)*100)/100}}</div>
              </div>
              <div class="remark">
                  <div class="left">
                      <div class="left-border">
                          买家备注:
                          <input type="text" v-model="remark" placeholder="如有特殊要求，请填写备注">
                      </div>
                     <div class="left-border" style="border:none;">
                         发票信息:
                         <input v-model="invoiceInfo" type="text" placeholder="如有特殊要求，请填写备注">
                     </div>
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
                  <input type="text" placeholder="请输入商品数量">
              </div>
              <div class="bottom">
                  <div class="left" @click="showAfterSale=false">取消</div>
                  <div class="public_line"></div>
                  <div class="right" @click="jumpRouter('/chooseServer')">确认</div>
              </div>
          </div>
      </div>
      <div class="footer">
          <div class="left" @click="showKefu=true">
              <img src="../../../static/images/cf_kefu.png" alt="">
              联系客服
          </div>
          <div class="right" @click="goPay()">
              去付款
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
      return {
          show:false,
          showKefu:false,//客服的遮罩
          showAfterSale:false,//售后的遮罩
          remark:'',//备注
          invoiceInfo:'',//发票抬头
          isZLmoney:1,//是否使用中联币 1是 0否
          zlmoney:0,//使用的中联币
          orderId:'',//orderID
          orderObj:{},//订单对象
          addressId:'',//地址ID
          addressAll:'',//地址
          phone:'',//手机号
          name:'',//name
      }
  },
  mounted:function () {
      this.$Indicator.close();
      this.getData();
  },
    watch:{
        zlmoney:function () {
            this.zlmoney=this.zlmoney.replace(/\D/g,'');
            if(this.orderObj.zlmoney>this.zlmoney && this.orderObj.totalMoney<this.zlmoney){
                this.zlmoney=this.orderObj.totalMoney;
            }else if(this.orderObj.zlmoney<this.zlmoney && this.orderObj.totalMoney<this.zlmoney){
                if(this.orderObj.zlmoney>this.orderObj.totalMoney){
                    this.zlmoney=this.orderObj.totalMoney;
                }else{
                    this.zlmoney=this.orderObj.zlmoney;
                }
            }
        }
    },
  computed:{
  },
  methods: {
      getData:function(){
          var that=this;
          //http://192.168.1.164:7777/service/orderInfo/getOrderInfo?token=72d7e475-f82a-4434-a07c-4e53c479eb4a&orderId=6a22623a-e20e-4c73-830c-6db9b6828f30
          this.$cfAjax('post', 'orderInfo/getOrderInfo', 'token',localStorage.getItem('token'),'orderId', sessionStorage.getItem('orderId'), function (res) {
              that.show=true;
              if(res.data.code==1){
                  that.orderObj=res.data.data;
                  that.addressAll=res.data.data.shippingaddress.shippingAddress;
                  that.addressId=res.data.data.shippingaddress.shippingaddressId;
                  that.phone=res.data.data.shippingaddress.consigneeTel;
                  that.name=res.data.data.shippingaddress.consigneeName;
                  that.invoiceInfo=res.data.data.invoiceHead;
              }
          });
      },
      goPay:function () {
          var that=this;
          //http://192.168.1.178:7777/service/orderInfo/updateOrder?token=72d7e475-f82a-4434-a07c-4e53c479eb4a&remark=备注&invoiceInfo=发票信息&isZLmoney=1&zlmoney=1&orderId=6a22623a-e20e-4c73-830c-6db9b6828f30
          this.$cfAjax('post', 'orderInfo/updateOrder', 'shippingaddressId',this.addressId, 'orderId',sessionStorage.getItem('orderId'),'isZLmoney',this.isZLmoney,'zlmoney',this.zlmoney,'token',localStorage.getItem('token'),'remark', this.remark, 'invoiceInfo', this.invoiceInfo,function (res) {

              if(res.data.code==1){
                  that.$jumpRouter('/pay?orderNumber='+res.data.data.orderNumber+'&totalMoney='+res.data.data.totalMoney);
              }
          });

      },//去付款
  }
 }
</script>

<style lang="scss" scoped>
    .finalOrder{
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
                padding: 0.1rem 0.3rem 0.29rem;
                background-color: white;
                position:relative;
                >img{
                    width:0.17rem;
                    height:0.34rem;
                    position:absolute;
                    right:0.29rem;
                    top:1.15rem;
                }
                .name{
                    margin-top: 0.3rem;
                    color:#282828;
                    font-size:0.3rem;
                }
                .address-name{
                    font-size:0.24rem;
                    color:#666666;
                }
                .phone,.addre{
                    font-size:0.22rem;
                    color:#666666;
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
                                    color: #F16530;
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
                    display:flex;
                    justify-content:space-between;
                    p{
                        color:#282828;
                    }
                }
                .zlmoney{
                    display: flex;
                    justify-content: space-between;
                    padding:0.1rem 0.3rem;
                    border-bottom: 2px solid #f0f2f5;
                    .left{
                        display:flex;
                        img{
                            width:0.3rem;
                            height:0.3rem;
                            margin-top:0.08rem;
                        }
                        input{
                            width:1.74rem;
                            height:0.42rem;
                            margin:0;
                            padding:0;
                            background-color:#f5f5f5;
                            border-radius:0.2rem;
                            font-size:0.2rem;
                            padding-left:0.1rem;
                            border:none;
                            margin-top:0.06rem;
                        }
                    }
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
                .remark{
                    display: flex;
                    justify-content: space-between;
                    padding:0.1rem 0.3rem;
                    border-bottom: 2px solid #f0f2f5;
                    .left{
                        width:100%;
                    }
                    .left-border{
                        width:100%;
                        height:0.81rem;
                        line-height:0.8rem;
                        display:flex;
                        border-bottom: 1px solid #f0f2f5;  
                        input{
                            height:0.8rem;
                            margin:0;
                            line-height:0.8rem;
                            padding:0;
                            border:none;
                            font-size:0.2rem;
                            width:80%;
                            padding-left:0.2rem;
                        }
                    }
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
