<template>
  <div class="addAddress">
      <div class="public_header">
          <a @click="$goBack()">
              <img src="../../../static/images/cf_back.png" alt="">
          </a>
          <span v-if="add==0">编辑地址</span>
          <span v-if="add==1">添加地址</span>
          <span style="position: absolute;right: 0.3rem;" @click="saveAddress()">保存</span>
      </div>
      <div class="Address-list">
        <div class="add-content">
            <div class="list-left">
                <div class="list-left-title">收货人：</div>
                <div class="list-left-content">
                    <input type="text" v-model="name">
                </div>
            </div>
            <div class="list-left">
                <div class="list-left-title">联系电话：</div>
                <div class="list-left-content">
                    <input type="text" v-model="phone" maxlength="11">
                </div>
            </div>
            <!--<div class="list-left"><span>所在地区：</span><input type="text" id="userarea"><img  @click="shadeslots=true" src="../../../static/images/yh-arrow.png" alt="" style="width:0.14rem;height:0.28rem;margin-top:0.295rem;"></div>-->
            <div class="area">
               <label for="">所在地区：</label>
                <select v-model="provId" @change="getCity()">
                    <!--<option value ="0">&#45;&#45; 省 &#45;&#45;</option>-->
                    <option v-for="item in provList" :value ="item.provinceId">{{item.name}}</option>
                </select>
                <select v-model="cityId" @change="getArea()">
                    <!--<option value ="0">&#45;&#45; 市 &#45;&#45;</option>-->
                    <option v-for="item in cityList" :value =item.cityId>{{item.name}}</option>
                </select>
                <select v-model="areaId" >
                    <!--<option value ="0" >&#45;&#45; 县 &#45;&#45;</option>-->
                    <option v-for="item in areaList" :value =item.areaId>{{item.name}}</option>
                </select>
            </div>
            <div class="list-left">
                <div class="list-left-title">详细地址：</div>
                <div class="list-left-content">
                    <input type="text" v-model="detailAddress">
                </div>
            </div>
        </div>
      </div>
      <div class="shade public_shade" v-if="shadeArg">
       <div class="shade-box">
            <p>中联电器</p>
            <p>请将信息填写完整哦</p>
            <button @click="shadeArg=false">好</button>
       </div>
      </div>
      <!--<div class="public_shade addressShade" v-if="shadeslots">-->
          <!--<div class="addressShadeContent">-->
              <!--<div class="addressShadeTop">-->
                  <!--<div class="cancer" @click="shadeslots=false">取消</div>-->
                  <!--<div class="sure">确定</div>-->
              <!--</div>-->
              <!--<mt-picker  :slots="slots" @change="onValuesChange" :valueKey="'name'"></mt-picker>-->
          <!--</div>-->

      <!--</div>-->
  </div>
</template>

