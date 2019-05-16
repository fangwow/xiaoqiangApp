<template>
  <div class="findPwd">
      <div class="public_header">
          <router-link to="/login"><img src="../../../static/images/cf_back.png" alt=""></router-link>
          找回密码
      </div>
      <div class="login-box">
        <p class="loginbox loginbox1">
            <input type="text" maxlength="11" v-model="phone" placeholder="手机号码" id="phonenumber">
        </p>
        <p class="loginbox loginbox-yan">
            <input maxlength="6" v-model="code" type="text" placeholder="验证码" id="yannumber">
            <button id="getCode" @click="getCode1()">获取短信验证码</button>
        </p>
        <p v-if="false" class="loginbox loginbox2"><img  src="../../../static/images/yh-bi.png" alt="" class="bi"><img  src="../../../static/images/yh-zheng.png" alt="" class="zheng"><input type="password" placeholder="请设置密码" id="pwdnum1"><input type="text" placeholder="请设置密码" id="pwdnum2"></p>
        <p v-if="false" class="login-p1">密码长度6-16位，支持数字，字母和符号</p>
        <p v-if="false" class="login-p2"><img src="../../../static/images/yh-jingshi.png" alt="">电话号码格式输入有误</p>
      </div>
      <div class="confirm-button">
          <button v-if="isok" @click="next()">下一步</button>
          <button v-if="!isok" class="isok">下一步</button>
          <!--1.点击发送短信验证码后此按钮状态以60s倒计时的方式显示-->
          <!--2.点击“获取短信验证码”判断手机号码格式是否正确，不正确提醒用户手机号码格式有误-->
          <!--3.验证码限制4位数-->
          <!--4.输入第4个数字是“下一步”按钮变为可点击状态-->
      </div>
      <div class="backpwd" v-if="false">
        <p>点击“下一步”按钮,既表示您同意《中联电器软件许可及服务协议》</p>
      </div>
  </div>
</template>

<script>
export default {
  data () {
      return {
          phone:'',
          code:'',
          password:'',
          inputType:'password',
          isok:false,//下一步的按钮 是否可以点击
      }
  },
  mounted:function () {
  },
 watch:{
        code:function () {
            this.code=this.code.replace(/\D/g,'');
            if(this.code.length===6){
                this.isok=true;
            }else{
                this.isok=false;
            }
        },//监听code 变化  保证纯数字 和下一步状态
        phone:function () {
            this.phone=this.phone.replace(/\D/g,'');
        },//监听phone变化  保证纯数字
    },
  computed:{
  },
  methods: {
    getCode1:function () {
        var that=this;
    if(this.phone == ''){
      this.$Toast({
          message: '手机号不能为空',
          position: 'bottom'
      });
      return;
    }
    var phone=/^1[34578]\d{9}$/;
    if(!phone.test(this.phone)){
      this.$Toast({
          message: '手机号格式错误',
          position: 'bottom'
      });
      return;
    }
        //判断手机号是否存在
        this.$cfAjax('post', 'userRegister/goUserRegister', 'telphone', this.phone, 'password', '', function (res) {

            var msg="手机号未注册";
            if(res.data.msg==msg){
                that.$Toast({
                    message: '该手机号未注册',
                    position: 'bottom',
                });
                return;
            }else{
                that.getCode2();
            }
        });
      //  this.getCode2();
    //判断手机号是否存在
//    this.$cfAjax('post', 'userRegister/goUserRegister', 'telphone', this.phone, 'password', this.password,function (res) {
//      console.log(res);
//      if(1){//存在
//          return;
//      }
//      that.getCode2();
//    });

    },//发送短信前判断
    getCode2:function () {
    var that=this;
    this.$cfAjax('post', 'userRegister/updateSendSMS', 'telphone', this.phone,function (res) {

      if(res.data.code==1){
          that.$Toast({
              message: '验证码已经发送',
              position: 'bottom'
          });
          var content=document.getElementById("getCode");
          document.getElementById("getCode").style.backgroundColor='#8f8f94';//颜色置灰色
          content.disabled=true;
          var times=60;
          var timer=setInterval(function () {
              times=times-1;
              content.innerHTML=times+'s';
              if(times===0){
                  clearInterval(timer);
                  content.innerHTML="再次获取";
                  times=60;
                  content.disabled=false;
                  document.getElementById("getCode").style.backgroundColor='#C7A761';//重置颜色
              }
          },1000);

      }else{
          that.$Toast({
              message: res.data.data.msg,
              position: 'bottom'
          });
      }
    });

    },//发送短信
    next:function () {
        var that=this;
          if(this.phone === ''){
              this.$Toast({
                  message: '手机号不能为空',
                  position: 'bottom'
              });
              return;
          }
          var phone=/^1[34578]\d{9}$/;
          if(!phone.test(this.phone)){
              this.$Toast({
                  message: '手机号格式错误',
                  position: 'bottom'
              });
              return;
          }
          //ajax通用
          this.$cfAjax('post', 'userRegister/updateFindPwd', 'telphone', this.phone, 'smsCode', this.code,function (res) {

              if(res.data.code===1){
                  that.$Toast({
                      message: res.data.msg,
                      position: 'bottom'
                  });
                  sessionStorage.setItem('phone',that.phone);
                  that.$jumpRouter('/pwd?state=1');
              }else{
                  that.$Toast({
                      message: res.data.msg,
                      position: 'bottom'
                  });
              }
          });
      },//下一步 跳转设置密码页面
  }
 }
</script>

<style lang="scss" scoped>
  .findPwd{
      width:7.5rem;
      .login-box{
        margin-top:0.88rem;
        width:6.16rem;
        margin:auto;
        display:flex;
        flex-direction:column;
        p{
          position:relative;
          margin-bottom:0.22rem;
          .bi{
              width:0.5rem;
              height:0.21rem;
              position:absolute;
              top:0.295rem;
              right:0.79rem;
          }
          .zheng{
              width:0.4rem;
              height:0.35rem;
              position:absolute;
              top:0.22rem;
              right:0.23rem;
          }
          input{
            margin:0;
            padding:0;
            height:0.8rem;
            padding-left:0.27rem;
            font-size:0.28rem;
          }
          #pwdnum1{
            margin-bottom:0.2rem;
          }
          span{
            font-size:0.2rem;
            padding-left:0.1rem;
            color:#F3040F;
          }
        }
        .loginbox1{
            margin-top:1.2rem;
        }
        .loginbox-yan{
            display:flex;
            justify-content:space-between;
            input{
                width:3.44rem;
            }
            button{
                width:2.34rem;
                font-size:0.24rem;
                background:rgba(199,167,97,1);
                border-radius: 0.35rem;
                color:#fff;
            }

        }
        .login-p1{
            color:rgba(186,186,186,1);
            font-size:0.2rem;
            margin:0;
        }
        .login-p2{
            color:rgba(243,4,15,1);
            font-size:0.24rem;
            img{
                width:0.23rem;
                height:0.23rem;
                margin-right:0.16rem;
            }
        }
      }
      .confirm-button{
            width:6.5rem;
            height:0.7rem; 
            margin:0.27rem auto;
            button{
                width:100%;
                height:100%;
                text-align:center;
                background:rgba(199,167,97,1);
                border-radius: 0.1rem;
                color:#fff;
            }
          .isok{
              background-color: #8f8f94;
          }
        }
        .backpwd{
          width:6.06rem;
          margin:auto;
          display:flex;
          justify-content:space-between;
            p{
                margin:0;
                padding:0;
                color:rgba(102,102,102,1);
                font-size:0.2rem;
            }
        }
  }
</style>
