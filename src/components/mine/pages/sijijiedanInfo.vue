<template>
    <div class="siji">
        <!-- 头部文字 -->
        <div class="l-index-top">
            <i @touchstart="fanhui()" class="l-top-dingwei-i"></i>
            <span class="l-top-biaoti">司机接单信息</span>
        </div>
        <!-- 地图部分 -->
        <div class="body">
            地图部分
        </div>
        <!-- 详细信息 -->
        <div class="info">
            <!-- 司机信息 -->
            <div class="sijijxuk">
                <img :src="data.hard" alt="">
                <div class="sijixinxi-div">
                    <div class="sijixinxi-div1">
                        <span class="sijixinxi-div1-sp1">司机姓名：<span>周星星</span></span>
                        <span class="sijixinxi-div1-sp1">联系方式：<span>151****7605</span></span>
                        <span class="sijixinxi-div1-sp3">车牌号：<span>京A3458S</span></span>
                    </div>
                    <div class="sijixinxi-div2">
                        <span class="sijixinxi-div2-sp1"></span>
                        <span class="sijixinxi-div2-sp2"></span>
                    </div>
                </div>
            </div>
            <!-- 已接单信息 -->
            <div class="orderInfo">
                <h3>已接单</h3>
                <div class="jiedanInfo">
                    <p>接单时间: <span>2019-01-10 16:26:54</span></p>
                    <p>接单地点: <span>北京市顺义区人民医院</span></p>
                    <p>司机到达发货地的时间: <span>2019-01-10 16:26:54</span></p>
                    <p>司机到达发货地的地点: <span>北京市后沙峪绿地启航国际</span></p>
                    <p>司机提货完成时间: <span>2019-01-10 16:26:54</span></p>
                    <p>司机提货完成地点: <span>北京市后沙峪绿地启航国际</span></p>
                    <p>司机卸货完成时间: <span>2019-01-10 16:26:54</span></p>
                    <p>司机卸货完成地点: <span>北京市后沙峪绿地启航国际</span></p>
                </div>
            </div>
            <!-- 按钮 -->
            <div class="btn">
                <button>装车完成并确认发车</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            data: {}
        }
    }
}
</script>

<style lang='scss' scoped>
    .siji {
        height: 100%;
        padding-top: 50px;
        padding-bottom: 7.87rem;
        // 头部部分
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
                background: url("../../../../static/images/fanhuixiangyb.png") no-repeat left center;
                background-size: 30% 45%;
                position: relative;
                z-index: 103;
            }
        }
        // 地图部分
        //787
        .body {
            height: 100%;
            background: red;
            font-size: 0.16rem;
        }


        // 详细部分
        .info {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 7.87rem;
            .sijijxuk {
                .sijixinxi-div {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .sijixinxi-div1 {
                        display: flex;
                        flex-direction: column;
                        .sijixinxi-div1-sp1 {
                            font-size: 0.3rem;
                            color: #333333;
                            span {
                                color: #666666;
                            }
                        }
                        .sijixinxi-div1-sp3 {
                            letter-spacing: 0.1rem;
                            font-size: 0.3rem;
                            color: #333333;
                            span {
                                letter-spacing: 0;
                                color: #59c3e0;
                                position: relative;
                                left: -0.1rem;
                            }
                        }
                    }
                    .sijixinxi-div2 {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        .sijixinxi-div2-sp1 {
                            margin: 0.2rem 0;
                            width: 0.4rem;
                            height: 0.4rem;
                            background: url("../../../../static/images/dianhuahahah.png") no-repeat center;
                            background-size: 100% 100%;
                        }
                        .sijixinxi-div2-sp2 {
                            width: 0.44rem;
                            height: 0.4rem;
                            background: url("../../../../static/images/lmxisiji.png") no-repeat center;
                            background-size: 100% 100%;
                            margin: 0.2rem 0;
                        }
                    }
                }
                width: 100%;
                height: 2.1rem;
                background: #fff;
                padding: 0 0.3rem 0 1.9rem;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                img {
                    width: 1.3rem;
                    height: 1.3rem;
                    position: absolute;
                    left: 0.3rem;
                }

            }
            .orderInfo {
                padding-left: 0.3rem;
                height: 4.11rem;
                margin-top: 0.1rem;
                background: #fff;
                h3 {
                    height: 0.64rem;
                    line-height: 0.64rem;
                    font-size: 0.3rem;
                    color: #75c1dd;
                }
                p {
                    font-size: 0.24rem;
                    color: #666;
                    line-height: 0.43rem;
                    span {
                        color: #999;
                    }
                }
            }
            .btn {
                text-align: center;
                margin: 0.4rem 0;
                button {
                    width: 6.9rem;
                    height: 0.86rem;
                    background-color: #75c1dd;
                    border-radius: 0.1rem;
                    font-size: 0.36rem;
                    letter-spacing: 0.04rem;
                    color: #ffffff;
                }
            }
        }
    }
</style>
