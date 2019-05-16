<template>
    <div class="mssage">
        <div class="l-index-top">
            <i @touchstart="fanhui()" class="l-top-dingwei-i"></i>
            <span class="l-top-biaoti">分享</span>
        </div>
        <div
            @touchstart="touchStart()"
            @touchend="touchEnd()"
            id="capture" class="imgbj">
            <span style="margin-top: 2.24rem" class="yaoqing">邀请人：{{name}}</span>
            <span style="margin-top: 0.3rem" class="yaoqing">邀请人电话：{{phone}}</span>
            <div id="qrcode"></div>
        </div>
    </div>
</template>

<script>

    export default {
        data () {
            return {
                name: '',
                phone: '',
                setT: null,
                touch: 0,
            }
        },
        mounted() {
            this.getYinhangka()
            var qrcode = new QRCode(document.getElementById("qrcode"), {
                width : 100,
                height : 100,
            });
            var url = 'http://www.baidu.com'
            qrcode.makeCode(url)
        },
        computed: {

        },
        methods: {
            touchStart() {
                var th = this
                th.setT = setTimeout(function() {
                    if (th.touch !== 2) {
                        th.touch = 1
                    }
                }, 1000)
            },

            touchEnd() {
                var th = this
                if (th.touch === 1) {
                    log('下载')
                    th.touch = 2
                    th.shengchengImg()
                } else if (th.touch === 2) {

                } else {
                    clearTimeout(th.setT)
                }
            },

            shengchengImg() {
                var th = this
                html2canvas(document.querySelector("#capture")).then(canvas => {
                    var imgData = base64ToBlob(canvas.toDataURL("image/png"))
                    log(canvas.toDataURL("image/png"))
                    // var formdata = new FormData()
                    // formdata.append('file', imgData)
                    // th.ajax.post('/common/api/uploadImg', formdata)
                    // .then((r) => {
                    //     if (r.resultCode === 0) {
                    //         th.mssage(r.message, 'bottom')
                    //     }
                    // })
                });
            },

            fanhui() {
                history.go(-1)
            },

            getYinhangka() {
                var th = this
                this.name = localStorage.userName
                this.phone = localStorage.phone
            }
        }
    }
</script>

<style lang="scss" scoped>

    .mssage {

    }

    #qrcode {
        width: 1.38rem;
        height: 1.38rem;
        z-index: 100;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 1.75rem;
    }

    .imgbj {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: url('../../../../static/images/ffxdbj.png') no-repeat center;
        background-size: 100% 100%;
        position: fixed;
        top: 0;
        z-index: 2;
        .yaoqing {
            font-family: hanzhenguangbiao;
            font-size: 0.42rem;
            line-height: 0.42rem;
            color: #ffffff;
        }
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
        background-size: 30% 45%;
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
        position: relative;
        z-index: 3;
    }
</style>
