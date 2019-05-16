<template>
  <div class="pay">
      <div class="public_header" >
          <router-link to="/mine"><img src="../../../static/images/cf_back.png" alt=""></router-link>
          支付
      </div>
      <div class="order-number">
            <p><span>订单编号：</span><span>{{orderNumber}}</span></p>
            <p><span>订单金额：</span><span>￥{{totalMoney}}</span></p>
      </div>
      <div class="order-list">
            <p>选择支付方式：</p>
            <p v-if="totalMoney!=0" @click="zhifu=0">
                <span>
                    <img src="../../../static/images/yh-weixin.png" alt="">微信支付
                </span>
                <img v-if="zhifu!=0" src="../../../static/images/yh-noone-zhifu.png" alt="">
                <img v-if="zhifu==0" src="../../../static/images/yh-check-zhifu.png" alt="">
            </p>
            <p v-if="totalMoney==0" @click="gun()">
                <span>
                    <img src="../../../static/images/yh-weixin.png" alt="">微信支付
                </span>
              <img v-if="zhifu!=0" src="../../../static/images/yh-noone-zhifu.png" alt="">
              <img v-if="zhifu==0" src="../../../static/images/yh-check-zhifu.png" alt="">
          </p>
            <p v-if="totalMoney!=0" @click="zhifu=1">
                <span>
                    <img src="../../../static/images/yh-zhifubao.png" alt="">支付宝
                </span>
                <img v-if="zhifu!=1" src="../../../static/images/yh-noone-zhifu.png" alt="">
                <img v-if="zhifu==1" src="../../../static/images/yh-check-zhifu.png" alt="">
            </p>
            <p v-if="totalMoney==0" @click="gun()">
                <span>
                    <img src="../../../static/images/yh-zhifubao.png" alt="">支付宝
                </span>
              <img v-if="zhifu!=1" src="../../../static/images/yh-noone-zhifu.png" alt="">
              <img v-if="zhifu==1" src="../../../static/images/yh-check-zhifu.png" alt="">
          </p>
            <p @click="zhifu=3">
                <span>
                    <img src="../../../static/images/yh-zhonglian.png" alt="">恒通币
                </span>
                <img v-if="zhifu!=3" src="../../../static/images/yh-noone-zhifu.png" alt="">
                <img v-if="zhifu==3" src="../../../static/images/yh-check-zhifu.png" alt="">
            </p>
            <p @click="gun()" v-if="totalMoney==0">
                <span>
                    <img src="../../../static/images/yh-yinhang.png" alt="">银行卡
                    <div v-if="false">4</div>
                </span>
              <img v-if="zhifu!=2" src="../../../static/images/yh-noone-zhifu.png" alt="">
              <img v-if="zhifu==2" src="../../../static/images/yh-check-zhifu.png" alt="">
          </p>
            <p @click="zhifu=2;"  v-if="totalMoney!=0">
                <span>
                    <img src="../../../static/images/yh-yinhang.png" alt="">银行卡
                    <div v-if="false" >4</div>
                </span>
              <img v-if="zhifu!=2" src="../../../static/images/yh-noone-zhifu.png" alt="">
              <img v-if="zhifu==2" src="../../../static/images/yh-check-zhifu.png" alt="">
          </p>
      </div>
      <div class="public_shade shaderemind" v-if="shaderemind">
        <div class="public_center shade-box">
           <p class="remind">交易提醒</p>
           <p class="remind-p1">由于交易金额超出交易范围请联系客服</p>
           <p class="remind-p2">{{$kefu}}</p>
           <p class="remind-btn"><span @click="shaderemind=false">取消</span><span><a style="color: #000;" :href="'tel:'+$kefu1" class="call">呼叫</a></span></p>
        </div>
      </div>
      <div class="public_shade" v-if="false">
        <div class="public_center shadeinput">
           <p class="remind">支付密码</p>
           <div class="remind-input"></div>
           <p class="remind-btn"><span @click="jumpRouter('/paysuccess')">确认</span><span @click="shadepay=false">取消</span></p>
        </div>
      </div>
      <button v-if="zhifu!=2" class="cancel" id="pay">确认支付</button>
      <button v-if="zhifu==2" class="cancel" style="overflow: hidden;" id="yinlian" @click="yinlian()">确认支付</button>
      <!--支付密码框-->
      <div id="payPassWord"  v-if="shadepay" class="public_shade showpsd">
          <div class="public_center">
              <div class="psdTitle">
                  <div style="font-size: 0.3rem;width: 1rem;height: 1rem; line-height: 1rem; text-align: center;"></div>
                  <div>请输入支付密码</div>
                  <div style="font-size: 0.3rem;width: 1rem;height: 1rem; line-height: 1rem; text-align: center;"></div>
              </div>
              <div class="psdCenter">
                  <div class="mima">
                      <input id="payPsd" autofocus="autofocus" type="text" maxlength="6" v-model="psd">
                  </div>
                  <div  id="pwd" class="password">
                      <div  v-if="psd.length>=1" style="border: 1px solid #9d792a;">*</div>
                      <div class="itemPwd" v-if="psd.length<1"></div>
                      <!--<div class="itemPwd" v-if="psd.length==0"><img src="../../../static/images/cf_cursor.gif" alt=""></div>-->
                      <div v-if="psd.length>=2" style="border: 1px solid #9d792a;">*</div>
                      <div class="itemPwd" v-if="psd.length<2"></div>
                      <!--<div class="itemPwd" v-if="psd.length<2 && psd.length!=1"></div>-->
                      <!--<div class="itemPwd" v-if="psd.length==1"><img src="../../../static/images/cf_cursor.gif" alt=""></div>-->
                      <div v-if="psd.length>=3" style="border: 1px solid #9d792a;">*</div>
                      <div class="itemPwd" v-if="psd.length<3"></div>
                      <!--<div class="itemPwd" v-if="psd.length<3 && psd.length!=2"></div>-->
                      <!--<div class="itemPwd" v-if="psd.length==2"><img src="../../../static/images/cf_cursor.gif" alt=""></div>-->
                      <div v-if="psd.length>=4" style="border: 1px solid #9d792a;">*</div>
                      <div class="itemPwd" v-if="psd.length<4"></div>
                      <!--<div class="itemPwd" v-if="psd.length<4 && psd.length!=3"></div>-->
                      <!--<div class="itemPwd" v-if="psd.length==3"><img src="../../../static/images/cf_cursor.gif" alt=""></div>-->
                      <div v-if="psd.length>=5" style="border: 1px solid #9d792a;">*</div>
                      <div class="itemPwd" v-if="psd.length<5"></div>
                      <!--<div class="itemPwd" v-if="psd.length<5 && psd.length!=4"></div>-->
                      <!--<div class="itemPwd" v-if="psd.length==4"><img src="../../../static/images/cf_cursor.gif" alt=""></div>-->
                      <div v-if="psd.length>=6" style="border: 1px solid #9d792a;">*</div>
                      <div class="itemPwd" v-if="psd.length<6"></div>
                      <!--<div class="itemPwd" v-if="psd.length<6 && psd.length!=5"></div>-->
                      <!--<div class="itemPwd" v-if="psd.length==5"><img src="../../../static/images/cf_cursor.gif" alt=""></div>-->

                  </div>
              </div>
              <div class="psdBottom">
                  <div class="canc" @click="payCancel()">取消</div>
                  <div class="sur" @click="paySure()">确认</div>
              </div>
          </div>
      </div>

      <!--<div  v-if="loading" class="loading public_shade" style="z-index: 992222;background-color: rgba(0,0,0,0.1)"></div>-->
      <cf_loading :show="loading" :title="'loading...'"></cf_loading>
    </div>
