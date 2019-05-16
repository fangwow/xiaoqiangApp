<template>
    <div class="payPwd">
        <div class="public_header">
            <router-link to="/mine"><img src="../../../static/images/cf_back.png" alt=""></router-link>
            支付密码
        </div>
        <ul>
            <li>
                <div class="list" @click="$jumpRouter('payPwd1')">
                    <div class="title">修改支付密码</div>
                    <div class="imgs"><img src="../../../static/images/cf_go.png" alt=""></div>
                </div>
            </li>
        </ul>

    </div>
</template>

<script>
    export default {
        data () {
            return {
            }
        },
        mounted:function () {
            this.$Indicator.close();
        },
        computed:{
        },
        methods: {
        }
    }
</script>

<style lang="scss" scoped>
    .payPwd{
        ul{
            background-color: white;
            margin-top: 1rem;
            li{
                .list{
                    font-size: 0.26rem;
                    display: flex;
                    justify-content: space-between;
                    padding:0.2rem 0.2rem;
                }
            }
        }

    }
</style>
