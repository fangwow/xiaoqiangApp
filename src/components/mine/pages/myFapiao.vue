<template>
    <div class="dingdan">
        <div class="mineTop">
            <!-- 头部文字 -->
            <div class="l-index-top">
                <i @touchstart="fanhui()" class="l-top-dingwei-i"></i>
                <span class="l-top-biaoti">我的发票</span>
            </div>
            <ul
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10"
                class="l-mypage-lists">
                <li v-for="(item, index) in list" class="l-mypage-list" :key='index'>
                    <a class="l-list-a" href='javascript:;'>
                        <div class="l-mypage-info-sss">
                            <div v-if='item.checked == true' class="xuanzhe active" @click='(e) => singleClick(index)'></div>
                            <div v-else class="xuanzhe" @click='(e) => singleClick(index)'></div>
                            <img :src="item.icon" alt="">
                            <div class="div1" @click='detail(item.id,item.sumPrice)'>
                                <div class="div2">
                                    <div class="div3">
                                        <span>北京 顺义</span>
                                        <i class="l-beijingdaoheze"></i>
                                        <span>承德 丰宁</span>
                                    </div>
                                    <span>5分钟前</span>
                                </div>
                                <span class="l-xiaozi-14">体积0.7立方公里；重若干吨；猪肉</span>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
            <div class="l-hetong-zhanwei"></div>
            <!-- <div class="l-hetong-bottom">
                <div class="zo">
                    <div class="zo1">
                        <div v-if='isAll == true' class="xuanzhe active" @click='all()'></div>
                        <div v-else class="xuanzhe" @click='all()'></div>
                        <span class='sp1'>全选</span>
                    </div>
                    <div class="zo1">
                        <span class="sp1">合计：</span>
                        <span class="sp2">{{num}}</span>
                    </div>
                </div>
                <div class="yb" @click='next()'>
                    下一步
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                isAll: true,
                w: window.innerWidth,
                list: [
                    {
                        icon: '../../../static/images/dingwei.png',
                        path: '/info',
                        name: '消息提醒',
                        keyframes: '',
                        ujiu: false,
                        checked: true
                    }, {
                        icon: '../../../static/images/dingwei.png',
                        path: '/myoney',
                        name: '我的钱包',
                        keyframes: '',
                        ujiu: false,
                        checked: true
                    }, {
                        icon: '../../../static/images/dingwei.png',
                        path: '/myoney',
                        name: '我的钱包',
                        keyframes: '',
                        ujiu: false,
                        checked: true
                    }, {
                        icon: '../../../static/images/dingwei.png',
                        path: '/myoney',
                        name: '我的钱包',
                        keyframes: '',
                        ujiu: false,
                        checked: true
                    }
                ],
                client: {a: ''},
                nav: '0',
                currentPage: 1,
                orderStatus: 'Y',
                orderType: 0,
                pageSize: 10,
                userId: localStorage.userId,
                checkedList: [0,1],
                num: 0
            }
        },
        created() {
            this.Fapiao();
        },
        methods: {
            // 上拉加载
            loadMore() {
                this.loading = true;
                setTimeout(() => {
                    let last = this.list[this.list.length - 1];
                    for (let i = 1; i <= 10; i++) {
                    this.list.push(last + i);
                    }
                    this.loading = false;
                }, 2500);
            },
            // 点击列表页跳转
            detail(id,sumPrice){
                console.log(id);
                this.$router.push({
                    path: '/fapiaoInfo',
                    query: {
                        id: id,
                        // ivcoicePrice: sumPrice
                        ivcoicePrice: 666888
                    }
                });
            },
            //点击单个时
            singleClick(index){
                var th = this;
                this.list[index].checked = !this.list[index].checked;
                var count  = 0;
                this.list.forEach(function(item){
                    if(item.checked === false){
                        return th.isAll = false;
                    }
                    count++;
                });
                this.num = count;
                if(this.list.length === count){
                    th.isAll = true;
                }
            },
            // 全选
            all(){
                var th = this;
                this.isAll = !this.isAll;
                if(th.isAll == true){
                    this.num = this.list.length;
                }else{
                    this.num = 0;
                }
                this.list.forEach(function(item){
                    item.checked = th.isAll;
                });
            },
            // 获取订单列表数据
            async Fapiao(){
                const res = await this.ajax.get(`/shipper/api/getMyOrderShipperList?currentPage=${this.currentPage}&orderStatus=${this.orderStatus}&orderType=${this.orderType}&pageSize=${this.pageSize}&userId=${this.userId}`);
                console.log(res);
                res.data.forEach(function(item){
                    item.checked = true;
                });
                this.list = res.data;
                this.num = this.list.length;
                console.log(this.list);
                
            },
            jump1(id) {
                this.$router.push('/order/' + id)
            },
            fanhui() {
                history.go(-1)
            },
            next(){
                this.$router.push({
                    path: '/addmyFapiao',
                    query: {
                        id: this.id,
                        ivcoicePrice: this.ivcoicePrice,
                        path: '/myFapiao'
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .dingdan {
        padding-top: 50px;
        box-sizing: border-box;
        height: 100%;
    }
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
    .l-index-top {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        width: 100%;
        height: 50px;
        padding: 0 15px;
        background: #51c1ea;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
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
        .l-top-dingwei-i {
            display: inline-block;
            width: 40px;
            height: 40px;
            background: url("../../../../static/images/fanhuixiangyb.png") no-repeat left center;
            background-size: 30% 45%;
            position: relative;
            z-index: 103;
        }
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
        width: 0.39rem;
        height: 0.11rem;
        display: inline-block;
        background: url("../../../../static/images/xdybihjmtb.png") no-repeat center;
        background-size: 100% 100%;
        display: inline-block;
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
    .active {
        background: url('../../../../static/images/loginduihao.png') no-repeat center;
        background-size: 100% 100%;
    }
</style>