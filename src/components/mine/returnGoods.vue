<template>
  <div class="exGoods">
      <div class="public_header">
          <a @click="goBack()"><img src="../../../static/images/cf_back.png" alt=""></a>
          退货申请
      </div>
      <div class="Product-desc">
        <div class="Product-left"><img :src="EXdata.goodspicSpec" alt=""></div>
        <div class="Product-right">
            <p class="Produce-title">{{EXdata.goodsName}}</p>
            <p class="Title-desc">{{skuInfo.goodsColor}}，{{skuInfo.goodsType}}</p>
            <span class="Shop-norms">x{{number}}</span>
        </div>
      </div>
      <div class="refundReason">
          <p>退款原因</p>
          <textarea  style="padding: 0 0.35rem; height: 100%" type="text" maxlength="150" contenteditable="true" v-model="text" placeholder="请描述退货原因："></textarea>
      </div>
      <p class="change-list">退款金额：<input maxlength="5" style="width: 5rem;border: none" type="text" v-model="money"></p>
      <p class="change-list"><span>最多¥{{EXdata.returnMoney}}，含发货邮费</span></p>
      <p class="change-list">退款说明：<span>退款退回到我的恒通币，可下次购买商品使用。</span></p>
      <div class="bigBox">
         <div class="next-bank" @click="submit()">
             <span>提交</span>
         </div>
      </div>
      
  </div>
</template>

<script>
export default {
  data () {
      return {
          number:0,
          skuInfo:{},
          EXdata:{},
          text:'',
          money:'',
      }
  },
  mounted:function () {
      this.$Indicator.close();
      this.number=this.$route.query.number;
      this.getData();
  },
    watch:{
        money:function () {
            this.money=this.money.replace(/\D/g,'');
            if(this.money>this.EXdata.returnMoney){
                this.money=this.EXdata.returnMoney
            }
        }
    },
  computed:{
  },
  methods: {
      goBack:function () {
          this.$router.go(-1);
      },
      jumpRouter:function (routerPath) {
          this.$router.push(routerPath);
      },
      getData:function () {
          var that=this;
          //http://192.168.1.164:7777/service/orderInfo/getReturnOrExchangeGoodsInfo?token=72d7e475-f82a-4434-a07c-4e53c479eb4a&orderDetailId=06d3d9e1-67b0-484a-82a8-2e3b4c88ba79&returnOrExchangeGoodsCount=1
          this.$cfAjax('post', 'orderInfo/getReturnOrExchangeGoodsInfo', 'token',localStorage.getItem('token'),'orderDetailId', sessionStorage.getItem('orderDetailId'), 'returnOrExchangeGoodsCount', this.number,function (res) {
              if(res.data.code==1){
                  that.skuInfo=res.data.data.skuInfo;
                  that.EXdata=res.data.data;
              }
          });
      },
      submit:function () {
          if(this.text==''){
              that.$Toast({
                  message:'退款原因不能为空',
                  position: 'bottom'
              });
              return;
          }
          if(this.money==''){
              that.$Toast({
                  message:'退款金额不能为空',
                  position: 'bottom'
              });
              return;
          }
          //http://192.168.1.178:7777/service/orderInfo/returnGoods?token=72d7e475-f82a-4434-a07c-4e53c479eb4a&orderDetailId=4b5f92ff-b6e8-40ec-962a-c5cf7b43833d&returnGoodsCount=1&returnGoodsReason=似的士大夫&refundExplain=胜多负少
          var that=this;
          this.$cfAjax('post', 'orderInfo/returnGoods', 'token',localStorage.getItem('token'),'orderDetailId', sessionStorage.getItem('orderDetailId'), 'returnGoodsCount', this.number, 'returnGoodsReason', this.text,'refundExplain',this.money,function (res) {
              if(res.data.code==1){
                  that.$Toast({
                      message:'提交成功',
                      position: 'bottom'
                  });
                  that.$jumpRouter('/saleDetail?orderDetailId='+sessionStorage.getItem('orderDetailId'));
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
</script>

<style lang="scss" scoped>
    .exGoods{
        width:7.5rem;
        font-family:PingFangSC-Regular;
         margin-top:0.89rem;
        .Product-desc{
            width:100%;
            height:2.34rem; 
            background:rgba(255,255,255,1);
            padding:0.44rem 0 0.32rem 0.31rem;
            display:flex;
            border-top:1px solid #f8f8f8;
            .Product-left{
                width:2.19rem;
                height:1.58rem;
                img{
                    width:100%;
                    height:100%;
                }
            }
            .Product-right{
                width:5.01rem;
                height:1.58rem;
                padding-left:0.4rem;
                position:relative;
                .Produce-title{
                    width:3.01rem;
                    font-size:0.24rem;
                    color:rgba(51,51,51,1);
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
                .Title-desc{
                    font-size:0.21rem;
                    color:rgba(153,153,153,1);
                }
                .Shop-norms{
                    position:absolute;
                    bottom:0;
                    font-size:0.28rem;
                    color:rgba(199,167,97,1);
                }
            }
        }
        .change-list{
            width:100%;
            height:0.8rem;
            line-height:0.8rem;
            color:#333333;
            background:#fff;
            margin-top:0.05rem;
            padding-left:0.35rem;
            font-size:0.24rem;
            span{
                color:rgba(153,153,153,1);
            }
        }
        .refundReason{
            width:100%;
            height:2.71rem;
            margin-top:0.05rem;
            background:rgba(255,255,255,1);
            display:flex;
            flex-direction:column;
            p{
                font-size:0.24rem;
                color:rgba(51,51,51,1);
                padding-top:0.24rem;
                padding-left:0.3rem;
                margin-bottom:0.1rem;
            }
            input{
                width:6.6rem;
                margin:0 auto;
                height:1.7rem; 
                border-radius:0.08rem;
                box-shadow:px px px rgba(0,0,0,0.1);
                margin-left:0.45rem;
                font-size:0.2rem;
                padding-bottom:1rem;
                padding-left:0.1rem;
            }
        }
        .bigBox{
            width:100%;
            height:0.98rem;
            background:#fff;
            overflow:hidden;
            position: absolute;
            left: 0;
            bottom:0;
            right: 0;
            .next-bank{
                z-index: 88;
                background:rgba(194,168,109,1);
                font-size: 0.26rem;
                margin:0.14rem auto;
                max-width: 6.92rem;
                height: 0.7rem;
                line-height:0.7rem;
                border-radius:0.08rem;
                color:#fff;
                text-align:center;
            }
        }
    }
</style>
