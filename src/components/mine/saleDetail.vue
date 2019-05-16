<template>
  <div class="saleDetail" v-if="show">
      <div class="public_header" v-if="goodsType=='A'">
          <router-link to="/sale"><img src="../../../static/images/cf_back.png" alt=""></router-link>
          退款详情
      </div>
      <div class="public_header" v-if="goodsType=='B'">
          <router-link to="/sale"><img src="../../../static/images/cf_back.png" alt=""></router-link>
          退货退款详情
      </div>
      <div class="public_header" v-if="goodsType=='C'">
          <router-link to="/sale"><img src="../../../static/images/cf_back.png" alt=""></router-link>
          换货详情
      </div>
      <!-- orderGoodsReturnType: A退款,B退货退款,C换货 -->
      <!-- A(moneybackInfo.moneybackState):tkGoodsInfo S申请未处理  Y同意退款   N驳回申请  A同意退款  B完成 -->
      <div class="Sale-state" v-if="goodsType=='A'">
        <div class="Sale-examine pink" v-if="GoodsInfo=='S'">审核中</div>
        <div class="Sale-goods-one green" v-if="GoodsInfo=='A' && GoodsInfo=='B'">已同意</div>
        <div class="Sale-goods-one pink" v-if="GoodsInfo=='N'">已驳回</div>
          <div class="Sale-goods-one" :class="GoodsInfo=='B'?'green':'gray'">已完成</div>
      </div>
      <!-- B(returngoodsInfo.goodsreturnState):tkthGoodsInfo S发起申请 Y审核通过  N审核驳回  A待买家退货 E:已退货  B已收到退货  C已同意退款   D完成 -->
      <div class="Sale-state" v-if="goodsType=='B'">
        <div class="Sale-examine pink" v-if="GoodsInfo=='S'">审核中</div>
        <div class="Sale-goods-one green" v-if="GoodsInfo!='N'&& GoodsInfo!='S'">已通过</div>
        <div class="Sale-goods-two pink" v-if="GoodsInfo=='N'">已驳回</div>

        <div class="Sale-stocks" v-if="GoodsInfo!='N'&& GoodsInfo!='E'&&GoodsInfo!='B'&&GoodsInfo!='C'&&GoodsInfo!='D'" :class="GoodsInfo=='A'||GoodsInfo=='Y'?'pink':'gray'">待退货</div>
        <div class="Sale-stocks green" v-if="GoodsInfo!='N'&&(GoodsInfo=='B'||GoodsInfo=='C'||GoodsInfo=='D')">已退货</div>
        <div class="Sale-stocks pink" v-if="GoodsInfo!='N'&&GoodsInfo=='E'">已退货</div>

        <div class="Sale-stocks" v-if="GoodsInfo!='N'" :class="GoodsInfo=='B'||GoodsInfo=='C'||GoodsInfo=='D'?'green':'gray'">已收货</div>
        <div class="Sale-stocks" v-if="GoodsInfo!='N'" :class="GoodsInfo=='C'||GoodsInfo=='D'?'green':'gray'">已同意</div>
        <div class="Sale-stocks" v-if="GoodsInfo!='N'" :class="GoodsInfo=='D'?'green':'gray'">完成</div>
      </div>
      <!-- C(exchangegoodsInfo.exchangegoodsState):hyGoodsInfo S待处理  Y同意退还  N驳回申请 A待买家发货   B收到退货  C已发货  D完成-->
      <div class="Sale-state" v-if="goodsType=='C'">
          <div class="Sale-examine pink" v-if="GoodsInfo=='S'">审核中</div>
          <div class="Sale-goods-one green" v-if="GoodsInfo!='N'&& GoodsInfo!='S'">已通过</div>
          <div class="Sale-goods-two pink" v-if="GoodsInfo=='N'">已驳回</div>

          <div class="Sale-stocks pink" v-if="GoodsInfo=='A'||GoodsInfo=='Y'">待退货</div>
          <div class="Sale-stocks green" v-if="GoodsInfo!='N'&&(GoodsInfo=='B'||GoodsInfo=='C'||GoodsInfo=='D')">已退货</div>
          <div class="Sale-stocks pink" v-if="GoodsInfo=='E'">已退货</div>

          <div class="Sale-stocks" v-if="GoodsInfo!='N'" :class="GoodsInfo=='B'||GoodsInfo=='C'||GoodsInfo=='D'?'green':'gray'">已收货</div>
          <div class="Sale-stocks" v-if="GoodsInfo!='N'" :class="GoodsInfo=='C'?'pink':GoodsInfo=='D'?'green':'gray'">已发货</div>
          <div class="Sale-stocks" v-if="GoodsInfo!='N'" :class="GoodsInfo=='D'?'green':'gray'">完成</div>

      </div>
      <div class="rebut" v-if="GoodsInfo=='N'">
        <p>驳回原因：{{Reason}}</p>
      </div>
      <!-- 退款退货 -->
      <div class="Exchange-goods" v-if="goodsType=='B'&&(GoodsInfo=='Y'||GoodsInfo=='A'||GoodsInfo=='B'||GoodsInfo=='C'||GoodsInfo=='D'||GoodsInfo=='E')">
        <p class="p-first">退货地址</p>
        <div>
            <p>收件人：<span>{{shName}}</span></p>
            <p>电 话：<span>{{shPhone}}</span></p>
        </div>
        <p class="p-last">地 址：<span>{{shAddress}}</span></p>
      </div>
      <div class="logistics" v-if="goodsType=='B'&&(GoodsInfo=='Y'||GoodsInfo=='A'||GoodsInfo=='B'||GoodsInfo=='C'||GoodsInfo=='D'||GoodsInfo=='E')">
          <p class="logistics-p1" v-if="maijiaWLMsg==-1">请填写物流信息&nbsp;&nbsp;<span style="color: #ef4f4f;">(提示:务必填写物流公司全称)</span></p>
          <p class="logistics-p1" v-if="maijiaWLMsg==1">物流信息</p>
          <div class="logistics-list" v-if="maijiaWLMsg==1">
              <div class="logistics-left">
                  <div class="logistics-item"><div class="logistics-item-left">物流公司：</div>{{maijiaWL.logisticsCompany}}</div>
                  <div class="logistics-item"><div class="logistics-item-left">快递单号：</div>{{maijiaWL.logisticsOddnumber}}</div>
              </div>
              <div class="logistics-right">

              </div>
          </div>
          <div style="overflow: hidden" v-if="maijiaWLMsg==1">
              <ul>
                  <li v-for="(item,index) in maijiaWLInfo.Traces" :key="index">
                      <div >{{item.AcceptTime}}</div>
                      <div style="margin-left: 0.2rem">{{item.AcceptStation}}</div>
                  </li>
              </ul>
          </div>
          <div class="logistics-list" v-if="maijiaWLMsg==-1">
              <div class="logistics-left">
                  <div class="logistics-item"><div class="logistics-item-left">物流公司：</div><input type="text" v-model="logisticsCompany" placeholder="请填写物流公司"></div>
                  <div class="logistics-item"><div class="logistics-item-left">快递单号：</div><input type="text" v-model="logisticsNum" placeholder="请输入快递单号"></div>
              </div>
              <div class="logistics-right">
                  <button class="confirm" @click="sureWL()">确定</button>
              </div>
          </div>
      </div>
      <!-- 换货 -->
      <div class="Exchange-goods" v-if="goodsType=='C'&&(GoodsInfo=='Y'||GoodsInfo=='A'||GoodsInfo=='B'||GoodsInfo=='C'||GoodsInfo=='D'||GoodsInfo=='E')">
        <p class="p-first">换货地址</p>
        <div>
            <p>收件人：<span>{{shName}}</span></p>
            <p>电 话：<span>{{shPhone}}</span></p>
        </div>
        <p class="p-last">地 址：<span>{{shAddress}}</span></p>
      </div>
      <!---->
      <div class="logistics" v-if="goodsType=='C'&&(GoodsInfo=='Y'||GoodsInfo=='A'||GoodsInfo=='B'||GoodsInfo=='C'||GoodsInfo=='D'||GoodsInfo=='E')">
        <p class="logistics-p1" v-if="maijiaWLMsg==-1">请填写物流信息&nbsp;&nbsp;<span style="color: #ef4f4f;">(提示:务必填写物流公司全称)</span></p>
        <p class="logistics-p1" v-if="maijiaWLMsg==1">物流信息</p>
        <div class="logistics-list" v-if="maijiaWLMsg==1">
            <div class="logistics-left">
                <div class="logistics-item"><div class="logistics-item-left">物流公司：</div>{{maijiaWL.logisticsCompany}}</div>
                <div class="logistics-item"><div class="logistics-item-left">快递单号：</div>{{maijiaWL.logisticsOddnumber}}</div>
            </div>
            <div class="logistics-right">

            </div>
        </div>
          <div style="overflow: hidden" v-if="maijiaWLMsg==1">
              <ul>
                  <li v-for="(item,index) in maijiaWLInfo.Traces" :key="index">
                      <div >{{item.AcceptTime}}</div>
                      <div style="margin-left: 0.2rem">{{item.AcceptStation}}</div>
                  </li>
              </ul>
          </div>
          <div class="logistics-list" v-if="maijiaWLMsg==-1">
              <div class="logistics-left">
                  <div class="logistics-item"><div class="logistics-item-left">物流公司：</div><input type="text" v-model="logisticsCompany" placeholder="请填写物流公司"></div>
                  <div class="logistics-item"><div class="logistics-item-left">快递单号：</div><input type="text" v-model="logisticsNum" placeholder="请输入快递单号"></div>
              </div>
              <div class="logistics-right">
                  <button class="confirm" @click="sureWL()">确定</button>
              </div>
          </div>
      </div> 

      <div class="Product-desc">
        <div class="Product-left"><img :src="goodsImg" alt=""></div>
        <div class="Product-right">
            <p class="Produce-title">{{goodsName}}</p>
            <p class="Title-desc">{{goodsColor}}，{{newType}}</p>
            <div class="Shop-norms">x {{goodsNum}}</div>
        </div>
      </div>
      <!-- 退款 -->
      <div class="Sale-list" v-if="goodsType=='A'">
        <div><p>退款原因：</p><span>{{thReason}}</span></div>
        <div><p>退款金额：</p><span>{{thMoney}}</span></div>
        <div><p>申请日期：</p><span>{{$timestampToTime(thDate)}}</span></div>
        <div><p>退款编号：</p><span>{{thNum}}</span></div>
      </div>
      <!-- 退货 -->
      <div class="Sale-list" v-if="goodsType=='B'">
        <div><p>退货原因：</p><span>{{thReason}}</span></div>
        <div><p>退货金额：</p><span>{{thMoney}}</span></div>
        <div><p>申请日期：</p><span>{{$timestampToTime(thDate)}}</span></div>
        <div><p>退货编号：</p><span>{{thNum}}</span></div>
      </div>
      <!-- 换货 -->
      <div class="Sale-list" v-if="goodsType=='C'">
        <div><p>换货原因：</p><span>{{thReason}}</span></div>
        <div><p>申请日期：</p><span>{{$timestampToTime(thDate)}}</span></div>
        <div><p>换货编号：</p><span>{{thNum}}</span></div>
      </div>
      <div class="two" style="background-color: white;padding:0.2rem 0.3rem;">
          <div class="logistics-list" v-if="wlTwoMsg==1" style="font-size: 0.24rem;">
              <div class="logistics-left">
                  <div class="logistics-item" style="display: flex"><div class="logistics-item-left">物流公司：</div>{{wlTwo.logisticsCompany}}</div>
                  <div class="logistics-item" style="display: flex"><div class="logistics-item-left">快递单号：</div>{{wlTwo.logisticsOddnumber}}</div>
              </div>
              <div class="logistics-right" style="font-size: 0.24rem;">
              </div>

          </div>
          <div  v-if="wlTwoMsg==1" style="font-size: 0.24rem;">
              <ul>
                  <li v-for="(item,index) in wlTwoInfo.Traces" :key="index">
                      <div >{{item.AcceptTime}}</div>
                      <div style="margin-left: 0.2rem">{{item.AcceptStation}}</div>
                  </li>
              </ul>
          </div>
      </div>
      <button class="cancel" v-if="goodsType!='C'&&GoodsInfo!='C'&& GoodsInfo!='D'" @click="cancel()">取消申请</button>
      <button class="cancel" v-if="goodsType=='C'&&GoodsInfo!='C'&& GoodsInfo!='D'" @click="cancel()">取消申请</button>
      <button class="cancel" v-if="goodsType=='C'&&GoodsInfo=='C'" @click="sure()">确认收货</button>
  </div>
