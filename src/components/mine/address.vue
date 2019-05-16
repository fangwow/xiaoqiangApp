<template>
  <div class="shopCart">
      <div class="public_header">
          <router-link v-if="state==0"  to="/mine">
              <img src="../../../static/images/cf_back.png" alt="">
          </router-link>地址管理
      </div>
      <div class="public_header" v-if="state==0" >
          <router-link  to="/mine">
              <img src="../../../static/images/cf_back.png" alt="">
          </router-link>地址管理
      </div>
      <div class="public_header" v-if="state==1">
          <router-link   to="/shopCart">
              <img src="../../../static/images/cf_back.png" alt="">
          </router-link>选择地址
      </div>
      <div class="public_header" v-if="state==2 ||state==3">
          <router-link   to="/goodsDetail">
              <img src="../../../static/images/cf_back.png" alt="">
          </router-link>选择地址
      </div>
      <div class="content">
          <div class="address">
              <div class="left">收货地址:dasda sdas asdas</div>
              <div class="right"><img src="../../../static/images/cf_go.png" alt=""></div>
          </div>
          <div class="shoplist">
              <ul>
                  <li v-if="state==1 || state==2 || state==3" v-for="(item,index) in addressList" :key="index" @click="selectAdress(item.shippingaddressId,item.addressPca)">
                      <mt-cell-swipe
                              :right="[
                                {
                                  content: '删除',
                                  style: { background: 'red', color: '#fff',lineHeight:'1.69rem'},
                                  handler: () => del(item.shippingaddressId)
                                }
                              ]">
                          <div v-if="item.defaultAddress==0" class="left" @click="setDef(item.shippingaddressId)"><img src="../../../static/images/cf_noSel.png" alt=""></div>
                          <div v-if="item.defaultAddress==1" class="left"><img src="../../../static/images/cf_sel.png" alt=""></div>
                          <div class="center">
                              <p class="username">{{item.consigneeName}}</p>
                              <p class="userphone">{{item.consigneeTel}}</p>
                              <p class="useradd">{{item.shippingAddress}}</p>
                          </div>
                          <div class="right" @click="edit(item)">
                             <span>编辑</span>
                          </div>
                      </mt-cell-swipe>
                  </li>
                  <li v-if="state==0" v-for="(item,index) in addressList" :key="index">
                      <mt-cell-swipe
                              :right="[
                                {
                                  content: '删除',
                                  style: { background: 'red', color: '#fff',lineHeight:'1.69rem'},
                                  handler: () => del(item.shippingaddressId)
                                }
                              ]">
                          <div v-if="item.defaultAddress==0" class="left" @click="setDef(item.shippingaddressId)"><img src="../../../static/images/cf_noSel.png" alt=""></div>
                          <div v-if="item.defaultAddress==1" class="left"><img src="../../../static/images/cf_sel.png" alt=""></div>
                          <div class="center">
                              <p class="username">{{item.consigneeName}}</p>
                              <p class="userphone">{{item.consigneeTel}}</p>
                              <p class="useradd">{{item.shippingAddress}}</p>
                          </div>
                          <div class="right" @click="edit(item)">
                              <span>编辑</span>
                          </div>
                      </mt-cell-swipe>
                  </li>
                  <li v-if="false">
                      <mt-cell-swipe
                              :right="[
                                {
                                  content: '删除',
                                  style: { background: 'red', color: '#fff',lineHeight:'1.75rem'},
                                  handler: () => this.del()
                                }
                              ]">
                          <div class="left"><img src="../../../static/images/cf_sel.png" alt=""></div>
                          <div class="center">
                            <p class="username">用户名称</p>
                            <p class="userphone">185 0234 5501</p>
                            <p class="useradd">北京市昌平区沙河镇西沙屯小学</p>
                          </div>
                          <div class="right">
                              <span>编辑</span>
                          </div>
                      </mt-cell-swipe>

                  </li>
                  <li v-if="false">
                      <mt-cell-swipe
                              :right="[
                                {
                                  content: '删除',
                                  style: { background: 'red', color: '#fff',lineHeight:'1.75rem'},
                                  handler: () => this.del()
                                }
                              ]">
                          <div class="left"><img src="../../../static/images/cf_sel.png" alt=""></div>
                          <div class="center">
                            <p class="username">用户名称</p>
                            <p class="userphone">185 0234 5501</p>
                            <p class="useradd">北京市昌平区沙河镇西沙屯小学</p>
                          </div>
                          <div class="right">
                              <span>编辑</span>
                          </div>
                      </mt-cell-swipe>

                  </li>
              </ul>
          </div>
      </div>
      <!-- 底部 -->
      <div class="new-pay" @click="add()">
         <span>+  新建地址</span>
      </div>
      <cf_loading :show="loading" :title="'loading...'"></cf_loading>
      <!--<div v-if="loading" class="loading public_shade" style="top: 2rem;z-index: 2222;background-color: rgba(0,0,0,0.1)"></div>-->
  </div>
