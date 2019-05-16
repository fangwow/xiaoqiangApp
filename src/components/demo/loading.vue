<template>
    <div class="jwzlvs">
        <div class="tip" v-if='bool'>
            <img src="../../../static/images/jiazaizhong.png" alt="">
            <span>正在加载中</span>
        </div>
        <div v-else class='tip'>上拉刷新</div>
        <div class="zhezhao"></div>
    </div>
</template>

<script>
    export default {
        name: "loading",
        props: ['bool'],
        data(){
            return {

            }
        },
        methods: {

        }
    }
</script>

<style scoped>
    .tip {
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        font-size: 0.1rem;
        color: #999;
        position: fixed;
        bottom: 0;
        text-align: center;
    }
    .jwzlvs {
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    img {
        width: 0.5rem;
        height: 0.5rem;
        vertical-align: middle;
        -webkit-animation:xuanzhuan 1s linear infinite;
    }

    @keyframes xuanzhuan {
        0%{-webkit-transform:rotate(0deg);}

        25%{-webkit-transform:rotate(90deg);}

        50%{-webkit-transform:rotate(180deg);}

        75%{-webkit-transform:rotate(270deg);}

        100%{-webkit-transform:rotate(360deg);}
    }
    .zhezhao {
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        z-index: 88;
    }
</style>