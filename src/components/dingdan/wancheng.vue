<template>
    <div class="index ubye-index">
        <div class="l-index-top">
            <i @touchstart="fanhui()" class="l-top-dingwei-i"></i>
            <span class="l-top-biaoti">订单详情</span>
        </div>
        <div class="top-zhanwei"></div>
        <div class="l-index-body">
            <div class="l-mypage-list">
                <img class="wancheng-wancheng" src="../../../static/images/wancheng.png" alt="">
                <a class="l-list-a" href="javascript:">
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
                            <span class="l-xiaozi-14">体积{{data.cube}}立方米；重{{data.weight}}kg；货物类型{{data.goodsType}}</span>
                        </div>
                    </div>
                </a>
            </div>
            <div class="yuguypfz">
                <div class="yuguypfz-div1">
                    <span class="yuguypfz-div1-sp1">预算运费</span>
                    <span class="yuguypfz-div1-sp2">1200</span>
                    <span class="yuguypfz-div1-sp3">元</span>
                </div>
                <div class="yuguypfz-div1">
                    <span class="yuguypfz-div1-sp1">实际里程</span>
                    <span class="yuguypfz-div1-sp2">1200</span>
                    <span class="yuguypfz-div1-sp3">公里</span>
                </div>
            </div>
            <div class="uhiryjub">上传验收单照片</div>
            <div class="imgs">
                <div v-for="(item, index) in imgs"
                     :style="[{'height': [imgH + 'px']},
                      {'width': [imgH + 'px']},
                      {'background': [`url(${item.src}) no-repeat center`]},
                      {'background-size': [item.w + item.h]},]"
                     class="sp1">
                </div>
                <span v-if="imgs.length < 3" @click="v_show()" :style="{'height': w + 'px', 'width': w + 'px'}" id="span0" class="sp1 sp2">
                    <span>添加照片</span>
                </span>
            </div>
            <div class="beivu-wancheng">
                <div style="margin-top: 0; padding-left: 0" class="uhiryjub">备注</div>
                <textarea :value="data.remark" @change="(e) => inputChange(e, 'remark')" placeholder="请填写备注"></textarea>
            </div>
            <div class="yuguypfz">
                <div @click="(e) => pingxing(0, e)" class="yuguypfz-div1">
                    <span style="margin-right: 0" class="yuguypfz-div1-sp1">对货主进行评价：</span>
                    <span data-index="0" :class="xingxing[0]"></span>
                    <span data-index="1" :class="xingxing[1]"></span>
                    <span data-index="2" :class="xingxing[2]"></span>
                    <span data-index="3" :class="xingxing[3]"></span>
                    <span data-index="4" :class="xingxing[4]"></span>
                </div>
                <div @click="(e) => pingxing(1, e)" class="yuguypfz-div1">
                    <span style="margin-right: 0" class="yuguypfz-div1-sp1">对收货进行评价：</span>
                    <span data-index="0" :class="xingxing1[0]"></span>
                    <span data-index="1" :class="xingxing1[1]"></span>
                    <span data-index="2" :class="xingxing1[2]"></span>
                    <span data-index="3" :class="xingxing1[3]"></span>
                    <span data-index="4" :class="xingxing1[4]"></span>
                </div>
            </div>
            <div class="beivu-wancheng">
                <div style="margin-top: 0.3rem; padding-left: 0" class="uhiryjub">留言</div>
                <textarea :value="data.retedShipperInfo" @change="(e) => inputChange(e, 'retedShipperInfo')" placeholder="请填写留言"></textarea>
            </div>
            <div class="wanchengwancheng-wancheng">
                <span @click="wanchengpingjia()">完成</span>
            </div>
        </div>
        <div class="l-shangchuan" v-if="tupian">
            <div @click="v_hide()" class="vevk"></div>
            <div class="pOrC">
                <span @click="xuanzeImg(0)" class="sp1">拍摄</span>
                <span @click="xuanzeImg(1)" class="sp2">手机相册选择</span>
                <span class="sp3" @touchstart="v_hide()">取消</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                tupian: false,
                imgH: '',
                imgs: [],
                dingdan: true,
                w: (window.innerWidth - 60) / 3,
                xingxing: ['xingxingxing', 'xingxingxing', 'xingxingxing', 'xingxingxing', 'xingxingxing'],
                xingxing1: ['xingxingxing', 'xingxingxing', 'xingxingxing', 'xingxingxing', 'xingxingxing'],
                xyxy: 0,
                xyxy1: 0,
                data: {},
            }
        },

        mounted() {
            var th = this
            var w = (window.innerWidth - 60) / 3
            th.imgH = w
            this.getOne()
        },

        methods: {

            wanchengpingjia() {
                var th = this
                var data = {
                    id: JSON.parse(th.$route.query.data).id,
                    imgYSList: th.imgs,
                    orderNo: th.data.orderNo,
                    remark: th.data.remark,
                    retedShipperInfo: th.data.retedShipperInfo,
                    userId: localStorage.userId,
                    retedShipper: th.xyxy,
                    retedWarehouse: th.xyxy1,
                }
                var obj = {
                    remark: '请填写备注',
                    retedShipperInfo: '请填写留言',
                    retedShipper: '请对货主进行评价',
                    retedWarehouse: '请对收货进行评价',
                }
                if (data.imgYSList.length === 0) {
                    th.mssage('请上传验收单', 'bottom')
                    return
                }
                for (var i in obj) {
                    if (!data[i]) {
                        th.mssage(obj[i], 'bottom')
                        return
                    }
                }
                th.ajax.post('/driver/api/sijiUpdateOrderStatus', data)
                    .then((r) => {
                        th.mssage(r.message, 'bottom')
                        if (r.resultCode === 0) {

                        }
                    })
            },

            inputChange(e, key) {
                this.data[key] = e.target.value
            },

            v_show() {
                this.tupian = true
            },

            v_hide() {
                this.tupian = false
            },

            mssage(info, po) {
                this.$Toast({
                    message: info,
                    position: po,
                })
            },

            xuanzeImg(i) {
                var th = this
                var data = {
                    url: window.Api + '/common/api/uploadImg',
                }
                var funcs = [
                    function(callback, data) {
                        window.appendByCamera1(callback, data)
                    },
                    function(callback, data) {
                        window.appendByGallery1(callback, data)
                    },
                ]
                funcs[i](function(r, file) {
                    var obj = JSON.parse(r)
                    th.newImg(obj.data.imgUrl + obj.data.imgPath)

                    th.tupian = false
                }, data)
            },

            getOne() {
                var th = this
                var obj = JSON.parse(th.$route.query.data)
                var data = {
                    id: obj.id,
                    type: 'order',
                }
                th.ajax.get('/common/api/getOneData', {params: data})
                    .then((r) => {
                        if (r.resultCode === 0) {
                            var data = r.data
                            data.createTime = getDateDiff(data.createTime)
                            th.data = data
                            var imgs = r.data.imgList
                            for (var i = 0; i < imgs.length; i++) {
                                var img = imgs[i]
                                th.newImg(img, i)
                            }
                        }
                    })
            },

            pingxing(i, e) {
                var th = this
                var index = Number(e.target.dataset.index)
                if (!isNaN(index) && i === 0) {
                    th.xingxing = ['xingxingxing', 'xingxingxing', 'xingxingxing', 'xingxingxing', 'xingxingxing']
                    for (var j = 0; j < index + 1; j++) {
                        th.xingxing.splice(j, 1, 'xingxingxing1')
                    }
                    th.xyxy = index + 1
                } else if (!isNaN(index) && i === 1) {
                    th.xingxing1 = ['xingxingxing', 'xingxingxing', 'xingxingxing', 'xingxingxing', 'xingxingxing']
                    for (var j = 0; j < index + 1; j++) {
                        th.xingxing1.splice(j, 1, 'xingxingxing1')
                    }
                    th.xyxy1 = index + 1
                }
            },

            fanhui() {
                history.go(-1)
            },

            jieshu() {
                this.$router.push('/index')
            },

            newImg(src) {
                var th = this
                var img = new Image()
                var obj = {
                    h: '',
                    w: '',
                    src: src,
                }
                img.src = src
                img.onload = function() {
                    if (img.width > img.height) {
                        obj.h = '100%'
                        var bili = img.width / img.height
                        obj.w = (Math.round(bili * 10000)/100).toFixed(2) + '%'
                    } else if (img.width < img.height) {
                        var bili = img.height / img.width
                        obj.h = (Math.round(bili * 10000)/100).toFixed(2) + '%'
                        obj.w = '100%'
                    } else {
                        obj.h = '100%'
                        obj.w = '100%'
                    }
                    th.imgs.push(obj)
                }
            },

            runStart() {
                this.$router.push('/jiedanzhong')
            },
        }
    }
