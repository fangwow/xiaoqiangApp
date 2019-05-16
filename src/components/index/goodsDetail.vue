<template>
  <div class="goodsDetail">
      <div class="all" style="position: absolute">
          <div class="back" style="position: absolute">
              <a style="display: block;height:0.6rem;width: 0.3rem;overflow: hidden;" @click="goback()"><img style="float: left;" src="../../../static/images/cf_back_black.png" alt=""></a>
              <!--<img v-if="state==2" @click="$router.go(-3)" src="../../../static/images/cf_back_black.png" alt="">-->
          </div>
          <div class="lunbo">
              <mt-swipe :auto="1500">
                  <mt-swipe-item v-for="(item,index) in swiper" :key="index">
                      <!--<img style="width: 100%;height: 100%;" :src=item.goodspicSpec alt=""  >-->
                      <img style="width: 100%;height: 100%;" :src="item.goodspics" alt=""  >
                    <!--  @click="lookDetail(item.goodspics)"-->
                  </mt-swipe-item>
              </mt-swipe>
          </div>
              <!--<div class="detailImg">
                  <img src="../../../static/images/cf_detail.png" alt="">
                  &lt;!&ndash;该轮播&ndash;&gt;
              </div>-->
          <div class="goodsContent">
              <div class="goodsTitle">{{goodsDetail.goodsName}}
                 <!-- 美的(Midea)电磁炉魅彩恒匀火炫彩电磁炉彩色面板
                  九档滑控火力调节C21-Micca704-->
              </div>
              <div class="goodsPrice">￥<span class="price">{{price}}</span><span class="yuan">元</span></div>
              <div class="selected" @click="showGoodsSpec()">
                  <div>已选 <span class="property">{{color}},{{spec}},{{number}}件</span></div>
                  <div class="imgs"><img src="../../../static/images/cf_go.png" alt=""></div>
              </div>
              <div class="server" >
                  <div v-for="(item,index) in aftersale" :key="index"><img src="../../../static/images/cf_sure.png" alt="">{{item.aftersalesName}}</div>
                 <!-- <div><img src="../../../static/images/cf_sure.png" alt="">提供保修服务</div>
                  <div><img src="../../../static/images/cf_sure.png" alt="">服务承诺：凡购买本商品，若存在质量问题，将主动提供退换货服务</div>-->
              </div>
              <div class="richTitle">
                  <div class="left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                  <div class="center">商品参数</div>
                  <div class="right" @click="shadeArg=true">查看全部参数 ></div>
              </div>
              <div class="arg">
                  <div class="left">
                     <!-- goodsparameters-->
                      <div v-for="(item2,index2) in goodsparametersLeft" :key="index2">{{item2.parameterName}}：{{item2.parameterValue}}</div>
                      <!--<div>保修期：  12个月 </div>-->
                      <!--<div>净重：      25kg</div>-->
                      <!--<div>品牌：      飞利浦</div>-->
                  </div>
                  <div class="right">
                      <div v-for="(item2,index2) in goodsparametersRight" :key="index2">{{item2.parameterName}}：{{item2.parameterValue}}</div>
                      <!--<div>边框尺寸：1457x89x834</div>-->
                      <!--<div>型号：1234555555</div>-->
                      <!--<div>屏幕比例：16：9</div>-->
                  </div>
              </div>
              <div id="richText" style="font-size: 0.24rem;margin-top: 0.2rem">

                  <!--this.goodsDetails=this.goodsDetails.replace(/img/g,'img style=\"float: left;\"');-->
              </div>
          </div>
      </div>
      <div v-if="shadeArg" class="public_shade shade">
          <div class="cancel" @click="shadeArg=false"></div>
          <div class="Args">
              <div class="title">
                  规格
              </div>
              <div class="allArg">
                  <div class="left">
                      <div v-for="(item,index) in allgoodsparametersLeft" :key="index">{{item.parameterName}}：{{item.parameterValue}}</div>
                      <!--<div>产品品牌</div>-->
                      <!--<div>产品品555</div>-->
                      <!--<div>产品品牌</div>-->
                      <!--<div>产品品牌</div>-->
                  </div>
                  <div class="right">
                      <div v-for="(item,index) in allgoodsparametersRight" :key="index">{{item.parameterName}}：{{item.parameterValue}}</div>
                  </div>
              </div>
              <div class="back" @click="shadeArg=false">
                  返回
              </div>
          </div>
      </div>
      <div v-if="showSpec" class="public_shade shadeSpec" >
          <div class="cancel" @click="showSpec=false"></div>
          <div class="content">
              <div class="title1">规格</div>
              <div class="shop">
                  <div class="left"><img :src="SpecGoodsSpec" alt=""></div>
                  <div class="right">
                      <div class="top">{{SpecGoodsName}}</div>
                      <div class="bottom">
                          <div class="pri">折扣价:￥<span class="price">{{SpecGoodsPrice}}</span></div>
                          <div class="updateNumber">
                              <div v-if="SpecStock==0" class="reduce" >-</div>
                              <div v-if="SpecStock!=0"  class="reduce" @click="updateNum(-1)">-</div>
                              <input style="text-align:center" readonly maxlength="4" type="text" v-model="SpecNumber" >
                              <div v-if="SpecStock==0"  class="add" >+</div>
                              <div v-if="SpecStock!=0" class="add" @click="updateNum(1)">+</div>
                          </div>
                      </div>
                  </div>
              </div>
              <ul>
                  <li>
                      <div class="bigSpecs">
                          <div class="title">颜色</div>
                          <div class="spec">
                              <div  v-for="(item,index) in Spec.color" :key="index" :class="index==active1?'active':''" class="smallSpecs"  @click="colorCli(item,index)">{{item}}</div>
                             <!--// <div v-if="index!=active1" v-for="(item,index) in Spec.color" :key="index" class="smallSpecs" @click="colorCli(item,index)">{{item}}</div>-->
                              <!--<div class="smallSpecs">白色</div>-->
                              <!--<div class="smallSpecs">蓝色</div>-->
                          </div>
                      </div>
                  </li>
                  <li>
                      <div class="bigSpecs">
                          <div class="title">版本</div>
                          <div class="spec">
                              <div  v-for="(item,index) in Spec.spec" :key="index" :class="index==active2?'active':''" class="smallSpecs" @click="speCli(item,index)">{{item}}</div>

                              <!--<div class="smallSpecs">套餐一</div>-->
                              <!--<div class="smallSpecs">套餐二</div>-->
                          </div>
                      </div>
                  </li>
              </ul>
              <!--<div v-if="SpecStock==0" style="background-color: #b8bbbf" class="join">确定</div>-->
              <div class="join" @click="specSure()">确定</div>
          </div>
      </div>

      <div v-if="showKefu" class="public_shade kefu">
          <div class="content public_center">
              <div class="top">联系电话</div>
              <div class="phone">{{$kefu}}</div>
              <div class="bottom">
                  <div class="left" @click="showKefu=false">取消</div>
                  <div class="public_line"></div>
                  <div class="right"><a style="color: #000;" :href="'tel:'+$kefu1" class="call">呼叫</a></div>
              </div>
          </div>
      </div>

      <div class="public_shade noMoRen" v-if="showNoMoren">
          <div class="content public_center">
              <div class="top">请先选择地址</div>
              <div class="bottom">
                  <div class="bottom_left" @click="showNoMoren=false">取消</div>
                  <div @click="goSelAddress()">去选择</div>
              </div>
          </div>
      </div>

      <div class="footer">
          <div class="left">
              <div class="kefu" @click="showKefu=true">
                  <img src="../../../static/images/cf_kefu.png" alt="">
              </div>
              <div class="cart" @click="$jumpRouter('/shopCart?goodsList=')">
                  <div v-if="shopCart!=0" class="number">{{shopCart}}</div>
              </div>
          </div>
          <div class="right">
              <div class="join" @click="join()">加入购物车</div>
              <div v-if="state==2" class="pay"  @click="goPay()">立即购买</div>
              <div v-if="state!=2" class="pay"  @click="goPay()">立即购买</div>
          </div>
      </div>


  </div>
