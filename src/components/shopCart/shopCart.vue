<template>
  <div class="shopCart">
      <header>
          <div v-if="!isEmpty" class="clear" @click="clearCard()">清空购物车</div>
          <div v-if="isEmpty" style="width:1.61rem;"></div>
          <div>购物车</div>
          <div style="width:1.61rem;"></div>
      </header>
      <div class="content">
          <div class="address">
              <div class="left" @click="goAdress()">收货地址:&nbsp;&nbsp;{{addressPca}}</div>
              <div class="right"><img src="../../../static/images/cf_go.png" alt=""></div>
          </div>
          <div v-if="!isEmpty" class="shoplist">
              <ul>
                  <li v-for="(item,index) in shopCartList" :key="index" v-if="shopList[index].stockOut==false"  >
                             <mt-cell-swipe
                              :right="[
                                {
                                  content: '删除',
                                  style: { background: 'red', color: '#fff',lineHeight:'1.75rem'},
                                  handler: () => del(item.goodsinformationId,item.skuId)
                                }
                              ]">
                          <div v-if="shopList[index].isSel==1" @click="choose(index,0)" class="left"><img src="../../../static/images/cf_sel.png" alt=""></div>
                          <div v-if="shopList[index].isSel==0" @click="choose(index,1)" class="left"><img src="../../../static/images/cf_noSel.png" alt=""></div>
                          <div class="center">
                              <div class="imgs"><img :src="item.goodsSpic" alt=""></div>
                              <div class="text">
                                  <div class="textTitle">{{item.goodsName}}</div>
                                  <div class="">{{item.goodsColor}}，{{item.goodsType}}</div>
                                  <div class="price">￥ {{item.sellingPrice}}</div>
                              </div>
                          </div>
                          <div class="right">
                              <div class="top" style="color: #c9c9d1" v-if="shopList[index].stockAllSum<10 || shopList[index].stockAllSum<shopList[index].number">剩余 {{shopList[index].stockAllSum}} 件</div>
                              <div class="updateNumber">
                                  <div class="reduce" @click="updataNumber(index,'-1')">-</div>
                                  <input maxlength="4" type="text" v-model="shopList[index].number"  disabled>
                                  <div class="add" @click="updataNumber(index,'1')">+</div>
                              </div>

                          </div>
                      </mt-cell-swipe>
                  </li>

                  <li class="gray" v-for="(item,index) in shopCartList" :key="index"  v-if="shopList[index].stockOut==true" style="background-color: #b8bbbf;" >
                      <mt-cell-swipe
                                  :right="[
                                {
                                  content: '删除',
                                  style: { background: 'red', color: '#fff',lineHeight:'1.75rem'},
                                  handler: () => del(item.goodsinformationId,item.skuId)
                                }
                              ]">
                              <div v-if="shopList[index].isSel==1" @click="choose(index,0)" class="left"><img src="../../../static/images/cf_sel.png" alt=""></div>
                              <div v-if="shopList[index].isSel==0" @click="choose(index,1)" class="left"><img src="../../../static/images/cf_noSel.png" alt=""></div>
                              <div class="center">
                                  <div class="imgs"><img :src="item.goodsSpic" alt=""></div>
                                  <div class="text">
                                      <div class="textTitle">{{item.goodsName}}</div>
                                      <div class="">{{item.goodsColor}}，{{item.goodsType}}</div>
                                      <div class="price">￥ {{item.sellingPrice}}</div>
                                  </div>
                              </div>
                              <div class="right">
                                  <div class="top" style="color: #ef4f4f">缺货</div>
                                  <div class="updateNumber">
                                      <div class="add" v-if="isUpdateNum==0">-</div>
                                      <div class="reduce" v-if="isUpdateNum==1" @click="updataNumber(index,'-1')">-</div>
                                      <input maxlength="4" type="text" v-model="shopList[index].number"  disabled>
                                      <div class="add" v-if="isUpdateNum==1" @click="updataNumber(index,'1')">+</div>
                                      <div class="add" v-if="isUpdateNum==0">+</div>
                                  </div>

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
                          <div class="left"><img src="../../../static/images/cf_noSel.png" alt=""></div>
                          <div class="center">
                              <div class="imgs"><img src="../../../static/images/cf_feilipu.png" alt=""></div>
                              <div class="text">
                                  <div class="textTitle">Philips / 飞利浦 55PUF6031dasds</div>
                                  <div class="">黑色，官方标配</div>
                                  <div class="price">￥ 2999</div>
                              </div>
                          </div>
                          <div class="right">
                              <div class="top">剩余 6 件</div>
                              <div class="updateNumber">
                                  <div class="reduce">-</div>
                                  <input maxlength="4" type="text" value="1">
                                  <div class="add">+</div>
                              </div>

                          </div>
                      </mt-cell-swipe>

                  </li>
              </ul>
          </div>
      </div>
      <!-- 底部 -->
      <div v-if="!isEmpty" class="pay">
          <div class="left">
              <div v-if="selectAll" class="imgs" @click="selectAll1(0)">
                  <img  src="../../../static/images/cf_sel.png" alt="">
              </div>
              <div v-if="!selectAll" class="imgs" @click="selectAll1(1)">
                  <img  src="../../../static/images/cf_noSel.png" alt="">
              </div>
              <div class="">全选</div>
          </div>
          <div class="center"> 实付金额: <div class="money">￥{{totalPrice}}</div></div>
          <div class="right" @click="submit()">去付款</div>
      </div>

      <div class="empty" v-if="isEmpty">
          <div class="imgs">
              <img src="../../../static/images/cf_empty.png" alt="">
          </div>
          <div class="emptyTitle">购物车还是空的</div>
          <div class="emptyContent">快去挑点商品吧</div>
          <div class="button" @click="$jumpRouter('/index')">去逛逛</div>
      </div>

      <div v-if="showTixing" class="public_shade tixing">
          <div class="content public_center">
              <div class="top">发货提醒</div>
              <div class="phone">离您最近仓库商品缺货,是否由总仓库发货？</div>
              <div class="bottom">
                  <div class="left" @click="cancel()">否</div>
                  <div class="public_line"></div>
                  <div class="right" @click="sure()">是</div>
              </div>
          </div>
      </div>

      <div class="public_shade noMoRen" v-if="showNoMoren">
          <div class="content public_center">
              <div class="top">请先选择地址</div>
              <div class="bottom" @click="goAdress()">去选择</div>
          </div>
      </div>
      <div class="footer">
          <ul>
              <li @click="jump(0)">
                  <div >
                      <div class="top"><img src="../../../static/images/hy_index.png" alt=""></div>
                      <div class="bottom">首页</div>
                  </div>
              </li>
              <li @click="jump(1)">
                  <div>
                      <div class="top"><img src="../../../static/images/hy_fenlei.png" alt=""></div>
                      <div class="bottom">分类</div>
                  </div>
              </li>
              <li class="isActive" @click="jump(2)">
                  <div>
                      <div class="top"><img src="../../../static/images/hy_cart_show.png" alt=""></div>
                      <div class="bottom" style="color: #9d792a;">购物车</div>
                  </div>
              </li>
              <li @click="jump(3)">
                  <div>
                      <div class="top"><img src="../../../static/images/hy_mine.png" alt=""></div>
                      <div class="bottom">我的</div>
                  </div>
              </li>
          </ul>
      </div>
      <!--<div v-if="loading" class="loading public_shade" style="z-index: 2222;bottom: 2rem;background-color: rgba(0,0,0,0.1)"></div>-->
      <cf_loading :show="loading" :title="'loading...'"></cf_loading>
  </div>
