<template>
    <div class='zhengchezhifu'>
        <!-- 头部 -->
        <div class="l-index-top">
            <i @touchstart="fanhui()" class="l-top-dingwei-i"></i>
            <span class="l-top-biaoti">匹配成功</span>
        </div>
        <!-- 单个发票 -->
        <div class='body'>
            <div class="list">
                <div class="list_fapiao">
                    <img src="../../../static/images/changtu.png" alt="">
                    <div class="div1" @click='detail(item.id,item.sumPrice)'>
                        <div class="div2">
                            <div class="div3">
                                <span>北京 顺义</span>
                                <i class="l-beijingdaoheze"></i>
                                <span>承德 丰宁</span>
                            </div>
                            <span>5分钟前</span>
                        </div>
                        <span class="l-xiaozi-14">体积0.7立方公里；重若干吨；猪肉</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 详细信息 -->
        <div class="info">
            <div class="info_form">
                <span>预算运费: </span>
                <i>1102元</i>
            </div>
            <div class="info_form swit">
                <div>
                    <span>保险费用: </span>
                    <i>50元</i>
                </div>
                <div class="mui-switch mui-switch-mini mui-active">
                    <div class="mui-switch-handle"></div>
                </div>
            </div>
            <div class="info_form">
                <span>实际里程: </span>
                <i>300公里</i>
            </div>
            <div class="info_form last">
                <span>合计费用: </span>
                <i class='price'>1170元</i>
            </div>
        </div>
        <!-- 支付方式 -->
        <div class="order">
            <div class="order_form">
                请选择支付方式
            </div>
            <div class="order_form01">
                <div>
                    <img src="../../../static/images/zhifubao.png" alt="">
                    <span>支付宝支付</span>
                </div>
                <div class="circle"></div>
            </div>
            <div class="order_form01">
                <div>
                    <img src="../../../static/images/weixin.png" alt="">
                    <span>微信支付</span>
                </div>
                <div class="circle"></div>
            </div>
            <div class="order_form01 last">
                <div>
                    <img src="../../../static/images/yinlianka.png" alt="">
                    <span>银行卡支付</span>
                </div>
                <div class="circle"></div>
            </div>
        </div>
        <!-- 按钮 -->
        <div class='btn_cen'>
            <button class='btn'>确认并支付</button>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang='scss'>
    .zhengchezhifu {
        .l-index-top {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 10;
            width: 100%;
            height: 50px;
            padding: 0 15px;
            background: #51c1ea;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            .l-top-biaoti {
                width: 100%;
                top: 0;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                font-size: 18px;
                padding: 0 50px 0 20px;
                box-sizing: border-box;
                position: absolute;
            }
            .l-top-dingwei-i {
                display: inline-block;
                width: 40px;
                height: 40px;
                background: url("../../../static/images/fanhuixiangyb.png") no-repeat left center;
                background-size: 30% 45%;
                position: relative;
                z-index: 103;
            }
        }
        // 发票部分  
        .body {
            height: 100%;
            padding-top: 50px;
            box-sizing: border-box;
            .list {
                width: 100%;
                height: 2.05rem;
                background: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                .list_fapiao {
                    width: 6.92rem;
                    height: 1.27rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    img {
                        width: 1.2rem;
                        height: 1.2rem;
                    }
                    .content {
                        width: 5.38rem;
                        height: 0.84rem;
                        display: flex;
                        flex-direction: column;
                        align-items: space-between;
                        .top {
                            width: 100%;
                            height: 0.61rem;
                            font-size: 0.32rem;
                            color: #333;
                            .left {
                                float: left;
                                position: relative;
                                .des {
                                    margin-left: 0.59rem;
                                }
                                i{
                                    width: 0.39rem;
                                    height: 0.11rem;
                                    position: absolute;
                                    top: 0.15rem;
                                    left: 1.5rem;
                                    display: block;
                                    background: url("../../../static/images/xdybihjmtb.png") no-repeat center;
                                    background-size: 100% 100%;
                                    display: inline-block;
                                }
                            }
                            .right {
                                float: right;
                                font-size: 0.24rem;
                                color: #999;
                                padding-top: 0.06rem;
                                padding-right: 0.31rem;
                            }
                        }
                        .bottom {
                            width: 100%;
                            font-size: 0.24rem;
                            color: #333;
                        }
                    }
                }
            }
        }
    }
    .div1 {
        .l-xiaozi-14 {
            padding-left: 10px;
            box-sizing: border-box;
            margin-top: 10px;
        }
        .div2 {
            width: 100%;
            justify-content: space-between;
            flex-direction: row;
            display: flex;
            padding-left: 10px;
            box-sizing: border-box;
            .div3 {
                display: flex;
                align-items: center;
                span {
                    color: #333;
                    font-size: 18px;
                }
                i {
                    margin: 0 10px;
                }
            }
            span {
                font-size: 14px;
                color: #666;
            }
        }
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .l-xiaozi-14 {
        font-size: 14px;
        color: #666;
    }
    .l-beijingdaoheze {
        width: 0.39rem;
        height: 0.11rem;
        display: inline-block;
        background: url("../../../static/images/xdybihjmtb.png") no-repeat center;
        background-size: 100% 100%;
        display: inline-block;
    }
    .info {
        margin-top: 0.1rem;
        width: 100%;
        height: 3.46rem;
        background: #fff;
        padding-left: 0.3rem;
        box-shadow: border-box;
        font-size: 0.28rem;
        line-height: 0.88rem;
        .info_form {
            height: 0.88rem;
            width: 100%;
            border-bottom: 0.01rem solid #ddd;
            span {
                display: block;
                width: 1.5rem;
                float: left;
            }
        }
        .last {
            border-bottom: none;
        }
    }
    .price {
        color: #e60012;
    }
    .swit {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .mui-switch {
        margin-right: 0.32rem;
    }
    .order {
        margin-top: 0.1rem;
        padding-left: 0.4rem;
        box-sizing: border-box;
        background: #fff;
        .order_form {
            height: 0.9rem;
            line-height: 0.9rem;
            font-size: 0.32rem;
            color: #333;
            border-bottom: 0.01rem solid #ddd;
        }
        .order_form01 {
            height: 1.31rem;
            font-size: 0.26rem;
            color: #333;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 0.01rem solid #ddd;
            img {
                vertical-align: middle;
                width: 0.7rem;
                height: 0.7rem;
                margin-right: 0.21rem;
            }
            .circle {
                width: 0.4rem;
                height: 0.4rem;
                border-radius: 10px;
                border: 0.02rem solid #dddddd;
                background: url(../../../static/images/loginyuanquan.png) no-repeat center;
                background-size: 100% 100%;
                margin-right: 0.3rem;
            }
        }
        .last {
            border-bottom: none;
        }
    }
    .btn_cen {
        display: flex;
        justify-content: center;
        align-items: center;
        .btn {
            margin-top: 0.33rem;
            width: 6.90rem;
            height: 0.86rem;
            background-color: #75c1dd;
            border-radius: 0.1rem;
            font-size: 0.36rem;
            color: #fff;
        }
    }
    
    
</style>
