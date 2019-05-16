<template>
    <div class="mssage">
        <!-- 头部文字 -->
        <div class="l-index-top">
            <i @touchstart="fanhui()" class="l-top-dingwei-i"></i>
            <span class="l-top-biaoti">我的发票</span>
        </div>
        <div class='full'>
            <!-- 单选框 -->
            <div class="radio">
                <div class="mui-input-row mui-radio mui-left">
                    <label :style="{'color': this.form.type === 'D' ? '#51c1ea' : '#333'}">电子发票</label>
                    <input name="radio1" @click="inputClick('D')" class="input1" type="radio" :checked = "this.form.type === 'D'" value='D'>
                </div> 
                <div class="mui-input-row mui-radio mui-left">
                    <label :style="{'color': this.form.type === 'Z' ? '#51c1ea' : '#333'}">纸质发票</label>
                    <input name="radio1" @click="inputClick('Z')" class="input1" type="radio" :checked = "this.form.type === 'Z'" value='Z'>
                </div> 
            </div>
            <form action="">
                <!-- 发票详情 -->
                <div class="detail">
                    <div class="title">
                        发票详情
                    </div>
                    <div class="item">
                        <div class="item-form">
                            <label class='label' for="">抬头类型</label>
                            <div class="item-form-radio">
                                <div class="mui-input-row mui-radio mui-left">
                                    <label>公司</label>
                                    <input name="radio1" @click="inputType('C')" class="input2" type="radio" :checked = "this.form.invoiceType === 'C'">
                                </div>
                                <div class="mui-input-row mui-radio mui-left">
                                    <label>个人</label>
                                    <input name="radio1" @click="inputType('0')" class="input2" type="radio" :checked = "this.form.invoiceType === '0'">
                                </div>
                            </div>
                        </div>
                        <div class="item-form">
                            <label class='label' for="">发票抬头</label>
                            <input type="text" required @change="(e) => inputChange(e)" data-type='ivcoiceTitle' placeholder="请输入发票抬头">
                        </div>
                        <div class="item-form" v-if="this.form.invoiceType === 'C'">
                            <label class='label' for="">税号</label>
                            <input type="text" required @change="(e) => inputChange(e)" data-type='ivcoiceTexNo' placeholder="请输入税号">
                        </div>
                        <div class="item-form">
                            <label class='label' for="">发票内容</label>
                            <input type="text" required @change="(e) => inputChange(e)" data-type='ivcoiceInfo' placeholder="请输入发票内容">
                        </div>
                        <div class="item-form">
                            <label class='label' for="">发票金额</label>
                            <input type="text" class='price' :value='this.form.ivcoicePrice' readonly>
                        </div>
                        <div class="item-form last">
                            <label class='label' for="">更多信息</label>
                            <input type="text" @change="(e) => inputChange(e)" data-type='ivcoiceContent' placeholder="请输入">
                        </div>
                    </div>
                </div>
                <!-- 接入方式 -->
                <div class="detail">
                    <div class="title">
                        接收方式
                    </div>
                    <div class="item">
                        <div v-if="this.form.type === 'Z'">
                            <div class="item-form">
                                <label class='label' for="">收件人</label>
                                <input type="text" @change="(e) => inputChange(e)" data-type='receiveName' placeholder="请输入收件人姓名">
                            </div>
                            <div class="item-form">
                                <label class='label' for="">联系电话</label>
                                <input type="text" @change="(e) => inputChange(e)" data-type='receivePhone' placeholder="请输入收件人联系电话">
                            </div>
                            <div class="item-form">
                                <label class='label' for="">所在地区</label>
                                <input type="text" @change="(e) => inputChange(e)" data-type='ivcoiceAddress' placeholder="请选择所在地区">
                                <i></i>
                            </div>
                            <div class="item-form">
                                <label class='label' for="">详细地址</label>
                                <input type="text" @change="(e) => inputChange(e)" data-type='receiveAddress' placeholder="请输入详细地址">
                            </div>
                        </div>
                        <div class="item-form last">
                            <label class='label' for="">电子邮件</label>
                            <input type="email" required @change="(e) => inputChange(e)" @blur='(e) => jiaoyan(e)' data-type='receiveEmail' placeholder="请输入邮箱">
                        </div>
                    </div>
                </div>
                <!-- 确认 -->
                <button class='btn' @click='addSysInvoice()'>确认</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                form: {
                    "type": "D",     // 发票类型(D电子发票 Z纸质发票)
                    "invoiceType": "C",　　　　//抬头类型(C公司O个人)
                    "ivcoiceTitle": "",      //发票抬头
                    "ivcoiceTexNo": "",      //税号
                    "ivcoiceInfo": "",       //发票内容
                    "ivcoicePrice": this.$route.query.ivcoicePrice,      // 发票金额
                    "ivcoiceContent": "",    //更多信息
                    "receiveName": "",        //收货人姓名
                    "receivePhone": "",       //收货人电话
                    "ivcoiceAddress": "",    //发票地址
                    "receiveAddress": "",    //详细地址
                    "receiveEmail": "",      //邮箱
                    "id": this.$route.query.id,    //订单编号
                    "userId": localStorage.userId   // 用户id
                },
                path: this.$route.query.path
            }
        },
        created(){
            // console.log(this.$route);
        },
        methods: {
            fanhui() {
                this.$router.push({
                    path: this.path
                });
            },
            mssage(info, po) {
                this.$Toast({
                    message: info,
                    position: po,
                })
            },
            // 校验正则
            jiaoyan(e){
                // var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                // if(reg.test(e.target.value)){
                //     console.log('校验成功');
                // }
            },
            // 设置电子还是纸质
            inputClick(num){
                this.form.type = num;
            },
            // 设置抬头类型
            inputType(num){
                this.form.invoiceType = num; 
            },
            inputChange(e) {
                var type = e.target.dataset.type
                this.form[type] = e.target.value
            },
            // 新增发票
            async addSysInvoice(){
                console.log(this.form);
                const res = await this.ajax.post('/common/api/addSysInvoice',this.form);
                console.log(res);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .input1 {
        top: 0.28rem!important;
    }
    .input2 {
        top: 0.16rem!important;
    }
    input[type=radio]:before {
        font-size: 0.4rem;
    }
    .mssage {
        background-color: #f2f2f2;
        // 头部文字
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
        .full {
            height: 100%;
            overflow: auto;
            padding-top: 50px;
            box-sizing: border-box;
            // 单选框
            .radio {
                width: 100%;
                height: 1.6rem;
                display: flex;
                align-items: center;
                justify-content: space-around;
                font-size: 0.36rem;
                background: #fff;
                .mui-radio {
                    width: 2.9rem;
                    height: 1rem;
                    line-height: 1rem;
                    border-radius: 0.06rem;
                    border: 0.02rem solid#dddddd;
                    font-size: 12px;
                    display: flex;
                    align-items: center;
                    label {
                        width: 100%;
                        height: 100%;
                        padding: 0;
                        padding-right: 0.4rem;
                        box-sizing: border-box;
                        margin: 0;
                        display: flex;
                        align-items: center;
                        font-size: 0.36rem;
                        color: #333333;
                        flex-direction: row-reverse;
                    }
                    input {
                        width: 0.56rem!important;
                        height: 0.56rem!important;
                    }
                }
            }
            // 发票详情
            .detail {
                width: 100%;
                .title {
                    line-height: 0.79rem;
                    height: 0.79rem;
                    background: #F2F2F2;
                    font-size: 0.32rem;
                    color: #666;
                    padding-left: 0.31rem;
                    box-sizing: border-box;
                }
                .item {
                    background: #fff;
                    padding-left: 0.31rem;
                    box-sizing: border-box;
                    .item-form {
                        height: 0.86rem;
                        border-bottom: 0.01rem solid #ddd;
                        font-size: 0.28rem;
                        display: flex;
                        align-items: center;
                        .item-form-radio {
                            width: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            padding: 10px 15px;
                            box-sizing: border-box;
                            .mui-radio {
                                flex: 1;
                            }
                            .input {
                                width: 0.4rem;
                                height: 0.4rem;
                            }
                        }
                        .label {
                            display: block;
                            width: 1.8rem;
                        }
                        input {
                            display: block;
                            flex: 1;
                            margin-bottom: 0rem;
                            border: 0 none;
                            outline: 0 none;
                            font-size: 0.28rem;
                        }
                    }
                    .last {
                        border-bottom: 0 none;
                    }
                }
            }
            //确认
            .btn {
                display: block;
                width: 6.9rem;
                height: 0.86rem;
                margin: 2.01rem auto 0.8rem;
                background: #51c1ea;
                color: #fff;
            }
        }
    }
    .active {
        color: #51c1ea;
    }
    .price {
        color: #51c1ea;
    }
</style> 