</template>

<script>
    import { CellSwipe } from 'mint-ui';
export default {
  data () {
      return {
          loading:false,
          showTixing:false,//发货提醒遮罩层 (拆单)
          showNoMoren:true,//展示没有默认地址
          isEmpty:false,//购物车是否为空
          moren:'',//默认地址
          addressPca:'',//省市地址
          shopCartList:[],//购物车列表
          shopList:[],//用来储存  选中
          selectAll:0,//全选
          totalPrice:0,//总金额
          idx:0,//索引
          goodsList:[],
          goodsIds:'',
          isUpdateNum:1,
      }
  },
  mounted:function () {
     // debugger;
      if(this.$route.query.goodsList!=''){
          this.goodsIds=this.$route.query.goodsList;
          this.goodsList=this.goodsIds.split(",");
      }
      this.getAddress();
  },
  watch:{
        moren:function () {
            if(this.moren){
                this.showNoMoren=false;
            }else{
                this.showNoMoren=true;
            }
        }
    },
  computed:{
  },
  methods: {
      jump:function (idx) {
          if(idx==0){
              this.$router.push("/index");
          }else if(idx==1){
              this.$router.push("/classify");
          }else if(idx==2){
              this.$router.push("/shopCart");
          }else if(idx==3){
              this.$router.push("/mine");
          }

      },//
      sure:function () {
          this.showTixing=false;
      },
      cancel:function () {
          this.showTixing=false;//关闭提醒发货弹窗
          this.shopList[this.idx].stockOut=true;//变灰色
          this.shopList[this.idx].isSel=0;//取消选中
          this.isUpdateNum=0;
      },
      choose:function (idx,val) {
          this.idx=idx;
          if(val==1){
              if(this.shopList[idx].stockOut == true) {
                  return;
              }
              if(this.shopList[idx].number>this.shopList[idx].stockSum){
                  this.showTixing=true;
              }
          }

          this.shopList[idx].isSel=val;
          var isSelNumber=0;
          for(var i=0;i<this.shopList.length;i++){
              isSelNumber+=parseInt(this.shopList[i].isSel);
          }
          if(isSelNumber==this.shopList.length){
              this.selectAll=1;
          }else{
              this.selectAll=0;
          }

          this.getTotalMoney();
      },//单选
      selectAll1:function (val) {
          var biaoji=0;
          for(var i=0;i<this.shopList.length;i++){
              if(this.shopList[i].stockOut == true &&val == 1){
                  biaoji=1;//存在 灰色的加上标记
              }else{
                  this.shopList[i].isSel=val;
              }
          }
          if(biaoji==1){
              biaoji=0;
          }else{
              this.selectAll=val;//不存在 灰色的就全选
          }

          this.getTotalMoney();//获取金额
      },//全选
      updataNumber:function (idx,val) {
          //debugger;
          this.idx=idx;
          var number1=parseInt(this.shopList[idx].number)+parseInt(val);
          if(number1<=0){
              return;
          }else if(number1>this.shopList[idx].stockAllSum){
              /*this.$Toast({
                  message:'库存不足',
                  position: 'bottom'
              });*/
              return;
          }
          if(this.shopList[idx].number>this.shopList[idx].stockSum){
              this.showTixing=true;
          }
          var that=this;
          this.$cfAjax('post', 'shoppingTro/addShopping','type',2, 'token',localStorage.getItem('token'),'skuId', this.shopList[idx].skuId,'yet',number1,'goodsInfo',this.shopList[idx].goodsId,function (res) {
              if(res.data.code==1){
                  that.shopList[idx].number=number1;
                  that.getTotalMoney();
              }else{
                  that.$Toast({
                      message:res.data.msg,
                      position: 'bottom'
                  });
              }
          });

      },//+-+-+-+-+-
      del:function (goodsId,skuId) {
          //alert("del");
          var that=this;
          this.$cfAjax('post', 'shoppingTro/deleteShopping', 'token',localStorage.getItem('token'),'goodsInfo', goodsId, 'skuId', skuId,function (res) {

              if(res.data.code==1){
                  that.$Toast({
                      message:'删除商品成功',
                      position: 'bottom'
                  });
                  that.shopList=[];
                  that.shopCartList=[];
                  that.getShopCart();
              }else{
                  that.$Toast({
                      message:res.data.msg,
                      position: 'bottom'
                  });
              }
          });

      },//删除
      clearCard:function () {
          var that=this;
          this.$cfAjax('post', 'shoppingTro/deleteShopping', 'token',localStorage.getItem('token'),function (res) {

              if(res.data.code==1){
                  that.$Toast({
                      message:'清空购物车成功',
                      position: 'bottom'
                  });
                  that.isEmpty=true;
                  that.shopCartList=[];
                  that.shopList=[];
                  that.getShopCart();
              }else{
                  that.$Toast({
                      message:res.data.msg,
                      position: 'bottom'
                  });
              }
          });

      },//清空
      getAddress:function () {
          var that=this;
          this.$cfAjax('post', 'shoppingTro/getShoppingAddress', 'token',localStorage.getItem('token'),function (res) {

              if(res.data.code==1){//有默认地址
                  that.moren=res.data.data.shippingaddressId;
                  that.addressPca=res.data.data.addressPca;
                  if(sessionStorage.getItem('addressId')){
                      that.moren=sessionStorage.getItem('addressId');
                      that.addressPca=sessionStorage.getItem('addressPca');
                  }
              }else if(res.data.code==2){//查询没有 默认地址
                  that.moren='';
                  if(sessionStorage.getItem('addressId')){
                      that.moren=sessionStorage.getItem('addressId');
                      that.addressPca=sessionStorage.getItem('addressPca');
                  }
              }
              if(that.moren!=''){
                  that.getShopCart();
              }

          });
      },//判断是否有  默认地址
      goAdress:function () {
          this.$jumpRouter('/address?state=1&goodsList='+this.goodsIds);
      },//去选择地址
      getShopCart:function () {
          var that=this;
          that.loading=true;
          this.$cfAjax('post', 'shoppingTro/selectShopping', 'token',localStorage.getItem('token'),'addressId', this.moren, function (res) {
              that.loading=false;
              if (that.$route.path != "/shopCart") {//判断页面是否改变 改变就不继续执行了
                  return;
              }
              if(res.data.code==1){
                  that.shopCartList=res.data.data;
                  if(res.data.data.length==0){
                      that.isEmpty=true;
                  }else{
                      that.isEmpty=false;
                  }
                  for(var i=0;i<that.shopCartList.length;i++){
                      var obj={};
                      obj.isSel=0;//是否选中
                      obj.stockOut=false;//是否缺货   false不缺货
                      obj.skuId=that.shopCartList[i].skuId;//唯一id
                      obj.number=that.shopCartList[i].yet;//数量
                      obj.sellingPrice=that.shopCartList[i].sellingPrice;//单价
                      obj.stockAllSum=that.shopCartList[i].stockAllSum;//总库存
                      obj.stockSum=that.shopCartList[i].stockSum;//最近仓库
                      obj.goodsId=that.shopCartList[i].goodsinformationId;//goodsID

                      if(obj.stockAllSum<obj.number){
                          obj.stockOut=true;
                      }
                      for(var j=0;j<that.goodsList.length;j++){
                          if(obj.goodsId==that.goodsList[j]){
                              obj.isSel=1;//是否选中
                          }
                      }
                      that.shopList.push(obj);
                  }
                  var isSelNumber=0;
                  for(var i=0;i<that.shopList.length;i++){
                      isSelNumber+=parseInt(that.shopList[i].isSel);
                  }
                  if(isSelNumber==that.shopList.length){
                      that.selectAll=1;
                  }else{
                      that.selectAll=0;
                  }

                  that.getTotalMoney();//huoqujine
              }
          });
      },//获取购物车
      submit:function () {
          var that=this;
          if(localStorage.getItem("ispass")!='B'){
              that.$Toast({
                  message:"您当前未通过审核,暂时不能购物",
                  position: 'bottom'
              });
              return;
          }
          that.loading=true;
          var all="";
          var allGoodsIdSkuIdCount="";
          for(var i=0;i<this.shopList.length;i++){
              if(this.shopList[i].isSel==1){
                    if(allGoodsIdSkuIdCount==''){
                        allGoodsIdSkuIdCount+=this.shopList[i].goodsId+'!'+this.shopList[i].skuId+'!'+this.shopList[i].number;
                    }else{
                        allGoodsIdSkuIdCount+=','+this.shopList[i].goodsId+'!'+this.shopList[i].skuId+'!'+this.shopList[i].number;
                    }
              }
          }
          //////////////////////////////////////假数据
         // allGoodsIdSkuIdCount='47bcda68-bbc1-46ed-a42c-e515548f3ba1!62d94f1d-1c43-48b0-a6be-5d45cf2fcf51!2';

          this.$cfAjax('post', 'orderInfo/subOrder', 'token',localStorage.getItem('token'),'shippingaddressId', this.moren, 'allGoodsIdSkuIdCount', allGoodsIdSkuIdCount,function (res) {
              that.loading=false;
              if (that.$route.path != "/shopCart") {//判断页面是否改变 改变就不继续执行了
                  return;
              }
              if(res.data.code==1){
                  that.$Toast({
                      message:res.data.msg,
                      position: 'bottom'
                  });
                  sessionStorage.setItem('orderId',res.data.data.orderId);
                  that.$jumpRouter('/finalOrder')
              }
          });



      },//提交订单
      getTotalMoney:function () {
          var pri=0;//临时存放金额
          for(var i=0;i<this.shopList.length;i++){
              if(this.shopList[i].isSel==1){
                  pri+=parseInt(this.shopList[i].number)*parseFloat(this.shopList[i].sellingPrice);
              }
          }
          this.totalPrice=Math.floor(pri*100)/100;
      },//获取订单总金额
  }
 }
