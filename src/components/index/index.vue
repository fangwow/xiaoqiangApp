<template>
    <div class="index">
        <div class="l-index-top">
            <i @click="addressChufa('0')" class="l-top-dingwei-i"></i>
            <span class="l-top-biaoti">小强智配</span>
            <div class="l-top-info">
                <i class="l-top-info-i"></i>
                <span class="l-xiaohongdian">1</span>
            </div>
        </div>
        <div class="index-body">
            <div class="parent">
                <div id="segmentedControl" class="mui-segmented-control">
                    <router-link class="mui-control-item mui-active" to='/item1'>整车</router-link>
                    <a class="mui-control-item" href="#item2">零担</a>
                    <a class="mui-control-item" href="#item3">拼车</a>
                </div>
            </div>
			<div class='body'>
                <router-view></router-view>
				<!-- <div id="item1" class="mui-control-content mui-active">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            第一个选项卡子项-1
                        </li>
                        <li class="mui-table-view-cell">
                            第一个选项卡子项-2
                        </li>
                        <li class="mui-table-view-cell">
                            第一个选项卡子项-3
                        </li>
                    </ul>
				</div>
				<div id="item2" class="mui-control-content">
					<ul class="mui-table-view">
						<li class="mui-table-view-cell">
							第二个选项卡子项-1
						</li>
						<li class="mui-table-view-cell">
							第二个选项卡子项-2
						</li>
						<li class="mui-table-view-cell">
							第二个选项卡子项-3
						</li>
					</ul>
				</div>
				<div id="item3" class="mui-control-content">
					<ul class="mui-table-view">
						<li class="mui-table-view-cell">
							第三个选项卡子项-1
						</li>
						<li class="mui-table-view-cell">
							第三个选项卡子项-2
						</li>
						<li class="mui-table-view-cell">
							第三个选项卡子项-3
						</li>
					</ul>
				</div> -->
			</div>
        </div>
        <!-- 底部 -->
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
                    <div>
                        <div class="top"><img src="../../../static/images/hy_wode.png" alt=""></div>
                        <div class="bottom">我的</div>
                    </div>
                </li>
            </ul>
            <div class="l-zhongjian-div">
                <div class="l-zhongjian-zhongjian-vevk"></div>
                <div class="l-zhongjian">
                    <div class="l-zhongjian-zhongjian">
                        <i class="zhongjian-i"></i>
                    </div>
                </div>
                <span class="l-jiehuo isActive">接货</span>
            </div>
        </div>
    </div>
</template>

<script>
    import addr from '@/components/compo/address'
    export default {
    data () {
        return {
            taitou: '',
            addr: false,
            webSocket: null
        }
    },

    components: { 
        addr
    },

    mounted() {
        var phone = localStorage.phone
        if (phone && phone.length === 11) {
            this.login()
        } else {
            this.$router.push('/login')
        }
    },

    methods: {
        mssage(info, po) {
            this.$Toast({
                message: info,
                position: po,
            })
        },

        wancheng(obj) {
            localStorage.address1 = obj.provinceVal.regionCode
            localStorage.address2 = obj.cityVal.regionCode
            localStorage.address3 = obj.areaVal.regionCode
            localStorage.addressName1 = obj.provinceVal.regionName
            localStorage.addressName2 = obj.cityVal.regionName
            localStorage.addressName3 = obj.areaVal.regionName
            this.addr = false
        },

        quxiao(bl) {
            this.addr = bl
        },

        runStart() {
            var th = this
            var data = {

            }
            this.$router.push('/jiedanzhong')
            // this.ajax.post('/driver/api/sijiAddPCMessage', data)
            //     .then((r) => {
            //         th.mssage(r.message, 'bottom')
            //         if (r.resultCode === 0) {
            //             this.$router.push('/jiedanzhong')
            //         }
            //     })
        },

        __webSocket(evt) {
            var received_msg = evt.data;
            console.log("数据已接收:" + received_msg);
            var obj = JSON.parse(received_msg);
            console.log("可以解析成json:" + obj.messageType);
            //1代表上线 2代表下线 3代表在线名单 4代表普通消息
            if (obj.messageType == 1) {
                //把名称放入到selection当中供选择
                var onlineName = obj.username;
            }
            else if (obj.messageType == 2) {
                var onlineName = obj.onlineUsers;
                var offlineName = obj.username;
            }
            else if (obj.messageType == 3) {
                var onlineName = obj.onlineUsers;
            }
            else {
                log(obj.fromusername + "对" + obj.tousername + "说：" + obj.textMessage);
            }
        },

        login() {
            var th = this
            var data = {
                phone: localStorage.phone,
                password: localStorage.password,
            }
            th.ajax.get('/driver/api/login', {params: data})
                .then((r) => {
                    if (r.resultCode === 0) {
                        localStorage.user = r.data
                        localStorage.phone = data.phone
                        localStorage.password = data.password
                        th.juese(r.data.id)
                        th.webSocket = window.__webSocket((e) => th.__webSocket(e))
                    } else {
                        th.mssage(r.message, 'bottom')
                    }
                })
        },

        addressChufa(i) {
            this.chufaOrMudi = i
            this.taitou = '选择地区'
            this.addr = true
        },

        juese(id) {
            var data = {
                id: id,
                type: localStorage.juese,
            }
            this.ajax.post('/driver/api/chooseDriverType', data)
                .then((r) => {
                    if (r.resultCode === 0) {

                    }
                })
        },

        jump(idx) {
            var herfs = ['/pinche', '/order', '/jiehuo', '/infos', 'mypage']
            this.$router.push(herfs[idx])
        },
    }
 }