</template>

<script>
    import { CellSwipe } from 'mint-ui';
export default {
  data () {
      return {
          state:0,//存储进来时的页面 0我的页面   1购物时
          addressList:[],
          allGoodsIdSkuIdCount:'',
          loading:false,
      }
  },
  mounted:function () {
      this.state=this.$route.query.state;
      if(this.state==3){
          this.allGoodsIdSkuIdCount=this.$route.query.allGoodsIdSkuIdCount;
      }
      this.getData();
  },
  computed:{

  },
  methods: {
      del:function (id) {
          event.stopPropagation();//阻止事件冒泡
          var that=this;
          //alert("del");
          this.$cfAjax('post', 'userInfo/deleteUserShippingAddress','addressId',id, 'token',localStorage.getItem('token') ,function (res) {
              if(res.data.code==1){
                  that.$Toast({
                      message: '删除地址成功',
                      position: 'bottom'
                  });
                  that.addressList=[];
                  that.getData();
              }else{
                  that.$Toast({
                      message: '删除地址失败',
                      position: 'bottom'
                  });
              }
          });
      },
      jumpRouter:function (routerPath) {
          this.$router.push(routerPath);
      },
      getData:function () {
          var that=this;
          this.$cfAjax('post', 'userInfo/getUserShippingAddress', 'token',localStorage.getItem('token') ,function (res) {

              if(res.data.code==1){
                  that.addressList=res.data.data;
              }
          });
      },
      add:function () {
          this.$router.push('/addAddress?state='+this.state+'&add=1');
      },
      edit:function (item){
          event.stopPropagation();//阻止事件冒泡
          this.$router.push('/addAddress?state='+this.state+'&add=0&provinceId='+item.provinceId+'&cityId='+item.cityId+'&areaId='+item.areaId+'&detailAddress='+item.addressDetail+'&shippingaddressId='+item.shippingaddressId+'&phone='+item.consigneeTel+'&name='+item.consigneeName);
      },
      setDef:function (addressId) {
          event.stopPropagation();//阻止事件冒泡
          var that=this;
          this.$cfAjax('post', 'userInfo/updateDefaultaddress', 'token',localStorage.getItem('token'),'addressId',addressId,function (res) {
              //console.log(res);
              if(res.data.code==1){
                  that.$Toast({
                      message: '设置默认地址成功',
                      position: 'bottom'
                  });
                  that.getData();
              }
          });

      },
      selectAdress:function (addressId,addressPca) {
          var that=this;
          sessionStorage.setItem('addressId',addressId);
          sessionStorage.setItem('addressPca',addressPca);
          if(this.state==1){
              if(this.$route.query.goodsList){
                  this.$jumpRouter('/shopCart?goodsList='+this.$route.query.goodsList);
              }else{
                  this.$jumpRouter('/shopCart?goodsList=""');
              }
          }else if(this.state==2){
              this.$jumpRouter('/goodsDetail?state=2');
          }else if(this.state==3){
              that.loading=true;
              this.$cfAjax('post', 'orderInfo/subOrder', 'token',localStorage.getItem('token'),'shippingaddressId', sessionStorage.getItem('addressId'), 'allGoodsIdSkuIdCount', this.allGoodsIdSkuIdCount,function (res) {
                  that.loading=false;
                  if (that.$route.path != "/address") {//判断页面是否改变 改变就不继续执行了
                     return;
                  }
                  if(res.data.code==1){
                      that.$Toast({
                          message:res.data.msg,
                          position: 'bottom'
                      });
                      sessionStorage.setItem('orderId',res.data.data.orderId);
                      that.$jumpRouter('/finalOrder')
                  }else{
                      that.$Toast({
                          message:res.data.msg,
                          position: 'bottom'
                      });
                  }
              });
              //this.$jumpRouter('/goodsDetail?state=2');
          }
      },//选择地址
  }
 }
