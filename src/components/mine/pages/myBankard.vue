<template>
    <div class="mssage">
        <div class="l-index-top">
            <i @touchstart="fanhui()" class="l-top-dingwei-i"></i>
            <span class="l-top-biaoti">我的银行卡</span>
        </div>
        <div v-if="list.length !== 0" class="yinhangka-lists">
            <div
                v-for="(item, index) in list"
                class="yinhangka-list">
                <div>
                    <span class="sp1">{{item.bank}}</span>
                    <span class="sp2">{{item.cardType}}</span>
                    <span class="sp3">{{item.accountNo}}</span>
                </div>
                <span class="yinlian"></span>


            </div>
        </div>
        <div @click="bangding()" v-if="list.length !== 0" class="tianjia-ka">
            <span class="sp1">添加银行卡</span>
            <span class="sp2"></span>
        </div>
        <div class="ynhhkaks-div" v-if="list.length === 0">
            <span class="ynhhkaks"></span>
            <span class="ynhhkaks-sp">还没有绑定银行卡</span>
            <div @click="bangding()">立即绑定</div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                list: ['1'],
            }
        },
        mounted() {
            this.getYinhangka()
        },
        computed: {

        },

        methods: {
            bangding() {
                this.$router.push('/bangdingka')
            },

            fanhui() {
                history.go(-1)
            },

            getYinhangka() {
                var th = this
                var data = {
                    userId: localStorage.userId,
                    currentPage: 1,
                    pageSize: 0,
                }
                this.ajax.get('/common/api/getBankList', {params: data})
                    .then((r) => {
                        if (r.resultCode === 0) {
                            var data = r.data
                            var xinghao = '*** **** **** **** '
                            for (var i = 0; i < data.length; i++) {
                                var item = data[i]
                                item.accountNo = xinghao + item.accountNo.slice(-4)
                            }
                            th.list = data
                        } else {
                            th.list = []
                        }
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>

    .tianjia-ka {
        width: 100%;
        height: 0.86rem;
        background: #fff;
        display: flex;
        justify-content: space-between;
        padding: 0 0.3rem;
        font-size: 0.3rem;
        color: #333333;
        align-items: center;
        margin-top: 0.3rem;
        .sp2 {
            background: url("../../../../static/images/yinhangkajiantou.png") no-repeat center;
            background-size: 100% 100%;
            opacity: 0.7;
            width: 0.16rem;
            height: 0.3rem;
        }
    }

    .mssage {
        background-color: #f2f2f2;
    }

    .yinhangka-lists {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 0 0.3rem;
        box-sizing: border-box;
        .yinhangka-list {
            width: 100%;
            height: 2rem;
            background: linear-gradient(to right, #69a9e6, #6987db);
            margin-top: 0.3rem;
            border-radius: 0.1rem;
            position: relative;
            padding-left: 1.12rem;
            box-sizing: border-box;
            .yinlian {
                position: absolute;
                width: 0.64rem;
                height: 0.64rem;
                background: #fff url("../../../../static/images/yinlian.png") no-repeat center;
                background-size: 80% 80%;
                border-radius: 50%;
                top: 0.3rem;
                left: 0.3rem;
            }
            div {
                display: flex;
                flex-direction: column;
                .sp1 {
                    font-size: 0.32rem;
                    color: #ffffff;
                    margin-top: 0.32rem;
                    line-height: 0.32rem;
                }
                .sp2 {
                    font-size: 0.22rem;
                    color: #ffffff;
                    margin-top: 0.1rem;
                    line-height: 0.22rem;
                }
                .sp3 {
                    font-size: 0.38rem;
                    color: #ffffff;
                    margin-top: 0.26rem;
                    line-height: 0.38rem;
                }
            }
        }
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
    }
</style>