</script>

<style lang="scss" scoped>

    .shopCart{

        background: #fafafa;
        width: 100%;
        height: 100%;
        max-width: 7.5rem;
        header{
            /*padding-top: 0.33rem;*/
            background-color: #ffffff;
            height:0.88rem;
            //line-height: 0.88rem;
            width:100%;
            font-size: 0.34rem;
            text-align: center;
            display: flex;
            justify-content: space-between;
            padding:0.15rem 0.2rem;
            div{
                height:0.57rem;
                line-height: 0.57rem;

            }
            .clear{
                width: 1.61rem;
                height: 0.57rem;
                color: #ffffff;
                font-size: 0.26rem;
                line-height: 0.57rem;
                background-color: #ff7f4f;
                border-radius: 5px;
            }

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
                top: 2rem;
                bottom:2rem;
                margin: auto;
                overflow-y: auto;
                width: 100%;
                max-width: 7.5rem;
                ul{
                    li{
                        /*padding: 0 0.2rem;*/
                        height: 1.75rem;
                        font-size: 0.26rem;
                        display: flex;
                        justify-content: space-around;
                        border-bottom: 1px solid #eeeeee;
                        .left{
                            height: 1.75rem;
                            line-height: 1.75rem;
                            width: 0.48rem;
                            img{
                                vertical-align: middle;
                            }
                        }
                        .center{
                            width: 4.5rem;
                            display: flex;
                            .imgs{
                                margin:0 0.2rem;
                                width: 1.25rem;
                                height: 1.75rem;
                                line-height: 1.75rem;
                                img{
                                    width: 100%;
                                    vertical-align: middle;
                                }
                            }
                            .text{
                                margin-top: 0.2rem;
                                width: 3rem;
                                div{
                                    font-size: 0.2rem;
                                    color: #666666;
                                }
                                .textTitle{
                                    margin-bottom: 0.08rem;
                                    font-size: 0.24rem;
                                    color: #282828;
                                    width: 100%;
                                    overflow: hidden;
                                    text-overflow:ellipsis;
                                    white-space: nowrap;
                                }
                                .price{
                                    margin-top: 0.5rem;
                                    font-size: 0.26rem;
                                    color: #9d792a;
                                }
                            }
                        }
                        .right{
                            width: 1.7rem;
                            padding-top: 0.6rem;
                            .top{
                               margin-left: 0.5rem;
                                font-size: 0.2rem;
                                color: #f23030;
                                margin-bottom: 0.15rem;
                            }
                            .updateNumber{
                                display: flex;
                                div{
                                    width: 0.8rem;
                                    height: 0.47rem;
                                    line-height: 0.47rem;
                                    text-align: center;
                                    border: 1px solid #c9c9d1;
                                }
                                input{
                                    text-align: center;
                                    padding: 0;
                                    font-size: 0.2rem;
                                    width: 0.8rem;
                                    height: 0.48rem;
                                    line-height: 0.49rem;
                                    border-right: none;
                                    border-left: none;
                                }
                            }
                        }



                    }
                }
            }
        }
        /*=====底部====*/
        .pay{
            z-index: 88;
            background-color: white;
            font-size: 0.26rem;
            position: fixed;
            left: 0;
            right: 0;
            bottom:1rem;
            margin: auto;
            max-width: 7.5rem;
            height: 0.99rem;
            display: flex;
            justify-content: space-between;
            .left{
                margin-left: 0.2rem;
                display: flex;
                div{
                    height: 0.99rem;
                    line-height: 0.99rem;
                }
                .imgs{
                    width: 0.55rem;
                    margin-right: 0.2rem;
                    img{
                        width: 100rem;
                        vertical-align: middle;
                    }
                }
            }
            .center{
                display: flex;
                height: 0.99rem;
                line-height: 0.99rem;
                .money{
                    color: #f16530;
                    font-size: 0.36rem;
                }
            }
            .right{
                height: 0.99rem;
                line-height: 0.99rem;
                width: 2.45rem;
                background-color: #f16530;
                text-align: center;
                color: white;
            }
        }

        /*购物车为空*/
        .empty{
            font-size: 0.48rem;
            padding-top: 1.4rem;
            text-align: center;
            .imgs{
                img{
                    width: 3.15rem;
                }
            }
            .emptyTitle{
                margin-top: 0.5rem;
                color: #333333;
            }
            .emptyContent{
                margin-top: 0.2rem;
                font-size: 0.36rem;
            }
            .button{
                margin-top: 0.44rem;
                background-color: #CBA753;
                border-radius: 5px;
                margin-left: 1.65rem;
                width:4.19rem;
                height:0.88rem;
                font-size:0.36rem;
                color:rgba(250,250,250,1);
                line-height:0.88rem;
            }
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
        .tixing{
            .content{
                background-color: white;
                width: 5.4rem;
                height: 3.3rem;
                font-size: 0.3rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .top{
                    margin-top: 0.45rem;
                    color: #323232;
                    font-size: 0.26rem;
                    text-align: center;
                }
                .phone{
                    margin:0 1rem;
                    color: #333333;
                    font-size: 0.3rem;
                    text-align: center;
                }
                .bottom{
                    display: flex;
                    justify-content: space-between;
                    height: 1rem;
                    line-height: 1rem;
                    border-top: 1px solid #e6e6e6;
                    font-size: 0.36rem;
                    width: 100%;
                    .left{
                        width: 50%;
                        text-align: center;
                    }
                    .right{
                        width: 50%;
                        text-align: center;
                    }
                }
            }

        }
        .noMoRen{
            font-size: 0.3rem;
            bottom:2rem;
            .content{
                width: 4rem;
                height: 2rem;
                .top{
                    font-size: 0.3rem;
                    height: 1.3rem;
                    line-height: 1.3rem;
                    text-align: center;
                    border-bottom: 1px solid #b8bbbf;
                }
                .bottom{
                    height: 0.7rem;
                    line-height: 0.7rem;
                    text-align: center;
                }
            }
        }


        .gray{
            .mint-cell.mint-cell-swipe{
                background-color: #b8bbbf;
                input{
                    background-color: transparent;
                }
            }
        }

    }



</style>
