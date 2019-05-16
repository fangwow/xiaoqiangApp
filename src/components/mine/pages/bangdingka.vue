<template>
    <div class="mssage">
        <div class="l-index-top">
            <i @touchstart="fanhui()" class="l-top-dingwei-i"></i>
            <span class="l-top-biaoti">填写银行卡信息</span>
        </div>
        <div class="yinhangka-jia-div">
            <div style="width: 100%; height: 0.86rem"></div>
            <span class="sp1">信息加密处理，只用于银行验证</span>
            <div class="yinhangka-jia-div1">
                <div class="yinhangka-jia-div11">
                    <span class="sp11">卡号</span>
                    <input
                        :value="data.accountNo"
                        @input="(e) => inputChange(e, 'accountNo')"
                        placeholder="银行卡号" type="text">
                    <span class="bixuan"></span>
                </div>
            </div>
            <div style="margin-bottom: 0.3rem" class="yinhangka-jia-div1">
                <div style="border: none" class="yinhangka-jia-div11">
                    <span class="sp11">手机号</span>
                    <input
                        :value="data.mobile"
                        @input="(e) => inputChange(e, 'mobile')"
                        placeholder="银行预留手机号" type="text">
                    <span class="bixuan"></span>
                </div>
            </div>
            <div class="yinhangka-jia-div1">
                <div class="yinhangka-jia-div11">
                    <span class="sp11">持卡人</span>
                    <input
                        :value="data.name"
                        @input="(e) => inputChange(e, 'name')"
                        placeholder="持卡人姓名" type="text">
                    <span class="bixuan"></span>
                </div>
            </div>
            <div class="yinhangka-jia-div1">
                <div class="yinhangka-jia-div11">
                    <span class="sp11">证件类型</span>
                    <span class="sp11 sp12">身份证</span>
                </div>
            </div>
            <div style="margin-bottom: 0.3rem" class="yinhangka-jia-div1">
                <div style="border: none" class="yinhangka-jia-div11">
                    <span class="sp11">证件号</span>
                    <input
                        :value="data.idCard"
                        @input="(e) => inputChange(e, 'idCard')"
                        placeholder="证件号码" type="text">
                    <span class="bixuan"></span>
                </div>
            </div>
            <div class="yinhangka-jia-div1">
                <div style="border: none" class="yinhangka-jia-div11">
                    <span class="sp11">卡类型</span>
                    <span class="sp11 sp12">卡类型</span>
                </div>
            </div>
            <div class="yshuxxyi">
                <span class="sp1"></span>
                <span class="sp2">同意</span>
                <span class="sp3">《用户支付协议》</span>
            </div>
            <div class="bhka-xwyibu">
                <span>下一步</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                list: [],
                data: {
                    accountNo: "",
                    idCard: "",
                    mobile: "",
                    name: "",
                }
            }
        },
        mounted() {

        },
        computed: {

        },

        methods: {
            inputChange(e, key) {
                this.data[key] = e.target.value
                var data = this.data
                log(data.accountNo.length > 15 && data.mobile.length === 11
                    && data.name.length > 2 && data.idCard.length === 18)
                if (data.accountNo.length === 16 && data.mobile.length === 11
                    && data.name.length > 2 && data.idCard.length === 18) {
                    this.bangding(data)
                }
            },

            mssage(info, po) {
                this.$Toast({
                    message: info,
                    position: po,
                })
            },

            bangding(data) {
                data.userId = localStorage.userId
                this.ajax.post('/common/api/addUserBank', data)
                .then((r) => {
                    if (r.resultCode === 0) {
                        // this.$router.push('/myBankard')
                    }
                })
            },

            fanhui() {
                history.go(-1)
            },

        }
    }
</script>

<style lang="scss" scoped>

    .yshuxxyi {
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 0.24rem;
        padding-left: 0.3rem;
        box-sizing: border-box;
        .sp1 {
            width: 0.3rem;
            height: 0.3rem;
            background: url("../../../../static/images/xrvsdvhk.png") no-repeat center;
            background-size: 100% 100%;
        }
        .sp2 {
            margin-left: 0.1rem;
        }
        .sp3 {
            color: #75c1dd;
        }
    }

    .bhka-xwyibu {
        width: 100%;
        padding: 0 0.3rem;
        box-sizing: border-box;
        span {
            width: 100%;
            height: 0.86rem;
            background: #51c1ea;
            color: #fff;
            font-size: 0.36rem;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 0.1rem;
        }
    }

    .yinhangka-jia-div {
        width: 100%;
        background: #f2f2f2;
        height: 100vh;
        display: flex;
        flex-direction: column;
        .sp1 {
            font-size: 0.26rem;
            color: #666666;
            margin: 0.3rem 0;
            padding-left: 0.3rem;
            box-sizing: border-box;
        }
        .yinhangka-jia-div1 {
            width: 100%;
            height: 0.87rem;
            padding-left: 0.3rem;
            box-sizing: border-box;
            background: #fff;
            .yinhangka-jia-div11 {
                position: relative;
                width: 100%;
                height: 100%;
                border-bottom: solid 1px #ddd;
                display: flex;
                align-items: center;
                .bixuan {
                    width: 0.36rem;
                    height: 0.36rem;
                    background: url("../../../../static/images/gantanhaobixuan.png") no-repeat center;
                    background-size: 100% 100%;
                    position: absolute;
                    right: 0.3rem;
                }
                input {
                    background: none;
                    border: none;
                    width: 50%;
                    height: 100%;
                    padding: 0;
                    margin: 0;
                    position: absolute;
                    left: 1.78rem;
                    font-size: 0.3rem;
                    color: #999;
                }
                .sp12 {
                    position: absolute;
                    left: 1.78rem;
                }
                .sp11 {
                    font-size: 0.3rem;
                    color: #333333;
                }
            }
        }
    }

    .mssage {
        background-color: #f2f2f2;
    }

    .ynhhkaks-div {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 0.3rem;
        box-sizing: border-box;
        .ynhhkaks {
            width: 2rem;
            height: 1.52rem;
            background: url("../../../../static/images/ynhhkaks.png") no-repeat center;
            background-size: 100% 100%;
            margin-top: 1.52rem;
        }
        .ynhhkaks-sp {
            font-size: 0.32rem;
            color: #333333;
            margin-top: 0.36rem;
            margin-bottom: 0.75rem;
        }
        div {
            width: 100%;
            height: 0.86rem;
            background-color: #51c1ea;
            border-radius: 0.1rem;
            font-size: 0.36rem;
            color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
        }
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
        width: 100%;
        top: 0;
        height: 0.86rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 18px;
        padding: 0 50px 0 20px;
        box-sizing: border-box;
        position: absolute;
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
        width: 40px;
        height: 40px;
        background: url("../../../../static/images/fanhuixiangyb.png") no-repeat left center;
        background-size: 0.2rem 0.36rem;
        position: relative;
        z-index: 103;
    }

    .l-index-top {
        width: 100%;
        height: 0.86rem;
        padding: 0 0.3rem;
        background: #51c1ea;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        position: fixed;
        top: 0;
    }
</style>