</script>

<style lang="scss" scoped>
    .mint-cell{
        width:100%;
    }
    .mint-cell:last-child{
        background-size: 100% 0 !important;
    }
    .mint-cell-wrapper{
        background-size: 100% 0 !important;
    }
    .mint-cell-swipe-buttongroup{
        width: 1.22rem;
        height: 100%;
        a{
            width:100%;
        }
    }
    .shopCart{
        background: #eeeeee;
        width: 100%;
        height: 100%;
        max-width: 7.5rem;
        header{
            /*padding-top: 0.33rem;*/
            background-color: #ffffff;
            height:1rem;
            line-height: 1rem;
            width:100%;
            font-size: 0.34rem;
            text-align: center;
        }

        /*zhongjian */
        .content{
            background-color: #ffffff;
            .address{
                padding: 0 0.2rem;
                font-size: 0.26rem;
                height: 1rem;
                line-height: 1rem;
                border-top: 1px solid #dcdcdc;
                border-bottom: 1px solid #dcdcdc;
                display: flex;
                justify-content: space-between;
                .left{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    flex: 1;
                    padding-right: 0.5rem;
                }
                .right{
                    width: 0.1rem;
                    img{
                        width: 100%;
                        vertical-align: middle;
                    }
                }
            }
            .shoplist{
                background-color: #ffffff;
                position: fixed;
                left: 0;
                right: 0;
                top: 1rem;
                bottom:2rem;
                margin: auto;
                overflow-y: auto;
                width: 100%;
                max-width: 7.5rem;
                ul{
                    li{
                        /*padding: 0 0.2rem;*/
                        height: 1.69rem;
                        font-size: 0.26rem;
                        display: flex;
                        justify-content: space-around;
                        border-bottom: 1px solid #eeeeee;
                        .left{
                            height: 1.69rem;
                            line-height: 1.69rem;
                            width: 0.48rem;
                            img{
                                vertical-align: middle;
                            }
                        }
                        .center{
                            width: 4.5rem;
                            height:1.69rem;
                            padding:0.35rem 0 0.35rem 0.31rem;
                            overflow:hidden;
                            .username,.userphone{
                                font-size:0.24rem;
                                color:#282828;
                                 margin-bottom:0.12rem;
                            }
                            .useradd{
                                font-size:0.22rem;
                                color:#666666;
                            }
                        }
                        .right{
                            width: 1.7rem;
                            height:1.69rem;
                            line-height:1.69rem;
                            text-align:center;
                            span{
                                color:#A67F2E;
                                font-size:0.22rem;
                            }
                        }



                    }
                }
            }
        }
        /*=====底部====*/
        .new-pay{
            z-index: 88;
            background:rgba(194,168,109,1);
            font-size: 0.26rem;
            position: fixed;
            left: 0;
            right: 0;
            bottom:0.5rem;
            margin: auto;
            max-width: 6.92rem;
            height: 0.88rem;
            line-height:0.88rem;
            border-radius:0.08rem;
            color:#fff;
            text-align:center;
        }
        .footer{
            max-width: 7.5rem;
            z-index: 99;
            border-top: 1px solid #e8e8e8;
            padding: 0.1rem;
            background-color: #ffffff;
            height: 0.99rem;
            width: 100%;
            position: fixed;
            bottom:0;
            left: 0;
            right:0;
            margin: auto;
            ul{
                display: flex;
                justify-content: space-around;
                font-size: 0.2rem;
                li{
                    div{
                        .top{
                            height: 0.4rem;
                            text-align: center;
                            img{
                                height: 100%;
                            }
                        }
                        .bottom{
                            text-align: center;
                        }
                    }
                    .isActive{
                        color: #9d792a;
                    }
                }
            }

        }

    }



</style>
