<template>
    <div class="pinche">
        <div class="mineTop">
            <div class="l-index-top">
                <i @touchstart="fanhui()" class="l-top-dingwei-i"></i>
                <span class="l-top-biaoti">拼车详情</span>
            </div>
            <div class="l-pinche-body">
                <div class="l-mypage-lists">
                    <div :style="{'width': w + 55 + 'px'}"
                         class="l-mypage-list"
                    >
                        <a :style="{'width': w + 'px'}" class="l-list-a" href="javascript:">
                            <div class="l-mypage-info-sss">
                                <img :src="data.head" alt="">
                                <div class="div1">
                                    <div class="div2">
                                        <div class="div3">
                                            <span>{{data.fromAreaName3}}</span>
                                            <i class="l-beijingdaoheze"></i>
                                            <span>{{data.toAreaName3}}</span>
                                        </div>
                                        <span>{{data.createTime}}</span>
                                    </div>
                                    <span class="l-xiaozi-14">
                                        体积{{data.cube}}立方米；
                                        重{{data.weight}}kg；
                                        货物类型{{data.goodsType}}</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="huowuxinxi">
                    <div class="toubu">
                        <span class="sp1"></span>
                        <span class="sp2">发货物信息</span>
                    </div>
                    <div class="infos">
                        <span class="sp1">姓名:</span>
                        <span class="sp2">{{data.name}}</span>
                    </div>
                    <div class="infos">
                        <span class="sp1">联系电话:</span>
                        <span class="sp2">{{data.phone}}</span>
                    </div>
                    <div class="infos">
                        <span class="sp1">体积:</span>
                        <span class="sp2">{{data.cube}}立方米</span>
                    </div>
                    <div class="infos">
                        <span class="sp1">重量:</span>
                        <span class="sp2">{{data.weight}}千克</span>
                    </div>
                    <div class="infos">
                        <span class="sp1">货物类型:</span>
                        <span class="sp2">{{data.goodsType}}</span>
                    </div>
                    <div class="infos">
                        <span class="sp1">货物保险:</span>
                        <span class="sp2">{{data.isBuySafe}}</span>
                    </div>
                    <div class="infos">
                        <span class="sp1">运输方式:</span>
                        <span class="sp2">{{data.getGoodsType}}</span>
                    </div>
                    <div class="infos">
                        <span class="sp1">装车地点:</span>
                        <span @click="__map(data.getAddressXy, data.getAddressInfo)" class="sp2 sp3">
                            {{data.getAddressInfo}}<span @click="__map(data.getAddressXy, data.getAddressInfo)"></span></span>
                    </div>
                    <div class="infos">
                        <span class="sp1">送货地点:</span>
                        <span @click="__map(data.receiveAddressXy, data.receiveAddressInfo)" class="sp2 sp3">
                            {{data.receiveAddressInfo}}
                            <div @click="__map(data.receiveAddressXy, data.receiveAddressInfo)"></div>
                        </span>
                    </div>
                    <div class="infos">
                        <span class="sp1">备注:</span>
                        <span class="sp2 ">{{data.receivePhone}}</span>
                    </div>
                    <div class="toubu tbbu1">
                        <span class="sp1"></span>
                        <span class="sp2">收货物信息</span>
                    </div>
                    <div class="infos">
                        <span class="sp1">收货人:</span>
                        <span class="sp2">{{data.receiveName}}</span>
                    </div>
                    <div class="infos">
                        <span class="sp1">联系电话:</span>
                        <span class="sp2">{{data.receivePhone}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="pinche-yuyue">
            <span @click="yuyue()">预约</span>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'pincheInfo',
        data () {
            return {
                list: [],
                client: {a: ''},
                w: window.innerWidth,
                addr: false,
                chufaOrMudi: '',
                taitou: '',
                iufadi: '出发地',
                mudidi: '目的地',
                data: {}
            }
        },
        mounted() {
            this.getInfo()
        },
        computed: {

        },
        methods: {

            mssage(info, po) {
                this.$Toast({
                    message: info,
                    position: po,
                })
            },

            yuyue() {
                var th = this
                var data = {
                    orderNo: th.data.orderNo,
                    userId: localStorage.userId,
                }
                th.ajax.get('/driver/api/yuyuePC', {params: data})
                    .then((r) => {
                        th.mssage(r.message, 'bottom')
                        if (r.resultCode === 1) {
                            th.$router.push({ path: '/yuyuebaojia', query: { id: th.$route.query.id }});
                        }
                    })
            },

            __map(j, name) {
                j = j.slice(',')
                var ax = localStorage.latitude
                var ay = localStorage.longitude
                var bx = j[0]
                var by = j[1]
                getGaode(ax, ay, bx, by, name)
            },

            getInfo() {
                var th = this
                var id = th.$route.query.id
                var data = {
                    type: 'order',
                    id: id,
                }
                th.ajax.get('/common/api/getOneData', {params: data})
                    .then((r) => {
                        if (r.resultCode === 0) {
                            var data = r.data
                            data.createTime = getDateDiff(data.createTime)
                            data.name = harmoniousName(data.name)
                            data.receiveName = harmoniousName(data.receiveName)
                            data.phone = harmoniousPhone(data.phone)
                            data.receivePhone = harmoniousPhone(data.receivePhone)
                            th.data = data
                        }
                    })
            },
            fanhui() {
                history.go(-1)
            },
            inputCjange(e, key) {
                var value = e.target.value
                this.data[key] = value
            },
            mssage(info, po) {
                this.$Toast({
                    message: info,
                    position: po,
                })
            },
            tijiaoqinche() {
                var th = this
                var data = th.data
                var obj = {
                    fromAreaId1: '请选择出发地',
                    toAreaId1: '请选择目的地',
                    cube: '请输入体积',
                    weight: '请输入重量',
                    price: '请输入预估价格',
                    userId: '请登录',
                }
                for (var i in obj) {
                    if (!data[i]) {
                        th.mssage(obj[i], 'bottom')
                        return
                    }
                }
                this.ajax.post('/driver/api/sijiAddPCMessage', data)
                    .then((r) => {
                        th.mssage(r.message, 'bottom')
                        if (r.resultCode === 0) {

                        }
                    })
            },
            addressChufa(i) {
                this.chufaOrMudi = i
                if (i === '0') {
                    this.taitou = '出发地'
                } else if (i === '1') {
                    this.taitou = '目的地'
                }
                this.addr = true
            },

            wancheng(obj) {
                var th = this
                if (th.chufaOrMudi === '0') {
                    th.iufadi = obj.areaVal.regionName
                    th.data.fromAreaId1 = obj.provinceVal.regionCode
                    th.data.fromAreaId2 = obj.cityVal.regionCode
                    th.data.fromAreaId3 = obj.areaVal.regionCode
                } else {
                    th.mudidi = obj.areaVal.regionName
                    th.data.toAreaId1 = obj.provinceVal.regionCode
                    th.data.toAreaId2 = obj.cityVal.regionCode
                    th.data.toAreaId3 = obj.areaVal.regionCode
                }
                this.addr = false
            },
            quxiao(bl) {
                this.addr = bl
            }
        },
    }
