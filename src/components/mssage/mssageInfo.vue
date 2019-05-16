<template>
    <div class="mssage">
        <div class="l-index-top">
            <i @touchstart="fanhui()" class="l-top-dingwei-i"></i>
            <span class="l-top-biaoti">系统消息</span>
        </div>
        <div class="l-mssage-list-body">
            <div class="l-xiangxixiaoxi">
                <div>
                    <img src="../../../static/images/dingwei.png" alt="">
                    <span class="l-biaoti-18">系统消息</span>
                </div>
                <span class="l-xiaozi-14">12333</span>
            </div>
            <div class="l-xiangxixiaoxi-p">
                <span class="l-xiaozi-14">
                    系统消息系统消息系统消息系统消息系统消息系统消息系统消息系统消息系统消息系统消息
                </span>
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

        },
        computed: {

        },
        methods: {
            fanhui() {
                history.go(-1)
            }
        }
    }
</script>

<style lang="scss" scoped>

    .l-xiangxixiaoxi-p {
        width: 100%;
        padding: 15px;
        box-sizing: border-box;
        display: flex;
        background: #fff;
        padding-bottom: 30px;
    }

    .mssage {
        height: 100%;
        background: #f2f2f2;
    }

    .l-xiangxixiaoxi {
        width: 100%;
        height: 78px;
        border-top: solid 1px #ddd;
        border-bottom: solid 1px #ddd;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
        box-sizing: border-box;
        background: #fff;
        margin-top: 5px;
        div {
            display: flex;
            align-items: center;
            height: 100%;
            img {
                width: 55px;
                height: 55px;
                margin-right: 10px;
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
        background: #f2f2f2;
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
    }
</style>
