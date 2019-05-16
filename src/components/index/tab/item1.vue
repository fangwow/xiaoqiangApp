<template>
    <div class="item1">
        <!-- 地址 -->
        <div class="l-pinche-body">
            <div class="l-address-1">
                <div @click="addressChufa('0')" class="l-address-1-1">
                    <span>{{iufadi.length > 5 ? iufadi.slice(0, 5) + '..' : iufadi}}</span>
                    <i class="l-address-1-1-1"></i>
                </div>
                <span class="l-dao">到</span>
                <div @click="addressChufa('1')" class="l-address-1-1">
                    <span>{{mudidi.length > 5 ? mudidi.slice(0, 5) + '..' : mudidi}}</span>
                    <i class="l-address-1-1-1"></i>
                </div>
            </div>
        </div>
        <!-- 地址选择组件 -->
        <addr :quansheng="quansheng" :taitou="taitou" @wancheng="wancheng" @quxiao="quxiao" v-if="addr"></addr>
        <!-- 表单 -->
        <div class="detail">
            <form action="">
                <div class="form-item">
                    <span>货物信息</span>
                    <button>详细体积重量</button>
                </div>
                <div class="form-item">
                    <label for="">总体积</label>
                    <input type="text" placeholder="">
                </div>
                <div class="form-item">
                    <label for="">总重量</label>
                    <input type="text" placeholder="">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import addr from '@/components/compo/address' 
export default {
    data(){
        return {
            quansheng: true,
            taitou: '',
            iufadi: '出发地',
            mudidi: '目的地',
            addr: false,
            data: {
                    fromAreaId1: '',
                    fromAreaId2: '',
                    fromAreaId3: '',
                    toAreaId1: '',
                    toAreaId2: '',
                    toAreaId3: ''
                }
        }
    },
    components: {
        addr
    },
    methods: {
        addressChufa(i) {
            this.chufaOrMudi = i
            if (i === '0') {
                this.taitou = '出发地'
            } else if (i === '1') {
                this.taitou = '目的地'
            }
            this.addr = true
        },
        // 地址完成与取消
        wancheng(obj) {
                var th = this
                var o = {}
                for (var i in obj) {
                if (obj[i].areaId === null) {
                    o = obj[i]
                    break
                }
                o = obj.areaVal
            }
            if (th.chufaOrMudi === '0') {
                th.iufadi = o.regionName1 || o.regionName
                th.data.fromAreaId1 = obj.provinceVal.regionCode
                th.data.fromAreaId2 = obj.cityVal.regionCode
                th.data.fromAreaId3 = obj.areaVal.regionCode
            } else {
                th.mudidi = o.regionName1 || o.regionName
                th.data.toAreaId1 = obj.provinceVal.regionCode
                th.data.toAreaId2 = obj.cityVal.regionCode
                th.data.toAreaId3 = obj.areaVal.regionCode
            }
            this.addr = false
        },
        quxiao(bl) {
            this.addr = bl
        }
    }
}
</script>

<style lang='scss'>
// 出发地和目的地
.l-address-1 {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    background: #f2f2f2;
    .l-address-1-1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 130px;
        height: 23px;
        border: solid 1px #51c1ea;
        border-radius: 15px;
        padding: 0 20px;
        box-sizing: border-box;
        .l-address-1-1-1 {
            width: 8px;
            height: 8px;
            display: inline-block;
            background: url("../../../../static/images/xiala.png") no-repeat center;
            background-size: 100% 100%;
        }
        span {
            font-size: 14px;
            color: #51c1ea;
        }
        
    }
    .l-dao {
        width: 23px;
        height: 23px;
        background: #51c1ea;
        border-radius: 50%;
        color: #fff;
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 10px;
    }
}

// 详细信息
.detail {
    form {
        .form-item {
            height: 0.86rem;
            border: 0.01rem solid #ddd;
            padding: 0 0.30rem;
            background: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
                font-size: 0.3rem;
                color: #58c3e0;
            }
            button {
                width: 1.7rem;
                height: 0.5rem;
                background-color: #58c3e0;
	            border-radius: 0.1rem;
                font-size: 0.24rem;
                color: #ffffff;
            }
            label {
                display: block;
                width: 1.66rem;
                line-height: 0.86rem;
                height: 100%;;
                background: blue;
            }
            input {
                display: block;
                border: none;
                outline: 0 none;
                background: red;
                flex: 1;
            }
        }
    }
}
</style>
