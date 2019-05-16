<template>
    <div class="mssage">
        <div class="l-index-top">
            <i @touchstart="fanhui()" class="l-top-dingwei-i"></i>
            <span class="l-top-biaoti">意见反馈</span>
            <span class="sp1"></span>
        </div>
        <div class="top-zhanwei"></div>
        <div class="l-yijian-index">
            <div style="padding: 0 0.3rem" class="wenti">
                <div class="biaoti">
                    <span class="sp1"></span>
                    <span class="sp2">问题描述</span>
                </div>
                <textarea :value="wenti" @change="(e) => this.wenti = e.target.value" ref="input" v-if="!infoVevk"></textarea>
                <div v-else @click="t_hide()" class="tishi">
                    请描述您使用中的问题和建议，若功能异常，上传截图可以更快解决哦！
                </div>
            </div>
            <div class="wenti">
                <div style="padding: 0 0.3rem; box-sizing: border-box" class="biaoti">
                    <span class="sp1"></span>
                    <span class="sp2">添加图片</span>
                    <i class="jxtu"></i>
                </div>
                <div class="imgs">
                    <div @click="v_show()" v-if="imgH && imgs.length < 6"
                        :style="[{'height': [imgH + 'px']},
                        {'width': [imgH + 'px']}]"
                        class="sp1 teuujwhk">
                    </div>
                    <div v-for="(item, index) in imgs"
                        :style="[{'height': [imgH + 'px']},
                        {'width': [imgH + 'px']},
                        {'background': [`url(${item.src}) no-repeat center`]},
                        {'background-size': [item.w + item.h]},]"
                        class="sp1">
                    </div>
                    <span id="span0" class="sp1 sp2"></span>
                </div>
            </div>
        </div>
        <div class="yijianf">
            <span @click="tijiaoyijian()">提交</span>
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
                dhouchi: false,
                infoVevk: true,
                imgs: [],
                imgss: [],
                imgH: 0,
                wenti: '',
            }
        },
        mounted() {
            var th = this
            var w = (window.innerWidth - 60) / 3
            th.imgH = w

        },
        computed: {

        },
        methods: {
            mssage(info, po) {
                this.$Toast({
                    message: info,
                    position: po,
                })
            },

            tijiaoyijian() {
                var th = this
                var imgList = []
                th.imgs.forEach((i, index) => {
                    imgList.push(i.src)
                })
                var data = {
                    imgList: imgList,
                    userId: localStorage.userId,
                    info: th.wenti,
                }
                if (data.info.length < 1) {
                    th.mssage('请输入点什么', 'bottom')
                    return
                }
                th.ajax.post('/common/api/addFeedBack', data)
                    .then((r) => {
                        th.mssage(r.message, 'bottom')
                        if (r.resultCode === 0) {

                        } else {
                        }
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
        }
    }
</script>

<style lang="scss" scoped>


    .yijianf {
        width: 100%;
        padding: 0 0.3rem;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        span {
            width: 100%;
            height: 0.86rem;
            background-color: #75c1dd;
            border-radius: 0.1rem;
            font-size: 0.36rem;
            color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

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
        background: #f2f2f2;
        padding: 20px 0;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        .shangchuan {
            margin-top: 10px;
            width: 100%;
            height: 3.2rem;
            background: #fff;
            box-sizing: border-box;
            border: 5px;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            padding: 0.2rem 0.3rem;
            img {
                width: 1rem;
                height: 1rem;
                margin: 0.2rem;
            }
            .shangchuan1 {

            }
        }
        textarea {
            width: 100%;
            height: 3.3rem;
            padding: 10px;
            box-sizing: border-box;
            border-radius: 5px;
            margin-top: 10px;
            font-size: 14px;
            color: #666;
        }
        .wenti {
            .imgs {
                padding-left: 15px;
                box-sizing: border-box;
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                /*justify-content: space-around;*/
                margin-top: 0.2rem;
                .teuujwhk {
                    background: #eee url("../../../../static/images/jiahao.png") no-repeat center;
                    background-size: 0.7rem 0.7rem;
                }
                .sp2 {
                    position: absolute;
                    left: 10066px;
                    height: 0;
                }
                .sp1 {
                    margin: 0 15px 15px 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                    img {

                    }
                }
            }
            .tishi {
                width: 100%;
                height: 3.3rem;
                padding: 10px;
                box-sizing: border-box;
                border-radius: 5px;
                margin-top: 10px;
                font-size: 14px;
                color: #999;
                background: #fff;
            }
            width: 100%;
            display: flex;
            flex-direction: column;
            .biaoti {
                width: 100%;
                display: flex;
                align-items: center;
                margin-top: 10px;
                .jxtu {
                    width: 0.35rem;
                    height: 0.3rem;
                    display: inline-block;
                    background: url("../../../../static/images/xiangji.png") no-repeat center;
                    background-size: 100% 100%;
                    margin-left: 10px;
                }
                .sp1 {
                    width: 8px;
                    height: 8px;
                    background: #51c1ea;
                    border-radius: 50%;
                    margin-right: 5px;
                }
                .sp2 {
                    color: #666;
                    font-size: 16px;
                }
            }
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
        background: url("../../../../static/images/xiangji.png") no-repeat center;
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
