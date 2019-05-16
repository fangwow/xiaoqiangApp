<template>
    <div>
        parent
        <load :bool='name'></load>
    </div>
</template>

<script>
import Load from '@/components/demo/loading.vue'
export default {
    data(){
        return {
            name: true
        }
    },
    components: {
        Load
    }
}
</script>

<style>

</style>
