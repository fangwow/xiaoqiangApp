<template>
    <div class="pinche">
        <div class="mineTop">
            <div class="l-index-top">
                <span class="l-top-biaoti">智能拼车</span>
                <span class="caidan" @click="quliebiao()"></span>
            </div>
            <div class="l-pinche-body">
                <div class="l-address-1">
                    <div @click="addressChufa('0')" class="l-address-1-1">
                        <span>{{iufadi.length > 5 ? iufadi.slice(0, 5) + '..' : iufadi}}</span>
                        <i class="l-address-1-1-1"></i>
                    </div>
                    <span class="l-dao">到</span>
                    <div @click="addressChufa('1')" class="l-address-1-1">
                        <span>{{mudidi.length > 5 ? mudidi.slice(0, 5) + '..' : mudidi}}</span>
                        <i class="l-address-1-1-1"></i>
                    </div>
                </div>
                <div class="l-pinche-index">
                    <div class="l-pinchexinxi">
                        <span class="sp1">拼车信息</span>
                    </div>
                </div>
                <div class="l-pinche-index">
                    <div class="l-pinchexinxi">
                        <span class="sp3">可承载体积</span>
                        <input :value="data.cube" @change="(e) => inputCjange(e, 'cube')" placeholder="请输入体积" type="number">
                        <span class="sp2">m<span class="l-lifangmi">3</span></span>
                    </div>
                </div>
                <div class="l-pinche-index">
                    <div class="l-pinchexinxi">
                        <span class="sp3">可承载重量</span>
                        <input :value="data.weight" @change="(e) => inputCjange(e, 'weight')" placeholder="请输入重量" type="number">
                        <span class="sp2">kg</span>
                    </div>
                </div>
                <div class="l-pinche-index">
                    <div class="l-pinchexinxi">
                        <span class="sp3">预估算运费</span>
                        <input :value="data.price" @change="(e) => inputCjange(e, 'price')" class="input1" placeholder="请输入运费" type="tel">
                        <span class="sp2">元</span>
                    </div>
                </div>
                <div class="l-pinche-beizhu">
                    <span>备注</span>
                    <textarea placeholder="请填写备注" :value="data.remark" @change="(e) => inputCjange(e, 'remark')" class="l-pinche-text"></textarea>
                </div>
                <div class="l-pinche-button">
                    <span @click="tijiaoqinche()">确认</span>
                </div>
            </div>
        </div>

        <addr :quansheng="quansheng" :taitou="taitou" @wancheng="wancheng" @quxiao="quxiao" v-if="addr"></addr>

        <!-- 底部 -->
        <div style="width: 100%; height: 60px; background: none"></div>
        <div class="footer">
            <ul>
                <li @touchstart="jump(0)">
                    <div class="l-index-dingdan isActive">
                        <div class="top"><img src="../../../static/images/hy_index1.png" alt=""></div>
                        <div class="bottom">拼车</div>
                    </div>
                </li>
                <li @touchstart="jump(1)">
                    <div class="l-index-dingdan">
                        <div class="top"><img src="../../../static/images/hy_fenlei.png" alt=""></div>
                        <div class="bottom">订单</div>
                        <span class="l-xiaohongdian">1</span>
                    </div>
                </li>
                <li>
                </li>
                <li @touchstart="jump(3)">
                    <div class="l-index-dingdan">
                        <div class="top"><img src="../../../static/images/hy_mine.png" alt=""></div>
                        <div class="bottom">消息</div>
                        <span class="l-xiaohongdian">1</span>
                    </div>
                </li>
                <li @touchstart="jump(4)">
                    <div class="">
                        <div class="top"><img src="../../../static/images/hy_wode.png" alt=""></div>
                        <div class="bottom">我的</div>
                    </div>
                </li>
            </ul>
            <div @touchstart="jump(2)" class="l-zhongjian-div">
                <div class="l-zhongjian-zhongjian-vevk"></div>
                <div class="l-zhongjian">
                    <div class="l-zhongjian-zhongjian">
                        <i class="zhongjian-i"></i>
                    </div>
                </div>
                <span class="l-jiehuo">接货</span>
            </div>
        </div>
    </div>
