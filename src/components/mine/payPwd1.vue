<template>
  <div class="payPwd1">
      <div class="public_header">
          <a @click="$goBack()"><img src="../../../static/images/cf_back.png" alt=""></a>
          修改支付密码
      </div>
      <div class="payPwd-list">
        <div>
            <input type="text" maxlength="6" v-model="oldpaypwd" placeholder="旧支付密码：">
        </div> 
            
        <div>
            <input type="text" maxlength="6" v-model="newpaypwd" placeholder="输入新支付密码：">
        </div>   
        <div>
            <input type="text" maxlength="6" v-model="nextpaypwd" placeholder="再次输入新密码：">
        </div>     
        
        
        
      </div>
      <div class="confirm-button">
        <button @click="updatePwd()">完成</button>
      </div>
  </div>
</template>

<script>
export default {
  data () {
      return {
          oldpaypwd:'',
          newpaypwd:'',
          nextpaypwd:'',
      }
  },
  mounted:function () {
      this.$Indicator.close();
  },
  watch:{
      oldpaypwd:function () {
          this.oldpaypwd=this.oldpaypwd.replace(/\D/g,'');
      },
      newpaypwd:function () {
          this.newpaypwd=this.newpaypwd.replace(/\D/g,'');
      },
      nextpaypwd:function () {
          this.nextpaypwd=this.nextpaypwd.replace(/\D/g,'');
      }
  },
  computed:{
  },
  methods: {
      updatePwd:function () {
              if(this.oldpaypwd===''){
                  this.$Toast({
                      message:'旧支付密码不能为空',
                      position: 'bottom'
                  });
                  return;
              }
          if(this.newpaypwd==='' || this.nextpaypwd===''){
              this.$Toast({
                  message:'新支付密码不能为空',
                  position: 'bottom'
              });
              return;
          }
          if(this.oldpaypwd.length!=6){
              this.$Toast({
                  message:'旧密码位数不够',
                  position: 'bottom'
              });
              return;
          }
          if(this.newpaypwd.length!=6 || this.nextpaypwd.length!=6){
              this.$Toast({
                  message:'新密码位数不够',
                  position: 'bottom'
              });
              return;
          }
          if(this.newpaypwd!=this.nextpaypwd){
              this.$Toast({
                  message:'两次输入支付密码不一致',
                  position: 'bottom'
              });
              return;
          }
          var that=this;
          this.$cfAjax('post', 'userRegister/updatePaymentPwd', 'token',localStorage.getItem('token'),'oldPassWord', this.oldpaypwd, 'newPassWord', this.newpaypwd,function (res) {

              if(res.data.code==1){
                  that.$Toast({
                      message:'修改支付密码成功',
                      position: 'bottom'
                  });
                  that.$jumpRouter('/mine');
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
    .payPwd1{
        width:7.5rem;
        margin-top:0.88rem;
        .payPwd-list{
            width:6.16rem;
            height:3.74rem;
            margin:auto;
            display:flex;
            flex-direction:column;
            padding-top:0.44rem;
            div{
                margin:0.2rem 0;
            }
            input{
                margin:0;
                padding:0;
                width:100%;
                height:0.8rem;
                border-radius:0.06rem;
                font-size:0.28rem;
                padding-left:0.29rem;
                display:block;
            }
            // #oldpaypwd,#newpaypwd{
            //     margin-bottom:0.22rem;
            // }
        }
        .confirm-button{
            width:6.5rem;
            height:0.7rem; 
            margin:1rem auto;
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
