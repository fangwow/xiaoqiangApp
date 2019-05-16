<template>
    <div class="dingdan">
        <div class="mineTop">
            <div class="l-index-top">
                <span class="l-top-biaoti">订单</span>
            </div>
            <div style="width: 100%; height: 1rem"></div>
            <div class="l-dingdan-nvb">
                <div @touchstart="navQianhuan(0)" class="div1">
                    <span>全部</span>
                    <i v-if="nav === 0"></i>
                </div>
                <div @touchstart="navQianhuan(3)" class="div1">
                    <span>在途中</span>
                    <i v-if="nav === 3"></i>
                </div>
                <div @touchstart="navQianhuan(4)" class="div1">
                    <span>已完成</span>
                    <i v-if="nav === 4"></i>
                </div>
                <div @touchstart="navQianhuan(5)" class="div1">
                    <span>已评价</span>
                    <i v-if="nav === 5"></i>
                </div>
                <div @touchstart="navQianhuan(2)" class="div1">
                    <span>异常订单</span>
                    <i v-if="nav === 2"></i>
                </div>
            </div>
            <div class="l-mypage-lists">
                <div :style="{'width': w + 55 + 'px'}"
                     v-for="(item, index) in list"
                     :class="item.keyframes + ' l-mypage-list'"
                     @click="() => jump1(item.id, item.orderStatusId)"
                >
                    <!--@touchstart="(e) => touchstart(e, index, item.id)"-->
                    <!--@touchend="(e) => touchend(e, index, item.id)"-->
                    <a :style="{'width': w + 'px'}" class="l-list-a" href="javascript:">
                        <div class="l-mypage-info-sss">
                            <img :src="item.head || '../../../static/images/morftbxd.png'" alt="">
                            <div class="div1">
                                <div class="div2">
                                    <div class="div3">
                                        <span>{{item.fromAreaName3}}</span>
                                        <i class="l-beijingdaoheze"></i>
                                        <span>{{item.toAreaName3}}</span>
                                    </div>
                                    <span>{{item.showTime}}</span>
                                </div>
                                <span class="l-xiaozi-14">体积{{item.cube}}立方米；重{{item.weight}}kg；{{item.carType}}</span>
                            </div>
                        </div>
                    </a>
                    <div class="l-list-shanchu">
                        <span>删除</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 底部 -->
        <div style="width: 100%; height: 60px; background: none"></div>
        <div class="footer">
            <ul>
                <li @touchstart="jump(0)">
                    <div>
                        <div class="top"><img src="../../../static/images/hy_index.png" alt=""></div>
                        <div class="bottom">拼车</div>
                    </div>
                </li>
                <li @touchstart="jump(1)">
                    <div class="l-index-dingdan isActive">
                        <div class="top"><img src="../../../static/images/hy_fenlei1.png" alt=""></div>
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
    export default {
        data () {
            return {
                w: window.innerWidth,
                list: [],
                client: {a: ''},
                nav: 0,
                page: 1,
            }
        },
        mounted() {
            this.getOrder(0)
        },
        computed: {

        },
        methods: {
            getOrder(type) {
                var th = this
                var data = {
                    userId: localStorage.userId,
                    pageSize: '10',
                    currentPage: th.page,
                    orderType: type,
                }
                th.ajax.get('/driver/api/getMyOrderDriverList', {params: data})
                    .then((r) => {
                        if (r.resultCode === 0) {
                            var data = r.data
                            th.list = data
                        } else {
                            th.list = []
                        }
                    })
            },

            navQianhuan(i) {
                this.nav = i
                this.getOrder(i)
            },

            jump(idx) {
                var herfs = ['/pinche', '/order', '/index', '/infos', 'mypage']
                this.$router.push(herfs[idx])
            },

            jump1(id, type) {
                log(type)
                var data = {
                    id,
                    type,
                }
                log(JSON.stringify(data))
                if (type === '2') {
                    this.$router.push({ path: '/orderInfo', query: { id: id }});
                } else if (type === '8') {
                    this.$router.push({ path: '/wancheng', query: {data: JSON.stringify(data)}});
                } else if (type === '11') {
                    this.$router.push({ path: '/wancheng', query: {data: JSON.stringify(data)}});
                } else if (type === '16') {
                    this.$router.push({ path: '/yichangdingdan', query: { id: id }});
                }
            },

            fanhui() {
                history.go(-1)
            },

            touchstart(e) {
                var th = this
                var client = th.client
                client.a = {
                    x: e.changedTouches[0].clientX,
                    y: e.changedTouches[0].clientY,
                }
            },

            touchend(e, index, id) {
                var th = this
                var client = th.client
                var list = th.list
                client.b = {
                    x: e.changedTouches[0].clientX,
                    y: e.changedTouches[0].clientY,
                }
                if ((client.a.x - client.b.x) > 60) {
                    if ((client.a.y - client.b.y) > 0) {
                        if ((client.a.y - client.b.y) < 50) {
                            th.addclass(index)
                        }
                    } else {
                        if ((client.b.y - client.a.y) < 50) {
                            th.addclass(index)
                        }
                    }
                } else {
                    if (list[index].ujiu) {
                        for (var i = 0; i < list.length; i++) {
                            if (list[i].ujiu) {
                                list[i].ujiu = false
                                th.rovclass(i)
                                return
                            }
                        }
                    } else {
                        // th.jump1(id)
                    }
                }
            },

            addclass(index) {
                var list = this.list
                list.forEach((i) => {
                    i.keyframes = ''
                    i.ujiu = false
                })
                list[index].keyframes = 'keyframes'
                list[index].ujiu = true
            },

            rovclass(index) {
                var list = this.list
                list[index].keyframes = 'keyframes1'
            }
        }
    }
</script>

<style lang="scss" scoped>

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

    .keyframes {
        animation: slidein 200ms linear forwards;
    }

    .keyframes1 {
        animation: slidein1 200ms linear forwards;
    }

    @keyframes slidein {
        0% { right: 0;}
        10% { right: 5px;}
        20% { right: 10px;}
        30% { right: 15px;}
        40% { right: 20px;}
        50% { right: 25px;}
        60% { right: 30px;}
        70% { right: 35px;}
        80% { right: 40px;}
        90% { right: 45px;}
        to { right: 55px;}
    }

    @keyframes slidein1 {
        0% { right: 55px;}
        10% { right: 45px;}
        20% { right: 40px;}
        30% { right: 35px;}
        40% { right: 30px;}
        50% { right: 25px;}
        60% { right: 20px;}
        70% { right: 15px;}
        80% { right: 10px;}
        90% { right: 5px;}
        to { right: 0;}
    }

    .l-mypage-list {
        position: relative;
        background: #fff;
        margin-top: 5px;
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
                }
            }
        }
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
        z-index: 109;
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
        z-index: 1000;
        position: fixed;
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
        width: 100%;
        height: 100%;
    }

    .l-zhongjian-zhongjian {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        z-index: 105;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 3px;
    }

    .dingdan{
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
