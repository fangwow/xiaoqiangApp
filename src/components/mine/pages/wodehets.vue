<template>
    <div class="dingdan">
        <div class="mineTop">
            <div class="l-index-top">
                <i @touchstart="fanhui()" class="l-top-dingwei-i"></i>
                <span class="l-top-biaoti">我的合同</span>
                <span class="sp1"></span>
            </div>
            <div class="l-mypage-lists">
                <div v-for="(item, index) in list" class="l-mypage-list">
                    <a class="l-list-a" href="javascript:">
                        <div class="l-mypage-info-sss">
                            <div class="xuanzhe"></div>
                            <img :src="item.icon" alt="">
                            <div class="div1">
                                <div class="div2">
                                    <div class="div3">
                                        <span>北京</span>
                                        <i class="l-beijingdaoheze"></i>
                                        <span>北京</span>
                                    </div>
                                    <span>5分钟前</span>
                                </div>
                                <span class="l-xiaozi-14">体积0.7立方公里；重若干吨；猪肉</span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div class="l-hetong-zhanwei"></div>
            <div class="l-hetong-bottom">
                <div class="zo">
                    <div class="zo1">
                        <div class="xuanzhe"></div>
                        <span class="sp1">全选</span>
                    </div>
                    <div class="zo1">
                        <span class="sp1">合计：</span>
                        <span class="sp2">2</span>
                    </div>
                </div>
                <div class="yb">
                    下一步
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                w: window.innerWidth,
                list: [
                    {
                        icon: '../../../static/images/dingwei.png',
                        path: '/info',
                        name: '消息提醒',
                        keyframes: '',
                        ujiu: false,
                    }, {
                        icon: '../../../static/images/dingwei.png',
                        path: '/myoney',
                        name: '我的钱包',
                        keyframes: '',
                        ujiu: false,
                    }
                ],
                client: {a: ''},
                nav: '0'
            }
        },
        mounted() {

        },
        computed: {

        },
        methods: {
            jump1(id) {
                this.$router.push('/order/' + id)
            },

            fanhui() {
                history.go(-1)
            },
        }
    }
</script>

<style lang="scss" scoped>

    .l-hetong-bottom {
        width: 100%;
        position: fixed;
        bottom: 0;
        height: 45px;
        background: #fff;
        display: flex;
        justify-content: space-between;
        .zo {
            .zo1 {
                .xuanzhe {
                    width: 18px;
                    height: 18px;
                    border: solid 1px #ddd;
                    border-radius: 50%;
                    margin-right: 5px;
                }
                display: flex;
                .sp1 {
                    color: #666;
                    font-size: 14px;
                }
                .sp2 {
                    color: #f85156;
                    font-size: 14px;
                }
            }
            width: 74%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 15px;
            box-sizing: border-box;
        }
        .yb {
            width: 26%;
            color: #fff;
            font-size: 16px;
            background: #51c1ea;
            display: flex;
            justify-content: center;
            align-items: center;
        }
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
                .xuanzhe {
                    position: absolute;
                    left: 0;
                    width: 18px;
                    height: 18px;
                    border: solid 1px #ddd;
                    border-radius: 50%;
                }
                .xuanzhe1 {
                    position: absolute;
                    left: 0;
                    width: 18px;
                    height: 18px;
                    background: url("../../../../static/images/dingwei.png") no-repeat center;
                    background-size: 100% 100%;
                }
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
                padding-left: 85px;
                padding-right: 15px;
                box-sizing: border-box;
                width: 100%;
                img {
                    width: 60px;
                    height: 60px;
                    position: absolute;
                    left: 25px;
                }
            }
        }
    }

    .l-top-dingwei-i {
        display: inline-block;
        width: 40px;
        height: 40px;
        background: url("../../../../static/images/dingwei.png") no-repeat left center;
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
        font-size: 0.36rem;
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
        background: url("../../../../static/images/dingwei.png") no-repeat center;
        background-size: 100% 100%;
        display: inline-block;
        margin-right: 15px;
    }

    .l-xcxitbvi-gr {
        width: 10px;
        height: 15px;
        background: url("../../../../static/images/dingwei.png") no-repeat center;
        background-size: 100% 100%;
        display: inline-block;
        margin-right: 15px;
    }

    .l-xcxitbvi-kl {
        width: 10px;
        height: 15px;
        background: url("../../../../static/images/dingwei.png") no-repeat center;
        background-size: 100% 100%;
        display: inline-block;
        margin-right: 15px;
    }

    .l-beijingdaoheze {
        background: url("../../../../static/images/dingwei.png") no-repeat center;
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
        background: url("../../../../static/images/dingwei.png") no-repeat center;
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
        background: url("../../../../static/images/dingwei.png") no-repeat center;
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
        background: url("../../../../static/images/hy_mine.png") no-repeat center;
        background-size: 100% 100%;
        display: inline-block;
        width: 20px;
        height: 20px;
    }

    .l-zhongjian-zhongjian {
        width: 30px;
        height: 30px;
        background: #51c1ea;
        border-radius: 50%;
        z-index: 105;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 3px;
    }
</style>
