<template>
  <div class="goPayBank">
      <div id="yinlain"></div>
  </div>
</template>

<script>
export default {
  data () {
      return {
          formData:'',
          isok:0,
      }
  },
  mounted:function () {
   // debugger;   //this.formData=this.$route.query.formData;
    this.formData=sessionStorage.getItem('formData');
    document.getElementById('yinlain').appendChild(this.strToNode(this.formData));
    document.getElementById('rongpaysubmit').submit();


  },
  watch:{

  },
  computed:{
  },
  methods: {
      strToNode:function(str) {
          var dd = document.createElement("div");
          dd.innerHTML = str;
          return dd;
      },
  }
 }
</script>

<style lang="scss" scoped>
    .goPayBank{
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
