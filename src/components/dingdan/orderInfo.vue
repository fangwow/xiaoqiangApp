<template>
    <div class="index ubye-index">
        <div class="l-index-top">
            <i @touchstart="fanhui()" class="l-top-dingwei-i"></i>
            <span class="l-top-biaoti">途中</span>
        </div>
        <div class="top-zhanwei"></div>
        <div class="l-index-body">
            <div class="zaituzhong">
                <span class="sp1"></span>
                <span class="sp2">路途遥远请小心驾驶</span>
                <!--<span class="sp3">距卸货还有：<span style="color: #58c3e0">19小时23分</span></span>-->
                <span class="sp3">请使用高德地图货车模式!</span>
            </div>
            <div class="dydjxnxi-xdqy">
                <img :src="data.url" alt="">
                <div class="dydjxnxi-xdqy-div">
                    <span class="dydjxnxi-xdqy-sp1">收 货 人 ：<span>{{data.name}}</span></span>
                    <span class="dydjxnxi-xdqy-sp2">联系方式：
                        <a :href="'tel:' + data.phone" class="sp1">{{data.phone}}</a>
                        <a :href="'tel:' + data.phone" class="sp2"></a>
                    </span>
                    <span class="dydjxnxi-xdqy-sp3"><span class="sp9">收货地址：</span>
                        <span @click="__map()" class="sp1">{{data.address}}</span>
                        <span @click="__map()" class="sp2"></span>
                    </span>
                </div>
            </div>
            <div id="popover" class="mui-popover">
                <ul class="mui-table-view">
                    <span class="sp1">确定到达目的</span>
                    <div>
                        <span class="sp2" @click="daoda()" >确定</span>
                        <span class="sp3" @click="quxiao()">取消</span>
                    </div>
                </ul>
            </div>
            <div class="daodamudidi">
                <a href="#popover" id="openPopover">到达目的地</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                data: {
                    name: '',
                    phone: '',
                    address: '',
                    url: '',
                },
                ax: localStorage.longitude,
                ay: localStorage.latitude,
                bx: '',
                by: '',
                orderNo: '',
            }
        },

        mounted() {
            this.getOne()
        },

        methods: {

            quxiao() {
                mui('.mui-popover').popover('toggle',document.getElementById("openPopover"))
            },

            mssage(info, po) {
                this.$Toast({
                    message: info,
                    position: po,
                })
            },

            daoda() {
                var th = this
                var data = {
                    orderNo: th.orderNo,
                    orderStatusId: '7'
                }
                th.ajax.post('/driver/api/orderDriverUpdateStatus', data)
                    .then((r) => {
                        th.mssage(r.message, 'bottom')
                        if (r.resultCode === 0) {
                            this.$router.push('/order')
                        }
                    })
            },

            __map() {
                var ax = this.ax
                var ay = this.ay
                var bx = this.ay
                var by = this.ay
                var name = this.data.address
                getGaode(ax, ay, bx, by, name)
            },

            getOne() {
                var th = this
                var data = {
                    id: th.$route.query.id,
                    type: 'order',
                }
                th.ajax.get('/common/api/getOneData', {params: data})
                    .then((r) => {
                        if (r.resultCode === 0) {
                            th.data = {
                                name: r.data.receiveName,
                                phone: r.data.receivePhone,
                                address: r.data.receiveAddressInfo,
                                url: r.data.head,
                            }
                            th.bx = r.data.receiveAddressXy.split(',')[0]
                            th.by = r.data.receiveAddressXy.split(',')[1]
                            th.orderNo = r.data.orderNo
                        } else {
                            th.mssage(r.message, 'bottom')
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

    .mui-table-view {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 2rem;
        div {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            bottom: 0.4rem;
        }
        .sp1 {
            color: #333;
            font-size: 0.32rem;
            position: absolute;
            top: 0.3rem;
        }
        .sp2 {
            font-size: 0.28rem;
            margin: 0 0.2rem;
            background-color: #58c3e0;
            border-radius: 0.1rem;
            width: 1.1rem;
            height: 0.5rem;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .sp3 {
            font-size: 0.28rem;
            margin: 0 0.2rem;
            width: 1.1rem;
            height: 0.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #d24842;
            border: solid 1px #d24842;
            border-radius: 0.1rem;
        }
    }

    .dydjxnxi-xdqy {
        width: 100%;
        border-top: 0.1rem solid #f2f2f2;
        height: 2.46rem;
        display: flex;
        align-items: center;
        position: relative;
        padding: 0.44rem 0.3rem 0.44rem 1.9rem;
        box-sizing: border-box;
        img {
            position: absolute;
            left: 0.3rem;
            width: 1.3rem;
            height: 1.3rem;
        }
        .dydjxnxi-xdqy-div {
            width: 100%;
            display: flex;
            flex-direction: column;
            font-size: 0.26rem;
            .dydjxnxi-xdqy-sp1 {
                span {
                    color: #666;
                }
            }
            .dydjxnxi-xdqy-sp2 {
                .sp1 {
                    color: #666;
                }
                .sp2 {
                    width: 0.28rem;
                    height: 0.28rem;
                    background: url("../../../static/images/dianhuahahah.png") no-repeat center;
                    background-size: 100% 100%;
                    position: absolute;
                    right: 0.3rem;
                }
            }
            .dydjxnxi-xdqy-sp3 {
                width: 100%;
                position: relative;
                padding-left: 1.3rem;
                padding-right: 0.4rem;
                box-sizing: border-box;
                .sp9 {
                    position: absolute;
                    left: 0;
                    width: 1.3rem;
                }
                .sp1 {
                    color: #59c3e0;
                    width: 3.3rem;
                    line-height: 0.36rem;
                    height: 0.72rem;
                    overflow: hidden;
                }
                .sp2 {
                    width: 0.28rem;
                    height: 0.28rem;
                    background: url("../../../static/images/hongsedingwei.png") no-repeat center;
                    background-size: 100% 100%;
                    position: absolute;
                    right: 0;
                    top: 0.06rem;
                }
            }
        }
    }

    .zaituzhong {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 4.9rem;
        background: #fff;
        .sp1 {
            background: url("../../../static/images/ubyebj.png") no-repeat center;
            background-size: 100% 100%;
            width: 3.86rem;
            height: 2rem;
            margin-top: 0.7rem;
            display: flex;
        }
        .sp2 {
            font-size: 0.32rem;
            color: #58c3e0;
            margin-top: 0.2rem;
        }
        .sp3 {
            font-size: 0.26rem;
            color: #333333;
            margin-top: 0.19rem;
        }
    }

    .daodamudidi {
        width: 100%;
        height: 4.6rem;
        background: #f2f2f2;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 0.3rem;
        box-sizing: border-box;
        a {
            width: 100%;
            height: 0.86rem;
            background: #51c1ea;
            color: #fff;
            font-size: 0.36rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0.1rem;
        }
    }

    .ubye-index {
        .kong {
            position: fixed;
            top: 0;
            width: 100%;
            height: 100vh;
            background: #f2f2f2;
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
                width: 30%;
                margin-top: 40%;
                margin-bottom: 30px;
            }
            span {
                color: #999;
                font-size: 12px;
            }
        }
    }

    .l-index-dingdan {
        position: relative;
    }

    .l-index-dingdan .l-xiaohongdian {
        top: -7px;
    }

    .l-index-jiwdanshuoming {
        font-size: 14px;
        width: 100%;
        padding: 0 50px;
        box-sizing: border-box;
        color: #333;
        margin: 40px 0 10px 0;
    }

    .l-index-img-1 {
        width: 75px;
        height: 75px;
        margin-top: 25px;
    }

    .l-index-img-2 {
        width: 200px;
        height: 100px;
        margin-top: 40px;
    }

    .l-index-shuoming {
        width: 100%;
        padding: 0 50px;
        box-sizing: border-box;
    }

    .l-index-shuoming span {
        width: 100%;
        font-size: 14px;
        color: #333;
    }

    .l-index-shuoming div {
        font-size: 12px;
        color: #666;
        line-height: 20px;
    }

    .l-index-body {
        .buttons {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            box-sizing: border-box;
            margin: 15px 0 35px 0;
            .sp1 {
                border: solid 1px #51c1ea;
                color: #51c1ea;
            }
            .sp2 {
                color: #fff;
                background: #51c1ea;
            }
            span {
                width: 150px;
                height: 42px;
                border-radius: 5px;
                font-size: 16px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        .imgs {
            padding-left: 15px;
            box-sizing: border-box;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            /*justify-content: space-around;*/
            .sp2 {
                position: absolute;
                left: 10066px;
                height: 0;
            }
            .sp1 {
                margin: 0 15px 15px 0;
                border: solid 1px #ddd;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                img {

                }
            }
        }
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        background: #fff;
        .huowuxinxi {
            .infos {
                width: 100%;
                display: flex;
                position: relative;
                padding-left: 95px;
                box-sizing: border-box;
                margin-bottom: 5px;
                .sp1 {
                    width: 95px;
                    color: #666;
                    font-size: 12px;
                    position: absolute;
                    left: 0;
                }
                .sp2 {
                    width: 100%;
                    color: #666;
                    font-size: 12px;
                }
            }
            .tbbu1 {
                margin-top: 10px;
            }
            .toubu {
                .sp1 {
                    width: 2px;
                    height: 16px;
                    background: #51c1ea;
                    position: relative;
                    top: 3px;
                    margin-right: 5px;
                }
                .sp2 {
                    color: #333;
                    font-size: 16px;
                }
                height: 30px;
                width: 100%;
                border-bottom: solid 1px #ddd;
                display: flex;
                margin-bottom: 15px;
            }
            width: 100%;
            padding: 0 15px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
        }
        .top {
            width: 100%;
            height: 65px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            .sp1 {
                color: #51c1ea;
            }
            .sp2 {
                color: #fff;
                background: url("../../../static/images/dkdajmtb.png") no-repeat center;
                background-size: 100% 100%;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 25px;
                height: 25px;
                margin: 0 25px;
            }
        }
    }

    .l-index-body-button {
        width: 145px;
        height: 45px;
        background: #51c1ea;
        border-radius: 5px;
        border: none;
        color: #fff;
        font-size: 16px;
        margin-top: 60px;
    }

    .l-top-biaoti {
        width: 100%;
        top: 0;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 0.36rem;
        padding: 0 50px 0 20px;
    }

    .l-xiaohongdian {
        min-width: 15px;
        max-width: 25px;
        height: 15px;
        border-radius: 50%;
        background: #f85156;
        color: #fff;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 7px;
        right: 18px;
        padding: 0 4px;
    }

    .l-top-info {
        width: 70px;
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;
        .l-xiaohongdian {
            right: -7px;
        }
    }

    .l-top-info-i {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url("../../../static/images/dingwei.png") no-repeat center;
        background-size: 100% 100%;
    }

    .top-zhanwei {
        width: 100%;
        height: 50px;
    }

    .l-top-dingwei-i {
        display: inline-block;
        width: 40px;
        height: 40px;
        background: url("../../../static/images/fanhuixiangyb.png") no-repeat left center;
        background-size: 0.2rem 0.36rem;
        position: relative;
        z-index: 103;
    }

    .l-index-top {
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
        z-index: 130;
    }

    .isActive {
        font-size: 10px;
        color: #51c1ea!important;
    }

    .l-jiehuo {
        color: #000;
        font-size: 12px;
        position: absolute;
        bottom: 6px;
        background: #fff;
        z-index: 102;
    }

    .l-zhongjian-div {
        position: absolute;
        width: 40px;
        height: 100%;
        display: flex;
        justify-content: center;
        top: 0;
        z-index: 105;
    }

    .l-zhongjian {
        width: 40px;
        height: 40px;
        background: #fff;
        border-radius: 50%;
        position: relative;
        top: -10px;
        display: flex;
        justify-content: center;
    }

    .l-zhongjian-zhongjian-vevk {
        width: 45px;
        height: 30px;
        background: #fff;
        position: absolute;
        z-index: 101;
    }

    .zhongjian-i {
        background: url("../../../static/images/fahuo1.png") no-repeat center;
        background-size: 100% 100%;
        display: inline-block;
        width: 30px;
        height: 30px;
    }

    .l-zhongjian-zhongjian {
        width: 30px;
        height: 30px;
        /*background: #51c1ea;*/
        border-radius: 50%;
        z-index: 102;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 3px;
    }

    .index{
        width: 100%;
        height: 100%;
        background: #f6f6f6;
    }



</style>
