<template>
  <div class="revise">
      <div v-if="ispass==0" class="public_header">
          <router-link to="/setting"><img src="../../../static/images/cf_back.png" alt=""></router-link>
          修改企业信息
      </div>
      <div v-if="ispass==1" class="public_header">
          <router-link to="/setting"><img src="../../../static/images/cf_back.png" alt=""></router-link>
          查看企业信息
      </div>
      <div class="payPwd-list">
          <div class="item">
              <div class="item-left">企业名称：</div>
              <div class="item-right">
                  <input type="text" v-model="companyName"  placeholder="请输入企业名称">
              </div>
          </div>
          <div class="item">
              <div class="item-left">法人名称：</div>
              <div class="item-right">
                  <input type="text" v-model="name"  placeholder="法人名称">
              </div>
          </div>
          <div class="item">
              <div class="item-left">身份号码：</div>
              <div class="item-right">
                  <input type="text" maxlength="18" v-model="idCard"  placeholder="请输入身份号码">
              </div>
          </div>
          <div class="item">
              <div class="item-left">企业地址：</div>
              <div class="area item-right">
                  <select v-model="provId" @change="getCity()">
                      <option v-for="item in provList" :value ="item.provinceId">{{item.name}}</option>
                  </select>
                  <select v-model="cityId" @change="getArea()">
                      <option v-for="item in cityList" :value =item.cityId>{{item.name}}</option>
                  </select>
                  <select v-model="areaId" >
                      <option v-for="item in areaList" :value =item.areaId>{{item.name}}</option>
                  </select>
              </div>
          </div>
          <div class="item">
              <div class="item-left">详细地址：</div>
              <div class="item-right">
                  <input type="text" v-model="detailAddress" placeholder="请输入详细地址">
              </div>
          </div>
      </div>
      <div class="credentials">
          <p><img src="../../../static/images/yh-xiazai.png" alt="">&nbsp;&nbsp;&nbsp;上传相关证件照</p>
          <div class="idcard">
              <div class="card">
                  <div class="to_file">
                      <i>营业执照</i>
                      <img v-if="loading1==false" :src="tradingUrl" alt="">
                      <img v-if="loading1"  src="../../../static/images/loading.gif" alt="">
                      <input v-if="(loading1 || loading2 || loading3)==false" type="file" @click="fileNumber=0"  @change="loadFile" accept="image/gif,image/jpeg,image/jpg,image/png" >
                      <input class="waiting" v-if="loading1 || loading2 || loading3" type="text" @click="waiting()"  accept="image/gif,image/jpeg,image/jpg,image/png" >
                  </div>
              </div>
              <div class="card">
                  <div class="to_file">
                      <i>身份证正面</i>
                      <img v-if="loading2==false" :src="cardFront" alt="">
                      <img v-if="loading2"  src="../../../static/images/loading.gif" alt="">
                      <input v-if="(loading1 || loading2 || loading3)==false" type="file"  @click="fileNumber=1"  @change="loadFile" accept="image/gif,image/jpeg,image/jpg,image/png" >
                      <input class="waiting" v-if="loading1 || loading2 || loading3" type="text" @click="waiting()"  accept="image/gif,image/jpeg,image/jpg,image/png" >
                  </div>
              </div>
              <div class="card">

                  <div class="to_file">
                      <i>身份证反面</i>
                      <img v-if="loading3==false":src="cardBack" alt="">
                      <img v-if="loading3"  src="../../../static/images/loading.gif" alt="">
                      <input v-if="(loading1 || loading2 || loading3)==false" type="file" @click="fileNumber=2"  @change="loadFile" accept="image/gif,image/jpeg,image/jpg,image/png" >
                      <input class="waiting" v-if="loading1 || loading2 || loading3" type="text" @click="waiting()"  accept="image/gif,image/jpeg,image/jpg,image/png" >
                  </div>
              </div>

              <!--<div>身份证正面<br/>照片</div>-->
              <!--<div>身份证反面<br/>照片</div>-->
          </div>
      </div>
      <div v-if="state==1" style="margin: 0.2rem 0.6rem; color: #ef4f4f">{{rejectreason}}</div>
      <div v-if="state==1 || ispass==0" class="confirm-button">
          <button v-if="issubmit==false" class="noSubmit">提交审核</button>
          <button v-if="issubmit==true" class="submit" @click="submit()">提交审核</button>
      </div>
      <div v-if="ispass==1" class="public_shade" style="top:1.8rem;background-color: rgba(0,0,0,0)"></div>
  </div>
