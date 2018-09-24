<template>
    <div class="backAppli trans" :class="{focusborder: focused}">
        <div class="viewApp" :style="style">
        </div>
    </div>
</template>

<script>
    import {mixinEltWithoutChild} from "../../mixins/mixinEltWithoutChild";
    import {GLOBALS} from "../../const/globals";
    import {EventBus} from "../../main";

    export default {
        props: ["content"],
        data: function () {
            return {
                name: GLOBALS.APPS,
            }
        },
        mixins: [mixinEltWithoutChild],
        methods: {
            initListeners: function () {
                window.addEventListener("keydown", this.listener);
            },
            removeListeners: function () {
                window.removeEventListener("keydown", this.listener);
            },
            isFocus: function () {
                EventBus.$emit("changeBackground", this.content.img);
                this.focused = true;
                this.initListeners()
            },
            removeFocus: function () {
                this.focused = false;
                this.removeListeners()
            },
            listener: function (event) {
                if (event.key === 'Enter') {
                    window.location = this.content.url
                }
            }
        },
        created() {
        },
        computed: {
            style() {
                return "background-image: url(/imgs/" + this.content.img + ")";
            }
        },
        mounted() {
        }
    };
</script>

<style lang="less">
    .backAppli {
        height: 125.5px;
        width: 125.5px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 10%;
    }

    .viewApp {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat center fixed;
        background-size: cover;
        background-clip: padding-box;
    }

    .backAppli:last-of-type {
        opacity: 0;
    }
</style>