</template>
<script>
export default {
  data () {
      return {
          loading:false,
        shaderemind:false,//客服的遮罩
        shadepay:false,//支付遮罩层的显示
        orderNumber:'',//订单编号
        totalMoney:0, //金额
          zhifu:0,//支付方式
          psd:'',//mima
          formdata:'',
          addNode:1,
      }
  },
  watch:{
      psd:function () {
          this.psd=this.psd.replace(/\D/g,'');
      }
  },
  mounted:function () {
      //this.$Indicator.open('Loading...');
//      this.$Indicator.open({
//          text: 'Loading...',
//          spinnerType: 'fading-circle'
//      });
  //    this.$Indicator.close();
      this.orderNumber=this.$route.query.orderNumber;
      this.totalMoney=this.$route.query.totalMoney;
      sessionStorage.setItem('totalMoney',this.totalMoney);
      //sessionStorage.setItem('totalMoney','150000');

      if(this.totalMoney==0){
          this.zhifu=3;
      }

      var that=this;
      var wxChannel = null; // 微信支付
      var aliChannel = null; // 支付宝支付
      var channel = null;
      mui.init({
          swipeBack:true //启用右滑关闭功能
      });
      mui.plusReady(function() {
          // 获取支付通道
          plus.payment.getChannels(function(channels){
              for (var i in channels) {
                  if (channels[i].id == "wxpay") {
                      wxChannel=channels[i];
                  }else{
                      aliChannel=channels[i];
                  }
              }
          },function(e){
              alert("获取支付通道失败："+e.message);
          });
      });
      document.getElementById('pay').addEventListener('tap',function() {
          //监听微信支付按钮
          if(that.zhifu==0){
              pay('wxpay');
          }else if(that.zhifu==1){
              pay('alipay');
          }else if(that.zhifu==2){
               // document.getElementById('body').append(this.formdata);
                return;
          }else if(that.zhifu==3){//中联币
              that.shadepay=true;
              return;
          }


      });
      var ALIPAYSERVER=that.$baseurl+'orderPay/alipayOrder?';
      var WXPAYSERVER=that.$baseurl+'orderPay/wechatPay?';
      // 2. 发起支付请求
      function pay(id){
          // 从服务器请求支付订单
          var PAYSERVER='';
          if(id=='alipay'){
              PAYSERVER=ALIPAYSERVER;
              channel = aliChannel;
          }else if(id=='wxpay'){
              PAYSERVER=WXPAYSERVER;
              channel = wxChannel;
          }else{
              plus.nativeUI.alert("不支持此支付通道！",null,"捐赠");
              return;
          }
          var xhr=new XMLHttpRequest();
          xhr.onreadystatechange=function(){
              switch(xhr.readyState){
                  case 4:
                      if(xhr.status==200){
                          //var data=JSON.parse(xhr.responseText);
                          //var str=JSON.stringify(data.data);
                          //console.log(JSON.parse(xhr.responseText));
                          //alert(xhr.responseText);
                         // alert(JSON.parse(xhr.responseText).data);
                         // alert(JSON.stringify(xhr.responseText));
//                          接口的返回数据格式   如果接到的json串 自己转json
//                          xhr.responseText={
//                              "timestamp":"1515998689",
//                              "sign":"C4568368ad68ad6asda6sda6sda6sd",//大写签名
//                              "partnerid":"1493094022",
//                              "noncestr":"fdfsdffzcz5515s",
//                              "prepayid":"wx2018011514445190596a73080015362308",
//                              "package":"Sign=WXPay",
//                              "appid":"wx64c2dbfd46296329",
//                              "code":"0",
//                              "info":"success"
//                          }
                        if(id=='wxpay'){
                              //alert("wxpay");
                              //alert(JSON.parse(xhr.responseText).data);
                              plus.payment.request(channel,JSON.parse(JSON.parse(xhr.responseText).data),function(result){
                                that.$jumpRouter('/paysuccess?wx=1');
                              },function(error){
                                 // alert(error);
                                  //alert(JSON.stringify(error));
                                that.$jumpRouter('/paysuccess?wx=0');
//                              plus.nativeUI.alert("支付失败：" + error.code);
                              });
                          }else if(id=='alipay'){
                              //alert("alipay");
                              //alert(JSON.parse(xhr.responseText).data);
                              plus.payment.request(channel,JSON.parse(xhr.responseText).data,function(result){
                                  //alert(result);
                                  //alert(JSON.stringify(result));
                                 that.$jumpRouter('/paysuccess?ali=1');
                              },function(error){
                                  //alert(error);
                                  //alert(JSON.stringify(error));
                                  //alert(error.innerCode);
                                  //alert(JSON.stringify(error.innerCode))
                                 that.$jumpRouter('/paysuccess?ali=0');
//                               plus.nativeUI.alert("支付失败：" + error.code);
                              });
                          }
                      }else{
                          alert("获取订单信息失败！");
                      }
                      break;
                  default:
                      break;
              }
          }
          xhr.open('post',PAYSERVER+'token='+localStorage.getItem('token')+'&orderId='+sessionStorage['orderId']+'');
          //ajax 支付的后台请求接口
          //xhr.open('GET',PAYSERVER+10);
          xhr.send();
      }

  },
  computed:{
  },
  methods: {
      jumpRouter:function (routerPath) {
          this.$router.push(routerPath);
      },
      paySure:function () {
          if(this.psd.length!=6){
              document.getElementById('pwd').style.border='1px solid red';
              setTimeout(function () {
                  document.getElementById('pwd').style.border='1px solid #eeeeee';
              },200)
              return;
          }
          var that=this;
          that.shadepay=false;
          that.loading=true;
//          that.$Indicator.open({
//              text: 'Loading...',
//              spinnerType: 'fading-circle'
//          });
         // paymentCode http://192.168.1.164:7777/service/orderPay/zlmoneyPay?token=72d7e475-f82a-4434-a07c-4e53c479eb4a&orderId=6a22623a-e20e-4c73-830c-6db9b6828f30
          that.$cfAjax('post', 'orderPay/zlmoneyPay', 'token',localStorage.getItem('token'),'orderId', sessionStorage.getItem('orderId'), 'paymentCode', this.psd,function (res) {
              that.psd='';
//              that.$Indicator.close();
              that.loading=false;
              if (that.$route.path != "/pay") {//判断页面是否改变 改变就不继续执行了
                  return;
              }

              if(res.data.code==1){
                  that.$Toast({
                      message:'支付成功',
                      position: 'bottom'
                  });
                  that.$jumpRouter('/paysuccess?zlb=1');
              }else{
                  that.shadepay=false;
                  var reg = new RegExp("中联","g");
                  that.$Toast({
                      message:res.data.msg.replace(reg,"恒通"),
                      position: 'bottom'
                  });
                  that.$jumpRouter('/paysuccess?zlb=0');
              }
          });
      },
      yinlian:function () {
          if(sessionStorage.getItem('totalMoney')>=150000){
              this.shaderemind=true;
              return;
          }

         // event.stopPropagation();//阻止事件冒泡
          //http://192.168.1.79:7777/service/orderPay/reapalPay?token=ac5b6adc-685f-4ed7-9b8d-81a58f08b190&orderId=e9d5e90c-c622-431f-ab19-50963c142d71
          var that=this;
          that.$cfAjax('post', 'orderPay/reapalPay', 'token',localStorage.getItem('token'),'orderId', sessionStorage.getItem('orderId'),function (res) {
              that.formdata=res.data.data;
              if(that.addNode==1){
                  that.addNode=0;
                  that.formdata=that.formdata.replace(/input/g, 'input style=\"background-color: #C7A761;border: none;width: 100%;height:0.7rem;\"');
                  that.formdata=that.formdata.replace(/融宝支付确认付款/g, '确认支付');
                  //document.getElementById('yinlian').appendChild(that.strToNode(that.formdata));
                  sessionStorage.setItem('formData',that.formdata);
                  that.$jumpRouter("/goPayBank?orderNumber="+that.orderNumber+"&totalMoney="+that.totalMoney+"");
              }

          });
      },
      gun:function () {
          this.$Toast({
              message:'金额0元,无法使用该支付方式',
              position: 'bottom'
          });
      },
      strToNode:function(str) {
          var dd = document.createElement("div");
          dd.innerHTML = str;
          return dd;
      },
      payCancel:function () {
          this.shadepay=false;
          this.psd='';
          location.reload()
      }

  }
 }
