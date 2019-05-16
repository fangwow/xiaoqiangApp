<template>
  <div class="chooseServer">
      <div class="public_header">
          <a @click="goBack()"><img src="../../../static/images/cf_back.png" alt=""></a>
          选择服务类型
      </div>
      <div class="Product-desc">
        <div class="Product-left"><img :src="EXdata.goodspicSpec" alt=""></div>
        <div class="Product-right">
            <p class="Produce-title">{{EXdata.goodsName}}</p>
            <p class="Title-desc">{{skuInfo.goodsColor}}，{{skuInfo.goodsType}}</p>
            <span class="Shop-norms">x{{number}}</span>
        </div>
      </div>
      <ul class="addBank-list">
        <li @click="jumpRouter('/exGoods?number='+number)">
            <p class="list-left"><span>换货</span><span ><img src="../../../static/images/yh-arrow.png" alt=""></span></p>
        </li>
        <li  @click="jumpRouter('/returnGoods?number='+number)">
            <p class="list-left"><span>退货退款</span><span><img src="../../../static/images/yh-arrow.png" alt=""></span></p>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  data () {
      return {
          number:0,
          skuInfo:{},
          EXdata:{},
      }
  },
  mounted:function () {
      this.$Indicator.close();
      this.number=this.$route.query.number;
      this.getData();
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
      }
  }
 }
</script>

<style lang="scss" scoped>
    .chooseServer{
        width:7.5rem;
        .Product-desc{
                border-top:0.1rem solid #fff;
                border-bottom:0.1rem solid #fff;
                margin-top:1rem;
                width:7.5rem;
                height:1.84rem; 
                //background:rgba(249,249,249,1);
            background-color: #ffffff;
                padding:0.1rem 0.33rem 0.09rem 0.3rem;
                display:flex;
                .Product-left{
                    width:1.45rem;
                    height:1.45rem;
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
                        bottom:0.29rem;
                        right:0;
                        font-size:0.28rem;
                        color:rgba(199,167,97,1);
                    }
                }
            }
            .addBank-list{
                width:100%;
                background-color:#fff;
                overflow:hidden;
                margin-top:0.16rem;
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
                    padding-right:0.33rem;
                    span{
                        margin:0;
                        padding:0;
                        font-size:0.28rem;
                        color:#1D1D26;
                        img{
                            width:0.14rem;
                            height:0.24rem;
                        }
                    }
                }
            }
        }
    }

</style>
