<template>
  <div class="logistDetail">
      <!---------------------------------------弃用------------------------------------------>
      <div class="public_header">
          <a @click="goBack()"><img src="../../../static/images/cf_back.png" alt=""></a>
          物流详情
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
      this.$Indicator.close();
  },
  computed:{
  },
  methods: {
      goBack:function () {
          this.$router.go(-1);
      },
      jumpRouter:function (routerPath) {
          this.$router.push(routerPath);
      },
  }
 }
</script>

<style lang="scss" scoped>
</style>
