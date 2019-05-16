<template>
    <div class="mine">
        <div v-if="optionImg === '1'" class="mineTop">
            <div class="l-touxiang-s">
                <div class="l-mypage-top">我的</div>
                <div class="l-tbxiangzu">
                    <div class="l-tbxiangzu-s">
                        <div class="l-tbxiang-sss">
                            <img @click="v_show()" :src="userInfo.userHead ? userInfo.userHead : '../../../static/images/morftbxd.png'" alt="">
                        </div>
                        <div class="l-tbxiangzu-infos">
                            <div class="l-userInfo">
                                <span class="l-nickname">{{userInfo.userName}}</span>
                                <span v-if="juese === 'C'" class="l-biaoqian"><i></i>长途车辆</span>
                                <span v-if="juese === 'D'" class="l-biaoqian"><i></i>短驳车辆</span>
                            </div>
                            <span class="l-userPhone">{{userInfo.userPhone}}</span>
                        </div>
                        <i class="l-xiangyou-jiantou-i"></i>
                    </div>
                </div>
            </div>
            <div class="l-mypage-lists">
                <div @click="jump1(item.path)" v-for="(item, index) in list" class="l-mypage-list">
                    <a v-if="item.path == '/servicePhone'" @click="(e) => {e.stopPropagation()}" class="l-list-a" :href="'tel:' + phone">
                        <div class="l-mypage-info-sss">
                            <i :class="'l-mypage-img' + ' l-mypage-img-' + index"></i>
                            <span>{{item.name}}</span>
                        </div>
                        <!--<i v-if="index == 0 && true" class="l-xcxitbvi-kl"></i>-->
                        <div v-if="index == 0" class="mui-switch mui-switch-mini mui-active">
                            <div class="mui-switch-handle"></div>
                        </div>
                        <!--<i v-else-if="index == 0" class="l-xcxitbvi-gr"></i>-->
                        <i v-else class="l-xdybjmtb-lan"></i>
                    </a>
                    <a v-else class="l-list-a" href="javascript:">
                        <div class="l-mypage-info-sss">
                            <i :class="'l-mypage-img' + ' l-mypage-img-' + index" ></i>
                            <span>{{item.name}}</span>
                        </div>
                        <div v-if="index == 0" class="mui-switch mui-switch-mini mui-active">
                            <div class="mui-switch-handle"></div>
                        </div>
                        <!--<i v-if="index == 0 && true" class="l-xcxitbvi-kl"></i>-->
                        <!--<i v-else-if="index == 0 && false" class="l-xcxitbvi-gr"></i>-->
                        <i v-else class="l-xdybjmtb-lan"></i>
                    </a>
                </div>
            </div>
        </div>

        <div class="l-shangchuan" v-if="tupian">
            <div @click="v_hide()" class="vevk"></div>
            <div class="pOrC">
                <span @click="xuanzeImg(0)" class="sp1">拍摄</span>
                <span @click="xuanzeImg(1)" class="sp2">手机相册选择</span>
                <span class="sp3" @touchstart="v_hide()">取消</span>
            </div>
        </div>
        <div style="z-index: 122; height: auto" class="l-shangchuan" v-if="optionImg !== '1'">
            <div class="pOrC">
                <span @click="v_caijian()" class="sp1">裁剪</span>
                <span class="sp3" @touchstart="v_hideCaijian()">取消</span>
            </div>
        </div>

      <!-- 底部 -->
        <div v-if="optionImg === '1'" style="width: 100%; height: 60px; background: #f2f2f2"></div>
        <div class="footer">
          <ul>
              <li @touchstart="jump(0)">
                  <div>
                      <div class="top"><img src="../../../static/images/hy_index.png" alt=""></div>
                      <div class="bottom">拼车</div>
                  </div>
              </li>
              <li @touchstart="jump(1)">
                  <div class="l-index-dingdan">
                      <div class="top"><img src="../../../static/images/hy_fenlei.png" alt=""></div>
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
                  <div class="isActive">
                      <div class="top"><img src="../../../static/images/hy_wode1.png" alt=""></div>
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

        <vueCropper
            class="vueCropper-div"
            v-if="optionImg !== '1'"
            ref="cropper"
            :img="optionImg"
            :outputSize="num"
            :outputType="png"
            autoCropWidth="200"
            autoCropHeight="200"
            :autoCrop="bl"
        />
    </div>
