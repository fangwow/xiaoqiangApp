<template>
    <div class="mssage">
        <div class="l-index-top">
            <i @touchstart="fanhui()" class="l-top-dingwei-i"></i>
            <span class="l-top-biaoti">关于我们</span>
            <span class="sp1"></span>
        </div>
        <div class="top-zhanwei"></div>
        <div class="l-guanyu-index">
            <div class="div-1">
                <img src="../../../../static/images/logo.png" alt="">
                <div class="jianjie">
                    <span class="sp1">公司简介：</span>
                    <span class="sp2">{{info}}</span>
                </div>
            </div>
            <div class="div2">
                <div class="divs">
                    <span class="sp1">客服热线</span>
                    <a class="sp2" href="tel:010-60772770">{{kefu}}</a>
                </div>
                <div class="divs">
                    <span class="sp1">微信公众号</span>
                    <span class="sp4" >{{gongzhonghao}}</span>
                </div>
                <div class="divs divt">
                    <span class="sp1">官方微信</span>
                    <img :src="erweima" class="sp3" >
                </div>
            </div>
        </div>
        <div class="gongsixinxi">
            <span>Copyright @2018-2038</span>
            <span>众益联(北京)科技有限公司</span>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                data: {},
                kefu: '',
                gongzhonghao: '',
                info: '',
                erweima: '',
            }
        },
        mounted() {
            this.getInfo()
        },
        computed: {

        },
        methods: {
            getInfo() {
                var data = {
                    id: 0,
                }
                var th = this
                this.ajax.get('/common/api/getAboutUs', {params: data})
                    .then((r) => {
                        if (r.resultCode === 0) {
                            log(r.data)
                            th.kefu = r.data.kefu
                            th.gongzhonghao = r.data.gongzhonghao
                            th.info = r.data.info
                            th.erweima = r.data.erweima
                        }
                    })
            },

            fanhui() {
                history.go(-1)
            }
        }
    }
</script>

<style lang="scss" scoped>

    .gongsixinxi {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        bottom: 15px;
        span {
            color: #666;
            font-size: 12px;
        }
    }

    .l-guanyu-index {
        .div2 {
            margin-top: 5px;
            width: 100%;
            background: #fff;
            .divt {
                border-bottom: none!important;
            }
            .divs {
                width: 100%;
                height: 45px;
                border-bottom: solid 1px #ddd;
                padding: 0 15px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .sp3 {
                    width: 33px;
                    height: 33px;
                    display: block;
                }
                .sp4 {
                    color: #666;
                    font-size: 14px;
                }
                .sp1 {
                    color: #666;
                    font-size: 16px;
                }
                .sp2 {
                    color: #51c1ea;
                    font-size: 14px;
                }
            }
        }
        .div-1 {
            width: 100%;
            padding: 0 30px;
            box-sizing: border-box;
            background: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
                width: 1.65rem;
                height: 2.15rem;
                margin: 1.5rem 0;
            }
            .jianjie {
                width: 100%;
                display: flex;
                flex-direction: column;
                .sp1 {
                    width: 100%;
                    margin-bottom: 10px;
                    color: #666;
                    font-size: 14px;
                }
                .sp2 {
                    width: 100%;
                    font-size: 12px;
                    color: #999;
                    margin-bottom: 35px;
                    line-height: 20px;
                }
            }
        }
        width: 100%;
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
