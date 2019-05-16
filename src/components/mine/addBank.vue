<template>
  <div class="addBank">
      <div class="public_header">
          <router-link to="/bankCard"><img src="../../../static/images/cf_back.png" alt=""></router-link>
          绑定银行卡
      </div>
      <ul class="addBank-list">
        <li>
            <p class="list-left"><span>姓名：</span><input type="text" placeholder="请输入持卡人姓名"></p>
        </li>
        <li>
            <p class="list-left"><span>卡号：</span><input type="text" placeholder="请输入卡号"></p>
        </li>
        <li>
            <p class="list-left"><span>银行：</span><input type="text" placeholder="请选择发卡银行"></p>
        </li>
      </ul>
      <div class="next-bank" @click="jumpRouter('/addAddress')">
         <span   @click="shadepay=true">下一步</span>
      </div>
      <div class="public_shade" v-if="shadepay">
        <div class="public_center shadeinput">
           <p class="remind">支付密码</p>
           <div class="remind-input"></div>
           <p class="remind-btn"><span @click="jumpRouter('/paysuccess')">确认</span><span @click="shadepay=false">取消</span></p>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
      return {
          shadepay:false,//支付遮罩层的显示
      }
  },
  mounted:function () {
      this.$Indicator.close();
  },
  computed:{
  },
  methods: {
  }
 }
</script>

<style lang="scss" scoped>
    .addBank{
        font-family:PingFangSC-Regular;
        width:7.5rem;
        .addBank-list{
            width:100%;
            background-color:#fff;
            overflow:hidden;
            margin-top:1rem;
            li{
                width:95%;
                height:1.1rem;
                float:right;
                // margin:auto;
                
                .list-left{
                    width:100%;
                    height:1.1rem;
                    line-height:1.1rem;
                    display:flex;
                    justify-content:space-between;
                    border-bottom:1px solid #DCDCDC;
                    span{
                        margin:0;
                        padding:0;
                        width:15%;
                    }
                    input{
                        width:85%;
                        height:100%;
                        border:none;
                        margin:0;
                        padding:0;
                        font-size:0.28rem;
                    }
                   
                }
            }
        }
        .next-bank{
            z-index: 88;
            background:rgba(194,168,109,1);
            font-size: 0.26rem;
            position: absolute;
            left: 0;
            right: 0;
            bottom:0.14rem;
            margin: auto;
            max-width: 6.92rem;
            height: 0.7rem;
            line-height:0.7rem;
            border-radius:0.08rem;
            color:#fff;
            text-align:center;
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
    }
    
</style>
