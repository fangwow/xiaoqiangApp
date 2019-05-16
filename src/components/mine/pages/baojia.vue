<template>
    <div class="mssage">
        <div class="l-index-top">
            <i @touchstart="fanhui(0)" class="l-top-dingwei-i"></i>
            <span class="l-top-biaoti">报价</span>
            <span @touchstart="fanhui(1)" class="sp2">添加</span>
        </div>
        <div class="top-zhanwei"></div>
        <div class="l-yaoqingma">
            <div v-for="(item, index) in list" class="list">
                <div class="weinanwopanghu">
                    <div class="uh">
                        <span class="xianlu xianlu1">线路{{index + 1}}</span>
                        <div class="div1">
                            <span class="">{{item.fromAreaId3}}</span>
                            <i></i>
                            <span>{{item.toAreaId3}}</span>
                        </div>
                        <span v-if="item.reviewedStatus === '-1'" class="sp9 sp6">审核中</span>
                        <span v-else-if="item.reviewedStatus === '1'" class="sp9 sp8">已通过审核</span>
                        <span v-else class="sp9 sp7">未通过审核</span>
                    </div>
                </div>
                <div class="xw">
                    <span class="sp1">货物类型：{{item.goodsType}}</span>
                    <span class="sp1">体积：{{item.volume}}m<div class="lifang">3</div></span>
                    <span class="sp1">重量：{{item.weight}}kg</span>
                    <span class="sp1">价格：{{item.price}}元</span>
                </div>
                <div class="bianji">
                    <span @touchstart="fanhui(2, item.id)">编辑</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                list: [],
            }
        },
        mounted() {
            this.getBaojia()
        },
        computed: {

        },
        methods: {
            getBaojia() {
                var th = this
                var data = {
                    userId: localStorage.userId,
                    pageSize: '10',
                    currentPage: '1'
                }
                th.ajax.get('/driver/api/d_DriverPriceCommitList', {params: data})
                    .then((r) => {
                        if (r.resultCode === 0) {
                            th.list = r.data
                        }
                    })
            },
            fanhui(i, id) {
                if (i === 1) {
                    this.$router.push('/tianjiabaojia')
                } else if (i === 2) {
                    this.$router.push({ path: '/tianjiabaojia', query: { id: id }});
                } else {
                    history.go(-1)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

    .lifang {
        font-size: 10px;
        position: relative;
        top: -4px;
    }

    .l-yaoqingma {
        width: 100%;
        display: flex;
        flex-direction: column;
        .list {
            background: #fff;
            .bianji {
                width: 100%;
                display: flex;
                align-items: center;
                flex-direction: row-reverse;
                span {
                    width: 50px;
                    height: 25px;
                    background: #51c1ea;
                    color: #fff;
                    font-size: 14px;
                    border-radius: 5px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: 15px;
                    margin-bottom: 15px;
                }
            }
            .xw {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                box-sizing: border-box;
                span {
                    width: 50%;
                    display: flex;
                    align-items: center;
                    color: #666;
                    font-size: 12px;
                    margin-top: 15px;
                    padding: 0 15px;
                    box-sizing: border-box;
                    overflow: hidden;
                }
                margin-bottom: 15px;
            }
            .weinanwopanghu {
                width: 100%;
                height: 55px;
                padding-left: 15px;
                box-sizing: border-box;
                .uh {
                    .div1 {
                        margin-left: 15px;
                        display: flex;
                        align-items: center;
                        i {
                            display: inline-block;
                            width: 20px;
                            height: 6px;
                            background: url("../../../../static/images/xdybihjmtb.png") no-repeat center;
                            background-size: 100% 100%;
                            margin: 0 10px;
                        }
                        span {
                            color: #333;
                            font-size: 14px;
                        }
                    }
                    .sp6 {
                        color: #51c1ea;
                    }
                    .sp8 {
                        color: #333;
                    }
                    .sp7 {
                        color: #f85156;
                    }
                    .sp9 {
                        width: 70px;
                        height: 25px;
                        border-radius: 5px;
                        display: flex;
                        flex-direction: row-reverse;
                        align-items: center;
                        position: absolute;
                        right: 15px;
                        font-size: 14px;
                        text-align: right;
                    }
                    .xianlu {
                        width: 50px;
                        height: 25px;
                        color: #fff;
                        font-size: 14px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .xianlu1 {
                        background: #f29d4b;
                    }
                    .xianlu2 {
                        background: #4e97fa;
                    }
                    .xianlu3 {
                        background: #bc45c6;
                    }
                    position: relative;
                    width: 100%;
                    height: 100%;
                    border-bottom: solid 1px #ddd;
                    display: flex;
                    align-items: center;
                }
            }
            width: 100%;
            display: flex;
            flex-direction: column;
            border-bottom: solid 5px #f2f2f2;
        }
    }

    .l-mssage-bottom-yb {
        display: flex;
        margin-right: 15px;
        .sp1 {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 85px;
            height: 35px;
            color: #51c1ea;
            border: solid 1px #51c1ea;
            font-size: 18px;
            border-radius: 5px;
        }
        .sp2 {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 85px;
            height: 35px;
            color: #fff;
            background: #51c1ea;
            font-size: 18px;
            border-radius: 5px;
            margin-left: 10px;
        }
    }

    .l-mssage-bottom-zo {
        display: flex;
        align-items: center;
        height: 100%;
        margin-left: 15px;
    }

    .l-mssage-bottom-zo span {
        color: #51c1ea;
        font-size: 18px;
    }

    .l-mssage-bottom {
        width: 100%;
        height: 46px;
        position: fixed;
        bottom: 0;
        border-top: solid 1px #ddd;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .l-mssage-list-body-t {
        display: flex;
        justify-content: space-between;
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
        background-size: 30% 45%;
        position: relative;
        z-index: 103;
    }

    .l-index-top {
        .sp2 {
            color: #fff;
            font-size: 16px;
            z-index: 120;
            position: relative;
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
