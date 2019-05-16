<template>
    <div class="mssage">
        <div class="l-index-top">
            <i @touchstart="fanhui()" class="l-top-dingwei-i"></i>
            <span class="l-top-biaoti">实名认证</span>
            <span class="sp1"></span>
        </div>
        <div class="top-zhanwei"></div>
        <div class="l-shiming-index">
            <div class="uh">
                <div class="list">
                    <span class="sp1">姓名</span>
                    <span class="typeShow1">{{userName}}</span>
                </div>
                <div class="list ">
                    <span class="sp1">身份证号码</span>
                    <span class="typeShow1">{{userID}}</span>
                </div>
            </div>
            <div class="xw">
                <div class="tupians">
                    <div class="biaoti">上传身份证</div>
                    <div class="fangkuangs">
                        <div @click="v_show(2, 0)" class="fangkuang">
                            <img v-if="yi != null"
                                 :src="yi"
                                 alt="">
                            <label v-if="yi == null" ></label>
                            <span v-if="yi == null" >正面照片</span>
                        </div>
                        <div @click="v_show(3, 1)" class="fangkuang fangkuang1">
                            <img v-if="er != null"
                                 :src="er"
                                 alt="">
                            <label v-if="er == null" ></label>
                            <span v-if="er == null">背面照片</span>
                        </div>
                    </div>
                </div>
                <div class="tupians">
                    <div class="biaoti">上传手持身份证</div>
                    <div class="fangkuangs">
                        <div @click="v_show(1, 2)" class="fangkuang">
                            <img v-if="san != null"
                                 :src="san"
                                 alt="">
                            <label v-if="san == null" ></label>
                            <span v-if="san == null">手持身份证照片</span>
                        </div>
                        <img src="../../../../static/images/ubiiID.png" class="fangkuang fangkuang1 shilitu1">
                    </div>
                </div>
                <div class="tupians">
                    <div class="biaoti">上传营业执照</div>
                    <div class="fangkuangs">
                        <div @click="v_show('', 3)" class="fangkuang">
                            <img v-if="si != null"
                                 :src="si"
                                 alt="">
                            <label v-if="si == null" ></label>
                            <span v-if="si == null">营业执照照片</span>
                        </div>
                        <img src="../../../../static/images/yingyezhizhao.png" class="fangkuang fangkuang1 shilitu1">
                    </div>
                </div>

            </div>
            <div class="button">
                <span @click="tijiaoShiming()">提交</span>
            </div>
        </div>
        <div class="l-shangchuan" v-if="tupian">
            <div @click="v_hide()" class="vevk"></div>
            <div class="pOrC">
                <div class="tishis">
                    <img src="../../../../static/images/uiliID.png"
                         v-if="tiui == '1'" class="tiui1">
                    <img
                        src="../../../../static/images/uiliIDfj.png"
                        v-if="tiui == '2'" class="tiui2">
                </div>
                <span @click="xuanzeImg(0)" class="sp1">拍摄</span>
                <span @click="xuanzeImg(1)" v-if="!shouchi" class="sp2">手机相册选择</span>
                <span class="sp3" @touchstart="v_hide()">取消</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                yi: null,
                er: null,
                san: null,
                si: null,
                userName: '请输入您的姓名',
                userID: '请输入身份证号',
                file: null,
                tupian: false,
                dhouchi: false,
                tiui: '0',
                startTop: 0,
                provinceIndex: 0,
                districtIndex: 0,
                translateY: 0,
                maxScroll: 0,
                addHeight: 0,
                provinceVal: '',
                areaVal: '',
                data: {
                    url: '/common/api/uploadImg',
                    index: 9,
                },
            }
        },
        methods: {
            tijiaoShiming() {
                var th = this
                var data = {
                    // 营业执照
                    "businessLicenceImg": th.si,
                    "companyName": '',
                    "companyRegisterAddress": '',
                    "corporateName": '',
                    "createTime": '',
                    // 用户id
                    "id": localStorage.userId,
                    // 身份证照片
                    "idImg": th.yi,
                    // 身份证反面照片
                    "idReversedImg": th.er,
                    // 手持身份证照片
                    "idImgHeard": th.san,
                    // 身份证号码
                    "idNo": th.userID,
                    // 审核状态
                    "reviewedStatus": localStorage.reviewedStatus,
                    // 货主类型
                    "shipperType": localStorage.shipperType,
                    // 用户姓名
                    "name": th.userName,
                }
                var obj = {
                    "businessLicenceImg": '营业执照未上传',
                    "id": '未登录',
                    "idImg": '身份证正面未上传',
                    "idImgHeard": '手持身份证未上传',
                    "idNo": '身份证正面未上传',
                    "idReversedImg": '身份证反面未上传',
                    "name": '身份证正面未上传'
                }

                for (var i in data) {
                    if (data[i] === null) {
                        th.mssage(obj[i], 'bottom')
                        return
                    }
                }
                this.ajax.post('/shipper/api/shimingShipper', data)
                    .then((r) => {
                        th.mssage(r.message, 'bpttom')
                        if (r.resultCode === 0) {

                        }
                    })

            },
            xuanzeImg(i) {
                var th = this
                var data = th.data
                data.userId = localStorage.userId
                data.url = window.Api + data.url
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
                    th.userName = obj.data.name
                    th.userID = obj.data.idNo
                    th[th.data.index] = obj.data.imgUrl + obj.data.imgPath
                    th.tupian = false
                }, data)
            },

            v_show(i, ii) {
                var th = this
                th.tupian = true
                if (i == '1') {
                    if (th.userID.length === 18) {
                        th.shouchi = true
                    } else {
                        th.shouchi = false
                        th.tupian = false
                        th.mssage('请先上传身份证', 'bottom')
                    }
                } else if (i == '2') {
                    th.shouchi = true
                    th.tiui = '1'
                } else if (i == '3') {
                    th.tiui = '2'
                    th.shouchi = true
                } else {
                    th.shouchi = false
                }
                var urls = [
                    {
                        url: '/common/api/uploadIDImg',
                        type: 'face',
                        index: 'yi',
                    },
                    {
                        url: '/common/api/uploadIDImg',
                        type: 'back',
                        index: 'er',

                    },
                    {
                        url: '/common/api/uploadIDHImg',
                        type: 'face',
                        index: 'san',
                    }
                ]
                th.data = urls[ii]
            },
            v_hide() {
                this.tupian = false
            },
            fanhui() {
                history.go(-1)
            },
            mssage(info, po) {
                this.$Toast({
                    message: info,
                    position: po,
                })
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
            }
            .tiui2 {
                width: 6.25rem;
                height: 4rem;
                position: fixed;
                top: 3.8rem;
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

    .l-shiming-index {
        width: 100%;
        .button {
            width: 100%;
            padding: 0 15px;
            background: #f8f8f8;
            span {
                margin: 20px 0;
                background: #51c1ea;
                width: 100%;
                height: 35px;
                color: #fff;
                font-size: 16px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 5px;
            }
        }
        .xw {
            .tupians {
                width: 100%;
                display: flex;
                flex-direction: column;
                .biaoti {
                    font-size: 14px;
                    color: #666;
                    margin-bottom: 10px;
                    margin-top: 15px;
                }
                .fangkuangs {
                    display: flex;
                    width: 100%;
                    flex-wrap: nowrap;
                    .shilitu1 {
                        background: url("../../../../static/images/ubiiID.png") no-repeat center;
                        background-size: 100% 100%;
                        border: none!important;

                    }
                    .fangkuang1 {
                        margin: 0!important;
                    }
                    .fangkuang {
                        position: relative;
                        img {
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            top: 0;
                            z-index: 2;
                        }
                        label {
                            width: 37px;
                            height: 37px;
                            background: url("../../../../static/images/jiahao.png") no-repeat center;
                            background-size: 100% 100%;
                            margin-bottom: 5px;
                            z-index: 1;
                        }
                        span {
                            color: #666;
                            font-size: 14px;
                            margin-top: 10px;
                            z-index: 1;
                        }
                        width: 50%;
                        height: 2.1rem;
                        margin-right: 15px;
                        border: dashed 1px #ddd;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        input {
                            display: none;
                        }
                    }
                }

            }
            margin-top: 5px;
            background: #fff;
            width: 100%;
            padding: 15px;
            padding-top: 0;
            box-sizing: border-box;
        }
        .uh {
            width: 100%;
            background: #fff;
            padding-left: 15px;
            box-sizing: border-box;
            .list {
                .typeShow1 {
                    color: #666;
                    font-size: 14px;
                }
                input {
                    width: 50%;
                    border: none;
                    background: none;
                    margin: 0;
                    padding: 0;
                    color: #999;
                    font-size: 14px;
                }
                .sp1 {
                    color: #666;
                    font-size: 14px;
                    width: 90px;
                }
                width: 100%;
                height: 44px;
                display: flex;
                align-items: center;
                border-bottom: solid 1px #ddd;
                position: relative;
            }
        }
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
        background-sze: 100% 100%;
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