</script>

<style lang="scss" scoped>

    .pinche-yuyue {
        width: 100%;
        padding: 0 0.3rem;
        box-sizing: border-box;
        span {
            width: 100%;
            background: #51c1ea;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 0.86rem;
            border-radius: 0.1rem;
            font-size: 0.36rem;
            color: #ffffff;
            margin: 0.6rem 0;
        }
    }

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
                font-size: 0.24rem;
                position: absolute;
                left: 0;
            }
            .sp3 {
                width: 100%;
                padding-right: 0.6rem;
                box-sizing: border-box;
                max-height: 0.6rem;
                line-height: 0.3rem;
                overflow: hidden;
            }
            .sp2 {
                width: 100%;
                color: #666;
                font-size: 0.24rem;
                div {
                    width: 0.23rem;
                    height: 0.28rem;
                    background: url("../../../static/images/ljsedivi.png") no-repeat center;
                    background-size: 100% 100%;
                    position: absolute;
                    right: 0;
                    top: 0.06rem;
                }
                span {
                    width: 0.23rem;
                    height: 0.28rem;
                    background: url("../../../static/images/hongsedingwei.png") no-repeat center;
                    background-size: 100% 100%;
                    position: absolute;
                    right: 0;
                    top: 0.06rem;
                }
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
        padding: 0.3rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        background: #fff;
    }

    .l-mypage-lists {
        width: 100%;
        display: flex;
        flex-direction: column;
        background: #f2f2f2;
    }

    .l-pinche-button {
        width: 100%;
        padding: 0 15px;
        box-sizing: border-box;
        span {
            margin-top: 35px;
            width: 100%;
            height: 42px;
            color: #fff;
            background: #51c1ea;
            font-size: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
        }
    }

    .l-pinche-beizhu {
        width: 100%;
        height: 155px;
        background: #fff;
        padding: 0 15px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        flex-direction: column;
        span {
            width: 100%;
            margin: 15px 0 10px 0;
            font-size: 14px;
            color: #333;
        }
        .l-pinche-text {
            width: 100%;
            height: 100px;
            margin-bottom: 15px;
            border: solid 1px #ddd;
            border-radius: 5px;
            padding: 10px;
            box-sizing: border-box;
            color: #666;
            font-size: 12px;
        }
    }

    .l-pinchexinxi {
        width: 100%;
        height: 45px;
        padding: 0 15px;
        border-bottom: solid 1px #ddd;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        .input1 {
            color: #51c1ea;
        }
        input {
            width: 75px;
            height: 20px;
            border: none;
            background: #fff;
            color: #999;
            margin: 0 10px 0 20px;
            text-indent: 0;
            font-size: 14px;
            padding: 0;
        }
        .sp1 {
            color: #51c1ea;
            font-size: 16px;
        }
        .sp3 {
            color: #333;
            font-size: 14px;
        }
        .sp2 {
            color: #333;
            font-size: 14px;
            .l-lifangmi {
                position: relative;
                top: -5px;
                font-size: 10px;
                color: #333;
            }
        }
    }

    .l-pinche-index {
        width: 100%;
        background: #fff;
    }



    .l-dao {
        width: 23px;
        height: 23px;
        background: #51c1ea;
        border-radius: 50%;
        color: #fff;
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 10px;
    }

    .l-address-1-1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 130px;
        height: 23px;
        border: solid 1px #51c1ea;
        border-radius: 15px;
        padding: 0 20px;
        box-sizing: border-box;
        span {
            font-size: 14px;
            color: #51c1ea;
        }
    }

    .l-address-1-1-1 {
        width: 8px;
        height: 8px;
        display: inline-block;
        background: url("../../../static/images/xiala.png") no-repeat center;
        background-size: 100% 100%;
    }

    .l-address-1 {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;
        background: #fff;
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

    .l-list-a {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .l-mypage-info-sss {
        display: flex;
        align-items: center;
        color: #333;
        font-size: 15px;
    }

    .l-mypage-img {
        width: 22px;
        height: 22px;
        display: inline-block;
        margin-right: 5px;
    }

    .l-xdybjmtb-lan {
        width: 10px;
        height: 15px;
        background: url("../../../static/images/dingwei.png") no-repeat center;
        background-size: 100% 100%;
        display: inline-block;
        margin-right: 15px;
    }

    .l-xcxitbvi-gr {
        width: 10px;
        height: 15px;
        background: url("../../../static/images/dingwei.png") no-repeat center;
        background-size: 100% 100%;
        display: inline-block;
        margin-right: 15px;
    }

    .l-xcxitbvi-kl {
        width: 10px;
        height: 15px;
        background: url("../../../static/images/dingwei.png") no-repeat center;
        background-size: 100% 100%;
        display: inline-block;
        margin-right: 15px;
    }

    .l-beijingdaoheze {
        background: url("../../../static/images/xdybihjmtb.png") no-repeat center;
        background-size: 100% 100%;
        display: inline-block;
        width: 20px;
        height: 5px;
    }

    .l-xiaozi-14 {
        width: 100%;
        font-size: 0.24rem;
        color: #666;
        line-height: 0.28rem;
        height: 0.56rem;
        overflow: hidden;
    }

    .l-mypage-lists {
        width: 100%;
        display: flex;
        flex-direction: column;
        background: #f2f2f2;
    }

    .l-xiangyou-jiantou-i {
        width: 10px;
        height: 15px;
        background: url("../../../static/images/dingwei.png") no-repeat center;
        background-size: 100% 100%;
        display: inline-block;
        position: absolute;
        right: 15px;
    }

    .l-userInfo {
        display: flex;
        align-items: center;
    }

    .l-biaoqian {
        font-size: 10px;
        color: #51c1ea;
        width: 75px;
        height: 18px;
        background: #fff;
        border-radius: 5px;
        display: flex;
        align-items: center;
        margin-left: 10px;
    }

    .l-biaoqian i {
        width: 10px;
        height: 10px;
        background: url("../../../static/images/dingwei.png") no-repeat center;
        background-size: 100% 100%;
        display: inline-block;
        margin: 0 5px;
    }

    .l-nickname {
        color: #fff;
        font-size: 16px;
    }

    .l-userPhone {
        color: #fff;
        font-size: 12px;
        margin-top: 5px;
    }

    .l-tbxiangzu-infos {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 15px;
        box-sizing: border-box;
    }

    .l-tbxiangzu-s {
        display: flex;
        justify-content: space-between;
        padding-left: 1.7rem;
        box-sizing: border-box;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .l-tbxiang-sss {
        width: 1.7rem;
        height: 1.7rem;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 15px;
    }

    .l-tbxiang-sss img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .l-tbxiangzu {
        width: 100%;
        height: 1.7rem;
        position: absolute;
        bottom: 15px;
        padding: 0 15px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .l-mypage-top {
        width: 100%;
        display: flex;
        justify-content: center;
        height: 30px;
        align-items: center;
        color: #fff;
        font-size: 18px;
        margin-top: 10px;
    }

    .l-touxiang-s {
        width: 100%;
        height: 3.1rem;
        background: #51c1ea;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 15px;
        box-sizing: border-box;
        position: relative;
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

    .l-index-dingdan {
        position: relative;
    }

    .l-index-dingdan .l-xiaohongdian {
        top: -7px;
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
        z-index: 105;
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
        z-index: 105;
    }

    .l-zhongjian-zhongjian-vevk {
        width: 45px;
        height: 30px;
        background: #fff;
        position: absolute;
        z-index: 101;
    }

    .zhongjian-i {
        background: url("../../../static/images/fahuo.png") no-repeat center;
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
        z-index: 105;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 3px;
    }

    .l-mypage-list {
        position: relative;
        background: #fff;
        margin-bottom: 0.1rem;
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #333;
        justify-content: space-between;
        overflow: hidden;
        .l-list-shanchu {
            height: 100%;
            width: 55px;
            background: #f85156;
            display: flex;
            align-items: center;
            justify-content: center;
            span {
                font-size: 16px;
                color: #fff;
            }
        }
        a {
            padding-left: 15px;
            box-sizing: border-box;
            .l-mypage-info-sss {
                .div1 {
                    .l-xiaozi-14 {
                        padding-left: 10px;
                        box-sizing: border-box;
                        margin-top: 10px;
                    }
                    .div2 {
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
                        width: 100%;
                        justify-content: space-between;
                        flex-direction: row;
                        display: flex;
                        padding-left: 10px;
                        box-sizing: border-box;

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
                position: relative;
                padding-left: 60px;
                padding-right: 15px;
                box-sizing: border-box;
                width: 100%;
                img {
                    width: 60px;
                    height: 60px;
                    position: absolute;
                    left: 0;
                    border-radius: 50%;
                }
            }
        }
    }

    .pinche{
        width: 100%;
        height: 100%;
        background: #f2f2f2;
        //max-width: 7.5rem;
        /*=====底部====*/
    }
</style>
