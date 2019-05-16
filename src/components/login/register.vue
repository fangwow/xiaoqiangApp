<template>
    <div class="login">
        <div class="logo"></div>
        <div class="passwords">
            <div class="list">
                <i class="list-i list-i1"></i>
                <div class="list-div">
                    <input @input="(e) => inputChange('phone', e)" :value="phone" placeholder="请输入手机号" type="text">
                </div>
            </div>
            <div class="list">
                <i class="list-i list-i3"></i>
                <div class="list-div">
                    <input @input="(e) => inputChange('code', e)" :value="code" class="input1" placeholder="请输入验证码" type="text">
                    <span v-if="getCodebl" @touchstart="getCode()" class="sp1">验证码</span>
                    <span v-else class="sp1">{{daojiuiNum}}</span>
                </div>
            </div>
            <div class="list">
                <i class="list-i list-i2"></i>
                <div class="list-div">
                    <input @input="(e) => inputChange('password', e)" :value="password" placeholder="请输入密码" type="password">
                </div>
            </div>
            <div class="list">
                <i class="list-i list-i2"></i>
                <div class="list-div">
                    <input @input="(e) => inputChange('yaoqing', e)" :value="yaoqing" placeholder="请输入邀请人手机号(非必填)" type="text">
                </div>
            </div>
            <span v-if="tishibl" class="tiui">{tishi}</span>
            <div class="vuce">
                <span @touchstart="register()">注册</span>
            </div>
            <div class="wangjimima">
                <span></span>
                <span @click="jupm(1)">登录</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            phone: '',
            code: '',
            password: '',
            yaoqing: '',
            getCodebl: true,
            daojiuiNum: 60,
            tishibl: false,
            tishi: '',
        }
    },
    mounted:function () {
    },
    computed:{
    },
    watch:{
        code() {
            this.code=this.code.replace(/\D/g,'');
            if (this.code.length === 6) {
                this.isok = true;
            }else{
                this.isok=false;
            }
        },
        phone() {
            this.phone=this.phone.replace(/\D/g,'');
        }
    },
    methods: {
        jupm(i) {
            var urls = ['/register', '/login']
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
        daojiui() {
            var th = this
            th.getCodebl = false
            setTimeout(function() {
                th.daojiuiNum = th.daojiuiNum - 1
                if (th.daojiuiNum != 0) {
                    th.daojiui()
                } else {
                    th.getCodebl = true
                    th.daojiuiNum = 60
                }
            }, 1000)
        },
        getCode() {
            var th = this
            var phone=/^1[34578]\d{9}$/;
            if (!phone) {
                th.mssage('手机号不能为空', 'bottom')
            } else if (!phone.test(th.phone)) {
                th.mssage('手机号格式错误', 'bottom')
            } else {
                th.daojiui()
                th.ajax.get('/common/api/sendCode', {params: {phone: th.phone}})
                    .then((r) => {
                        console.log(r);
                        th.mssage(r.message, 'bottom')
                    })
            }
        },
        register() {
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
            var password=/^[0-9a-zA-Z]{6}/;
            if (!password.test(this.password)) {
                th.mssage('密码格式错误', 'bottom')
                return
            }
            var data = {
                code: th.code,
                phone: th.phone,
                password: th.password,
                otherInviteCode: th.yaoqing,
            }
            // console.log(data);
            th.ajax.post('/shipper/api/register', data)
            .then((r) => {
                console.log(r);
                if (r.resultCode === 0) {
                    th.mssage(r.message, 'bottom')
                    localStorage.juese = i
                    setTimeout(function() {
                        th.$router.push('/login')
                    }, 1000)
                }
            })
        },

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
            .tiui {
                font-size: 12px;
                color: #51c1ea;
                margin-top: 10px;
                margin-left: 30px;
            }
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
                .list-i3 {
                    width: 0.33rem;
                    height: 0.38rem;
                    background: url("../../../static/images/logindunpai.png") no-repeat center;
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