</template>

<script>
    import addr from '@/components/compo/address'

    export default {
        name: 'pinche',
        data () {
            return {
                quansheng: true,
                w: window.innerWidth,
                addr: false,
                chufaOrMudi: '',
                taitou: '',
                iufadi: '出发地',
                mudidi: '目的地',
                data: {
                    cube: '',
                    fromAreaId1: '',
                    fromAreaId2: '',
                    fromAreaId3: '',
                    price: '',
                    remark: '',
                    toAreaId1: '',
                    toAreaId2: '',
                    toAreaId3: '',
                    userId: localStorage.userId,
                    weight: '',
                    goodsType: '1'
                },
            }
        },
        components: { addr },
        mounted() {

        },
        computed: {

        },
        methods: {
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
                            var o = {
                                fromAreaId1: data.fromAreaId1,
                                fromAreaId2: data.fromAreaId2,
                                fromAreaId3: data.fromAreaId3,
                                toAreaId1: data.toAreaId1,
                                toAreaId2: data.toAreaId2,
                                toAreaId3: data.toAreaId3,
                                id: r.data.id,
                            }
                            th.$router.push({ path: '/pincheList', query: { data: JSON.stringify(o) }});
                        }
                    })
            },

            quliebiao() {
                var o = {
                    fromAreaId1: localStorage.address1,
                    fromAreaId2: localStorage.address2,
                    fromAreaId3: localStorage.address3,
                }
                this.$router.push({ path: '/pincheList', query: { data: JSON.stringify(o) }});
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

            jump(idx) {
                var herfs = ['/pinche', '/order', '/index', '/infos', 'mypage']
                this.$router.push(herfs[idx])
            },

            wancheng(obj) {
                var th = this
                var o = {}
                for (var i in obj) {
                    if (obj[i].areaId === null) {
                        o = obj[i]
                        break
                    }
                    o = obj.areaVal
                }
                if (th.chufaOrMudi === '0') {
                    th.iufadi = o.regionName1 || o.regionName
                    th.data.fromAreaId1 = obj.provinceVal.regionCode
                    th.data.fromAreaId2 = obj.cityVal.regionCode
                    th.data.fromAreaId3 = obj.areaVal.regionCode
                } else {
                    th.mudidi = o.regionName1 || o.regionName
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


    .caidan {
        width: 0.5rem;
        height: 0.4rem;
        position: absolute;
        right: 0.3rem;
        background: url("../../../static/images/caidan.png") no-repeat center;
        background-size: 100% 100%;
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
        background: #f2f2f2;
    }

    .l-top-dingwei-i {
        display: inline-block;
        width: 40px;
        height: 40px;
        background: url("../../../static/images/dingwei.png") no-repeat left center;
        background-size: 50% 50%;
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
        height: 50px;
        padding: 0 15px;
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
        background: url("../../../static/images/dingwei.png") no-repeat center;
        background-size: 100% 100%;
        display: inline-block;
        width: 20px;
        height: 5px;
    }

    .l-xiaozi-14 {
        font-size: 14px;
        color: #666;
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

    .pinche{
        width: 100%;
        height: 100%;
        background: #f6f6f6;
        //max-width: 7.5rem;
        /*=====底部====*/
        .footer{
            // max-width: 7.5rem;
            z-index: 99;
            padding: 2px 0;
            background-color: #ffffff;
            height: 50px;
            width: 100%;
            position: fixed;
            bottom:0;
            left: 0;
            right:0;
            margin: auto;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            ul{
                width: 100%;
                display: flex;
                justify-content: space-around;
                font-size: 12px;
                height: 100%;
                align-items: center;
                z-index: 99;
                position: relative;
                li{
                    width: 20%;
                    div{
                        .top{
                            height: 0.4rem;
                            text-align: center;
                            img{
                                height: 100%;
                            }
                        }
                        .bottom{
                            text-align: center;
                        }
                    }
                    .isActive{
                        color: #9d792a;
                        font-size: 10px;
                    }
                }
            }

        }
    }
</style>
