<template>
    <div class="mssage">
        <div class="l-index-top">
            <i @touchstart="fanhui()" class="l-top-dingwei-i"></i>
            <span class="l-top-biaoti">邀请码</span>
        </div>
        <div class="top-zhanwei"></div>
        <div class="l-yaoqingma">
            <div>
                <span>邀请人电话</span>
                <input :value="phone" @change="(e) => this.phone = e.target.value" placeholder="请输入邀请人电话" type="tel">
            </div>
            <span class="sp1">
                <span @click="tijiaoyaoqing()">提交</span>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                phone: '',
            }
        },
        mounted() {

        },
        computed: {

        },
        methods: {
            tijiaoyaoqing() {
                var data = {

                }
                this.ajax.post('/common/api/uploadImg', data)
                .then((r) => {
                    if (r.resultCode === 0) {
                        th.mssage(r.message, 'bottom')
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

    .l-yaoqingma {
        width: 100%;
        display: flex;
        flex-direction: column;
        .sp1 {
            width: 100%;
            padding: 0 15px;
            box-sizing: border-box;
            span {
                width: 100%;
                height: 42px;
                border-radius: 5px;
                background: #51c1ea;
                color: #fff;
                font-size: 16px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 60px;
            }
        }
        div {
            background: #fff;
            span {
                color: #333;
                font-size: 14px;
            }
            input {
                color: #666;
                font-size: 14px;
                border: none;
                background: none;
                width: 50%;
                margin: 0 10px 0 20px;
            }
            width: 100%;
            height: 45px;
            padding: 0 15px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            border-bottom: solid 1px #ddd;
        }
    }

    .l-mssage-bottom-yb {
        display: flex;
        margin-right: 15px;
        .sp1 {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 85px;
            height: 35px;
            color: #51c1ea;
            border: solid 1px #51c1ea;
            font-size: 18px;
            border-radius: 5px;
        }
        .sp2 {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 85px;
            height: 35px;
            color: #fff;
            background: #51c1ea;
            font-size: 18px;
            border-radius: 5px;
            margin-left: 10px;
        }
    }

    .l-mssage-bottom-zo {
        display: flex;
        align-items: center;
        height: 100%;
        margin-left: 15px;
    }

    .l-mssage-bottom-zo span {
        color: #51c1ea;
        font-size: 18px;
    }

    .l-mssage-bottom {
        width: 100%;
        height: 46px;
        position: fixed;
        bottom: 0;
        border-top: solid 1px #ddd;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .l-mssage-list-body-t {
        display: flex;
        justify-content: space-between;
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

    .l-top-info-i {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url("../../../../static/images/dingwei.png") no-repeat center;
        background-size: 100% 100%;
    }

    .l-top-dingwei-i {
        display: inline-block;
        width: 40px;
        height: 40px;
        background: url("../../../../static/images/fanhuixiangyb.png") no-repeat left center;
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
        z-index: 102;
    }
</style>
