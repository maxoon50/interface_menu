<template>
    <div ><img :class="{focusborder: focused}" src="imgs/poppe2.jpg" alt=""></div>
</template>

<script>
    import {mixinEltWithoutChild} from "../../mixins/mixinEltWithoutChild";
    export default {
        props: ['name'],
        mixins:[mixinEltWithoutChild],

    }
</script>

<style scoped>

</style>