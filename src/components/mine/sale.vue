<template>
    <div class="sale" style="overflow: hidden;height: 100%;">
        <div v-if="false" class="public_header">
            <router-link to="/mine"><img src="../../../static/images/cf_back.png" alt=""></router-link>
            退换/售后
        </div>
        <div class="header1">
            <router-link to="/mine"><img src="../../../static/images/cf_back.png" alt=""></router-link>
            退换/售后
        </div>
        <div class="order" style="padding-top: 1rem;overflow-y: scroll;height: 100%;">
            <ul :auto-fill="false">
                <li v-for="(item,index) in saleList" :key="index" >
                    <div class="orderNumber">
                        <div class="left">订单号:{{item.orderNo}}</div>
                        <div class="right" v-if="false"><img src="../../../static/images/cf_del.png" alt="">删除</div>
                    </div>
                    <div class="bottom">
                        <div class="goods" v-for="(item1,index1) in item.goodsList" :key="index1" @click="$jumpRouter('/saleDetail?orderDetailId='+item1.orderDetailId)" v-if="item1.orderGoodsReturnStat=='A' || item1.orderGoodsReturnStat=='B' || item1.orderGoodsReturnStat=='C'">
                            <div class="left"><img :src="item1.goodspicSpec" alt=""></div>
                            <div class="right">
                                <div class="top">
                                    <div class="title">{{item1.goodsName}}</div>
                                    <div class="spec">{{item1.goodsColer}},{{item1.goodsModel}}</div>
                                    <div class="orderStatus">
                                        <i v-if="item1.orderGoodsReturnType=='A'">退款: </i>
                                        <i v-if="item1.orderGoodsReturnType=='B'">退货退款: </i>
                                        <i v-if="item1.orderGoodsReturnType=='C'">换货: </i>
                                        <span v-if="item1.orderGoodsReturnStat=='A'">售后申请</span>
                                        <span v-if="item1.orderGoodsReturnStat=='B'">处理中</span>
                                        <span v-if="item1.orderGoodsReturnStat=='C'">完成</span>
                                    </div>
                                </div>
                                <div class="bottom1">
                                    <div class="price">x&nbsp;{{item.goodsNumber}}</div>
                                    <div class="button1" @click="$jumpRouter('/saleDetail?orderDetailId='+item1.orderDetailId)">查看详情</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                state:0,
                saleList:[],//订单列表
                orderNum:'',//订单号
            }
        },
        mounted:function () {
            this.$Indicator.close();
            this.state=this.$route.query.state;
            this.getList();
        },
        computed:{
        },
        methods: {
            loadTop(){
                let self=this;
                setTimeout(function () {
                    self.getList();
                    self.$refs.loadmore.onTopLoaded();
                }, 2000);

            },
            jumpRouter:function (routerPath) {
                this.$router.push(routerPath);
            },
            getList:function(){//http://192.168.1.105:7777/service/orderInfo/getReturnOrderInfo
                var that = this;
                this.$cfAjax('post', 'orderInfo/getReturnOrderInfo','type','Q','token',localStorage.getItem('token'),function (res) {
                    that.saleList=res.data.aData;
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    body{
        overflow: hidden;
    }
    .sale{
        .header1{
            font-size: 0.26rem;
            position: absolute;
            top:0;
            left: 0;
            right: 0;
            height: 0.88rem;
            line-height: 0.88rem;
            width: 100%;
            background-color: white;
            color: #9d792a;
            text-align: center;

            max-width: 7.5rem;
            margin: 0 auto;
            z-index: 99999;
            img:nth-of-type(1){
                display: block;
                width: 0.2rem;
                position: absolute;
                left: 0.25rem;
                top: 0.26rem;
            }
            img:nth-of-type(2){
                display: block;
                width: 0.2rem;
                position: absolute;
                right: 0.25rem;
                top: 0.26rem;
            }
        }
        .order{
            font-size: 0.26rem;
            width: 100%;
            max-width: 7.5rem;
            ul{
                overflow: hidden;
                li{
                    padding:0 0.25rem;
                    background-color: #ffffff;
                    margin-bottom: 0.2rem;
                    .orderNumber{
                        padding: 0.15rem 0;
                        display: flex;
                        justify-content: space-between;
                        border-top:1px solid transparent;
                        border-bottom: 1px solid #eeeeee;
                        .right{
                            color: #9D792A;
                            font-size: 0.22rem;
                            img{
                                vertical-align: middle;
                                width: 0.26rem;
                                height: 0.26rem;
                                margin-right: 0.3rem;

                            }
                        }
                    }
                    .bottom{
                        .goods{
                            width: 100%;
                            padding: 0.2rem 0;
                            height: 2rem;
                            font-size: 0.21rem;
                            color: #9d792a;
                            display: flex;
                            justify-content: space-between;
                            border-bottom: 1px solid #eeeeee;
                            .left{
                                margin-right: 0.2rem;
                                height: 1.58rem;
                                line-height: 1.58rem;
                                width: 1.58rem;
                                img{
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            .right{
                                width: 5rem;
                                overflow: hidden;
                                .top{
                                    width: 70%;
                                    float: left;
                                    height: 1.58rem;
                                    .title{
                                        color: #282828;
                                        font-size: 0.26rem;
                                        overflow: hidden;
                                        text-overflow:ellipsis;
                                        white-space: nowrap;
                                    }
                                    .spec{
                                        color: #666666;
                                        font-size: 0.24rem;
                                        overflow: hidden;
                                        text-overflow:ellipsis;
                                        white-space: nowrap;
                                    }
                                    .orderStatus{
                                        font-size: 0.2rem;
                                        margin-top: 0.25rem;
                                        i{
                                            font-size: 0.2rem;
                                        }
                                        span{
                                            font-size: 0.2rem;
                                            color: #E41316;
                                        }
                                    }
                                }
                                .bottom1{
                                    width: 30%;
                                    float: left;
                                    text-align: center;
                                    height: 1.58rem;
                                    .price{
                                        font-size: 0.3rem;
                                        margin-top: 0.35rem;
                                    }
                                    .button1{
                                        font-size: 0.26rem;
                                        margin-top: 0.3rem;
                                    }

                                }
                            }

                        }
                        .num{
                            padding: 0.2rem 0;
                            display: flex;
                            justify-content: space-between;
                            border-bottom: 1px solid #eeeeee;
                            //margin-bottom: 0.2rem;
                            color: #666666;
                            font-size: 0.20rem;
                            i{
                                color: #F16530;
                                font-size: 0.3rem;
                            }
                        }
                        .btn{
                            display: flex;
                            justify-content: space-between;
                            padding: 0.2rem 0;
                            font-size: 0.26rem;
                            color: #333333;
                            .orderStatus{
                                font-size: 0.2rem;
                                span{
                                    color: #E41316;
                                }
                            }
                            .button{
                                img{
                                    vertical-align: middle;
                                    width: 0.26rem;
                                    height: 0.26rem;
                                    margin-right: 0.3rem;

                                }
                            }
                        }
                    }

                }
            }
        }
    }
</style>
