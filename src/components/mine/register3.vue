<template>
  <div class="register">
      <div class="public_header">
          <router-link to="/login"><img src="../../../static/images/cf_back.png" alt=""></router-link>
          注册
      </div>
      <p class="p1"><img src="../../../static/images/kefu.png" alt=""></p>
      <p class="p2">审核中...</p>
      <p class="p3">审核时间1个工作日，详情请查看我的消息</p>
      <div class="confirm-button">
        <button @click="jumpRouter('/index')">点击去首页（5m后自动跳转）</button>
      </div>
  </div>
</template>

<script>
export default {
  data () {
      return {
      }
  },
  mounted:function () {
  },
  computed:{
  },
  methods: {
       jumpRouter:function (routerPath) {
          this.$router.push(routerPath);
      }
  }
 }
</script>

<style lang="scss" scoped>
    .register{
        width:7.5rem;
        margin-top:0.88rem;
        overflow:hidden;
        p{
            width:100%;
            text-align:center;
        }
        .p1{
            margin-top:1.17rem;
           
        }
        .p2{
            color:rgba(102,102,102,1);
            font-size:0.36rem;
            margin-top:0.52rem;
        }
        .p3{
            color:rgba(153,153,153,1);
            font-size:0.24rem;
            margin-top:0.25rem;
        }
        .confirm-button{
            width:6.5rem;
            height:0.7rem; 
            margin:0.47rem auto;
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
