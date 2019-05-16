<template>
    <div class="mssage">
        <div class="l-index-top">
            <span class="l-top-biaoti">消息</span>
        </div>
        <div class="top-zhanwei"></div>
        <div class="l-mssage-lists">
            <div @click="" class="l-mssage-list">
                <i v-if="quanxuanbl == true" class="l-xuanzhong"></i>
                <!--<i class="l-weixuanzhong"></i>-->
                <div class="l-mssage-list-index">
                    <img src="../../../static/images/dingwei.png" alt="">
                    <div class="l-mssage-list-body">
                        <div class="l-mssage-list-body-t">
                            <span class="l-biaoti-18">123</span>
                            <span class="l-xiaozi-14">123223222</span>
                        </div>
                        <span class="l-xiaozi-14">123223222</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 底部 -->
        <div style="width: 100%; height: 60px; background: #f2f2f2"></div>
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
                    <div class="l-index-dingdan isActive">
                        <div class="top"><img src="../../../static/images/hy_mine1.png" alt=""></div>
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
                listState: [],
                quanxuanbl: false,
            }
        },
        mounted() {
            this.getInfo(1)
        },
        computed: {

        },
        methods: {
            getInfo(page) {
                var th = this
                var data = {
                    currentPage: page,
                    pageSize: 10,
                    userId: localStorage.userId
                }
                th.ajax.get('/common/api/getChatList', {params: data})
                    .then((r) => {
                        if (r.resultCode === 0) {
                            var data = r.data

                            th.list = data
                        }
                    })
            },
            jump(idx) {
                var herfs = ['/pinche', '/order', '/index', '/infos', 'mypage']
                this.$router.push(herfs[idx])
            },
            quanxuan() {
                var th = this
                th.quanxuanbl = !th.quanxuanbl
            },
            fanhui() {
                history.go(-1)
            }
        }
    }
</script>

<style lang="scss" scoped>

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
        background: url("../../../static/images/dingwei.png") no-repeat center;
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
        background: url("../../../static/images/dingwei.png") no-repeat center;
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
        background: url("../../../static/images/dingwei.png") no-repeat center;
        background-size: 100% 100%;
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
</style>