</script>

<style lang="scss" scoped>

    // 上传图片
    .l-shangchuan {
        .tishis {
            width: 100%;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            .tiui1 {
                width: 6.25rem;
                height: 4rem;
                position: fixed;
                top: 3.8rem;
            }
            .tiui2 {
                width: 6.25rem;
                height: 4rem;
                position: fixed;
                top: 3.8rem;
            }
        }

        .pOrC {
            width: 100%;
            font-size: 14px;
            position: fixed;
            bottom: 0;
            .sp1 {
                width: 100%;
                height: 45px;
                background: #fff;
                border-bottom: solid 1px #ddd;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #333;
            }
            .sp2 {
                width: 100%;
                height: 45px;
                background: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #333;
            }
            .sp3 {
                width: 100%;
                height: 45px;
                background: #fff;
                border-bottom: solid 1px #ddd;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #333;
                margin-top: 5px;
            }
        }
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        z-index: 110;
        .vevk {
            width: 100%;
            height: 100%;
            background: #000;
            opacity: 0.2;
        }
    }

    .l-beijingdaoheze {
        width: 0.38rem;
        height: 0.11rem;
        display: inline-block;
        background: url("../../../static/images/xdybihjmtb.png") no-repeat center;
        background-size: 100% 100%;
    }

    #span0 {
        border: 2px #51c1ea dashed;
        background: #fff url("../../../static/images/lansejwhk.png") no-repeat center 0.37rem;
        background-size: 0.79rem 0.79rem;
        font-size: 0.32rem;
        position: relative;
        color: #51c1ea;
        span {
            position: absolute;
            bottom: 0.37rem;
        }
    }

    .xingxingxing {
        width: 0.32rem;
        height: 0.32rem;
        background: url("../../../static/images/xingxing1.png") no-repeat center;
        background-size: 100% 100%;
        margin-right: 0.27rem;
    }

    .xingxingxing1 {
        width: 0.32rem;
        height: 0.32rem;
        background: url("../../../static/images/xingxing.png") no-repeat center;
        background-size: 100% 100%;
        margin-right: 0.27rem;
    }

    .wanchengwancheng-wancheng {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 0.3rem;
        box-sizing: border-box;
        span {
            width: 100%;
            height: 0.86rem;
            font-size: 0.36rem;
            background: #51c1ea;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0.48rem 0;
            border-radius: 0.1rem;
        }
        background: #f2f2f2;
    }

    .beivu-wancheng {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 0 0.3rem;
        box-sizing: border-box;
        border-bottom: 0.1rem solid #f2f2f2;
        textarea {
            width: 100%;
            height: 2rem;
            padding: 0.3rem;
            box-sizing: border-box;
            border: solid 1px #ddd;
            border-radius: 0.06rem;
            color: #999;
            font-size: 0.28rem;
            margin-bottom: 0.3rem;
        }
    }

    .uhiryjub {
        width: 100%;
        font-size: 0.28rem;
        color: #333;
        margin-top: 0.37rem;
        margin-bottom: 0.2rem;
        padding-left: 0.3rem;
        box-sizing: border-box;
    }

    .yuguypfz {
        width: 100%;
        background: #fff;
        display: flex;
        flex-direction: column;
        padding-left: 0.3rem;
        box-sizing: border-box;
        .yuguypfz-div1 {
            width: 100%;
            height: 0.9rem;
            display: flex;
            align-items: center;
            border-bottom: solid 1px #ddd;
            padding-right: 0.3rem;
            box-sizing: border-box;
            font-size: 0.28rem;
            .yuguypfz-div1-sp1 {
                color: #333333;
                margin-right: 0.7rem;
            }
            .yuguypfz-div1-sp2 {
                color: #666;
                margin-right: 0.17rem;
                position: relative;
                top: -1px;
            }
            .yuguypfz-div1-sp3 {
                font-weight: 600;
                color: #333333;
            }
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

    .wancheng-wancheng {
        width: 1.36rem;
        height: 1.24rem;
        position: absolute;
        right: 0.72rem;
        z-index: 108;
    }

    .l-mypage-list {
        position: relative;
        background: #fff;
        border-bottom: 0.1rem solid #f2f2f2;
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
            width: 100%;
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
                }
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