</script>

<style lang="scss" scoped>
    // tab选项切换
    .index-body {
        .parent {
            width: 100%;
            height: 1rem;
            background-color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            .mui-segmented-control {
                width: 5.1rem;
                height: 0.6rem;
                
                border-radius: 0.29rem;
                border: solid 1px #dddddd;
                .mui-control-item {
                    border-left: none;
                    font-family: PingFangSC-Regular;
                    font-size: 0.32rem;
                    line-height: 0.36rem;
                    color: #333333;
                    line-height: 0.6rem;
                    &.mui-active {
                        background-color: #58c3e0;
                        font-family: PingFangSC-Regular;
	                    font-size: 0.32rem;
                        line-height: 0.36rem;
                        color: #ffffff;
                    }
                }
            } 
        }
        .body {
            font-size: 12px;
        }
    }



    .l-index-dingdan {
        position: relative;
    }

    .l-index-dingdan .l-xiaohongdian {
        top: -7px;
    }

    .l-index-jiwdanshuoming {
        font-size: 14px;
        width: 100%;
        padding: 0 50px;
        box-sizing: border-box;
        color: #333;
        margin: 0.4rem 0 10px 0;
    }

    .l-index-img-1 {
        width: 1.5rem;
        height: 2.1rem;
        margin-top: 0.5rem;
    }

    .l-index-img-2 {
        width: 4rem;
        height: 2rem;
        margin-top: 0.6rem;
    }

    .l-index-shuoming {
        width: 100%;
        padding: 0 50px;
        box-sizing: border-box;
    }

    .l-index-shuoming span {
        width: 100%;
        font-size: 14px;
        color: #333;
    }

    .l-index-shuoming div {
        font-size: 12px;
        color: #666;
        line-height: 20px;
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

    .l-top-info {
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;
        .l-xiaohongdian {
            right: -7px;
            top: 9px;
        }
    }

    .l-top-info-i {
        display: inline-block;
        width: 20px;
        height: 15px;
        background: url("../../../static/images/ubyexcxi.png") no-repeat center;
        background-size: 100% 100%;
    }

    .l-top-dingwei-i {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url("../../../static/images/ubyedywz.png") no-repeat center;
        background-size: 100% 100%;
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
        z-index: 102;
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
        z-index: 102;
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
    }

    .l-zhongjian-zhongjian-vevk {
        width: 45px;
        height: 30px;
        background: #fff;
        position: absolute;
        z-index: 101;
    }

    .zhongjian-i {
        background: url("../../../static/images/fahuo1.png") no-repeat center;
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
        z-index: 102;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 3px;
    }

    .index{
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