<script>
export default {
  data () {
      return {
          state:0,//0管理地址    1 购物时
          add:0,//0 编辑    1添加
          shadeArg:false,//添加地址的遮罩
          shadeslots:false,//地址 选择框的
          slots: [
            {
              flex: 1,
              values:[],
              className: 'slot1',
              textAlign: 'center',

            }, {
              flex: 1,
              values: [],

              className: 'slot2',
              textAlign: 'center'
            }, {
              flex: 1,
              values: [],
              className: 'slot3',
              textAlign: 'left',

            }
          ],//暂时不用
          provList:[],
          cityList:[],
          areaList:[],
          prov:'',
          city:'',
          area:'',
          provId:'',
          cityId:'',
          areaId:'',
          addresspca:'',//省市区
          detailAddress:'',//详细地址
          address:'',//整个地址
          addressId:'',//地址id
          phone:'',
          name:'',
          edit:0,//编辑判断首次加载
      }
  },
  mounted:function () {

      this.state=this.$route.query.state;
      this.add=this.$route.query.add;
      if(this.add==0){
          this.edit=1;
          this.provId=this.$route.query.provinceId;
          this.cityId=this.$route.query.cityId;
          this.areaId=this.$route.query.areaId;
          //this.shippingAddress=this.$route.query.shippingAddress;//整个地址
          this.phone=this.$route.query.phone;
          this.name=this.$route.query.name;
          this.addressId=this.$route.query.shippingaddressId;//地址ID
          this.detailAddress=this.$route.query.detailAddress;//详细地址

      }else{
          this.edit=0;
      }
      this.getPro();
  },
  watch:{
    phone:function () {
        this.phone=this.phone.replace(/\D/g,'');
    }
  },
  computed:{

  },
  methods: {
      jumpRouter:function (routerPath) {
          this.$router.push(routerPath);
      },
      onValuesChange:function(picker, values) {
          if(this.provId!=values[0].provinceId){
              this.provId=values[0].provinceId;
              this.prov=values[0].name;
              this.getCity(1);
          }else if(this.cityId!=values[1].cityId){
              this.cityId=values[1].cityId;
              this.city=values[1].name;
              this.getArea(1);
          }else{
              this.areaId=values[2].areaId;
              this.area=values[2].areaName;
          }

      },
      getPro:function () {
        var that=this;
          this.$cfAjax('post', 'userInfo/getAddressProvince',function (res) {
             // console.log(res);
              if(res.data.code==1){
                  that.provList=res.data.data;
                  if(that.edit==0){
                      that.provId=that.provList[0].provinceId;
                      that.prov=that.provList[0].name;
                  }else{
                      for(var i=0;i<that.provList.length;i++){
                          if(that.provList[i].provinceId==that.provId){
                              that.prov=that.provList[i].name;
                          }
                      }
                  }
                  that.getCity();
              }

          });
      },
      getCity:function (isfirst) {
          var that=this;
          this.$cfAjax('post', 'userInfo/getAddressCity','provinceId',this.provId,function (res) {
              if(res.data.code==1){
                  that.cityList=res.data.data;
                  if(that.edit==0){
                      that.cityId=that.cityList[0].cityId;
                      that.city=that.cityList[0].name;
                  }else{
                      for(var i=0;i<that.cityList.length;i++){
                          if(that.cityList[i].cityId==that.cityId){
                              that.city=that.cityList[i].name;
                          }
                      }
                  }
                  that.getArea(isfirst);
              }

          });
      },
      getArea:function (isfirst) {
          var that=this;
          this.$cfAjax('post', 'userInfo/getAddressArea','cityId',this.cityId,function (res) {
              //console.log(res);
              if(res.data.code==1){
                  that.areaList=res.data.data;
                  if(that.edit==0){
                      that.areaId=that.areaList[0].areaId;
                      that.area=that.areaList[0].name;
                  }else{
                      for(var i=0;i<that.areaList.length;i++){
                          if(that.areaList[i].areaId==that.areaId){
                              that.area=that.areaList[i].name;
                          }
                      }
                      that.edit=0;
                  }
              }
          });
      },
      saveAddress:function () {
          var that=this;
          if(this.name == ''){
              this.$Toast({
                  message: '姓名不能为空',
                  position: 'bottom'
              });
             // that.shadeArg=true;
              return;
          }
          if(this.phone == ''){
              this.$Toast({
                  message: '手机号不能为空',
                  position: 'bottom'
              });
              //that.shadeArg=true;
              return;
          }
          var phone=/^1[34578]\d{9}$/;
          if(!phone.test(this.phone)){
              this.$Toast({
                  message: '手机号格式错误',
                  position: 'bottom'
              });
              //that.shadeArg=true;
              return;
          }
          if(this.detailAddress == ''){
              this.$Toast({
                  message: '详细地址不能为空',
                  position: 'bottom'
              });
              //that.shadeArg=true;
              return;
          }
          for(var i=0;i<this.provList.length;i++){
              if(this.provList[i].provinceId==this.provId){
                  this.prov=this.provList[i].name;
                  break;
              }
          }
          for(var i=0;i<this.cityList.length;i++){
              if(this.cityList[i].cityId==this.cityId){
                  this.city=this.cityList[i].name;
                  break;
              }
          }
          for(var i=0;i<this.areaList.length;i++){
              if(this.areaList[i].areaId==this.areaId){
                  this.area=this.areaList[i].name;
                  break;
              }
          }
          this.address=this.prov+this.city+this.area+this.detailAddress;
          this.addresspca=this.prov+this.city+this.area;
          if(this.add==1){//添加
              this.$cfAjax('post', 'userInfo/updateUserShippingAddress','token',localStorage.getItem('token'), 'consigneeTel', this.phone, 'consigneeName', this.name,'shippingAddress',this.address,'provinceId',this.provId,'cityId',this.cityId,'areaId',this.areaId,'addresspca',this.addresspca,'addressDetail',this.detailAddress,function (res) {
                  //console.log(res);
                  if(res.data.code==1){
                      that.$Toast({
                          message: '添加地址成功',
                          position: 'bottom'
                      });
                     // that.$jumpRouter('/address?state='+that.state);
                      that.$goBack();
                  }
              });
          }else if(this.add==0){//编辑
              this.$cfAjax('post', 'userInfo/updateUserShippingAddress','token',localStorage.getItem('token'),'addressId',this.addressId,'consigneeTel', this.phone, 'consigneeName', this.name,'shippingAddress',this.address,'provinceId',this.provId,'cityId',this.cityId,'areaId',this.areaId,'addresspca',this.addresspca,'addressDetail',this.detailAddress,function (res) {
                  //console.log(res);
                  if(res.data.code==1){
                      that.$Toast({
                          message: '修改地址成功',
                          position: 'bottom'
                      });
                     // that.$jumpRouter('/address?state='+that.state);
                      that.$goBack();
                  }
              });
          }

      }
  }
 }
