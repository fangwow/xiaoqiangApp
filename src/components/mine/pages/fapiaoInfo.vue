<template>
    <div class="fapiaoInfo">
        <!-- 头部文字 -->
        <div class="l-index-top">
            <i @touchstart="fanhui()" class="l-top-dingwei-i"></i>
            <span class="l-top-biaoti">发票订单详情</span>
            <button class='btn' @click='addmyFapiao()'>开发票</button>
        </div>
        <!-- 单个发票 -->
        <div class='body'>
            <div class="list">
                <div class="list_fapiao">
                    <img src="../../../../static/images/changtu.png" alt="">
                    <!-- <div class="content">
                        <div class="top">
                            <div class="left">
                                <span>北京  顺义</span>
                                <i></i>
                                <span class='des'>承德 丰宁</span>
                            </div>
                            <div class="right">
                                5分钟前
                            </div>
                        </div>
                        <div class="bottom">
                            体积10000立方米；重量10吨；货物类型：煤炭；
                        </div>
                    </div> -->
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
        <!-- 送货信息 -->
        <div class="sendInfo">
            <div class="title">
                <span></span>送货人信息
            </div>
            <div class="content">
                <div class="row">
                    <span>姓名: </span>
                    <i>张**</i>
                </div>
                <div class="row">
                    <span>联系电话: </span>
                    <i>666888</i>
                </div>
                <div class="row">
                    <span>体积: </span>
                    <i>xxx立方米</i>
                </div>
                <div class="row">
                    <span>重量: </span>
                    <i>10吨</i>
                </div>
                <div class="row">
                    <span>货物类型: </span>
                    <i>其他</i>
                </div>
                <div class="row">
                    <span>货物保险: </span>
                    <i>已购买</i>
                </div>
                <div class="row">
                    <span>运输方式: </span>
                    <i>自提</i>
                </div>
                <div class="row">
                    <span>价格: </span>
                    <i>￥666666.00</i>
                </div>
                <div class="row">
                    <span>装车地点: </span>
                    <i>北京市顺义区后沙峪镇绿地启航国际南区三号楼404</i>
                </div>
                <div class="row">
                    <span>送货地点: </span>
                    <i>天津市滨海区响螺湾大街华贸中心</i>
                </div>
                <div class="row">
                    <span>备注: </span>
                    <i>由于节假日原因,货物有可能会受交通管制原因的方式登录撒fda地方撒</i>
                </div>
            </div>
            <!-- 收货人信息 -->
            <div class="title mar">
                <span></span>收货人信息
            </div>
            <div class="content">
                <div class="row">
                    <span>收货人: </span>
                    <i>张**</i>
                </div>
                <div class="row">
                    <span>联系电话: </span>
                    <i>666888</i>
                </div>
            </div>
            <!-- 车辆信息 -->
            <div class="title mar">
                <span></span>车辆信息
            </div>
            <div class="content">
                <div class="row">
                    <span>车牌号: </span>
                    <i>京888888</i>
                </div>
                <div class="row">
                    <span>司机姓名: </span>
                    <i>张三</i>
                </div>
                <div class="row">
                    <span>公司地址: </span>
                    <i>xxxxx</i>
                </div>
            </div>
            <!-- 货站信息 -->
            <div class="title mar">
                <span></span>货站信息
            </div>
            <div class="content">
                <div class="row">
                    <span>公司名称: </span>
                    <i>xxx公司</i>
                </div>
                <div class="row">
                    <span>联系电话: </span>
                    <i>666888</i>
                </div>
                <div class="row">
                    <span>公司地址: </span>
                    <i>xxxxx</i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            id: this.$route.query.id,
            ivcoicePrice: this.$route.query.ivcoicePrice
        }
    },
    methods: {
        // 点击退回到上一步
        fanhui(){
            this.$router.push('/myFapiao');
        },
        // 点击添加发票按钮跳转到增加发票页面
        addmyFapiao(){
            this.$router.push({
                path: '/addmyFapiao',
                query: {
                    id: this.id,
                    ivcoicePrice: this.ivcoicePrice,
                    path: '/fapiaoInfo'
                }
            });
        }
    }
}
</script>

<style lang='scss' scoped>
    .fapiaoInfo {
        // 头部文字
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
            .btn {
                width: 0.98rem;
                height: 0.44rem;
                background-color: #cc9933;
	            border-radius: 0.08rem;
                font-size: 0.26rem;
                line-height: 0.36rem;
                color: #ffffff;
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
                                    background: url("../../../../static/images/xdybihjmtb.png") no-repeat center;
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
        //送货信息
        .sendInfo {
            margin-top: 0.1rem;
            background: #fff;
            padding: 0 0.3rem;
            .title {
                width: 100%;
                height: 0.88rem;
                font-size: 0.3rem;
                color: #333;
                display: flex;
                align-items: center;
                border-bottom: 0.01rem solid #ddd;
                span {
                    display: block;
                    float: left;
                    margin-right: 0.13rem;
                    width: 0.03rem;
                    height: 0.32rem;
                    background:#51c1ea;
                }
            }
            .content {
                padding-top: 0.3rem;
                box-sizing: border-box;
                .row {
                    margin-bottom: 0.19rem;
                    display: flex;
                    span {
                        width: 2.06rem;
                        display: block;
                        font-size: 0.26rem;
                        color: #333;
                    }
                    i {
                        display: block;
                        flex: 1;
                        font-size: 0.26rem;
                        color: #666;
                    }
                }
            }
        }
    }
    .mar {
        margin-top: 0.5rem;
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
    .l-beijingdaoheze {
        width: 0.39rem;
        height: 0.11rem;
        display: inline-block;
        background: url("../../../../static/images/xdybihjmtb.png") no-repeat center;
        background-size: 100% 100%;
        display: inline-block;
    }
    .l-xiaozi-14 {
        font-size: 14px;
        color: #666;
    }
</style>