</template>

<script>
import { VueCropper }  from '../../../static/js/jianqie'

export default {
    data () {
        return {
            bl: true,
            num: 1,
            png: 'png',
            phone: '15314383357',
            klgr: '1',
            juese: localStorage.juese,
            list: [
            {
              icon: `url(${imgUrl}info.png) no-repeat center`,
              path: '/info',
              name: '消息提醒',
            }, {
              icon: `url(${imgUrl}myoney.png) no-repeat center`,
              path: '/myoney',
              name: '我的钱包',
            }, {
              icon: `url(${imgUrl}ID.png) no-repeat center`,
              path: '/ID',
              name: '实名认证',
            }, {
              icon: `url(${imgUrl}share.png) no-repeat center`,
              path: '/share',
              name: '分享',
            }, {
              icon: `url(${imgUrl}invitationCode.png) no-repeat center`,
              path: '/invitationCode',
              name: '邀请码',
            }, {
              icon: `url(${imgUrl}myBankard.png) no-repeat center`,
              path: '/myBankard',
              name: '我的银行卡',
            }, {
              icon: `url(${imgUrl}mybaojia.png) no-repeat center`,
              path: '/mybaojia',
              name: '我的报价',
            }, {
              icon: `url(${imgUrl}myContract.png) no-repeat center`,
              path: '/wodehetong',
              name: '我的合同',
            },{
              icon: `url(${imgUrl}dydjhets.png) no-repeat center`,
              path: '/myContract',
              name: '订单合同',
            }, {
              icon: `url(${imgUrl}opinion.png) no-repeat center`,
              path: '/opinion',
              name: '意见反馈',
            }, {
              icon: `url(${imgUrl}ourselves.png) no-repeat center`,
              path: '/ourselves',
              name: '关于我们',
            }, {
              icon: `url(${imgUrl}servicePhone.png) no-repeat center`,
              path: '/servicePhone',
              name: '联系客服',
            }, {
              icon: `url(${imgUrl}exit.png) no-repeat center`,
              path: '/exit',
              name: '退出登录',
            },
            ],
            tupian: false,
            userInfo: {
                userName: localStorage.userName,
                userPhone: localStorage.phone,
                userHead: localStorage.userHead || '',
            },
            optionImg: "1",
        }
    },
    components: {
        VueCropper,
    },
    mounted() {
        localStorage.klgr ? this.klgr = localStorage.klgr : ''
    },
    computed: {

    },
    methods: {
        v_hideCaijian() {
            this.optionImg = '1'
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
                th.optionImg = obj.data.imgUrl + obj.data.imgPath
                th.tupian = false
            }, data)
        },

        v_show() {
            this.tupian = true
        },

        v_hide() {
            this.tupian = false
        },

        jump(idx) {
            var herfs = ['/pinche', '/order', '/index', '/infos', 'mypage']
            this.$router.push(herfs[idx])
        },

        jump1(path) {
        if (path == '/exit') {
            localStorage.clear()
            this.$router.push('/login')
        } else if (path == '/info') {

        } else {
            this.$router.push(path)
        }
    },

        mssage(info, po) {
            this.$Toast({
                message: info,
                position: po,
            })
        },

        v_caijian() {
            var th = this
            // 获取截图的blob数据
            this.$refs.cropper.getCropBlob((blob) => {
                log(blob)
                var form = new FormData
                form.append('file', blob)
                th.ajax.post('/common/api/uploadImg', form)
                    .then((r) => {
                        if (r.resultCode === 0) {
                            var data = {
                                id: localStorage.userId,
                                head: r.data.imgUrl + r.data.imgPath
                            }
                            th.ajax.post('/common/api/updateTouXiang', data)
                                .then((r1) => {
                                    th.mssage('上传头像成功', 'bottom')
                                    if (r1.resultCode === 0) {
                                        localStorage.userHead = r1.data.head
                                        th.userInfo.userHead = r1.data.head
                                        th.optionImg = '1'
                                    }
                                })
                        }
                    })
            })
        }

    },
}
</script>

