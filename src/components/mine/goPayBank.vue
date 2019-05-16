<template>
  <div class="goPayBank">
      <div class="public_header">
          <a @click="$jumpRouter('/pay?orderNumber='+orderNumber+'&totalMoney='+totalMoney+'')">
              <img style="top: 14px;" src="../../../static/images/cf_back.png" alt="">
          </a>
          <span>支付</span>
      </div>
      <input id="xasasffa" type="hidden" v-model="val">
      <iframe src="#/goPayBankMid" style="padding-bottom: 1rem;"  id="google_ads_frame2" name="google_ads_frame2"  frameborder="0"  marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no" allowfullscreen="true">
      </iframe>
      <div class="footertop" v-if="false"></div>
      <div class="footer">
          <div @click="$jumpRouter('/index')" class="left">去首页</div>
          <div @click="seeDetail()">查看详情</div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
      return {
          val:'',
          htm:'',
      }
  },
  mounted:function () {
      this.orderNumber=this.$route.query.orderNumber;
      this.totalMoney=this.$route.query.totalMoney;
  },
  watch:{

  },
  computed:{

  },
  methods: {
      showContent:function (id) {
          console.log(id);
      },
      seeDetail:function () {
          var that=this;
          this.$cfAjax('post', 'orderInfo/toOrderDetail','token',localStorage.getItem('token'),'orderId',sessionStorage.getItem('orderId'),function (res) {
              console.log(res)
              if(res.data.code==1){
                  if(res.data.data==1){
                      that.$jumpRouter('/orderDetailLike');
                  }else if(res.data.data==2) {
                      that.$jumpRouter('/orderDetail');
                  }
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
    #google_ads_frame2{
        position: fixed;
        top:0;
        left:0;
        right: 0;
        bottom: 0;
        max-width: 7.5rem;
        width: 100%;
        height: 100%;
        padding: 0;
    }
    .public_header{
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #eeeeee;
    }
    .footertop{
        position: fixed;
        bottom: 1rem;
        left: 0;
        right: 0;
        height: 1rem;
        background-color: #f1f3f5;
    }
    .footer{
        border-top: 1px solid #b8bbbf;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1rem;
        background-color: white;
        font-size: 0.26rem;
        height: 1rem;
        line-height: 1rem;
        display: flex;
        justify-content: space-around;
        div{
            width: 50%;
            text-align: center;
        }
        .left{
            border-right: 1px solid #b8bbbf;
        }
    }
</style>
