<template>
    <div class="img">
        <!-- <img v-for='(item,index) in list' :src='item.src' height='' @click='$preview.open(index,list)' :key='index'> -->
        <img v-for="(item,index) in list" 
            v-preview="item.src" 
            :src="item.src"
            :alt="item.title"
            :key="index"
            preview-title-enable="true"
            preview-nav-enable="true">
    </div>
</template>

<script>

export default {
    data(){
        return {
            list: [
                {
                  src: '../../../static/images/myoney.png',
                  title: 'pic1'
                },
                {
                  src: '../../../static/images/ourselves.png',
                  title: 'pic2'
                }
            ]
        }
    }
}
</script>

<style>

</style>
