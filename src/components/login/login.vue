<template>
    <div class="login">
        <div class="logo"></div>
        <div class="passwords">
            <div class="list">
                <i class="list-i list-i1"></i>
                <div class="list-div">
                    <input :value="phone" @input="(e) => inputChange('phone', e)" placeholder="请输入手机号" type="text">
                </div>
            </div>
            <div class="list">
                <i class="list-i list-i2"></i>
                <div class="list-div">
                    <input :value="password" @input="(e) => inputChange('password', e)" placeholder="请输入密码" type="password">
                </div>
            </div>
            <div class="vuce">
                <span @touchstart="login()">登录</span>
            </div>
            <div class="wangjimima">
                <span @click="jupm(0)">忘记密码</span>
                <span @click="jupm(1)">注册</span>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data () {
            return {
                phone:'',
                password:'',
            }
        },

        mounted() {
            var phone = localStorage.phone
            var password = localStorage.password
            if (phone && password) {
                this.phone = phone
                this.password = password
                this.login()
            }
        },
        computed:{
        },
        watch:{
            code:function () {
                this.code=this.code.replace(/\D/g,'');
                if(this.code.length===6){
                    this.isok=true;
                }else{
                    this.isok=false;
                }
            },
            phone:function () {
                this.phone=this.phone.replace(/\D/g,'');
            }
        },
        methods: {
            jupm(i) {
                var urls = ['/register', '/register']
                this.$router.push(urls[i])
            },
            mssage(info, po) {
                this.$Toast({
                    message: info,
                    position: po,
                })
            },
            inputChange(key, e) {
                this[key] = e.target.value
            },
            login() {
                var th = this
                if(th.phone == ''){
                    th.mssage('手机号不能为空', 'bottom')
                    return
                }
                var phone=/^1[34578]\d{9}$/;
                if (!phone.test(this.phone)) {
                    th.mssage('手机号格式错误', 'bottom')
                    return
                }
                if (this.password == '') {
                    th.mssage('密码不能为空', 'bottom')
                    return;
                }
                var data = {
                    phone: th.phone,
                    password: th.password,
                }
                th.ajax.get('/shipper/api/login', {params: data})
                    .then((r) => {
                        console.log(r);
                        if (r.resultCode === 0) {
                            // 保存用户的phone和密码
                            localStorage.phone = r.data.userBase.phone;
                            localStorage.password = r.data.userBase.password;
                            localStorage.userId = r.data.userBase.id;
                            // 获取合同制字段
                            var roleId = r.data.userBase.roleId
                            if (roleId === 'H') {
                                th.$router.push('/index')
                            } else if(roleId === 'S') {
                                // 获取审核状态
                                // 判断是不是-1,如果是-1,去认证,否则跳转到首页
                                var reviewedStatus = r.data.userInfo.reviewedStatus;
                                if(reviewedStatus == -1){
                                    th.$router.push('/ID')
                                }else {
                                    // 审核状态码
                                    localStorage.reviewedStatus = r.data.userInfo.reviewedStatus
                                    th.$router.push('/index')
                                }
                            }
                            // 货主类型
                            localStorage.shipperType = r.data.userBase.roleId;
                            // 用户id
                            localStorage.userId = r.data.userBase.id;
                            
                        } else {
                            th.mssage(r.message, 'bottom')
                        }
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .login{
        background: #fff;
        height: 100vh;
        .logo {
            width: 100%;
            height: 5.4rem;
            background: url("../../../static/images/logo.png") no-repeat center 1.96rem;
            background-size: 1.65rem 2.35rem;
        }
        .passwords {
            width: 100%;
            padding: 0 20px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            .wangjimima {
                width: 100%;
                display: flex;
                align-items: center;
                margin-top: 10px;
                font-size: 12px;
                color: #999;
                justify-content: space-between;
                padding: 0 20px;
                box-sizing: border-box;
            }
            .tiui {
                font-size: 12px;
                color: #51c1ea;
                margin-top: 10px;
                margin-left: 30px;
            }
            .vuce {
                width: 100%;
                span {
                    width: 100%;
                    height: 45px;
                    background: #51c1ea;
                    color: #fff;
                    font-size: 18px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 30px;
                    border-radius: 5px;
                }
            }
            .list {
                margin-top: 15px;
                .list-i {
                    display: inline-block;
                    position: absolute;
                    left: 0;
                }
                .list-i1 {
                    width: 0.23rem;
                    height: 0.38rem;
                    background: url("../../../static/images/loginphone.png") no-repeat center;
                    background-size: 100% 100%;
                    margin-left: 0.04rem;
                }
                .list-i2 {
                    width: 0.31rem;
                    height: 0.40rem;
                    background: url("../../../static/images/loginmima.png") no-repeat center;
                    background-size: 100% 100%;
                }
                .list-div {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    .input1 {
                        width: 60%;
                    }
                    .sp1 {
                        width: 40%;
                        height: 80%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background: #fff;
                        color: #51c1ea;
                        font-size: 14px;
                        border-left: 1px #ddd solid;
                    }
                    input {
                        margin: 0;
                        padding: 0;
                        border: none;
                        color: #999;
                        font-size: 14px;
                    }
                    border-bottom: 1px #ddd solid;
                }
                padding-left: 30px;
                box-sizing: border-box;
                position: relative;
                width: 100%;
                height: 45px;
                display: flex;
                align-items: center;
            }
        }

    }
</style>
