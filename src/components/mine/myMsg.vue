<template>

  <div class="myMsg">
      <div class="public_header">
          <router-link to="/mine"><img src="../../../static/images/cf_back.png" alt=""></router-link>
          我的消息
      </div>
      <div class="page-loadmore-wrapper" style="position: fixed;top:1rem;bottom: 0.01rem; -ms-overflow-y: scroll;overflow-y: scroll;left: 0;right:0;padding-bottom: 0.25rem;max-width: 7.5rem;margin: auto;-webkit-overflow-scrolling: touch !important;">
          <mt-loadmore style="font-size: 0.3rem;"  :bottomDistance="70"  :bottom-method="loadBottom" :top-method="loadTop" :bottom-all-loaded="allLoaded" class="loadmore" ref="loadmore" :auto-fill="false">
            <ul class="myMsg-list page-loadmore-list">
                <!--<li v-for="item in list">-->
                    <!--<p class="myMsg-p1">-->
                        <!--<label>{{ item.title }}</label>-->
                        <!--<span>注册审核驳回,请点击<router-link to='/revise?state=1' style="color:#007aff;">修改</router-link></span>-->
                    <!--</p>-->
                    <!--<p class="myMsg-p2">{{ item.content }}</p>-->
                <!--</li>-->
            </ul>
        </mt-loadmore>
          <!--<div v-if="allLoaded" style="position:relative;width: 100%;font-size: 0.3rem;text-align: center;height:0.3rem;line-height: 0.3rem;padding: 0.1rem 0;">没有更多了</div>-->
      </div>
  </div>
</template>

<script>
export default {
  data () {
      return {
          allLoaded: true,
          scrollMode: "auto",
          page:1,
          pageSize:10,
          list:[],
      }
  },
  mounted:function () {
      this.$Indicator.close();
      this.getData();
  },
  computed:{
  },
  methods: {
      loadBottom() {
          var self=this
          // 加载更多数据
          setTimeout(function () {
              self.page++;
              self.getData();
              //self.scrollMode = "touch";
              self.$refs.loadmore.onBottomLoaded();
          }, 2000);
      },
      loadTop(){
          let self=this;
          setTimeout(function () {
              self.list=[];
              self.page=1;
              self.getData();
              self.$refs.loadmore.onTopLoaded();
          }, 2000);

      },
      getData:function () {
          var that=this;
          this.$cfAjax('post', 'userInfo/getUserInformation', 'token',localStorage.getItem('token'),'iDisplayStart', this.page,'sEcho',1, 'iDisplayLength', this.pageSize,function (res) {

              //that.list=res.data.aData;
              if(that.pageSize>res.data.aData.length){
                  that.allLoaded=true;
              }else{
                  that.allLoaded=false;
              }
              for(var i=0;i<res.data.aData.length;i++){
                  that.list.push(res.data.aData[i]);
              }
              var str='';
              for(var i=0;i<that.list.length;i++){
                  str+='<li style="width:100%;border-bottom:0.15rem solid #f8f8f8;">';
                  str+='<p class="myMsg-p1" style="height:0.62rem;line-height:0.62rem;display:flex;justify-content:space-between;border-bottom:1px solid #DCDCDC;color:#333333;">';
                  str+='<label style="font-size:0.28rem;padding-left:0.21rem;">'+that.list[i].title+'</label>';
                  str+='<span style="font-size:0.16rem;padding-right:0.21rem;">'+that.list[i].addTimeNew+'</span>';
                  str+='</p>';
                  str+='<p class="myMsg-p2" style="font-size:0.24rem;padding-left:0.21rem;color:rgba(136,136,136,1);line-height:0.62rem;">'+that.list[i].content+'</p>'
                  str+='</li>';
              }
              //debugger;
              //document.getElementsByClassName('myMsg-list').html(str);
              that.jq('.myMsg-list').html(str);
          });

      }
  }
 }
</script>

<style lang="scss" scoped>
    .myMsg{
        width:7.5rem;
        .myMsg-list{
            ///position:absolute;
            //left:2.5%;
            //top:1rem;
            //width:95%;
            ///margin:auto;
            background:#fff;
            li{
                width:100%;border-bottom:0.13rem solid #f8f8f8;
                .myMsg-p1{
                    height:0.62rem;line-height:0.62rem;display:flex;justify-content:space-between;border-bottom:1px solid #DCDCDC;color:#333333;
                    label{
                        font-size:0.28rem;padding-left:0.21rem;
                    }
                    span{
                        font-size:0.16rem;padding-right:0.21rem;
                    }
                }
                .myMsg-p2{
                    font-size:0.24rem;padding-left:0.21rem;color:rgba(136,136,136,1);line-height:0.62rem;
                }
            }
        }
    }
</style>
