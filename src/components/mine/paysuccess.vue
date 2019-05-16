<template>
  <div class="paysuccess">
      <div class="paysucc-bg">
          <img v-if="wx!=-1" src="../../../static/images/yh_weixin-succ.png" alt="">

          <img v-if="yhk==1" src="../../../static/images/yhk1.jpg" alt="">
          <img v-if="yhk==0" src="../../../static/images/yhk0.jpg" alt="">

          <img v-if="ali==1" src="../../../static/images/ali1.jpg" alt="">
          <img v-if="ali==0" src="../../../static/images/ali0.jpg" alt="">

          <img v-if="zlb==1" src="../../../static/images/zlb1.jpg" alt="">
          <img v-if="zlb==0" src="../../../static/images/zlb0.jpg" alt="">
      </div>
      <div class="paysucc-box">
        <p class="paysucc-p1" v-if="state==1">
            <img src="../../../static/images/yh-paysuccess.png" alt="">
            <span>支付成功</span>
        </p>
          <p class="paysucc-p1" v-if="state==0">
              <img src="../../../static/images/cf_orderfail.png" alt="">
              <span>支付失败</span>
          </p>
        <p class="paysucc-p2">支付金额：{{totalMoney}}元</p>
        <p class="paysucc-p3">支付日期：{{time}}</p>
        <div class="paysucc-bott" v-if="state==1">
            <div><button class="cancel"  @click="$jumpRouter('/orderDetailLike')">订单详情</button><div v-if="false">3</div></div>
            <div><button class="cancel cancel-home" @click="$jumpRouter('/index')">返回首页</button><div v-if="false">3</div></div>
        </div>
          <div class="paysucc-bott" v-if="state==0">
              <div><button class="cancel cancel-home" @click="$goBack()">重新付款</button><div v-if="false">3</div></div>
              <div><button class="cancel"  @click="$jumpRouter('/orderDetail')">订单详情</button><div v-if="false">3</div></div>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  data () {
      return {
          state:0,
          yhk:-1,
          ali:-1,
          wx:-1,
          zlb:-1,
          time:'',
          totalMoney:'',
      }
  },
  mounted:function () {
      this.$Indicator.close();
      //debugger;
      this.totalMoney=sessionStorage.getItem('totalMoney');
      //this.state=this.$route.query.state;
      if(this.$route.query.zlb){
          this.zlb=this.$route.query.zlb;
      }
      if(this.$route.query.wx){
          this.wx=this.$route.query.wx;
      }
      if(this.$route.query.ali){
          this.ali=this.$route.query.ali;
      }
      if(this.$route.query.yhk){
          this.yhk=this.$route.query.yhk;
      }
      if(parseInt(this.yhk)+parseInt(this.ali)+parseInt(this.wx)+parseInt(this.zlb)==-2){
          this.state=1;
      }else{
          this.state=0;
      }
      var date=new Date();
      this.time=this.$timestampToTime(date);
  },
  computed:{
  },
  methods: {
      jumpRouter:function (routerPath) {
          this.$router.push(routerPath);
      },
  }
 }
</script>

<style lang="scss" scoped>
    .paysuccess{
        width:7.5rem;
        /*.paysucc-bg{*/
            /*width:100%;*/
            /*height:4.89rem;*/
            /*background: url("../../../static/images/yh_weixin-succ.png") top center;*/
            /*background-size: 100% 100%;*/
        /*}*/
        .paysucc-box{
            background:#fff;
            width:100%;
            height:4.26rem;
            padding-top:1.15rem;
            .paysucc-p1{
                width:100%;
                height:0.44rem;
                line-height:0.44rem;
                text-align:center;
                
                position:relative;
                background:#fff;
                img{
                    width:0.44rem;
                    height:0.44rem;
                    position:absolute;
                    top:0;
                    left:2.6rem;
                }
            }
            .paysucc-p2{
                font-size:0.36rem;
                color:rgba(50,50,50,1);
                text-align:center;
                margin-top:0.34rem;
            }
            .paysucc-p3{
                color:rgba(102,102,102,1);
                font-size:0.28rem;
                text-align:center;
                margin-top:0.3rem;
            }
        }
        .paysucc-bott{
            margin-top: 2rem;
            width:100%;
            height:2.2rem;
            background:#fff;
            div{

                width:100%;
                height:1.1rem;
                border-bottom:1px solid #f8f8f8;
                .cancel{
                    width:6.5rem;
                    height:0.7rem; 
                    background:rgba(199,167,97,1);
                    border-radius: 0.1rem;
                    margin-top:0.2rem;
                    margin-left:0.5rem;
                    color:#fff;
                    margin-bottom:0.76rem;
                }
                .cancel-home{
                    background:rgba(86,171,229,1);
                }
                div{
                    position:absolute;
                    right:0.4rem;
                    top:0.1rem;
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
        }
    }
</style>