</script>

<style lang="scss" scoped>
    .pay{
        height:100%;
        width:7.5rem;
        .order-number{
            width:100%;
            height:2.2rem;
            margin-top:1rem;
            background-color:#fff;
            p{
                width:100%;
                height:1.1rem;
                line-height:1.1rem;
                display:flex;
                justify-content:space-between;
                font-size:0.28rem;
                color:#1D1D26;
                border-bottom:1px solid #f8f8f8;
                padding-left:0.43rem;
                padding-right:0.31rem;
            }
        }
        .order-list{
            width:100%;
            margin-top:0.1rem;
            background-color:#fff;
            padding-bottom: 1rem;
            p{
                width:100%;
                height:1.1rem;
                line-height:1.1rem;
                display:flex;
                justify-content:space-between;
                font-size:0.28rem;
                color:#1D1D26;
                border-bottom:1px solid #f8f8f8;
                padding-left:0.43rem;
                padding-right:0.31rem;
                span{
                    height:1.1rem;
                    line-height:1.1rem;
                    position:relative;
                    padding-left:0.69rem;
                    img{
                        width:0.41rem;
                        height:0.41rem;
                        position:absolute;
                        top:0.345rem;
                        left:0;
                    }
                    div{
                        position:absolute;
                        left:1.63rem;
                        top:0.23rem;
                        width:0.26rem;
                        height:0.26rem;
                        text-align:center;
                        line-height:0.26rem;
                        background:rgba(242,75,75,1);
                        border-radius:50%;
                        color:#fff;
                        font-size:0.2rem;
                    }
                }
                >img{
                    width:0.28rem;
                    height:0.28rem;
                    margin-top:0.41rem;
                }
            }
        }
        .cancel{
            width:6.16rem;
            height:0.7rem; 
            background-color: #C7A761;
            border-radius: 0.1rem;
            margin-top:0.76rem;
            margin-left:0.67rem;
            color:#fff;
            margin-bottom:0.76rem;
        }
        .shade-box{
            width:5.4rem;
            height:2.91rem;
            background-color:#fff;
            .remind{
                text-align:center;
                height:0.93rem;
                line-height:0.93rem;
                font-size:0.34rem;
                color:rgba(50,50,50,1);
                border-bottom:1px solid #f8f8f8;
            }
            .remind-p1{
                font-size:0.26rem;
                margin-top:0.1rem;
                color:rgba(102,102,102,1);
                text-align:center;
            }
            .remind-p2{
                color:rgba(50,50,50,1);
                font-size:0.33rem;
                margin-top:0.14rem;
                text-align:center;
            }
            .remind-btn{
                width:100%;
                height:0.85rem;
                line-height:0.85rem;
                display:flex;
                border-top:1px solid #f8f8f8;
                span{
                    flex:1;
                    width:100%;
                    line-height:0.85rem;
                    text-align:center;
                    color:#323232;
                }
                span:first-child{
                    border-right:1px solid #f8f8f8;
                }
            }
        }
        .shadeinput{
            width:5.4rem;
            height:2.91rem;
            background-color:#fff;
            .remind{
                text-align:center;
                height:0.93rem;
                line-height:0.93rem;
                font-size:0.34rem;
                color:rgba(50,50,50,1);
                border-bottom:1px solid #f8f8f8;
            }
            .remind-input{
                width:100%;
                height:0.85rem;
            }
            .remind-btn{
                width:100%;
                height:1.07rem;
                line-height:1.07rem;
                display:flex;
                border-top:1px solid #f8f8f8;
                span{
                    flex:1;
                    width:100%;
                    height:1rem;
                    line-height:1rem;
                    text-align:center;
                    color:#323232;
                    margin-top:0.035rem;
                }
                span:first-child{
                    border-right:1px solid #f8f8f8;
                }
            }
        }

        .showpsd{
            font-size: 0.26rem;
            #pwd{
                transition: all 0.3s;
            }
            .public_center{
                width: 6.02rem;
                height: 3.5rem;
                background-color: white;
                .psdTitle{
                    height: 1rem;
                    line-height: 1rem;
                    text-align: center;
                    border-bottom: 1px solid #b8bbbf;
                    display: flex;
                    justify-content: space-between;
                }
                .psdCenter{
                    height: 1.5rem;
                    border-bottom: 1px solid #b8bbbf;
                    .mima{
                        position: absolute;
                        top: 1.35rem;
                        height: 0.8rem;
                        margin-left: -4rem;
                        width: 10rem;
                        z-index: 1;
                        opacity: 0;
                        input{
                            height: 100%;
                        }
                    }
                    .password{
                        position: absolute;
                        top: 1.35rem;
                        width: 6rem;
                        height: 0.8rem;
                        display: flex;
                        justify-content: space-around;
                        div{
                            line-height: 0.8rem;
                            text-align: center;
                            width: 0.8rem;
                            height: 0.8rem;
                            border: 1px solid #b5b5b5;
                        }
                    }
                }
                .psdBottom{
                    height: 1rem ;
                    line-height: 1rem;
                    border-top: 1px solid #b8bbbf;
                    display: flex;
                    justify-content: space-around;
                    div{
                        width: 3rem;
                        text-align: center;
                    }
                    .canc{
                        border-right: 1px solid #b8bbbf;
                    }
                }

            }

        }
    }
</style>
