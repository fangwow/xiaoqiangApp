<template>
  <div class="payPwd">
      <div class="public_header"  v-if="state==0">
          <router-link v-if="state==0" to="/setting"><img src="../../../static/images/cf_back.png" alt=""></router-link>
          修改密码
      </div>
      <div class="public_header" v-if="state==1">
          <router-link to="/login"><img src="../../../static/images/cf_back.png" alt=""></router-link>
          找回密码
      </div>
      <div class="payPwd-list">
        <input maxlength="16" v-if="state==0" type="text" v-model="oldpaypwd" id="oldpaypwd" placeholder="输入原密码">
        <input maxlength="16" type="text" v-model="newpaypwd"  id="newpaypwd" placeholder="确认密码">
        <input maxlength="16" type="text" v-model="nextpaypwd" id="nextpaypwd" placeholder="再次输入新密码">
      </div>
      <p class="cautionone" v-if="false">密码设置错误</p>
      <p class="cautiontwo">密码长度6-16位，支持数字，字母和符号</p>
      <div class="confirm-button">
        <button @click="submit()">确定</button>
      </div>
  </div>
</template>
<script>
export default {
  data () {
      return {
          state:0,//找回密码是1   其他是0
          oldpaypwd:'',//旧密码
          newpaypwd:'',//新密码
          nextpaypwd:'',//确认密码
      }
  },
  mounted:function () {
      this.$Indicator.close();
      this.state=this.$route.query.state;
  },
  computed:{
  },
  methods: {
      submit:function () {
          var that=this;
          //账号密码  验证码的 前台验证
          if(this.state==1){//找密码

          }else{   //其他  判断旧密码
              if(this.oldpaypwd == ''){
                  this.$Toast({
                      message: '旧密码不能为空',
                      position: 'bottom'
                  });
                  return;
              }
              var password1=/^[0-9a-zA-Z]{6}/
              if(!password1.test(this.oldpaypwd)){
                  this.$Toast({
                      message: '密码格式错误',
                      position: 'bottom'
                  });
                  return;
              }
          }

          if(this.newpaypwd == ''){
              this.$Toast({
                  message: '密码不能为空',
                  position: 'bottom'
              });
              return;
          }
          if(this.nextpaypwd == ''){
              this.$Toast({
                  message: '密码不能为空',
                  position: 'bottom'
              });
              return;
          }
          var password=/^[0-9a-zA-Z]{6}/
          if(!password.test(this.newpaypwd)){
              this.$Toast({
                  message: '密码格式错误',
                  position: 'bottom'
              });
              return;
          }
          if(!password.test(this.nextpaypwd)){
              this.$Toast({
                  message: '密码格式错误',
                  position: 'bottom'
              });
              return;
          }
          if(this.nextpaypwd != this.newpaypwd){
              this.$Toast({
                  message: '两次密码不一致',
                  position: 'bottom'
              });
              return;
          }
          if(this.state==1){//找密码
              this.$cfAjax('post', 'userRegister/updateFindPwd', 'telphone',sessionStorage.getItem('phone'), 'passWord', this.newpaypwd,function (res) {

                  if(res.data.code==1){
                      that.$Toast({
                          message: '找回密码成功',
                          position: 'bottom'
                      });
                      that.$jumpRouter('/login');
                  }else{
                      that.$Toast({
                          message: res.data.msg,
                          position: 'bottom'
                      });
                  }


              });
          }else{//其他  暂时没写
              //ajax通用
              this.$cfAjax('post', 'userRegister/updateRetrievePwd', 'oldPassWord',this.oldpaypwd, 'newPassWord', this.nextpaypwd,'token',localStorage.getItem('token'),function (res) {
                  if(res.data.code==1){
                      that.$Toast({
                          message:'修改密码成功',
                          position: 'bottom'
                      });
                      //that.$jumpRouter('/setting');
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
 }
</script>

<style lang="scss" scoped>
    .payPwd{
        width:7.5rem;
        margin-top:0.88rem;
        .payPwd-list{
            width:6.16rem;
            //height:3.74rem;
            margin:auto;
            display:flex;
            flex-direction:column;
            padding:0.44rem 0;
            input{
                margin:0;
                padding:0;
                width:100%;
                height:0.8rem;
                border-radius:0.06rem;
                font-size:0.28rem;
                padding-left:0.29rem;
                background:rgba(251,251,251,1);
            }
            #oldpaypwd,#newpaypwd{
                margin-bottom:0.22rem;
            }
        }
        .cautionone{
            width:6.16rem;
            margin:auto;
            color:#F3040F;
            font-size:0.24rem;
        }
        .cautiontwo{
            width:6.16rem;
            margin:auto;
            font-size:0.2rem;
            color:rgba(186,186,186,1);
        }
        .confirm-button{
            width:6.5rem;
            height:0.7rem; 
            margin:0.2rem auto;
            button{
                width:100%;
                height:100%;
                text-align:center;
                background:rgba(199,167,97,1);
                border-radius: 0.1rem;
                color:#fff;
            }
        }
    }
</style>
