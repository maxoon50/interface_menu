<template>
    <img src="/imgs/stanislas.jpg" id="bg"/>
</template>

<script>
    export default {
        name: "Background"
    }
</script>

<style scoped>
    #bg {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0px;
        left: 0px;
        box-sizing: border-box;
        filter: blur(10px);
        z-index: 0;
    }
</style>