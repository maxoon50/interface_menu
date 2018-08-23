<template>
    <div class="globalChan" :class="{focusborder: focused}">
        <div class="view" :style="style">
        </div>
        <div class="sub color-bg-sub">
            {{content.title}}
        </div>
    </div>
</template>

<script>
    import { mixinEltWithoutChild } from "../../mixins/mixinEltWithoutChild";

    export default {
        props: ['content'],
        mixins: [ mixinEltWithoutChild ],
        created() {

        },
        computed: {
            style() {
                return 'background-image: url(/imgs/' + this.content.img + ')';
            }
        },
        mounted(){

        }
    };
</script>

<style lang="less">
    @import '~normalize.css';
    @import '../../assets/style/style.less';

    .globalChan {
        //border : solid 5px black;
        height: 29%;
        width: 80%;
        margin: 8% 10% 0% 10%;
    }

    .sub {
        height: 15%;
    }

</style>
