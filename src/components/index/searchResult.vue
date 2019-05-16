<template>
    <div class="searchresult">
        <div class="header">
            <div class="sear">
                <span class="sear_goods">电视机 55寸</span>
                <input type="text">
                <span class="cancel" @click="$goBack()">取消</span>
            </div>
        </div>
        <div class="contentmain">
            <div class="content1">
                <div class="sea_result">搜索结果</div>
                <ul>
                    <li>
                        <div class="goods"><img src="../../../static/images/cf_sea_shop.png" alt=""></div>
                        <div class="details">
                            <div class="describe">Philips/飞利浦 55PUF60312345</div>
                            <div class="price">$2999</div>
                        </div>
                        <div class="addshopcart"><img src="../../../static/images/cf_cart.png" alt=""></div>
                    </li>
                    <li>
                        <div class="goods"><img src="../../../static/images/cf_sea_shop.png" alt=""></div>
                        <div class="details">
                            <div class="describe">Philips/飞利浦 55PUF60312345</div>
                            <div class="price">$2999</div>
                        </div>
                        <div class="addshopcart"><img src="../../../static/images/cf_cart.png" alt=""></div>
                    </li>
                    <li>
                        <div class="goods"><img src="../../../static/images/cf_sea_shop.png" alt=""></div>
                        <div class="details">
                            <div class="describe">Philips/飞利浦 55PUF60312345</div>
                            <div class="price">$2999</div>
                        </div>
                        <div class="addshopcart"><img src="../../../static/images/cf_cart.png" alt=""></div>
                    </li>
                    <li>
                        <div class="goods"><img src="../../../static/images/cf_sea_shop.png" alt=""></div>
                        <div class="details">
                            <div class="describe">Philips/飞利浦 55PUF60312345</div>
                            <div class="price">$2999</div>
                        </div>
                        <div class="addshopcart"><img src="../../../static/images/cf_cart.png" alt=""></div>
                    </li>
                    <li>
                        <div class="goods"><img src="../../../static/images/cf_sea_shop.png" alt=""></div>
                        <div class="details">
                            <div class="describe">Philips/飞利浦 55PUF60312345</div>
                            <div class="price">$2999</div>
                        </div>
                        <div class="addshopcart"><img src="../../../static/images/cf_cart.png" alt=""></div>
                    </li>
                    <li>
                        <div class="goods"><img src="../../../static/images/cf_sea_shop.png" alt=""></div>
                        <div class="details">
                            <div class="describe">Philips/飞利浦 55PUF60312345</div>
                            <div class="price">$2999</div>
                        </div>
                        <div class="addshopcart"><img src="../../../static/images/cf_cart.png" alt=""></div>
                    </li>
                </ul>
            </div>
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
        }
    }
</script>

<style lang="scss" scoped>
    .searchresult{
        font-size: 0;
        background-color: #fff;
        .header{
            width:100%;
            border-bottom:1px solid #DCDCDC;
            .sear{
                width:100%;
                height:100%;
                position:relative;
                position: relative;
                input{
                    margin:0.1rem 0.38rem 0.18rem 0.38rem;
                    padding-top:0.25rem;
                    width:6.74rem;
                    height:0.57rem;
                    background:rgba(255,255,255,1);
                    border-radius: 0.26rem;
                }
                span{
                    position: absolute;
                    font-size:0.28rem;
                    font-family:PingFangSC-Regular;
                    color:rgba(155,155,155,1);
                }
                .sear_goods{
                    top:0.22rem;
                    left:0.65rem;
                }
                .cancel{
                    top:0.22rem;
                    right:0.65rem;
                }
            }
        }
        .contentmain{
            .content{
                padding-left:0.4rem;
                .sea_result{
                    margin-top: 0.24rem;
                    font-size:0.26rem;
                    font-family:PingFang-SC-Regular;
                    color:rgba(102,102,102,1);
                }
                ul{
                    li{
                        border-bottom: 1px solid #ddd;
                        display:flex;
                        width:100%;
                        height:1.9rem;
                        padding-top:0.25rem;
                        .goods{
                            img{
                                width:1.4rem;
                                height:1.4rem;
                            }
                        }
                        .details{
                            position: relative;
                            margin:0 0.58rem 0 0.3rem;
                            width:4.12rem;
                            height:1.35rem;
                            .describe{
                                font-size:0.28rem;
                                font-family:PingFang-SC-Medium;
                                color:rgba(40,40,40,1);
                            }
                            .price{
                                position:absolute;
                                font-size:0.24rem;
                                font-family:PingFang-SC-Medium;
                                color:rgba(40,40,40,1);
                                bottom: -0.1rem;
                            }
                        }
                        .addshopcart{
                            margin-top:1.1rem;
                            img{
                                width:0.33rem;
                                height:0.28rem;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
