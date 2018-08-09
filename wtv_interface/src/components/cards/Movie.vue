<template>
    <div class="movie">
        <div class="view" :style="style">

        </div>
        <div class="sub color-bg-sub">
            {{ content.title }}
        </div>
    </div>
</template>

<script>
export default {
    props: ['content'],
    created(){

    },
    computed: {
        style() {
            return 'background-image: url(/imgs/' + this.content.img + ')';
        }
    }
}
</script>

<style scoped lang="less">
    @import '~normalize.css';
    @import '../../assets/style/style.less';
.movie{
    height: 95%;
    width: 80%;
    margin: 8% 10% 0% 10%;

        .view {
            background-repeat: no-repeat;
            background-size: cover;
            background-clip: padding-box;
            height: 90%;
            background-position: center;
        }
    .sub{
        height: 7%;
    }

}
</style>