<style lang="scss" scoped>

    .vueCropper-div {
        height: 100vh;
        position: fixed;
        top: 0;
        z-index: 121;
        left: 0;
    }

    .l-mypage-img-0 {
        background: url("../../../static/images/info.png") no-repeat center;
        background-size: 100% 100%;
    }
    .l-mypage-img-1 {
        background: url("../../../static/images/myoney.png") no-repeat center;
        background-size: 100% 100%;
    }
    .l-mypage-img-2 {
        background: url("../../../static/images/ID.png") no-repeat center;
        background-size: 100% 100%;
    }
    .l-mypage-img-3 {
        background: url("../../../static/images/share.png") no-repeat center;
        background-size: 100% 100%;
    }
    .l-mypage-img-4 {
        background: url("../../../static/images/invitationCode.png") no-repeat center;
        background-size: 100% 100%;
    }
    .l-mypage-img-5 {
        background: url("../../../static/images/myBankard.png") no-repeat center;
        background-size: 100% 100%;
    }
    .l-mypage-img-6 {
        background: url("../../../static/images/mybaojia.png") no-repeat center;
        background-size: 100% 100%;
    }
    .l-mypage-img-7 {
        background: url("../../../static/images/myContract.png") no-repeat center;
        background-size: 100% 100%;
    }
    .l-mypage-img-8 {
        background: url("../../../static/images/dydjhets.png") no-repeat center;
        background-size: 100% 100%;
    }
    .l-mypage-img-9 {
        background: url("../../../static/images/opinion.png") no-repeat center;
        background-size: 100% 100%;
    }
    .l-mypage-img-10 {
        background: url("../../../static/images/ourselves.png") no-repeat center;
        background-size: 100% 100%;
    }
    .l-mypage-img-11 {
        background: url("../../../static/images/servicePhone.png") no-repeat center;
        background-size: 100% 100%;
    }
    .l-mypage-img-12 {
        background: url("../../../static/images/exit.png") no-repeat center;
        background-size: 100% 100%;
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

    .l-list-a {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .mui-switch {
            margin-right: 15px;
            width: 40px;
            height: 23px;
            .mui-switch-handle {
                width: 20px;
                height: 20px;
            }
        }
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
        background: url("../../../static/images/landengyu.png") no-repeat center;
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

    .l-mypage-list {
        border-bottom: solid 1px #ddd;
        width: 100%;
        height: 52px;
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #333;
        justify-content: space-between;
    }

    .l-mypage-lists {
        width: 100%;
        padding-left: 15px;
        display: flex;
        flex-direction: column;
        background: #fff;
    }

    .l-xiangyou-jiantou-i {
        width: 10px;
        height: 15px;
        background: url("../../../static/images/baidengyu.png") no-repeat center;
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
        background: url("../../../static/images/duanbohechangtu.png") no-repeat center;
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
        /*background: #51c1ea;*/
        background: linear-gradient(to top, #7eddf6, #58c3e0);
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
        font-size: 11px;
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
        width: 30px;
        height: 30px;
    }

    .l-zhongjian-zhongjian {
        width: 30px;
        height: 30px;
        /*background: #51c1ea;*/
        border-radius: 50%;
        z-index: 105;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 3px;
    }

    .mine{
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
                            font-size: 11px;
                        }
                    }
                    .isActive{
                        color: #9d792a;
                        font-size: 11px;
                    }
                }
            }

        }
    }
</style>
