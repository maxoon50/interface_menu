<template>
    <div class="backAppli" :class="{focusborder: focused}">
        <div class="view" :style="style">
        </div>
        <div class="sub color-bg-sub">
            {{content.title}}
        </div>
    </div>
</template>

<script>
    import {mixinEltWithoutChild} from "../../mixins/mixinEltWithoutChild";

    export default {
        props: ['content'],
        mixins: [mixinEltWithoutChild],
        created() {

        },
        computed: {
            style() {
                return 'background-image: url(/imgs/' + this.content.img + ')';
            }
        },
        mounted() {

        }
    };
</script>

<style lang="less">
    .backAppli {
        //border : solid 5px black;
        height: 25%;
        width: 70%;
        margin: 10% 10% 0% 10%;
        background: url("/imgs/reca.jpg");
        background-repeat: no-repeat center fixed;
        background-size: cover;
        background-clip: padding-box;
    }
</style>
