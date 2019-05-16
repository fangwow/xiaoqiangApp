<template>
    <div class="address">
        <div class="addressboxbg" @click="cancel"></div>
        <div class="addressbox">
            <p class="text_btn">
                <span style="float:left;color:#75c1dd;" @click="cancel()">取消</span>
                <span style="color:#333;">{{taitou}}</span>
                <span style="float:right;color:#75c1dd;" @click="complete()">完成</span>
            </p>
            <div class="addressSelect" >
                <div class="selectbox"></div>
                <ul
                    @touchstart="touchStart($event,'province')"
                    @touchmove="touchMove($event,'province')"
                    @touchend="touchEnd($event,'province')"
                    :style="provinceStyle"
                    :class="[{'selectAni':addSelect}]"
                >
                    <li v-for="(item,index) in list"
                        :class="[{'addSelectActive':index == provinceIndex}]"
                        :key="index">
                        {{item.regionName}}
                    </li>
                </ul>
                <ul @touchstart="touchStart($event,'city')"
                    @touchmove="touchMove($event,'city')"
                    @touchend="touchEnd($event,'city')"
                    :style="cityStyle" :class="[{'selectAni':addSelect}]">
                    <li
                        v-model="val.cityVal"
                        v-for="(item,index) in list2"
                        :class="[{'addSelectActive':index == cityIndex}]"
                        :key="index">{{item.regionName}}</li>
                </ul>
                <ul @touchstart="touchStart($event,'district')"
                    @touchmove="touchMove($event,'district')"
                    @touchend="touchEnd($event,'district')"
                    :style="districtStyle" :class="[{'selectAni':addSelect}]">
                    <li v-for="(item,index) in list3"
                        :class="[{'addSelectActive':index == districtIndex}]"
                        :key="index" >{{item.regionName}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                list: [],
                list2: [],
                list3: [],
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
                }
            }
        },
        props: ['taitou', 'quansheng'],
        mounted() {

        },
        watch: {
            // 监听省滑动
            provinceVal(value) {
                var th = this
                var id = th.list[th.provinceIndex].regionCode
                this.ajax.get('/common/api/sysGetArea', {params: {pid: id}})
                    .then((res) => {
                        if (res.resultCode === 0) {
                            var shi = res.data
                            if (th.quansheng) {
                                var shengji = th.val.provinceVal
                                var quansheng = {
                                    areaId: null,
                                    children: null,
                                    latitude: shengji.latitude,
                                    longitude: shengji.longitude,
                                    parentCode: shengji.parentCode,
                                    regionCode: shengji.regionCode,
                                    regionName: "全部",
                                    regionName1: shengji.regionName,
                                }
                                shi.splice(0, 0, quansheng)
                            }

                            th.list2 = shi.length > 1 ? shi : [{name: '-'}]
                            if (shi.length < 1) {
                                th.list3 = [{name: '-'}]
                            }
                            th.cityVal = shi[0].regionName
                            th.val.cityVal = shi[0]
                        }
                    })
            },
            // 监听市滑动
            cityVal(value) {
                var th = this
                var id = th.list2[th.cityIndex].regionCode
                var appid = th.list2[th.cityIndex].areaId
                if (appid === null) {
                    th.list3 = []
                    return
                }
                this.ajax.get('/common/api/sysGetArea', {params: {pid: id}})
                    .then((res) => {
                        if (res.resultCode === 0) {
                            var xian = res.data
                            if (th.quansheng) {
                                var shiji = th.val.cityVal
                                var quansheng = {
                                    areaId: null,
                                    children: null,
                                    latitude: shiji.latitude,
                                    longitude: shiji.longitude,
                                    parentCode: shiji.parentCode,
                                    regionCode: shiji.regionCode,
                                    regionName: "全部",
                                    regionName1: shiji.regionName,
                                }
                                xian.splice(0, 0, quansheng)
                            }

                            th.list3 = xian.length > 1 ? res.data : [{name: '-'}]
                            th.areaVal = xian[0].regionName
                            th.val.areaVal = xian[0]
                        }

                    })
            },
        },
        created () {
            // 初始化数据
            // 拿省的数据
            var th = this
            var data = {
                pid: '000000'
            }
            this.ajax.get('/common/api/sysGetArea', {params: data})
                .then((r) => {
                    if (r.resultCode === 0) {
                        th.list = r.data
                        th.val.provinceVal = r.data[0]
                        // 拿市区的数据
                        th.ajax.get('/common/api/sysGetArea', {params: {pid: r.data[0].regionCode}})
                        .then((r1) => {
                            if (r1.resultCode === 0) {
                                var shi = r1.data
                                if (th.quansheng) {
                                    var shengji = th.val.provinceVal
                                    var quansheng = {
                                        areaId: null,
                                        children: null,
                                        latitude: shengji.latitude,
                                        longitude: shengji.longitude,
                                        parentCode: shi[0].parentCode,
                                        regionCode: shi[0].regionCode,
                                        regionName: "全部",
                                        regionName1: shengji.regionName,
                                    }
                                    shi.splice(0, 0, quansheng)
                                }

                                th.list2 = shi
                                th.val.cityVal = r1.data[0]
                                if (!th.quansheng) {
                                    th.ajax.get('/common/api/sysGetArea', {params: {pid: r1.data[0].regionCode}})
                                    .then((r2) => {
                                        if (r2.resultCode === 0) {
                                            th.list3 = r2.data
                                            th.val.areaVal = r2.data[0]
                                        }
                                    })
                                }
                            }
                        })
                    }
                })
        },
        methods: {
            // 点击取消
            cancel() {
                this.$emit('quxiao', false)
            },
            // 点击完成
            complete() {
                this.$emit('wancheng', this.val)
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
                        this.val.provinceVal = this.list[this.provinceIndex]
                        this.provinceVal = this.list[this.provinceIndex].regionCode
                        break
                    case 'city':
                        let cityTranslateY = parseInt(this.cityStyle.WebkitTransform.slice(this.cityStyle.WebkitTransform.indexOf(',') + 1, this.cityStyle.WebkitTransform.lastIndexOf(',')))
                        this.cityIndex = -Math.round(cityTranslateY / this.addHeight)
                        this.cityStyle.WebkitTransform = 'translate3d(0px,' + (Math.round(cityTranslateY / this.addHeight) * this.addHeight) + 'px,0px)'
                        this.districtStyle.WebkitTransform = 'translate3d(0px,0px,0px)'
                        this.districtIndex = 0
                        this.val.cityVal = this.list2[this.cityIndex]
                        this.cityVal = this.list2[this.cityIndex].regionCode
                        break
                    case 'district':
                        let districtTranslateY = parseInt(this.districtStyle.WebkitTransform.slice(this.districtStyle.WebkitTransform.indexOf(',') + 1, this.districtStyle.WebkitTransform.lastIndexOf(',')))
                        this.districtIndex = -Math.round(districtTranslateY / this.addHeight)
                        this.districtStyle.WebkitTransform = 'translate3d(0px,' + (Math.round(districtTranslateY / this.addHeight) * this.addHeight) + 'px,0px)'
                        this.val.areaVal = this.list3[this.districtIndex]
                        break
                    default:
                        break
                }
            },
        }
    }
</script>

<style>
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
        height: 0.85rem;
        font-size: 14px;
        line-height: 30px;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        padding: 0 10px;
        background: #f7f7f7;
        display: flex;
        align-items: center;
        justify-content: space-between;
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
    .addressSelect ul{width: 33.333333%; position: absolute; left: 0; top:60px; -webkit-transform-style: preserve-3d; -webkit-backface-visibility:hidden; text-align: center; padding-left: 0;}
    .addressSelect ul li{white-space : nowrap;overflow: hidden; text-overflow:ellipsis; color:rgba(0,0,0,.54); padding: 3px 0;}
    .addressSelect ul:nth-of-type(2){left: 33.333333%;}
    .addressSelect ul:nth-of-type(3){left: 66.666666%;}
    .addressSelect ul li.addSelectActive{color:rgba(0,0,0,.87); transform: scale(1.1); transition: 0.5s;}
    .selectAni{transition: 0.8s;}
</style>