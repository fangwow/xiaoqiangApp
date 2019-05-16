<template>
    <div class="pinche">
        <div class="mineTop">
            <div class="l-index-top">
                <i @touchstart="fanhui()" class="l-top-dingwei-i"></i>
                <span class="l-top-biaoti">预约报价</span>
            </div>
            <div style="width: 100%; height: 0.86rem"></div>
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
                <div class="yinhangka-jia-div1">
                    <div class="yinhangka-jia-div11">
                        <span class="sp11">预算运费</span>
                        <input
                            :value="yusuan.yunfeiPrice"
                            @input="(e) => inputChange(e, 'yunfeiPrice')"
                            placeholder="0.00" align="right" type="text">
                        <span class="sp19">元</span>
                    </div>
                </div>
                <div style="margin-bottom: 0.1rem" class="yinhangka-jia-div1">
                    <div style="border: none;" class="yinhangka-jia-div11">
                        <span class="sp11">实际里程</span>
                        <input
                            :value="yusuan.licheng"
                            @input="(e) => inputChange(e, 'licheng')"
                            placeholder="0" align="right" type="text">
                        <span class="sp19">公里</span>
                    </div>
                </div>
                <div class="yinhangka-jia-div1">
                    <div class="yinhangka-jia-div11">
                        <span class="sp11">预约时间</span>
                        <span @click="openPicker()" class="sp20">{{uijm}}</span>
                        <span class="bixuan"></span>
                    </div>
                </div>
            </div>
            <div class="tijiao-yuyt">
                <span @click="tijiaobaojia()">提交</span>
            </div>
            <div class="pnieuomy">
                <span class="sp1">拼车说明：</span>
                <span class="sp2">
                    智能拼车，是一款高新产业的业务！司机根据自己的
                    车辆货物并且对路程的控制进行预估价格，并且由平
                    台和货主进行审核！安全！可靠！智能！
                </span>
            </div>
        </div>
        <DatetimePicker
                v-model="pickerVisible"
                ref="picker"
                type="datetime"
                @confirm="handleConfirm"
        >
        </DatetimePicker>
    </div>
</template>

<script>
    import { DatetimePicker } from 'mint-ui';

    export default {
        name: 'yuyuebaojia',
        data () {
            return {
                uijm: '请选择时间',
                pickerVisible: '2018-01-01',
                w: window.innerWidth,
                data: {},
                yusuan: {
                    licheng: '',
                    yunfeiPrice: '',
                },
            }
        },
        components: { DatetimePicker },
        mounted() {
            this.getInfo()
            var date = new Date();
            this.pickerVisible = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        },
        computed: {

        },
        methods: {
            inputChange(e, key) {
                var value = e.target.value
                this.yusuan[key] = value
            },

            tijiaobaojia() {
                var th = this
                var data = {
                    licheng: th.yusuan.licheng,
                    orderNo: th.data.orderNo,
                    userId: localStorage.userId,
                    yunfeiPrice: th.yusuan.yunfeiPrice,
                    yuyueTime: th.uijm,
                }
                th.ajax.post('/driver/api/addOrderPcYuyuePrice', data)
                    .then((r) => {
                        th.mssage(r.message, 'bottom')
                        if (r.resultCode === 0) {
                            th.$router.push({ path: '/shangmen', query: { id: th.$route.query.id }});
                        }
                    })
            },

            handleConfirm(value) {
                var date = new Date(value)
                this.uijm = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            },

            openPicker() {
                this.$refs.picker.open();
            },

            jump(id) {
                this.$router.push({ path: '/pincheInfo', query: { id: id }});
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
                this.yusuan[key] = value
            },

            mssage(info, po) {
                this.$Toast({
                    message: info,
                    position: po,
                })
            },

        },
    }
</script>

<style lang="scss" scoped>



    .pnieuomy {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 0 1.1rem;
        box-sizing: border-box;
        margin-top: 0.8rem;
        .sp1 {
            font-size: 0.3rem;
            color: #666666;
        }
        .sp2 {
            font-size: 0.24rem;
            color: #999999;
        }
    }

    .tijiao-yuyt {
        width: 100%;
        padding: 0 0.3rem;
        box-sizing: border-box;
        span {
            width: 100%;
            height: 0.86rem;
            background: #51c1ea;
            border-radius: 0.1rem;
            font-size: 0.36rem;
            color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 1.3rem;
        }
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
                background: url("../../../static/images/landengyu.png") no-repeat center;
                background-size: 0.2rem 0.36rem;
                position: absolute;
                right: 0.3rem;
            }
            input {
                background: none;
                border: none;
                width: 0.8rem;
                height: 100%;
                padding: 0;
                margin: 0;
                margin-left: 0.7rem;
                font-size: 0.3rem;
                color: #999;
            }
            .sp20 {
                font-size: 0.28rem;
                margin-left: 0.7rem;
                color: #999999;
            }
            .sp12 {
                position: absolute;
                left: 1.78rem;
            }
            .sp11 {
                font-size: 0.3rem;
                color: #333333;
            }
            .sp19 {
                font-size: 0.28rem;
                color: #333333;
            }
        }
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
        position: fixed;
        top: 0;
        z-index: 120;
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
        height: 2rem;
        display: flex;
        align-items: center;
        font-size: 0.24rem;
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
        background: #f6f6f6;
        //max-width: 7.5rem;
        /*=====底部====*/
    }
</style>
