<template>
  <div class="setting">
      <div class="public_header">
          <router-link to="/mine"><img src="../../../static/images/cf_back.png" alt=""></router-link>
          设置
      </div>
      <ul>
          <li>
              <div class="list" @click="jumpRouter('pwd?state=0')">
                  <div class="title">修改密码</div>
                  <div class="imgs"><img src="../../../static/images/cf_go.png" alt=""></div>
              </div>
          </li>
          <li class="public_row"></li>
          <li>
              <div class="list" @click="jumpRouter('/revise?state=0')">
                  <div class="title" v-if="ispass==0">修改信息</div>
                  <div class="title" v-if="ispass==1">查看信息</div>
                  <div class="imgs"><img src="../../../static/images/cf_go.png" alt=""></div>
              </div>
          </li>
      </ul>
       <div class="exit" @click="exit()">退出</div>
  </div>
</template>

<script>
export default {
  data () {
      return {
          ispass:0,
      }
  },
  mounted:function () {
      if(localStorage.getItem("ispass")=='B'){
          this.ispass=1;
      }else {
          this.ispass=0;
      }
      this.$Indicator.close();
  },
  computed:{
  },
  methods: {
      jumpRouter:function (routerPath) {
          this.$router.push(routerPath);
      },
      exit:function () {
          localStorage.clear();
          sessionStorage.clear();
          this.$jumpRouter('/login');
      }
  }
 }
</script>

<style lang="scss" scoped>
    .setting{
        ul{
            background-color: white;
            margin-top: 1rem;
            li{
                .list{
                    font-size: 0.26rem;
                    display: flex;
                    justify-content: space-between;
                    padding:0.3rem 0.2rem;
                }
            }
        }
        .exit{
            position: fixed;
            bottom: 0.5rem;
            left:0.3rem;
            right: 0.3rem;
            font-size: 0.3rem;
            color: white;
            background-color: #9d792a;
            max-width: 7.5rem;
            width: 80%;
            margin: auto;
            text-align: center;
            border-radius: 10px;
            padding: 0.2rem 0;
        }
    }
</style>
