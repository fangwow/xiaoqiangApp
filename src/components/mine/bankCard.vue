<template>
  <div class="bankCard">
      <div class="public_header">
          <router-link to="/mine"><img src="../../../static/images/cf_back.png" alt=""></router-link>
          我的银行卡
      </div>
      <div class="bankCard-list">
         <div class="card">
            <div class="card-left"><img src="../../../static/images/yh-check.png" alt=""></div>
            <div class="card-right">
                <div class="bank-logo"><img src="../../../static/images/yh-jianshe.png" alt=""></div>
                <div class="bank-desc">
                    <p class="bank-p1">中国建设银行</p>
                    <p class="bank-p2">储蓄卡</p>
                    <p class="bank-p3">**** &nbsp;&nbsp;&nbsp; **** &nbsp;&nbsp;&nbsp;  **** &nbsp;&nbsp;&nbsp;  7689</p>
                </div>
            </div>
         </div>
         <div class="card">
            <div class="card-left"><img src="../../../static/images/yh-check.png" alt=""></div>
            <div class="card-right">
                <div class="bank-logo"><img src="../../../static/images/yh-gongshang.png" alt=""></div>
                <div class="bank-desc">
                    <p class="bank-p1">中国工商银行</p>
                    <p class="bank-p2">储蓄卡</p>
                    <p class="bank-p3">**** &nbsp;&nbsp;&nbsp; **** &nbsp;&nbsp;&nbsp;  **** &nbsp;&nbsp;&nbsp;  7689</p>
                </div>
            </div>
         </div>
      </div>
      <div class="addcard" @click="jumpRouter('/addBank')">+  添加银行卡</div>
  </div>
</template>

<script>
export default {
  data () {
      return {
      }
  },
  mounted:function () {
      this.$Indicator.close();
  },
  computed:{
  },
  methods: {
       jumpRouter:function (routerPath) {
          this.$router.push(routerPath);
      }
  }
 }
</script>

<style lang="scss" scoped>
    .bankCard{
        width:7.5rem;
        font-family:PingFangSC-Regular;
        // position:relative;
        .bankCard-list{
            margin-top:0.98rem;
            width:100%;
            background:rgba(255,255,255,1);
            .card{
                width:100%;
                height:1.6rem;
                // padding:0 0.41rem 0 0.38rem;
                border-bottom:1px solid #f8f8f8;
                display:flex;
                .card-left{
                    padding-left:0.38rem;
                    position:relative;
                    img{
                        position:absolute;
                        top:0.55rem;
                        max-width:0.3rem;
                        width:0.3rem;
                        height:0.3rem;
                    }
                }
                .card-right{
                    width:100%;
                    padding-left:0.59rem;
                    display:flex;
                    padding-right:0.41rem;
                    .bank-logo{
                        img{
                            max-width:0.56rem;
                            width:0.56rem;
                            height:0.6rem;
                        }
                    }
                    .bank-desc{
                        width:100%;
                        padding-left:0.21rem;
                        p{
                            margin:0;
                            padding:0;
                        }
                        .bank-p1{
                            padding-top:0.18rem;
                            font-size:0.32rem;
                            color:rgba(51,51,51,1);
                        }
                        .bank-p2{
                            margin-top:0.09rem;
                            font-size:0.24rem;
                            color:rgba(136,136,136,1);
                        }
                        .bank-p3{
                            width:100%;
                            text-align:right;
                            // margin-top:0.38rem;
                            font-size:0.28rem;
                            color:rgba(136,136,136,1);
                        }
                    }
                }
            }
        }
        .addcard{
            position:absolute;
            bottom:0.6rem;
            left:1.15rem;
            width:5.2rem;
            height:0.71rem;
            line-height:0.71rem;
            text-align:center;
            margin:auto; 
            background:rgba(205,204,204,1);
            border-radius: 0.1rem;
            color:rgba(254,254,254,1);
            font-size:0.28rem;
        }
    }
    
</style>