</template>

<script>
export default {
  data () {
      return {
          show:false,
          goodsType:[],
          GoodsInfo:"",
          Reason: "",
          shName: "",
          shPhone: "",
          shAddress:"",
          goodsName: "",
          goodsColor: "",
          newType: "",
          goodsNum: "",
          goodsImg: "",
          thReason: "",
          thMoney: "",
          thDate: "",
          thNum: "",
          orderDetailId:"",
          logisticsInfo:{},
          logistics:{},
          logisticsMsg:0,//物流状态

          logisticsCompany:'',
          logisticsNum:'',
          goodsreturnId:'',
          wlTwoMsg:'',
          wlTwo:{},
          wlTwoInfo:{},
          maijiaWLMsg:'',
          maijiaWLInfo:'',
      }
  },
  mounted:function () {
      this.$Indicator.close();
      this.getCommodityMsg();

  },
  computed:{
  },
  methods: {
        getCommodityMsg: function(){
            this.orderDetailId=this.$route.query.orderDetailId;
            var that = this;
            this.$cfAjax('post', 'orderInfo/updateReturnOrderInfoByOrderDetailId','orderDetailId',this.orderDetailId,function (res) {
                that.show=true;
                that.maijiaWLMsg=res.data.data.maijiaWLMsg;
                if(that.maijiaWLMsg==1){
                    that.maijiaWLInfo=JSON.parse(res.data.data.maijiaWL.logisticsInfo);
                    that.maijiaWL=res.data.data.maijiaWL;
                }
                that.wlTwoMsg=res.data.data.wlTwoMsg;
                if(that.wlTwoMsg==1){
                    that.wlTwoInfo=JSON.parse(res.data.data.wlTwo.logisticsInfo);//详细物流
                    that.wlTwo=res.data.data.wlTwo;//
                }

                that.goodsType = res.data.data.orderInfo.goodsList[0].orderGoodsReturnType;
                that.goodsName = res.data.data.orderInfo.goodsList[0].goodsName;
                that.goodsColor = res.data.data.orderInfo.goodsList[0].goodsColer;
                that.newType = res.data.data.orderInfo.goodsList[0].goodsModel;
                that.goodsImg = res.data.data.orderInfo.goodsList[0].goodspicSpec;
                
                if(res.data.data.orderInfo.returnType=="A"){
                    that.GoodsInfo = res.data.data.moneybackInfo.moneybackState;
                    that.Reason = res.data.data.moneybackInfo.rejectreason;
                    that.goodsNum = res.data.data.moneybackInfo.moneybackGoodsCount;//退款数量
                    that.thReason = res.data.data.moneybackInfo.refundCause;//退款原因
                    that.thMoney = res.data.data.moneybackInfo.moneybackMoney;//退款金额
                    that.thDate = res.data.data.moneybackInfo.applyTime;//退款时间
                    that.thNum = res.data.data.moneybackInfo.moneybackinformationId;//退款编号
                }
                if(res.data.data.orderInfo.returnType=="B"){
                    that.goodsreturnId=res.data.data.returngoodsInfo.goodsreturnId;
                    that.GoodsInfo = res.data.data.returngoodsInfo.goodsreturnState;
                    that.Reason = res.data.data.returngoodsInfo.rejectreason;
                    if(res.data.data.stockInfo!=null) {
                        that.shName = res.data.data.stockInfo.leader;
                        that.shPhone = res.data.data.stockInfo.contactWay;
                        that.shAddress = res.data.data.stockInfo.stockAddress;
                    }
                    that.goodsNum = res.data.data.returngoodsInfo.goodsreturnCount;//退货数量
                    that.thReason = res.data.data.returngoodsInfo.goodsreturnReason;//退货原因
                    that.thMoney = res.data.data.returngoodsInfo.goodsreturnMoney;//退货金额
                    that.thDate = res.data.data.returngoodsInfo.applyTime;//退货时间
                    that.thNum = res.data.data.returngoodsInfo.saleafterNumber;//退货编号
                    
                }
                if(res.data.data.orderInfo.returnType=="C"){
                    that.goodsreturnId=res.data.data.exchangegoodsInfo.exchangegoodsId;
                    that.GoodsInfo = res.data.data.exchangegoodsInfo.exchangegoodsState;
                    that.Reason = res.data.data.exchangegoodsInfo.rejectreason;
                    if(res.data.data.stockInfo!=null){
                    that.shName = res.data.data.stockInfo.leader;
                    that.shPhone = res.data.data.stockInfo.contactWay;
                    that.shAddress = res.data.data.stockInfo.stockAddress;
                    }

                    that.goodsNum = res.data.data.exchangegoodsInfo.exchangegoodsCount;//换货数量
                    that.thReason = res.data.data.exchangegoodsInfo.exchangegoodsReason;//换货原因
                    that.thDate = res.data.data.exchangegoodsInfo.applyTime;//换货时间
                    that.thNum = res.data.data.exchangegoodsInfo.saleafterNumber;//换货编号
                }
                //N审核驳回  A待买家退货 E:已退货  B已收到退货  C已同意退款   D完成
                //that.GoodsInfo='Y';
            })
        },
        timestampToTime:function(timestamp) {
            var Y,M,D,h,m,s;

            if(Math.floor(timestamp/1000000000000)>0){
                var date = new Date(timestamp);
            }else{
                var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            }
            Y = date.getFullYear() + '-';
            M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            D = date.getDate() + ' ';
            h = date.getHours() + ':';
            m = date.getMinutes() + ':';
            s = date.getSeconds();
            return Y+M+D+h+m+s;
        },
        cancel:function () {
            var that=this;
            //http://192.168.1.105:7777/service/orderInfo/payOrderDetail?token=ac5b6adc-685f-4ed7-9b8d-81a58f08b190&orderId=0ac355f9-2d7c-4afd-9aa4-67687e7ff495
            this.$cfAjax('post', 'orderInfo/saleAfterCancel', 'token',localStorage.getItem('token'),'orderDetailId', this.orderDetailId,function (res) {
                if(res.data.code==1){
                    that.$Toast({
                        message:'取消申请成功',
                        position: 'bottom'
                    });
                    that.$jumpRouter('/sale');
                }else{
                    that.$Toast({
                        message:res.data.msg,
                        position: 'bottom'
                    });
                }
            });
        },
        sure:function () {
          var that=this;
          this.$cfAjax('post', 'orderInfo/updateConfirmReceipt', 'token',localStorage.getItem('token'),'exchangeGoodsId', this.goodsreturnId,function (res) {
              if(res.data.code==1){
                  that.$Toast({
                      message:'确认收货成功',
                      position: 'bottom'
                  });
                  that.getCommodityMsg();
              }else{
                  that.$Toast({
                      message:res.data.msg,
                      position: 'bottom'
                  });
              }
          });
      },
        sureWL:function () {
            var that=this;
            if(this.goodsType=='C'){//换货
                this.$cfAjax('post', 'orderInfo/addOrderTracesInfo', 'token',localStorage.getItem('token'),'logisticsCompany', this.logisticsCompany, 'logisticsNum', this.logisticsNum,'exchangeGoodsId',this.goodsreturnId,function (res) {
                    if(res.data.code==1){
                        that.$Toast({
                            message:res.data.msg,
                            position: 'bottom'
                        });
                        that.getCommodityMsg();
                    }else{
                        that.$Toast({
                            message:res.data.msg,
                            position: 'bottom'
                        });
                    }
                });
            }else{
                this.$cfAjax('post', 'orderInfo/addOrderTracesInfo', 'token',localStorage.getItem('token'),'logisticsCompany', this.logisticsCompany, 'logisticsNum', this.logisticsNum,'goodsreturnId',this.goodsreturnId,function (res) {

                    if(res.data.code==1){
                        that.$Toast({
                            message:res.data.msg,
                            position: 'bottom'
                        });
                        that.getCommodityMsg();
                    }else{
                        that.$Toast({
                            message:res.data.msg,
                            position: 'bottom'
                        });
                    }
                });
            }


        }
  }
 }