</template>

<script>
export default {
  data () {
      return {
          state:0,//0 修改  1驳回
          provList:[],
          cityList:[],
          areaList:[],
          prov:'',
          city:'',
          area:'',
          provId:'',
          cityId:'',
          areaId:'',
          edit:1,//判断是否首次加载 1首次   0不是首次
          detailAddress:'',//详细地址
          address:'',//整个地址
          addressId:'',//地址id
          companyName:'',//企业名称
          name:'',//姓名
          idCard:'',//身份证号

          img: '',
          imgurl:'',
          issubmit:false,//是否可以提交
          loading1:false,//加载中1
          loading2:false,//加载中2
          loading3:false,//加载中3
          fileNumber:0,//判断第几个 上传框
          tradingUrl:'',
          cardFront:'',
          cardBack:'',
          rejectreason:'',
          ispass:0,//是否通过 1通过  0未通过
      }
  },
  mounted:function () {
      this.$Indicator.close();
      this.state=this.$route.query.state;
      this.getData();
      if(localStorage.getItem("ispass")=='B'){
          this.ispass=1;
      }else {
          this.ispass=0;
      }
  },
  computed:{
  },
  watch:{
        companyName:function () {
            this.companyName=this.companyName.replace(/[\(\)\!\;\'\"\-\+\`\~\_\/\.@#\$%\^&\*]+/g,'');
            if(this.companyName != '' && this.name != '' && this.idCard != '' && this.detailAddress != ''){
                this.issubmit=true;
            }else{
                this.issubmit=false;
            }
        },
        name:function () {
            this.name=this.name.replace(/[^\u4e00-\u9fa5]+$/g,'');
            if(this.companyName != '' && this.name != '' && this.idCard != '' && this.detailAddress != ''){
                this.issubmit=true;
            }else{
                this.issubmit=false;
            }
        },
        idCard:function () {
            this.idCard=this.idCard.replace(/[^0-9,x,X]+/g,'');
            if(this.companyName != '' && this.name != '' && this.idCard != '' && this.detailAddress != ''){
                this.issubmit=true;
            }else{
                this.issubmit=false;
            }
        },
        detailAddress:function () {
            this.detailAddress=this.detailAddress.replace(/[\(\)\!\;\'\"\-\+\`\~\_\/\.@#\$%\^&\*]+/g,'');
            if(this.companyName != '' && this.name != '' && this.idCard != '' && this.detailAddress != ''){
                this.issubmit=true;
            }else{
                this.issubmit=false;
            }
        },
        tradingUrl:function () {
            if(this.cardBack && this.cardFront && this.tradingUrl){
                this.issubmit=true;
            }else{
                this.issubmit=false;
            }
        },
        cardFront:function () {
            if(this.cardBack && this.cardFront && this.tradingUrl){
                this.issubmit=true;
            }else{
                this.issubmit=false;
            }
        },
        cardBack:function () {
            if(this.cardBack && this.cardFront && this.tradingUrl){
                this.issubmit=true;
            }else{
                this.issubmit=false;
            }
        },
    },
  methods: {
      jumpRouter:function (routerPath) {
          this.$router.push(routerPath);
      },
      getData:function () {
          var that=this;
          this.$cfAjax('post', 'userInfo/getUserInfo', 'token',localStorage.getItem('token'),function (res) {

              if(res.data.code==1){
                  that.name=res.data.data.legalperson;
                  that.provId=res.data.data.provinceId;
                  that.cityId=res.data.data.cityId;
                  that.areaId=res.data.data.areaId;
                  that.detailAddress=res.data.data.detailedAddress;
                  that.companyName=res.data.data.firmname;
                  that.idCard=res.data.data.idcard;
                  that.cardFront=res.data.data.frontPhoto;
                  that.cardBack=res.data.data.backPhoto;
                  that.tradingUrl=res.data.data.businessLicense;
                  if(that.state==1){
                      that.rejectreason=res.data.data.rejectreason;
                  }
                  that.getPro();
              }
          });
      },
      loadFile(e) {
          let file = e.target.files[0] || e.dataTransfer.files[0];
          var reader = new FileReader();
          // 提交数据到后台
          var oMyForm = new FormData();
          oMyForm.append("file", file);
          //oMyForm.append("userId", sessionStorage["id"]);

          //loading的是否显示
          if(this.fileNumber==0){
              this.loading1=true;
          }else if(this.fileNumber==1){
              this.loading2=true;
          }else if(this.fileNumber==2){
              this.loading3=true;
          }
          this.$ajax.post(this.$baseimgurl + "uplodImg/uploadImgByEditor.htm",oMyForm)
              .then((response) => {
                  if(response.data.error==0){

                      if(this.fileNumber==0){
                          this.tradingUrl=response.data.url;
                          this.loading1=false;
                      }else if(this.fileNumber==1){
                          this.cardFront=response.data.url;
                          this.loading2=false;
                      }else if(this.fileNumber==2){
                          this.cardBack=response.data.url;
                          this.loading3=false;
                      }
                  }
              });
          // 加载图片  回显
          reader.onload = (e) => {
              //this.tradingUrl = e.target.result;
          };
          reader.readAsDataURL(file);
      },
      waiting:function () {
          this.$Toast({
              message: '有文件正在上传,请稍等...',
              position: 'bottom'
          });
          return;
      },
      getPro:function () {
          var that=this;
          this.$cfAjax('post', 'userInfo/getAddressProvince',function (res) {

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
      getCity:function () {
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
                  that.getArea();
              }

          });
      },
      getArea:function () {
          var that=this;
          this.$cfAjax('post', 'userInfo/getAddressArea','cityId',this.cityId,function (res) {

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
      submit:function () {
          var that=this;
          if(this.companyName == ''){
              this.$Toast({
                  message: '企业名称不能为空',
                  position: 'bottom'
              });
              return;
          }
          if(this.name == ''){
              this.$Toast({
                  message: '法人姓名不能为空',
                  position: 'bottom'
              });
              return;
          }
          if(this.idNumber == ''){
              this.$Toast({
                  message: '身份证号码不能为空',
                  position: 'bottom'
              });
              return;
          }
          if(this.detailAddress == ''){
              this.$Toast({
                  message: '详细地址不能为空',
                  position: 'bottom'
              });
              return;
          }
          var deta=/^[0-9]*$/;
          if(deta.test(this.detailAddress)){
              this.$Toast({
                  message: '详细地址不能为纯数字',
                  position: 'bottom'
              });
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
          this.$cfAjax('post', 'userRegister/addUserRegistration','token',localStorage.getItem('token'), 'legalperson', this.name, 'firmname', this.companyName, 'idcard', this.idCard, 'detailedAddress', this.detailAddress,'businessAddress',this.address,'provinceId',this.provId,'cityId',this.cityId,'areaId',this.areaId,'frontPhoto', this.cardFront, 'backPhoto', this.cardBack, 'businesslicense', this.tradingUrl,function (res) {
              if(res.data.code==1){
                  that.$Toast({
                      message:'提交信息成功',
                      position: 'bottom'
                  });
                  if(that.state==0){

                     // that.$jumpRouter('/setting');
                  }
                  that.$goBack();
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
    .revise{
        font-size: 0.26rem;
        width:7.5rem;
        margin-top:0.88rem;
        background:#fff;
        padding-bottom: 0.5rem;
        .payPwd-list{
            font-size: 0.26rem;
            width:6.26rem;
            margin:auto;
            display:flex;
            flex-direction:column;
            //padding-top:0.44rem;
            margin-top:1rem;
            .item{
                margin: 0.1rem 0;
                width:100%;
                display:flex;
                justify-content:space-between;
                .item-left{
                    font-size:0.24rem;
                    width:1.5rem;
                    height:0.8rem;
                    line-height:0.8rem;
                }
                .item-right{
                    background-color: white;
                    flex: 1;
                    border-radius:0.06rem;
                    border: 1px solid rgba(0,0,0,.2);
                    input{
                        margin:0;
                        padding:0;
                        //width:5rem;
                        height:0.79rem;
                        //border-radius:0.06rem;
                        border: none;
                        font-size:0.24rem;
                        padding-left:0.14rem;

                    }
                }

            }

        }
        .credentials{
            width: 6.26rem;
            margin: auto;
            p{
                font-size:0.28rem;
                color:rgba(199,167,97,1);
                margin-top:0.1rem;
                img{
                    width:0.27rem;
                    height:0.26rem;
                }
            }
            .idcard{
                width:100%;
                width:5.82rem;
                margin:auto;
                display:flex;
                justify-content:space-between;
                margin-top:0.29rem;
                div{
                    width:1.8rem;
                    height:1.72rem;
                    // line-height:1.72rem;
                    background:#DBDBDB;
                    text-align:center;
                    font-size:0.24rem;
                    color:rgba(140,140,140,1);
                   // padding-top:0.56rem;
                }
                div:first-child{
                   // padding-top:0.78rem;
                }
            }
            .idcard-desc{
                color:rgba(243,4,15,1);
                font-size:0.2rem;
                padding:0.1rem 0 0.37rem 0.2rem;
                // padding-left:0.2rem;
            }
        }
        .credentials{
            width: 6.26rem;
            margin: auto;
            padding-top:0.46rem;
            p{
                font-size:0.28rem;
                color:rgba(199,167,97,1);
                margin-top:0.1rem;
                margin-left: -0.25rem;
                img{
                    width:0.27rem;
                    height:0.26rem;
                    vertical-align: middle;
                }
            }
            .idcard{
                width:100%;
                max-width: 7.5rem;
                margin:auto;
                margin-top: 0.3rem;
                display:flex;
                justify-content:space-between;
                .card{
                    width: 1.8rem;
                    height: 1.8rem;
                    .to_file{
                        width: 100%;
                        height: 100%;
                        margin: 0 auto;
                        //margin-top: 1.25rem;
                        line-height: 0.9rem;
                        text-align: center;
                        font-size: 0.3rem;
                        color: white;
                        background: #DBDBDB;
                        // border-radius: 25px;
                        // -webkit-border-radius: 25px;
                        // -moz-border-radius: 25px;
                        position: relative;
                        img{
                            position: relative;
                            float: left;
                            //display: block;
                            width: 100%;
                            height: 100%;
                            margin: 0 auto;
                            //z-index: 19;
                            //border-radius: 50%;
                            // -moz-border-radius: 50%;
                            // -webkit-border-radius: 50%;
                        }
                        input{
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            top: 0;
                            right: 0;
                            bottom: 0;
                            left: 0;
                            opacity: 0;
                            //background-color: transparent;
                            // z-index: 20;
                        }
                        .waiting{
                            z-index: 10;
                        }
                        i{
                            position: absolute;
                            top: 0;
                            right: 0;
                            bottom: 0;
                            left: 0;
                            text-align: center;
                            line-height: 1.8rem;
                            //z-index: 9;
                            color: #8C8C8C;
                        }
                    }
                }
            }
        }
        .confirm-button{
            width:6.5rem;
            height:0.7rem;
            margin:0.47rem auto;
            // position:absolute;
            // bottom:0.14rem;
            // left:0.5rem;
            .submit{
                width:100%;
                height:100%;
                text-align:center;
                background:rgba(199,167,97,1);
                border-radius: 0.1rem;
                color:#fff;
            }
            .noSubmit{
                width:100%;
                height:100%;
                text-align:center;
                background: rgb(181, 181, 181);
                border-radius: 0.1rem;
                color:#fff;
            }
        }
        .area{
            //border-bottom: 1px solid #eeeeee;
            height: 0.8rem;
            font-size: 0.26rem;
            border-radius:0.06rem;
            display: flex;
            justify-content: space-around;
            // background-color: transparent;
            select{
                background-color: transparent;
                //width: 1.4rem;
                height: 0.8rem;
                line-height: 0.8rem;
                margin-left: 0.03rem;
                padding: 0 4%;
            }
        }
    }
</style>
