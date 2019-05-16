<template>
  <div class="revise">
      <div class="public_header">
          <router-link to="/register1"><img src="../../../static/images/cf_back.png" alt=""></router-link>
          注册
      </div>
      <div class="credentials">
        <p><img src="../../../static/images/yh-xiazai.png" alt="">&nbsp;&nbsp;上传相关证件照</p>
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
      <div class="confirm-button">
          <button v-if="issubmit==false" class="noSubmit">提交审核</button>
          <button v-if="issubmit==true" class="submit" @click="submit()">提交审核</button>
      </div>
  </div>
</template>

<script>
export default {
  data () {
      return {
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

      }
  },
 watch:{
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
  mounted:function () {

  },
  computed:{
  },
  methods: {
      jumpRouter:function (routerPath) {
          this.$router.push(routerPath);
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
                      //console.log(response.url)
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
      submit:function () {
          var that=this;
          this.$cfAjax('post', 'userRegister/addUserRegistration','token',sessionStorage.getItem('token'), 'frontPhoto', this.cardFront, 'backPhoto', this.cardBack, 'businesslicense', this.tradingUrl,function (res) {

              if(res.data.code==1){
                  that.$jumpRouter('/register3');
              }
          });
      },

  }
 }
</script>

<style lang="scss" scoped>
    .revise{
        width:7.5rem;
        margin-top:1rem;
        padding-bottom:0.46rem;
        background:#fff;
        .credentials{
            width: 6.26rem;
            margin: auto;
            padding-top:0.46rem;
            p{
                font-size:0.28rem;
                color:rgba(199,167,97,1);
                margin-top:0.1rem;
                margin-left: -0.3rem;
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
                //margin-top:0.29rem;
                /*.card{*/
                    /*width:1.8rem;*/
                    /*height:1.72rem;*/
                    /*// line-height:1.72rem;*/
                    /*background:#DBDBDB;*/
                    /*text-align:center;*/
                    /*font-size:0.24rem;*/
                    /*color:rgba(140,140,140,1);*/
                    /*padding-top:0.56rem;*/
                /*}*/

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
    }
</style>