</script>

<style lang="scss" scoped>
    .green{
        background-color:#25BD71;
    }
    .pink{
        background-color:#F2575B;
    }
    .gray{
        background-color:#999999;
    }
    .saleDetail{
        width: 100%;
        overflow-y: auto;
        max-width:7.5rem;
        font-family:PingFangSC-Regular;
        .Sale-state{
            width:7.5rem;
            height:2.39rem;
            line-height:1.51rem;
            padding:0.88rem 0.25rem 0 0.25rem;
            display:flex;
            justify-content:space-between;
            div{
                margin-top:0.29rem;
                width:0.89rem;
                height:0.89rem;
                color:#fff;
                text-align:center;
                line-height:0.8rem;
                border:2px solid #fff;
                border-radius:50%;
                font-size:0.2rem;
            }
        }  
        // 驳回
        .rebut{
            width:100%;
            height:0.8rem; 
            line-height:0.8rem;
            background:rgba(255,255,255,1);
            //box-shadow:px px px rgba(0,0,0,0.1);
            color:rgba(51,51,51,1);
            margin-bottom: 0.05rem;
            p{
                font-size:0.24rem;
                color:rgba(51,51,51,1);
                padding-left:0.31rem;
            }
        }
        // 换货地址
        .Exchange-goods{
            width:100%;
            height:1.72rem; 
            background:rgba(255,255,255,1);
            //box-shadow:px px px rgba(0,0,0,0.1);
            padding-left:0.31rem;
            margin-bottom: 0.05rem;
            .p-first{
                height:0.7rem;
                line-height:0.7rem;
                font-size:0.24rem;
                color:rgba(51,51,51,1);
            }
            div{
                display:flex;
                justify-content:space-between;
                font-size:0.24rem;
                color:rgba(51,51,51,1);
                p:last-child{
                    padding-right:1rem;
                }
                p{
                    font-size:0.24rem;
                    color:#333333;
                    span{
                        color:rgba(153,153,153,1);
                    }
                }
            }
            .p-last{
                font-size: 0.24rem;
                color: #333333;
                span{
                    color:rgba(153,153,153,1);
                    font-size:0.24rem;
                }
                
            }
        }
        // 请填写物流信息
        .logistics{
            width:100%;
            font-size: 0.26rem;
            //height:2.16rem;
            padding-bottom: 0.2rem;
            background:rgba(255,255,255,1);
            //box-shadow:px px px rgba(0,0,0,0.1);
            padding-left:0.31rem;
            margin-bottom: 0.05rem;
            .logistics-p1{
                height:0.69rem;
                line-height:0.69rem;
                font-size:0.24rem;
                color:rgba(51,51,51,1);
            }
            .logistics-list{
                width:100%;
                display:flex;
                .logistics-left{
                    width:5.29rem;
                    .logistics-item{
                        height:0.6rem;
                        line-height:0.6rem;
                        margin-bottom:0.1rem;
                        display:flex;
                        .logistics-item-left{
                            width: 1.5rem;
                            font-size:0.24rem;
                        }
                        input{
                            margin:0;
                            padding:0;
                            flex: 1;
                            height:0.6rem; 
                            background:rgba(251,251,251,1);
                            border-radius: 6px; 
                            font-size: 0.2rem;
                            padding-left:0.15rem;
                        }
                        input::-webkit-input-placeholder{
                            color:rgba(153,153,153,1);
                            font-size: 0.2rem;
                        }
                    }
                }
                .logistics-right{
                    margin-left: 0.19rem;
                    .confirm{
                        width:1.41rem;
                        height:0.7rem; 
                        color:#fff;
                        background:rgba(199,167,97,1);
                        border-radius: 0.1rem;
                        margin-right:0.19rem;
                        margin-top:0.3rem;
                    }
                }
            }
        }
        .Product-desc{
            width:7.5rem;
            height:2.34rem; 
            background:rgba(255,255,255,1);
            padding:0.44rem 0 0.32rem 0.31rem;
            display:flex;
            .Product-left{
                width:2.19rem;
                height:1.58rem;
                overflow: hidden;
                img{
                    float: left;
                    width:100%;
                    height:100%;
                }
            }
            .Product-right{
                width:5.01rem;
                height:1.58rem;
                padding-left:0.4rem;
               // position:relative;
                .Produce-title{
                    width:3.01rem;
                    font-size:0.24rem;
                    color:rgba(51,51,51,1);
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
                .Title-desc{
                    margin-top: 0.05rem;
                    font-size:0.21rem;
                    color:rgba(153,153,153,1);
                }
                .Shop-norms{
                    /*position:absolute;*/
                    /*bottom:0;*/
                    margin-top: 0.5rem;
                    font-size:0.28rem;
                    color:rgba(199,167,97,1);
                }
            }
        }
        .Sale-list{
            width:7.5rem;
            margin-top:0.05rem;
            div{
                width:100%;
                height:0.8rem;
                line-height:0.8rem;
                background-color:#fff;
                display:flex;
                border-bottom:1px solid #f8f8f8;
                p{
                    font-size:0.24rem;
                    color:rgba(51,51,51,1);
                    padding-left:0.31rem;
                }
                span{
                    color:rgba(153,153,153,1);
                    font-size:0.24rem;
                }
            }
        }
        .cancel{
            width:6.16rem;
            height:0.7rem; 
            background:rgba(199,167,97,1);
            border-radius: 0.1rem;
            margin-top:0.76rem;
            margin-left:0.67rem;
            color:#fff;
            margin-bottom:0.76rem;
        }
    }
</style>
