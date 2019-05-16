<template>
    <div class="mssage">
        <div class="l-index-top">
            <i @touchstart="fanhui()" class="l-top-dingwei-i"></i>
            <span class="l-top-biaoti">余额提现</span>
            <span class="sp1"></span>
        </div>
        <div class="top-zhanwei"></div>
        <div class="l-tixian-index">
            <div class="uh">
                <div>
                    <span class="sp1">总金额：</span>
                    <span class="sp2">100元</span>
                </div>
                <div>
                    <span class="sp1">提现金额：</span>
                    <input placeholder="请输入提现金额" class="sp3" type="text">
                </div>
            </div>
            <div class="xw">
                <div class="div1">
                    <span>请选择提现方式</span>
                </div>
                <div class="div2">
                    <div class="mui-input-row mui-radio">
                        <div class="l-tixianfangshi">
                            <i class="l-zhifubao"></i>
                            <span>支付宝</span>
                        </div>
                        <input name="radio1" type="radio">
                    </div>
                </div>
                <div class="div2">
                    <div class="mui-input-row mui-radio">
                        <div class="l-tixianfangshi">
                            <i class="l-zhifubao"></i>
                            <span>微信</span>
                        </div>
                        <input name="radio1" type="radio">
                    </div>
                </div>
                <div class="div2 div3">
                    <div class="mui-input-row mui-radio">
                        <div class="l-tixianfangshi">
                            <i class="l-zhifubao"></i>
                            <span>银行卡</span>
                        </div>
                        <input name="radio1" type="radio">
                    </div>
                </div>
                <div class="div4">
                    <span class="button">确定提现</span>
                    <div class="sp1">
                        <span class="sp2">提现说明：</span>
                        <span class="sp3">1提现说明</span>
                        <span class="sp3">2提现说明</span>
                    </div>
                </div>
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
        mounted() {

        },
        computed: {

        },
        methods: {
            fanhui() {
                history.go(-1)
            }
        }
    }
</script>

<style lang="scss" scoped>

    .l-zhifubao {
        width: 35px;
        height: 35px;
        border-radius: 5px;
        background: url("../../../../static/images/dingwei.png") no-repeat center;
        background-size: 100% 100%;
        margin-right: 10px;
    }

    .l-tixian-index {
        .xw {
            .div4 {
                width: 100%;
                background: #f8f8f8;
                padding: 0 50px;
                display: flex;
                flex-direction: column;
                align-items: center;
                color: #666;
                .sp1 {
                    width: 100%;
                    font-size: 16px;
                    display: flex;
                    flex-direction: column;
                    .sp2 {
                        margin-bottom: 10px;
                    }
                    .sp3 {
                        font-size: 12px;
                        color: #999;
                        margin-bottom: 3px;
                    }
                }
                .button {
                    width: 180px;
                    height: 35px;
                    background: #51c1ea;
                    border-radius: 20px;
                    color: #fff;
                    font-size: 16px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 35px 0;
                }
            }
            .div3 {
                .mui-radio {
                    border-bottom: none!important;
                }
            }
            .div2 {
                width: 100%;
                height: 65px;
                padding-left: 15px;
                box-sizing: border-box;
                display: flex;
                .mui-radio {
                    width: 100%;
                    height: 100%;
                    border-bottom: solid 1px #ddd;
                    .l-tixianfangshi {
                        display: flex;
                        width: 100%;
                        height: 100%;
                        color: #666;
                        font-size: 14px;
                        align-items: center;
                    }
                    input {
                        top: 18px;
                    }
                }
            }
            .div1 {
                width: 100%;
                padding-left: 15px;
                box-sizing: border-box;
                display: flex;
                span {
                    width: 100%;
                    height: 45px;
                    border-bottom: solid 1px #ddd;
                    font-size: 16px;
                    color: #666;
                    display: flex;
                    align-items: center;
                }
            }
            margin-top: 5px;
            width: 100%;
            background: #fff;
            display: flex;
            flex-direction: column;
        }
        .uh {
            background: #fff;
            div {
                width: 100%;
                display: flex;
                align-items: center;
                height: 40%;
                .sp3 {
                    color: #666;
                    width: 50%;
                    border: none;
                    background: none;
                    margin: 0 10px;
                    padding: 0;
                    font-size: 14px;
                }
                .sp2 {
                    color: #f85156;
                }
                .sp1 {
                    color: #333;
                }
            }
            font-size: 14px;
            width: 100%;
            height: 90px;
            padding: 5px 15px 0 15px;
            box-sizing: border-box;
        }
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .l-biaoti-18 {
        font-size: 18px;
        color: #333;
    }

    .l-xiaozi-14 {
        font-size: 14px;
        color: #666;
    }

    .l-mssage-list-body {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding-left: 10px;
        box-sizing: border-box;
    }

    .l-mssage-list-index img {
        width: 45px;
        height: 45px;
        border-radius: 10px;
        border: solid 1px;
        position: absolute;
        left: 0;
    }

    .l-mssage-list-index {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;
        padding-left: 45px;
        box-sizing: border-box;
    }

    .l-mssage-lists {
        width: 100%;
        background: #fff;
        display: flex;
        flex-direction: column;
        padding-left: 15px;
        box-sizing: border-box;
    }

    .l-mssage-list {
        width: 100%;
        height: 78px;
        border-bottom: solid 1px #ddd;
        padding-right: 15px;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
    }

    .l-xuanzhong {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        border: solid 1px #ddd;
        background: url("../../../../static/images/dingwei.png") no-repeat center;
        background-size: 100% 100%;
        display: inline-block;
        margin-right: 10px;
    }

    .l-weixuanzhong {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        border: solid 1px #ddd;
        display: inline-block;
        background: #fff;

    }

    .l-mssage-top {
        width: 100%;
        height: 50px;
        color: #fff;
        font-size: 18px;
        padding: 15px;
        box-sizing: border-box;
        background: #51c1ea;
    }

    // top

    .top-zhanwei {
        width: 100%;
        height: 50px;
    }

    .l-top-info-i {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url("../../../../static/images/dingwei.png") no-repeat center;
        background-size: 100% 100%;
    }

    .l-top-info {
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;
    }

    .l-top-biaoti-q {
        font-size: 18px;
        color: #fff;
        width: 50px;
        text-align: right;
        position: relative;
        z-index: 103;
    }

    .l-top-biaoti {
        /*width: 100%;*/
        top: 0;
        display: flex;
        justify-content: center;
        color: #fff;
        font-size: 18px;
        box-sizing: border-box;
        z-index: 100;
        span {
            height: 50px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .l-top-info-i {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url("../../../../static/images/dingwei.png") no-repeat center;
        background-size: 100% 100%;
    }

    .l-top-dingwei-i {
        display: inline-block;
        width: 80px;
        height: 40px;
        background: url("../../../../static/images/dingwei.png") no-repeat left center;
        background-size: 25% 50%;
        position: relative;
        z-index: 103;
    }

    .l-index-top {
        .sp1 {
            color: #333;
            font-size: 16px;
            width: 80px;
            text-align: right;
            position: relative;
            z-index: 101;
        }
        width: 100%;
        height: 50px;
        padding: 0 15px;
        background: #51c1ea;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        position: fixed;
        top: 0;
        z-index: 102;
    }
</style>
