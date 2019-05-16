<template>
    <div class="mssage">
        <div class="l-index-top">
            <i @touchstart="fanhui()" class="l-top-dingwei-i"></i>
            <span class="l-top-biaoti">添加报价</span>
            <span class="sp1"></span>
        </div>
        <div class="l-tianjia-index">
            <div class="index">
                <div class="div1">
                    <span class="sp1">出发地</span>
                    <span @click="addressChufa('0')" class="sp2">{{iufadi ? iufadi : '请选择出发地'}}</span>
                    <span class="sp-i sp3"></span>
                </div>
                <div class="div1">
                    <span class="sp1">目的地</span>
                    <span @click="addressChufa('1')" class="sp2">{{mudidi ? mudidi : '请选择目的地'}}</span>
                    <span class="sp-i sp3"></span>
                </div>
                <div class="div1">
                    <span class="sp1">货物类型</span>
                    <span @click="typeShow()" class="sp2">{{cheliangType ? cheliangType : '请选择货物类型'}}</span>
                    <span class="sp-i sp3"></span>
                </div>
                <div class="div1">
                    <span class="sp1">体积</span>
                    <input @change="(e) => inputChange('volume', e)" :value="volume" placeholder="请输入体积" class="sp2" type="tel">
                    <span class=" sp3">m<span>3</span></span>
                </div>
                <div class="div1">
                    <span class="sp1">重量</span>
                    <input @change="(e) => inputChange('weight', e)" :value="weight" class="sp2" placeholder="请输入重量" type="tel">
                    <span class="sp3">kg</span>
                </div>
                <div class="div1">
                    <span class="sp1">价格</span>
                    <input @change="(e) => inputChange('price', e)" :value="price" class="sp2" placeholder="请输入价格" type="tel">
                    <span class=" sp3">元</span>
                </div>
            </div>
            <div class="buttons">
                <span @click="tijiaobaojia()">提交</span>
            </div>
        </div>
        <addr :taitou="taitou" @wancheng="wancheng" @quxiao="quxiao" v-if="addr"></addr>
        <div v-if="cheType" class="address">
            <div class="addressboxbg" @click="cancel"></div>
            <div class="addressbox">
                <p class="text_btn">
                    <span style="float:left;color:#75c1dd;" @click="cancel">取消</span>
                    <span class="chelianglzx">货物类型</span>
                    <span style="float:right;color:#75c1dd;" @click="complete">完成</span>
                </p>
                <div class="addressSelect" >
                    <!--<div class="selectbox"></div>-->
                    <ul @touchstart="touchStart($event,'city')"
                        @touchmove="touchMove($event,'city')"
                        @touchend="touchEnd($event,'city')"
                        :style="cityStyle" :class="[{'selectAni':addSelect}]">
                        <li v-for="(item,index) in list2"
                            :class="[{'addSelectActive':index == cityIndex}]"
                            :key="index">{{item.typeName}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import addr from '@/components/compo/address'

    export default {
        name: 'tianjiabaojia',
        data () {
            return {
                w: window.innerWidth,
                addr: false,
                chufaOrMudi: '',
                taitou: '',
                price: '',
                weight: '',
                volume: '',
                fromAreaId1: '',
                fromAreaId2: '',
                fromAreaId3: '',
                toAreaId1: '',
                toAreaId2: '',
                toAreaId3: '',
                iufadi: '',
                mudidi: '',
                cheType: false,
                cheliangType: '',
                list2: [],
                provinceStyle: {
                    WebkitTransform: 'translate3d(0px,0px,0px)'
                },
                cityStyle: {
                    WebkitTransform: 'translate3d(0px,0px,0px)'
                },
                districtStyle: {
                    WebkitTransform: 'translate3d(0px,0px,0px)'
                },
                startTop: 0,
                provinceIndex: 0,
                cityIndex: 0,
                districtIndex: 0,
                translateY: 0,
                maxScroll: 0,
                addHeight: 0,
                addSelect: false,
                provinceVal: '',
                cityVal: '',
                areaVal: '',
                val: {
                    'provinceVal': '',
                    'cityVal': '',
                    'areaVal': ''
                },
            }
        },
        components: { addr },
        mounted() {
            this.getCType()
            this.getInfo()
        },
        computed: {

        },
        methods: {
            getInfo() {
                var data = {
                    id: this.$route.query.id
                }
                var th = this
                this.ajax.get('/driver/api/d_DriverPriceCommitOne', {params: data})
                    .then((r) => {
                        if (r.resultCode === 0) {
                            var item = r.data
                            th.iufadi = `${item.fromAreaId1} ${item.fromAreaId2} ${item.fromAreaId3}`
                            th.mudidi = `${item.toAreaId1} ${item.toAreaId2} ${item.toAreaId3}`
                            th.cheliangType = item.goodsType
                            th.price = item.price
                            th.weight = item.weight
                            th.volume = item.volume
                        }
                    })
            },

            getCType() {
                var data = {
                    currentPage: 0,
                    pageSize: 0,
                }
                var th = this
                this.ajax.get('/common/api/sysGoodsType', {params: data})
                    .then((res) => {
                        if (res.resultCode === 0) {
                            th.list2 = res.data
                            th.val.provinceVal = th.list2[0]
                        }
                    })
            },

            typeShow() {
                this.cheType = true
            },
            mssage(info, po) {
                this.$Toast({
                    message: info,
                    position: po,
                })
            },

            inputChange(key, e) {
                var value = e.target.value
                this[key] = value
            },

            tijiaobaojia() {
                var th = this
                var data = {
                    userId: localStorage.userId,
                    fromAreaId1: th.fromAreaId1,
                    fromAreaId2: th.fromAreaId2,
                    fromAreaId3: th.fromAreaId3,
                    toAreaId1: th.toAreaId1,
                    toAreaId2: th.toAreaId2,
                    toAreaId3: th.toAreaId3,
                    volume: th.volume,
                    weight: th.weight,
                    price: th.price,
                    goodsType: th.cheliangType,
                }

                if (th.$route.query.id) {
                    var obj = {
                        volume: '请输入体积',
                        weight: '请输入重量',
                        price: '请输入价格',
                        goodsType: '请选择货物类型',
                    }
                } else {
                    var obj = {
                        userId: '请输入重新登录',
                        fromAreaId1: '请选择出发地',
                        toAreaId1: '请选择目的地',
                        volume: '请输入体积',
                        weight: '请输入重量',
                        price: '请输入价格',
                        goodsType: '请选择货物类型',
                    }
                }
                for (var i in obj) {
                    if (!data[i]) {
                        th.mssage(obj[i], 'bottom')
                        return
                    }
                }

                this.ajax.post('/driver/api/d_DriverPriceCommit', data)
                    .then((r) => {
                        if (r.resultCode === 0) {
                            th.mssage(r.message, 'bottom')
                            var renzheng = localStorage.renzheng
                            if (renzheng === 'N') {
                                th.$router.push('/ID')
                            } else {
                                th.$router.push('/mybaojia')
                            }
                        }
                    })
            },

            fanhui() {
                history.go(-1)
            },

            wancheng(obj) {
                var th = this
                if (th.chufaOrMudi === '0') {
                    th.fromAreaId1 = obj.provinceVal.regionCode
                    th.fromAreaId2 = obj.cityVal.regionCode
                    th.fromAreaId3 = obj.areaVal.regionCode
                    var iufadi = `${obj.provinceVal.regionName } ${obj.cityVal.regionName } ${obj.areaVal.regionName }`
                    iufadi.length > 14 ? th.iufadi = iufadi.slice(0, 13) + '...'
                    :
                    th.iufadi = iufadi
                } else {
                    th.toAreaId1 = obj.provinceVal.regionCode
                    th.toAreaId2 = obj.cityVal.regionCode
                    th.toAreaId3 = obj.areaVal.regionCode
                    var mudidi = `${obj.provinceVal.regionName } ${obj.cityVal.regionName } ${obj.areaVal.regionName }`
                    mudidi.length > 14 ? th.mudidi = mudidi.slice(0, 13) + '...'
                    :
                    th.mudidi = mudidi

                }
                th.addr = false
            },

            quxiao(bl) {
                this.addr = bl
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
            // 点击取消
            cancel () {
                this.cheType = false
            },
            // 点击完成
            complete () {
                this.cheType = false
                this.cheliangType = this.val.cityVal.typeName
            },
            // 滑动开始
            touchStart (e, val) {
                e.preventDefault()
                this.addSelect = false
                this.addHeight = e.currentTarget.children[0].offsetHeight
                this.maxScroll = this.addHeight * e.currentTarget.children.length
                this.startTop = e.targetTouches[0].pageY
                switch (val) {
                    case 'province':
                        this.translateY = parseInt(this.provinceStyle.WebkitTransform.slice(this.provinceStyle.WebkitTransform.indexOf(',') + 1, this.provinceStyle.WebkitTransform.lastIndexOf(',')))
                        break
                    case 'city':
                        this.translateY = parseInt(this.cityStyle.WebkitTransform.slice(this.cityStyle.WebkitTransform.indexOf(',') + 1, this.cityStyle.WebkitTransform.lastIndexOf(',')))
                        break
                    case 'district':
                        this.translateY = parseInt(this.districtStyle.WebkitTransform.slice(this.districtStyle.WebkitTransform.indexOf(',') + 1, this.districtStyle.WebkitTransform.lastIndexOf(',')))
                        break
                    default:
                        break
                }
            },
            // 滑动进行中
            touchMove (e, val) {
                e.preventDefault()
                switch (val) {
                    case 'province':
                        if ((e.targetTouches[0].pageY - this.startTop + this.translateY) > 0) {
                            this.provinceStyle.WebkitTransform = 'translate3d(0px,0px,0px)'
                        } else if ((e.targetTouches[0].pageY - this.startTop + this.translateY) < -(this.maxScroll - this.addHeight)) {
                            this.provinceStyle.WebkitTransform = 'translate3d(0px,' + -(this.maxScroll - this.addHeight) + 'px,0px)'
                        } else {
                            this.provinceStyle.WebkitTransform = 'translate3d(0px,' + (e.targetTouches[0].pageY - this.startTop + this.translateY) + 'px,0px)'
                        }
                        break
                    case 'city':
                        if ((e.targetTouches[0].pageY - this.startTop + this.translateY) > 0) {
                            this.cityStyle.WebkitTransform = 'translate3d(0px,0px,0px)'
                        } else if ((e.targetTouches[0].pageY - this.startTop + this.translateY) < -(this.maxScroll - this.addHeight)) {
                            this.cityStyle.WebkitTransform = 'translate3d(0px,' + -(this.maxScroll - this.addHeight) + 'px,0px)'
                        } else {
                            this.cityStyle.WebkitTransform = 'translate3d(0px,' + (e.targetTouches[0].pageY - this.startTop + this.translateY) + 'px,0px)'
                        }
                        break
                    case 'district':
                        if ((e.targetTouches[0].pageY - this.startTop + this.translateY) > 0) {
                            this.districtStyle.WebkitTransform = 'translate3d(0px,0px,0px)'
                        } else if ((e.targetTouches[0].pageY - this.startTop + this.translateY) < -(this.maxScroll - this.addHeight)) {
                            this.districtStyle.WebkitTransform = 'translate3d(0px,' + -(this.maxScroll - this.addHeight) + 'px,0px)'
                        } else {
                            this.districtStyle.WebkitTransform = 'translate3d(0px,' + (e.targetTouches[0].pageY - this.startTop + this.translateY) + 'px,0px)'
                        }
                        break
                    default:
                        break
                }
            },
            // 滑动结束
            touchEnd (e, val) {
                e.preventDefault()
                this.addSelect = true
                switch (val) {
                    case 'province':
                        let provinceTranslateY = parseInt(this.provinceStyle.WebkitTransform.slice(this.provinceStyle.WebkitTransform.indexOf(',') + 1, this.provinceStyle.WebkitTransform.lastIndexOf(',')))
                        this.provinceIndex = -Math.round(provinceTranslateY / this.addHeight)
                        this.provinceStyle.WebkitTransform = 'translate3d(0px,' + (Math.round(provinceTranslateY / this.addHeight) * this.addHeight) + 'px,0px)'
                        this.cityStyle.WebkitTransform = this.districtStyle.WebkitTransform = 'translate3d(0px,0px,0px)'
                        this.cityIndex = this.districtIndex = 0
                        break
                    case 'city':
                        let cityTranslateY = parseInt(this.cityStyle.WebkitTransform.slice(this.cityStyle.WebkitTransform.indexOf(',') + 1, this.cityStyle.WebkitTransform.lastIndexOf(',')))
                        this.cityIndex = -Math.round(cityTranslateY / this.addHeight)
                        this.cityStyle.WebkitTransform = 'translate3d(0px,' + (Math.round(cityTranslateY / this.addHeight) * this.addHeight) + 'px,0px)'
                        this.districtStyle.WebkitTransform = 'translate3d(0px,0px,0px)'
                        this.districtIndex = 0
                        break
                    case 'district':
                        let districtTranslateY = parseInt(this.districtStyle.WebkitTransform.slice(this.districtStyle.WebkitTransform.indexOf(',') + 1, this.districtStyle.WebkitTransform.lastIndexOf(',')))
                        this.districtIndex = -Math.round(districtTranslateY / this.addHeight)
                        this.districtStyle.WebkitTransform = 'translate3d(0px,' + (Math.round(districtTranslateY / this.addHeight) * this.addHeight) + 'px,0px)'
                        break
                    default:
                        break
                }
                // 滑动结束后 处理数据
                this.dataProcessing()
            },
            // 数据处理
            dataProcessing () {
                this.val.cityVal = this.list2[this.cityIndex]
            },
        },
    }

</script>

<style lang="scss" scoped>
    .address{
        position:absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
    }
    .address .addressbox{
        height: 40%;
        position: absolute;
        z-index: 101;
        width: 100%;
        max-height: 100%;
        overflow: hidden;
        background: #fff;
        bottom: 0px;
    }
    .address .addressbox .text_btn{
        padding: 0 0.4rem;
        box-sizing: border-box;
        height: 0.85rem;
        font-size: 0.28rem;
        background: #f7f7f7;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .addressSelect .selectbox{
        width: 100%;
        height: 26px;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        margin-top: 60px;
        background: #F9F9F9;
    }
    .address .addressboxbg{
        position: absolute;
        left: 0;
        top: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.7);
    }
    .addressSelect{width: 100%; position: relative; background: #fff; height: 190px;overflow: hidden; -webkit-mask-box-image: linear-gradient(0deg,transparent,transparent 5%,#fff 20%,#fff 80%,transparent 95%,transparent); font-size: 14px;}
    .addressSelect ul{width: 100%; position: absolute; left: 0; top:60px; -webkit-transform-style: preserve-3d; -webkit-backface-visibility:hidden; text-align: center; padding-left: 0;}
    .addressSelect ul li{
        white-space : nowrap;
        overflow: hidden; text-overflow:ellipsis;
        color: #999;
        font-size: 0.38rem;
        padding: 3px 0;}
    .addressSelect ul:nth-of-type(2){left: 33.333333%;}
    .addressSelect ul:nth-of-type(3){left: 66.666666%;}
    .addressSelect ul li.addSelectActive{
        font-size: 0.42rem;
        color: #333; transform: scale(1.1); transition: 0.5s;}
    .selectAni{transition: 0.8s;}


    .l-tianjia-index {
        .buttons {
            width: 100%;
            display: flex;
            justify-content: center;
            span {
                margin-top: 40px;
                width: 200px;
                height: 45px;
                background: #51c1ea;
                border-radius: 25px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                font-size: 16px;
            }
        }
        .index {
            .div1 {
                margin: 5px 0 10px 0;
                width: 100%;
                height: 40px;
                background: rgba(81, 193, 234, 0.1);
                border-radius: 5px;
                display: flex;
                align-items: center;
                input {
                    padding: 0;
                    margin: 0;
                    border: none;
                    background: none;
                    font-size: 14px;
                    width: 50%;
                    color: #999;
                }
                .sp1 {
                    width: 80px;
                    margin-left: 10px;
                    color: #333;
                }
                .sp2 {
                    color: #666;
                }
                .sp-i {
                    background: url("../../../../static/images/landengyu.png") no-repeat center;
                    background-size: 100% 100%;
                    width: 10px;
                    height: 15px;
                }
                .sp3 {
                    position: absolute;
                    right: 35px;
                    color: #666;
                    span {
                        font-size: 10px;
                        position: relative;
                        top: -4px;
                    }
                }
                span {
                    font-size: 14px;
                }
            }
            width: 100%;
            height: 330px;
            border-radius: 5px;
            background: rgba(255, 255, 255, 0.6);
            margin-top: 110px;
            padding: 15px 10px;
            box-sizing: border-box;
        }
        width: 100%;
        height: 100vh;
        background: #f8f8f8;
        padding: 0 15px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        background: url("../../../../static/images/baojiabj.png") no-repeat center;
        background-size: 100% 100%;

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
        background: url("../../../../static/images/fanhuixiangyb.png") no-repeat left center;
        background-size: 0.2rem 0.36rem;
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
