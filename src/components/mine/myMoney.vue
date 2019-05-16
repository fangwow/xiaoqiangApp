<template>
  <div class="myMoney">
      <div class="public_header" style="background:#c8a762;color:#fff;">
          <router-link to="/mine"><img src="../../../static/images/cf_back.png" alt=""></router-link>
          我的恒通币
      </div>
      <div class="myMoney-header">
        <div class="myMoney-bt"><span class="money-one">{{zlmoney}}</span><span style="line-height: 1.18rem;" class="money-two">恒通币</span></div>
      </div>
      <div class="page-loadmore-wrapper" style="position: fixed;top:4rem;bottom: 0.01rem; -ms-overflow-y: scroll;overflow-y: scroll;left: 0;right:0;padding-bottom: 0.25rem;max-width: 7.5rem;margin: auto;-webkit-overflow-scrolling: touch !important;">
          <mt-loadmore style="font-size: 0.3rem;"  :bottomDistance="70"  :bottom-method="loadBottom" :top-method="loadTop" :bottom-all-loaded="allLoaded" class="loadmore" ref="loadmore" :auto-fill="false">
              <ul v-if="showNoMore==0" class="myMoney-list">
                  <li v-for="(item,index) in list" :key="index">
                      <p class="list-left"><span>{{item.accountchangeReason}}</span><span>{{item.accountchangeTimeNew}}</span></p>
                      <p class="list-right orange">{{item.zlmoneychangeDetails}}</p>
                  </li>
                  <li v-if="false">
                      <p class="list-left"><span>支付 订单编号：20171026513212</span><span>2016-02-09 13:20</span></p>
                      <p class="list-right orange">+100</p>
                  </li>
              </ul>
              <div class="NoMore" v-if="showNoMore==1">
                  <div>暂无数据</div>
              </div>
          </mt-loadmore>
          <!--<div v-if="allLoaded" style="position:relative;width: 100%;font-size: 0.3rem;text-align: center;height:0.3rem;line-height: 0.3rem;padding: 0.1rem 0;">没有更多了</div>-->
      </div>

  </div>
</template>

<script>
export default {
  data () {
      return {
          page:1,
          pageSize:10,
          list:[],
          zlmoney:0,
          allLoaded: false,
          scrollMode: "auto",
          showNoMore:0,
      }
  },
  mounted:function () {
      this.$Indicator.close();
      this.getData();
  },
  computed:{
  },
  methods: {
      getData:function () {
          var that=this;
          this.$cfAjax('post', 'userInfo/getzlmoneyAvailable', 'token',localStorage.getItem('token'),'iDisplayStart', this.page,'sEcho',1, 'iDisplayLength', this.pageSize,function (res) {

              if(that.pageSize>res.data.aData.length){
                  that.allLoaded=true;
              }else{
                  that.allLoaded=false;
              }
              if(res.data.aData.length==0 && that.page==1){
                  that.showNoMore=1;
              }else{
                  that.showNoMore=0;
              }

              for(var i=0;i<res.data.aData.length;i++){
                  that.list.push(res.data.aData[i]);
              }
                  that.zlmoney=res.data.zlmoneyAvailable;
          });

      },
      loadBottom() {
          var self=this
          // 加载更多数据
          setTimeout(function () {
              self.page++;
              self.getData();
              //self.scrollMode = "touch";
              self.$refs.loadmore.onBottomLoaded();
          }, 2000);
      },
      loadTop(){
          let self=this;
          setTimeout(function () {
              self.list=[];
              self.page=1;
              self.getData();
              self.$refs.loadmore.onTopLoaded();
          }, 2000);

      },
  }
 }
</script>

<style lang="scss" scoped>
    .myMoney{
        font-family:PingFangSC-Regular;
        width:7.5rem;
        .myMoney-header{
            margin-top:0.88rem;
            font-size: 0.26rem;
            height: 3.1rem;
            width: 100%;
            max-width: 7.5rem;
            background: url("../../../static/images/cf_headBackground.png") top center;
            background-size: 100% 100%;
            position:relative;
            .myMoney-bt{
                position:absolute;
                bottom:0.64rem;
                left:0.44rem;
                display:flex;
                .money-one{
                    font-size:0.8rem;
                    color:#fff;
                }
                .money-two{
                    margin-left:0.41rem;
                    font-size:0.36rem;
                    color:#fff;
                }
            }
        }
        .myMoney-list{
            width:100%;
            background-color:#fff;
            overflow:hidden;
            margin-top:0.1rem;
            li{
                width:95%;
                height:1.1rem;
                float:right;
                // margin:auto;
                border-bottom:1px solid #DCDCDC;
                display:flex;
                justify-content:space-between;
                .list-left{
                    display:flex;
                    flex-direction:column;
                    padding:0.15rem 0 0.13rem 0;
                    span{
                        margin:0;
                        padding:0;
                    }
                    span:first-child{
                        font-size:0.28rem;
                        color:rgba(29,29,38,1);
                    }
                    span:last-child{
                        font-size:0.22rem;
                    }
                }
                .list-right{
                    line-height:1.1rem;
                    padding-right:0.31rem;
                }
            }

        }
        .orange{
            color:#FF6D24;
        }
        .black{
            color:#1D1D26;
        }
        .NoMore{
            padding-top: 1.5rem;
            width: 7.5rem;
            height: 5rem;
            div{
                color: black;
                width: 100%;
                text-align: center;
            }
        }
    }
    
</style>