</template>

<script>
export default {
  data () {
      return {
          showNoMoren:false,
          shadeArg:false,//参数的遮罩
          showSpec:false,//规格遮罩层的显示
          showKefu:false,//客服的遮罩
          goodsId:'',
          number:1,//购买数量
          price:0,//单价
          sku:0,//唯一Id
          color:'',// 颜色
          spec:'',//套餐
          swiper:[],//轮播图
          haveChoose:'',//已经选择的
          goodsparameters:[],//商品参数
          goodsparametersLeft:[],//商品参数  左
          goodsparametersRight:[],//商品参数  右
          allgoodsparametersLeft:[],//
          allgoodsparametersRight:[],//
          aftersale:[],//售后
          goodsDetail:{},//商品详情
          goodsPri:{},//金额 id 之类的
          Spec:{},//规格弹框的部分
          SpecGoodsSpec:'',//弹窗图片
          SpecGoodsName:'',//弹窗 title
          SpecGoodsPrice:0,//弹窗 价格
          SpecSkuId:'',//弹窗 sku
          SpecStock:'',//弹窗 库存
          SpecNumber:1,//弹窗 数量
          SpecColor:'',// 弹窗颜色
          SpecSpec:'',//弹窗套餐
          active1:0,
          active2:0,
          shopCart:0,//购物车数量
          state:0,//0   1   2选完地址
          skuId:0,//轮播图的
          errMsg:'',
          goodsPoint:'',//商品详情  的富文本
      }
  },
  mounted:function () {
      this.$Indicator.close();
      this.goodsId=sessionStorage.getItem('goodsId');
      //this.goodsId='d812a5d5-5d13-4b9c-b28c-fb1f1e800beb';
      if(this.$route.query.state){
          this.state=this.$route.query.state;
      }
      if(this.$route.query.sku){
          this.skuId=this.$route.query.sku;
      }
      this.getData();
  },
    watch:{
        SpecStock:function () {
            if(this.SpecStock!=0){
                //this.SpecNumber=1;
            }
            if(this.SpecStock<this.SpecNumber){
                this.SpecNumber=this.SpecStock;
            }
        }
    },
  computed:{

  },
  methods: {
      goback:function () {
          this.$jumpRouter(sessionStorage.getItem('beforeGoodsDetail'));
      },
      searchNum:function () {
        var that=this;
        this.$cfAjax('post', 'shoppingTro/getShoppingGoods', 'token',localStorage.getItem('token'),function (res) {
            if(res.data.data<=99){
                that.shopCart=res.data.data;
            }else{
                that.shopCart='99+';
            }
        });

    },//查询购物车数量
      getData:function () {
          var that=this;
          if(this.skuId==0){
              this.$cfAjax('post', 'goodsInfo/getGoodsInfo', 'goodsinformationId', this.goodsId,function (res) {
                  if(res.data.code==1){
                      that.swiper=res.data.data.goodspiclist;
                      that.haveChoose+=res.data.data.specsku[0].goodsColor+','+res.data.data.specsku[0].goodsType+','+'1件';
                      that.color=res.data.data.specsku[0].goodsColor;
                      that.spec=res.data.data.specsku[0].goodsType;
                      that.number=1;
                      that.goodsparameters=res.data.data.goodsparameterlist;
                      for(var i=0;i<res.data.data.goodsparameterlist.length;i++){
                          if(i<8){
                              if(i%2==0){  //奇数
                                  var obj={};
                                  obj.parameterName=res.data.data.goodsparameterlist[i].parameterName;
                                  obj.parameterValue=res.data.data.goodsparameterlist[i].parameterValue;
                                  that.goodsparametersLeft.push(obj);
                                  that.allgoodsparametersLeft.push(obj)
                              }else{  //偶数
                                  var obj={};
                                  obj.parameterName=res.data.data.goodsparameterlist[i].parameterName;
                                  obj.parameterValue=res.data.data.goodsparameterlist[i].parameterValue;
                                  that.goodsparametersRight.push(obj);
                                  that.allgoodsparametersRight.push(obj)
                              }
                          }else{
                              if(i%2==0){  //奇数
                                  var obj={};
                                  obj.parameterName=res.data.data.goodsparameterlist[i].parameterName;
                                  obj.parameterValue=res.data.data.goodsparameterlist[i].parameterValue;
                                  that.allgoodsparametersLeft.push(obj)
                              }else{  //偶数
                                  var obj={};
                                  obj.parameterName=res.data.data.goodsparameterlist[i].parameterName;
                                  obj.parameterValue=res.data.data.goodsparameterlist[i].parameterValue;
                                  that.allgoodsparametersRight.push(obj)
                              }
                          }
                      }
                      that.aftersale=res.data.data.aftersalelist;
                      that.goodsDetail=res.data.data.oneGood;
                      that.goodsPoint=res.data.data.oneGood.goodsPoint;//获取详情
                      that.goodsPoint=that.goodsPoint.replace(/src=\"/g,'src=\"'+that.$baseurl1);
                      that.goodsPoint=that.goodsPoint.replace(/img/g,'img style=\"float: left;width:7rem;\"');//去除图片间隙video
                      that.goodsPoint=that.goodsPoint.replace(/<video/g,'<video style=\"width:7rem;\"');
                      //document.getElementById('richText').appendChild(that.$strToNode(that.goodsPoint));
                      that.jq('#richText').html(that.goodsPoint);//扔到页面
                      that.price=res.data.data.specsku[0].sellingPrice;//商场售价
                      that.sku=res.data.data.specsku[0].skuId;//商品唯一标示
                      that.searchNum();
                  }else{
                      that.errMsg=res.data.msg;
                      that.$Toast({
                          message:res.data.msg,
                          position: 'bottom'
                      });
                  }
              });
          }else{
              this.$cfAjax('post', 'goodsInfo/getOneGoodsBySku', 'sku', this.skuId,function (res) {
                  if(res.data.code==1){
                      that.swiper=res.data.data.goodspiclist;
                      that.haveChoose+=res.data.data.specsku[0].goodsColor+','+res.data.data.specsku[0].goodsType+','+'1件';
                      that.color=res.data.data.specsku[0].goodsColor;
                      that.spec=res.data.data.specsku[0].goodsType;
                      that.number=1;
                      that.goodsparameters=res.data.data.goodsparameterlist;
                      for(var i=0;i<res.data.data.goodsparameterlist.length;i++){
                          if(i<8){
                              if(i%2==0){  //奇数
                                  var obj={};
                                  obj.parameterName=res.data.data.goodsparameterlist[i].parameterName;
                                  obj.parameterValue=res.data.data.goodsparameterlist[i].parameterValue;
                                  that.goodsparametersLeft.push(obj);
                                  that.allgoodsparametersLeft.push(obj)
                              }else{  //偶数
                                  var obj={};
                                  obj.parameterName=res.data.data.goodsparameterlist[i].parameterName;
                                  obj.parameterValue=res.data.data.goodsparameterlist[i].parameterValue;
                                  that.goodsparametersRight.push(obj);
                                  that.allgoodsparametersRight.push(obj)
                              }
                          }else{
                              if(i%2==0){  //奇数
                                  var obj={};
                                  obj.parameterName=res.data.data.goodsparameterlist[i].parameterName;
                                  obj.parameterValue=res.data.data.goodsparameterlist[i].parameterValue;
                                  that.allgoodsparametersLeft.push(obj)
                              }else{  //偶数
                                  var obj={};
                                  obj.parameterName=res.data.data.goodsparameterlist[i].parameterName;
                                  obj.parameterValue=res.data.data.goodsparameterlist[i].parameterValue;
                                  that.allgoodsparametersRight.push(obj)
                              }
                          }
                      }
                      that.aftersale=res.data.data.aftersalelist;
                      that.goodsDetail=res.data.data.oneGood;
                      that.price=res.data.data.specsku[0].sellingPrice;//商场售价
                      that.sku=res.data.data.specsku[0].skuId;//商品唯一标示
                      that.goodsId=res.data.data.oneGood.goodsinformationId;
                      sessionStorage.setItem('goodsId',that.goodsId);
                      that.searchNum();
                  }
              });
          }

      },//获取商品详情
      showGoodsSpec:function () {
         // debugger;
          var that=this;
          this.$cfAjax('post', 'goodsInfo/getGoodsSpec', 'goodsId', this.goodsId, function (res) {
              if(res.data.code==1){
                  that.Spec=res.data.data;
                  that.SpecGoodsSpec=that.Spec.goodsSpec;//弹窗图片
                  that.SpecGoodsName=that.Spec.goodsName;//弹窗 title
                  that.SpecGoodsPrice=that.Spec.goodsPrice;//弹窗 价格
                  that.colorCli(that.color,0);
                  that.speCli(that.spec,0);
                  that.showSpec=true;
              }
          });
      },//展示规格
      colorCli:function (color,active1) {
          var that=this;
          this.SpecColor=color;
          this.active1=active1;
          if(this.SpecSpec!=''){
              this.$cfAjax('post', 'goodsInfo/getGoodsInfoBySpec', 'goodsId', this.goodsId, 'goodsColor', this.SpecColor,'goodsType', this.SpecSpec,function (res) {

                  if(res.data.code==1){
                      that.SpecSkuId=res.data.data.skuId;
                      that.SpecStock=res.data.data.stock;
                      that.SpecGoodsSpec=res.data.data.goodspicSpec;//弹窗图片
                      that.SpecGoodsName=res.data.data.goodsName;//弹窗 title
                      that.SpecGoodsPrice=res.data.data.sellingPrice;//弹窗 价格
                  }else if(res.data.code==2){
                      that.SpecStock=0;
                  }
              });
          }
      },//选择colorCli
      speCli:function (spec,active2) {
          var that=this;
          this.SpecSpec=spec;
          this.active2=active2;
          if(this.SpecColor!=''){
              this.$cfAjax('post', 'goodsInfo/getGoodsInfoBySpec', 'goodsId', this.goodsId, 'goodsColor', this.SpecColor,'goodsType', this.SpecSpec,function (res) {

                  if(res.data.code==1){
                      that.SpecSkuId=res.data.data.skuId;
                      that.SpecStock=res.data.data.stock;
                      that.SpecGoodsSpec=res.data.data.goodspicSpec;//弹窗图片
                      that.SpecGoodsName=res.data.data.goodsName;//弹窗 title
                      that.SpecGoodsPrice=res.data.data.sellingPrice;//弹窗 价格
                  }else if(res.data.code==2){
                      that.SpecStock=0;
                  }
              });
          }
      },//选择speCli
      specSure:function(){
          if(this.errMsg!=''){
              this.$Toast({
                  message:this.errMsg,
                  position: 'bottom'
              });
              return;
          }
          this.showSpec=false;
          var that=this;
          that.number=that.SpecNumber;
          that.price=that.SpecGoodsPrice;
          that.sku=that.SpecSkuId;
          that.color=that.SpecColor;
          that.spec=that.SpecSpec;
      },
      updateNum:function(number) {
          number = parseInt(number);
          this.SpecNumber = parseInt(this.SpecNumber);
          this.SpecStock = parseInt(this.SpecStock);
          if (!this.SpecNumber) {
              this.$Toast({
                  message: '输入数量格式不正确',
                  position: 'bottom'
              });
              this.SpecNumber = 1;
          }else if(this.SpecStock==0){
              this.SpecNumber = 0;
          } else if (this.SpecNumber + number < 1) {
              this.SpecNumber = 1;
          } else if (this.SpecStock < this.SpecNumber + number) {
              this.SpecNumber = this.SpecStock;
          } else {
              this.SpecNumber =this.SpecNumber+ number;
          }
      },//加减
      join:function () {
          if (localStorage.getItem('token')==''){
              this.$jumpRouter('/login');
              return;
          }
          if(this.errMsg!=''){
              this.$Toast({
                  message:this.errMsg,
                  position: 'bottom'
              });
              return;
          }
          var that=this;
          this.$cfAjax('post', 'shoppingTro/addShopping','type',1, 'token',localStorage.getItem('token'),'goodsInfo', this.goodsId, 'skuId', this.sku,'yet', this.number,function (res) {

              if(res.data.code==1){
                  that.$Toast({
                      message: '加入购物车成功',
                      position: 'bottom'
                  });
                  that.searchNum();
              }else{
                  taht.$Toast({
                      message:res.data.msg,
                      position: 'bottom'
                  });
              }
          });

      },//加入购物车
      goPay:function () {
          if (localStorage.getItem('token')==''){
              this.$jumpRouter('/login');
              return;
          }
          var that=this;
          if(that.errMsg!=''){
              that.$Toast({
                  message:that.errMsg,
                  position: 'bottom'
              });
              return;
          }
          if(localStorage.getItem("ispass")!='B'){
              that.$Toast({
                  message:"您当前未通过审核,暂时不能购物",
                  position: 'bottom'
              });
              return;
          }
          this.showNoMoren=true;


//          var all="";
//          var allGoodsIdSkuIdCount="";
//          allGoodsIdSkuIdCount=sessionStorage.getItem('goodsId')+'!'+this.sku+'!'+this.number;
//          console.log(allGoodsIdSkuIdCount)
//          this.$cfAjax('post', 'orderInfo/subOrder', 'token',localStorage.getItem('token'),'shippingaddressId', sessionStorage.getItem('addressId'), 'allGoodsIdSkuIdCount', allGoodsIdSkuIdCount,function (res) {
//              console.log(res);
//              if(res.data.code==1){
//                  that.$Toast({
//                      message:res.data.msg,
//                      position: 'bottom'
//                  });
//                  sessionStorage.setItem('orderId',res.data.data.orderId);
//                  that.$jumpRouter('/finalOrder')
//              }else{
//                  that.$Toast({
//                      message:res.data.msg,
//                      position: 'bottom'
//                  });
//              }
//          });



      },//提交订单
      goSelAddress:function () {
          var allGoodsIdSkuIdCount="";
          allGoodsIdSkuIdCount=sessionStorage.getItem('goodsId')+'!'+this.sku+'!'+this.number;
          this.$jumpRouter('/address?state=3&allGoodsIdSkuIdCount='+allGoodsIdSkuIdCount);
      }
  }
 }
</script>

<style lang="scss" scoped>
    .goodsDetail{
        width: 100%;
        height: 100%;
        overflow: hidden;
        max-width: 7.5rem;
        .all{
            height: 100%;
            padding-bottom: 1rem;
            overflow-y: scroll;
            max-width: 7.5rem;
            .back{
                z-index: 22;
                position: absolute;
                left: 0.4rem;
                top:0.4rem;
                width: 0.21rem;
                //height: 0.21rem;
                img{
                    width: 70%;
                  //  height: 100%;
                }
            }
            .detailImg{
                margin: auto;
                width: 7.5rem;
                height: 7.5rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .goodsContent{
                margin: auto;
                max-width: 7.5rem;
                padding: 0.3rem 0.3rem 0.2rem 0.3rem;
                .goodsTitle{
                    font-size: 0.3rem;
                }
                .goodsPrice{
                    margin-top: 0.37rem;
                    font-size: 0.3rem;
                    color: #9D792A;
                    .price{
                        font-size: 0.48rem;
                    }
                    .yuan{
                        color: #666666;
                    }
                }
                .selected{
                    margin-top: 0.5rem;
                    font-size: 0.24rem;
                    color: #989898;
                    display: flex;
                    justify-content: space-between;
                    .imgs{
                       height: 0.24rem;
                        img{
                            height: 100%;
                        }
                    }
                    .property{
                        font-size: 0.25rem;
                        color: #333333;
                    }
                }
                .server{
                    margin-top: 0.28rem;
                    padding: 0.3rem 0;
                    border-top: 1px solid #989898;
                    border-bottom: 1px solid #989898;
                    font-size: 0.2rem;
                    color: #666666;
                    div{
                        display: inline-block;
                        height: 0.3rem;
                        line-height: 0.3rem;
                        img{
                            height: 0.2rem;
                            margin-right: 0.08rem;
                        }
                    }
                }
                .richTitle{
                    font-size: 0.26rem;
                    text-align: center;
                    margin:0.3rem 0;
                    display: flex;
                    justify-content: space-between;
                    .right{
                        color: #989898;
                    }
                }
                .arg{
                    font-size: 0.2rem;
                    color: #666666;
                    display: flex;
                    justify-content: space-between;
                    .left{

                    }
                    .right{

                    }
                }
                .richText{
                    width: 100%;
                }
            }

        }
        .footer{
            position: absolute;
            bottom:0;
            left:0;
            right:0;
            width: 100%;
            margin: auto;
            max-width: 7.5rem;
            height: 0.99rem;
            display: flex;
            background-color: white;
            .left{
                flex:1;
                display: flex;
                justify-content: space-around;
                padding-right: 0.2rem;
                /*padding: 0.3rem 0;*/
                div{
                    margin-top: 0.2rem;
                    margin-bottom: 0.3rem;
                    height: 0.45rem;
                    width: 0.5rem;
                    img{
                        height: 100%;
                        float: left;
                    }
                }
                .cart{
                    background: url("../../../static/images/cf_cart.png")no-repeat top center;
                    -webkit-background-size: 100px;
                    background-size:auto  100% ;
                    .number{
                        border-radius: 0.1rem;
                        width: 0.35rem;
                        height: 0.3rem;
                        line-height: 0.3rem;
                        font-size: 0.18rem;
                        color: white;
                        background-color: #FF5050;
                        text-align: center;
                        margin-top: -0.1rem;
                        margin-left: 0.35rem;
                    }
                }
            }
            .right{
                width: 4.84rem;
                font-size: 0.3rem;
                color: white;
                display: flex;
                .join{
                    text-align: center;
                    width: 50%;
                    height: 0.99rem;
                    line-height: 0.99rem;
                    background-color: #CCA653;
                }
                .pay{
                    text-align: center;
                    width: 50%;
                    height: 0.99rem;
                    line-height: 0.99rem;
                    background-color: #9D792A;
                }
            }
        }


        .noMoRen{
            font-size: 0.3rem;
            //bottom:2rem;
            .content{
                width: 4rem;
                height: 2rem;
                background-color: white;
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
                    //text-align: center;
                    display: flex;
                    div{
                        text-align: center;
                        width: 50%;
                    }
                    .bottom_left{
                        border-right: 1px solid #b8bbbf;
                    }
                }
            }
        }
        .shade{//遮罩层
            font-size: 0.26rem;
            display: flex;
            flex-direction: column;
            .cancel{
                background-color: transparent;
                width: 100%;
                flex: 1;
            }
            .Args{
                background-color: white;
                position: fixed;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                max-width: 7.5rem;
                margin: auto;
                padding: 0.4rem;
                .title{
                    color: #282828;
                    font-size: 0.36rem;
                    width: 100%;
                    text-align: center;
                    margin-bottom: 0.2rem;
                }
                .allArg{
                    color: #323232;
                    display: flex;
                    justify-content: space-between;

                    .left{
                        max-width: 48%;
                        overflow: hidden;
                        margin-right: 0.2rem;
                        div{
                            margin-top: 0.1rem;
                            white-space: nowrap;
                        }
                    }
                    .right{
                        max-width: 48%;
                        overflow: hidden;
                        margin-right: 0.2rem;
                        div{
                            margin-top: 0.1rem;
                            white-space: nowrap;
                        }
                    }
                }
                .back{
                    border-radius: 5px;
                    margin-top: 0.2rem;
                    text-align: center;
                    width: 100%;
                    height: 0.8rem;
                    line-height: 0.8rem;
                    color: #ffffff;
                    background-color: #f16530;
                }
            }

        }
        .shadeSpec{
            display: flex;
            flex-direction: column;
            .cancel{
                background-color: transparent;
                width: 100%;
                flex: 1;
            }
            .content{
                background-color: white;
                position: fixed;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                max-width: 7.5rem;
                margin: auto;
                padding: 0.4rem;
                font-size: 0.26rem;
                .title1{
                    font-size: 0.36rem;
                    color: #282828;
                    text-align: center;
                    margin-bottom: 0.2rem;
                }
                .shop{
                    background-color: white;
                    padding-top: 0.2rem;
                    height: 2rem;
                    font-size: 0.21rem;
                    color: #9d792a;
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid #eeeeee;
                    .left{
                        margin-right: 0.2rem;
                        height: 1.75rem;
                        line-height: 1.75rem;
                        width: 1.75rem;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .right{
                        flex:1;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        .top{
                            color: #000000;
                            font-size: 0.24rem;
                            width: 100%;
                        }
                        .bottom{
                            display: flex;
                            .pri{
                                flex: 1;
                                .price{
                                    font-size: 0.4rem;
                                }
                            }
                            .updateNumber{
                                font-size: 0.26rem;
                                display: flex;
                                div{
                                    width: 0.6rem;
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
                ul{
                    li{
                        .bigSpecs{
                            .title{
                                margin: 0.35rem 0;
                                font-size: 0.26rem;
                                color: #323232;
                            }
                            .spec{
                                display: flex;
                                //justify-content: space-between;
                                .smallSpecs{
                                    width: 1.5rem;
                                    height: 0.58rem;
                                    line-height: 0.58rem;
                                    text-align: center;
                                }
                                .smallSpecs.active{
                                    background-color: #C2A86D;
                                    border-radius: 4px;
                                    color: white;
                                }
                            }
                        }
                    }
                }
                .join{
                    text-align: center;
                    background-color: #F16530;
                    width: 6.5rem;
                    height: 0.88rem;
                    line-height: 0.88rem;
                    margin-top: 1.5rem;
                    border-radius: 5px;
                    color: white;
                    font-size: 0.36rem;
                }
            }
        }
        .kefu{
            .content{
                background-color: white;
                width: 5.4rem;
                height: 3.1rem;
                font-size: 0.26rem;
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
                    color: #333333;
                    font-size: 0.46rem;
                    text-align: center;
                }
                .bottom{
                    display: flex;
                    justify-content: space-between;
                    height: 1rem;
                    line-height: 1rem;
                    border-top: 1px solid #e6e6e6;
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
        .lunbo{
            width: 100%;
            max-width: 7.5rem;
            height: 7.5rem;
            margin: auto;
            img{
                width: 100%;
                display: block;
            }
        }
    }

</style>
