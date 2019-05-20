<template>
    <div class="map" v-show="visible">
        <div class="l-index-top">
            <i @click="fanhui()" class="l-top-dingwei-i"></i>
            <span class="l-top-biaoti">在途中</span>
            <span class="sp1"></span>
        </div>
        <div class="l-mypage-list">
            <a class="l-list-a" href="javascript:">
                <div class="l-mypage-info-sss">
                    <img :src="siji.head" alt="">
                    <div class="div1">
                        <div class="div2">
                            <div class="div3">
                                <span>{{siji.fromAreaName3}}</span>
                                <i class="l-beijingdaoheze"></i>
                                <span>{{siji.toAreaName3}}</span>
                            </div>
                            <span>{{siji.createTime}}</span>
                        </div>
                        <span class="l-xiaozi-14">
                            体积{{siji.cube}}立方米；
                            重{{siji.weight}}kg；
                            货物类型{{siji.goodsType}}
                        </span>
                    </div>
                </div>
            </a>
        </div>
        <div id="map-core"></div>
        <div class="sijijxuk">
            <img :src="data.hard" alt="">
            <div class="sijixinxi-div">
                <div class="sijixinxi-div1">
                    <span class="sijixinxi-div1-sp1">司机姓名：<span>周星星</span></span>
                    <span class="sijixinxi-div1-sp1">联系方式：<span>151****7605</span></span>
                    <span class="sijixinxi-div1-sp3">车牌号：<span>京A3458S</span></span>
                </div>
                <div class="sijixinxi-div2">
                    <span class="sijixinxi-div2-sp1"></span>
                    <span class="sijixinxi-div2-sp2"></span>
                </div>
            </div>
        </div>
        <div class="wuliuxiangqing">
            <span class="toubu-wenzi">物流详情</span>
            <div class="wulqjxdms">
                <div class="wulqjxdm">
                    <span class="landian"></span>
                    <span class="lanxian"></span>
                    <span class="jxdmuijm">2019-03-12    14:26:56</span>
                    <span class="jxdmdidm">此订单已出发《出发地》北京市昌平区</span>
                </div>
                <div class="wulqjxdm">
                    <span class="landian"></span>
                    <span class="lanxian"></span>
                    <span class="jxdmuijm">2019-03-12    14:26:56</span>
                    <span class="jxdmdidm">此订单已出发《出发地》北京市昌平区</span>
                </div>
                <div class="wulqjxdm">
                    <span class="landian"></span>
                    <span class="lanxian"></span>
                    <span class="jxdmuijm">2019-03-12    14:26:56</span>
                    <span class="jxdmdidm">此订单已出发《出发地》北京市昌平区</span>
                </div>
                <div class="wulqjxdm">
                    <span class="landian"></span>
                    <span class="lanxian"></span>
                    <span class="jxdmuijm">2019-03-12    14:26:56</span>
                    <span class="jxdmdidm">此订单已出发《出发地》北京市昌平区</span>
                </div>
                <div style="width: 100%; height: 0.3rem; position: relative">
                    <span class="lanxian"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "zaitu",
        data () {
            return {
                data: {},
                siji: {},
                fujinItu: 0,
                location: {
                    lng: '',
                    lat: ''
                },
                map: {},
                ac: {},
                visible: true,
                queding: false,
                fujinList: []
            }
        },
        props: ['x', 'y'],
        mounted () {
            this.setMap()
            this.location.lng = this.x
            this.location.lat = this.y
            this.getInfo(1)
        },
        methods: {

            getInfo() {
                var data = {
                    id: this.$route.query.id,
                    type: 'order',
                }
                var th = this
                this.ajax.get('/common/api/getOneData', {params: data})
                    .then((r) => {
                        if (r.resultCode === 0) {
                            var data = r.data
                            data.createTime = getDateDiff(data.createTime)
                            th.siji = r.data
                            th.getAddress(r.data.orderNo)
                        }
                    })
            },

            getAddress(orderNo) {
                var th = this
                var data = {
                    orderNo: orderNo
                }
                this.ajax.get('/common/api/getOrderWuLiu', {params: data})
                    .then((r) => {
                        if (r.resultCode === 0) {
                            var data = r.data
                        }
                    })
            },

            fanhui() {
                history.go(-1)
            },

            duihao(i) {
                this.fujinItu = i
            },

            // 初始化地图
            setMap() {
                var th = this
                this.map = new BMap.Map('map-core')
                this.map.centerAndZoom(new BMap.Point(th.x, th.y), 14)
                // 地图缩放控件
                const topLeftControl = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT})
                // 城市选择控件
                const cityListControl = new BMap.CityListControl({anchor: BMAP_ANCHOR_TOP_RIGHT})
                // 比例尺控件
                const topLeftNavigation = new BMap.NavigationControl()
                this.map.addControl(topLeftControl)
                this.map.addControl(topLeftNavigation)
                this.map.addControl(cityListControl)
                this.map.enableScrollWheelZoom(true)
            },

            // 根据经纬度绘制地图中的坐标点
            drawLocation() {
                if (this.location.lng !== "" && this.location.lat !== "") {
                    this.map.clearOverlays()
                    const new_point = new BMap.Point(this.location.lng, this.location.lat)
                    const marker = new BMap.Marker(new_point)
                    this.map.addOverlay(marker)
                    this.map.panTo(new_point)
                }
            },
            // 搜索位置功能实现
            setSearch() {
                const _this = this
                //建立一个自动完成的对象
                this.ac = new BMap.Autocomplete({"input": "suggestId", "location": _this.map})
                let myValue
                //鼠标点击下拉列表后的事件
                this.ac.addEventListener("onconfirm", function (e) {
                    let _value = e.item.value
                    myValue = _value.street + _value.business
                    _this.setPlace(myValue)
                    var x = _this.location.lng
                    var y = _this.location.lat
                    _this.getFujin(x, y)
                });
            },

            setPlace(myValue) {
                const _this = this
                //清除地图上所有覆盖物
                this.map.clearOverlays()
                //智能搜索
                this.local = new BMap.LocalSearch(_this.map, {
                    onSearchComplete: _this.onSearchComplete
                });
                this.address = myValue
                this.local.search(myValue);
                // this.selectLocation()

            },

            onSearchComplete() {
                //获取第一个智能搜索的结果
                let pp = this.local.getResults().getPoi(0).point
                this.location.lng = parseFloat(pp.lng).toFixed(5)
                this.location.lat = parseFloat(pp.lat).toFixed(5)
                this.map.centerAndZoom(pp, 18)
                //添加标注
                this.map.addOverlay(new BMap.Marker(pp))
            },
            // 向父组件传递经纬度
            selectLocation() {
                var o = {
                    addressInfo: this.address,
                    location: this.location,
                }
                this.$emit('selectLocation', o)
            },

            quedingyiha() {
                var fuinList = this.fujinList
                var fujinItu = this.fujinItu
                var o = {
                    addressInfo: fuinList[fujinItu].address,
                    location: fuinList[fujinItu].point,
                }
                this.$emit('selectLocation', o)
            },
        },

        watch: {
            'location': {
                handler () {
                    this.drawLocation()
                },
                deep: true
            },
            visible () {
                console.log('ddd')
            },
        }
    }