</script>

<style lang="scss" scoped>
    .addAddress{
        width:100%;
        .Address-list{
            margin-top:0.89rem;
            width:100%;
            height:6.14rem;
            background-color:#fff;
            border-top:1px solid #FFFFFF;
            .add-content{
                width:7rem;
                margin:auto;
                font-size: 0.26rem;
                .area{
                    border-bottom: 1px solid #eeeeee;
                    height: 0.87rem;
                    font-size: 0.26rem;
                    margin-top: 0.2rem;
                    select{
                        width: 1.7rem;
                        height: 0.5rem;
                        line-height: 0.5rem;
                        margin-left: 0.03rem;
                        padding: 0 1%;
                        option{
                            text-align: center;
                        }
                    }
                    label{
                        // margin-right: 0.15rem;
                        //margin-left: 0.33rem;
                    }
                }
                .list-left{
                    width:100%;
                    display:flex;
                    height:0.87rem;
                    line-height: 0.87rem;
                    border-bottom:1px solid #eeeeee;
                    .list-left-title{
                        height:0.87rem;
                        line-height:0.87rem;
                        color:#282828;
                        //width:1.64rem;
                        font-size:0.26rem;
                    }
                    .list-left-content{
                        width:5.36rem;
                        input{
                            border:none;
                        }
                    }
                }
                .input-address{
                    width:100%;
                    height:3.5rem;
                    overflow:hidden;
                    position:relative;
                    input{
                        width:100%;
                        height:95%;
                        margin:0;
                        padding:0;
                        border:none;
                        font-size:0.24rem;
                        color:#808080;
                        padding-bottom:2.5rem;
                        position:absolute;
                        top:0;
                        left:0;
                        right:0;
                        bottom:0;
                        padding-left:0.2rem;
                    }
                }
            }
        }
        .shade{
            // position:absolute;
            // top:0;
            // left:0;
            // right:0;
            // bottom:0;
            // width:100%;
            // height:100%;
            // display:block;
            // background-color:rgba(0,0,0,0.2);
            // z-index:0;
            .shade-box{
                width:5.4rem;
                height:3.1rem; 
                background:rgba(255,255,255,1);
                border-radius: 0.1rem;
                position:absolute;
                top:40%;
                left:13%;
                padding:0.52rem 1.16rem 0.44rem 1.19rem;
                text-align:center;
                p{
                    color:#323232;
                }
                p:first-child{
                    margin-bottom:0.2rem;
                }
                button{
                    position:absolute;
                    bottom:0.44rem;
                    color:#323232;
                }
            }
        }
        .addressShade{
            font-size: 0.26rem;
            .addressShadeContent{
                background-color: white;
                position: absolute;
                bottom:0;
                left: 0;
                width: 100%;
                .addressShadeTop{
                    display: flex;
                    justify-content: space-between;
                    padding: 0.2rem 0.5rem;
                }
                .picker{
                   padding-bottom: 0.2rem;
                }
            }

        }
    }
    
</style>
