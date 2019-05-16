<template>
    <div class="mssage">
        <div class="l-index-top">
            <i @touchstart="fanhui()" class="l-top-dingwei-i"></i>
            <span class="l-top-biaoti">意见反馈</span>
            <span class="sp1"></span>
        </div>
        <div class="top-zhanwei"></div>
        <div class="l-yijian-index">

        </div>
        <div class="l-shangchuan" v-if="tupian">
            <div @click="v_hide()" class="vevk"></div>
            <div class="pOrC">
                <span class="sp1">拍摄</span>
                <span v-if="!shouchi" class="sp2">手机相册选择</span>
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
                dhouchi: false,
                infoVevk: true,
            }
        },
        mounted() {

        },
        computed: {

        },
        methods: {
            t_hide() {
                this.infoVevk = false
                this.$nextTick(function () {
                    this.$refs.input.focus()
                })
            },
            v_show(i) {
                var th = this
                th.tupian = true
                if (i == '1') {
                    th.shouchi = true
                } else if (i == '2') {
                    th.shouchi = true
                    th.tiui = '1'
                } else if (i == '3') {
                    th.tiui = '2'
                    th.shouchi = true
                } else {
                    th.shouchi = false
                }
            },
            v_hide() {
                this.tupian = false
            },
            fanhui() {
                history.go(-1)
            }
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
                background: url("../../../../static/images/dingwei.png") no-repeat center;
                background-size: 100% 100%;
            }
            .tiui2 {
                width: 6.25rem;
                height: 4rem;
                position: fixed;
                top: 3.8rem;
                background: url("../../../../static/images/dingwei.png") no-repeat center;
                background-size: 100% 100%;
            }
        }

        .pOrC {
            width: 100%;
            font-size: 14px;
            position: fixed;
            bottom: 0;
            z-index: 120;
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

    .l-yijian-index {
        width: 100%;
        background: #f8f8f8;
        padding: 20px 15px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
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
        background: url("../../../../static/images/dingwei.png") no-repeat left center;
        background-size: 25% 50%;
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