</script>

<style lang="scss" scoped>

    .wuliuxiangqing {
        .toubu-wenzi {
            position: absolute;
            top: 0.3rem;
            left: 0.3rem;
        }
        .wulqjxdms {
            width: 100%;
            height: 100%;
            overflow-x: visible;
            z-index: 1000;
            overflow-y: auto;
            .wulqjxdm {
                display: flex;
                flex-direction: column;
                width: 100%;
                padding-left: 0.44rem;
                box-sizing: border-box;
                height: 1rem;
                position: relative;
                padding-top: 0.2rem;
                .jxdmdidm {
                    font-size: 0.28rem;
                    color: #333333;
                    margin-top: 0.1rem;
                }
                .jxdmuijm {
                    font-size: 0.24rem;
                    color: #58c3e0;
                }
                .landian {
                    width: 0.22rem;
                    height: 0.22rem;
                    // background: url("../../../static/images/landian.png") no-repeat center;
                    background-size: 100% 100%;
                    position: absolute;
                    left: 0;
                    top: 0.26rem;
                }

            }
        }
        position: absolute;
        bottom: 0;
        width: 100%;
        background: #fff;
        height: 3.7rem;
        padding: 0.8rem 0.9rem 0;
        box-sizing: border-box;
        border-top: solid 0.1rem #f2f2f2;
    }

    .lanxian {
        width: 0.04rem;
        height: 100%;
        background: #58c3e0;
        position: absolute;
        left: 0.1rem;
        top: 0;
    }

    .sijijxuk {
        position: absolute;
        bottom: 3.7rem;
        .sijixinxi-div {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .sijixinxi-div1 {
                display: flex;
                flex-direction: column;
                .sijixinxi-div1-sp1 {
                    font-size: 0.3rem;
                    color: #333333;
                    span {
                        color: #666666;
                    }
                }
                .sijixinxi-div1-sp3 {
                    letter-spacing: 0.1rem;
                    font-size: 0.3rem;
                    color: #333333;
                    span {
                        letter-spacing: 0;
                        color: #59c3e0;
                        position: relative;
                        left: -0.1rem;
                    }
                }
            }
            .sijixinxi-div2 {
                display: flex;
                flex-direction: column;
                justify-content: center;
                .sijixinxi-div2-sp1 {
                    margin: 0.2rem 0;
                    width: 0.4rem;
                    height: 0.4rem;
                    background: url("../../../static/images/dianhuahahah.png") no-repeat center;
                    background-size: 100% 100%;
                }
                .sijixinxi-div2-sp2 {
                    width: 0.44rem;
                    height: 0.4rem;
                    background: url("../../../static/images/lmxisiji.png") no-repeat center;
                    background-size: 100% 100%;
                    margin: 0.2rem 0;
                }
            }
        }
        width: 100%;
        height: 2.1rem;
        background: #fff;
        padding: 0 0.3rem 0 1.9rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        img {
            width: 1.3rem;
            height: 1.3rem;
            position: absolute;
            left: 0.3rem;
        }

    }

    .l-beijingdaoheze {
        background: url("../../../static/images/xdybihjmtb.png") no-repeat center;
        background-size: 100% 100%;
        display: inline-block;
        width: 20px;
        height: 5px;
    }

    .l-dingdan-nvb {
        width: 100%;
        height: 40px;
        background: #fff;
        padding: 0 5px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-around;
        .div1 {
            span {
                color: #333;
                font-size: 14px;
                height: 100%;
                display: flex;
                align-items: center;
            }
            i {
                display: inline-block;
                width: 110%;
                border-bottom: solid 3px #51c1ea;
            }
            height: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
        }
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

    .l-mypage-list {
        position: relative;
        background: #fff;
        margin-top: 0.86rem;
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #333;
        justify-content: space-between;
        overflow: hidden;
        z-index: 10086;
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
                }
            }
        }
    }

    .dvhk {
        width: 0.34rem;
        height: 0.28rem;
        // background: url("../../../static/images/duihao.png") no-repeat center;
        background-size: 100% 100%;
        position: absolute;right: 0.3rem;
    }

    .fujindizhi {
        width: 100%;
        height: 40%;
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 0;
        background: #fff;
        .fujin-list {
            width: 100%;
            height: 20%;
            display: flex;
            flex-direction: column;
            padding: 0 0.3rem;
            justify-content: center;
            border-bottom: solid 1px #ddd;
            position: relative;

            .sp1 {
                font-size: 0.3rem;
                color: #333333;
            }
            .sp2 {
                font-size: 0.22rem;
                color: #999;
            }
        }
    }

    .l-index-top {
        width: 100%;
        height: 0.86rem;
        padding: 0 15px;
        background: #51c1ea;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        position: absolute;
        justify-content: center;
        top: 0;
        z-index: 1002;
        .sp1 {
            font-size: 0.32rem;
            color: #ffffff;
            position: absolute;
            right: 0.3rem;
        }
    }

    .l-top-dingwei-i {
        display: inline-block;
        width: 40px;
        height: 40px;
        background: url("../../../static/images/fanhuixiangyb.png") no-repeat left center;
        background-size: 0.2rem 0.36rem;
        z-index: 103;
        position: absolute;
        left: 0.3rem;
    }

    .l-top-biaoti {
        /*width: 100%;*/
        top: 0;
        display: flex;
        justify-content: center;
        color: #fff;
        font-size: 0.36rem;
        box-sizing: border-box;
        z-index: 100;

    }


    .queding {
        position: absolute;
        bottom: 0.3rem;
        right: 0.3rem;
        width: 60px;
        height: 28px;
        button {
            width: 100%;
            height: 100%;
            color: #fff;
            background: #51c1ea;
            border-radius: 0.06rem;
            border: none;
        }
    }

    .map {
        position: absolute;
        top: 0;
        z-index: 1000;
        width: 100%;
        height: 100%;
        font-size: 14px;
        #map-core {
            width: 100%;
            height: 100vh;
            position: fixed!important;
            top: 0;
            left: 0;
        }
        .search {
            background: none;
            display: flex;
            height: 1.2rem;
            flex-direction: column;
            position: absolute;
            bottom: 0;
            width: 100%;
            left: 0;

            .lng-lat {
                margin-top: 0.3rem;
                display: flex;
                padding: 0 0.3rem;
                box-sizing: border-box;
                justify-content: space-between;
                .item {
                    display: flex;
                    height: 20px;
                    line-height: 20px;
                    p {
                        height: 20px;
                        padding-right: 10px;
                    }
                    input {
                        width: 1.5rem;
                        height: 20px;
                        font-size: 0.28rem;
                        color: #333;
                    }
                    button {
                        color: #fff;
                        height: 28px;
                        width: 60px;
                        background: #40B0FF;
                        border: 1px solid #40B0FF;
                        border-radius: 2px;
                        &:hover {
                            background: #10B0FF;
                            border: 1px solid #10B0FF;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
</style>