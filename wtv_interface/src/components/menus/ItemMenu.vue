<template>
    <div :class="{focus: focused}">{{title}}</div>
</template>

<script>
    import { navigationState } from "../../states/navigationState";
    import { mixinEltWithoutChild } from "../../mixins/mixinEltWithoutChild";

    export default {
        name: "ItemMenu",
        props:['title', 'index'],
        mixins: [ mixinEltWithoutChild ],
        data: function() {
            return {
                focus: 0,
            }
        },
        methods: {
            isFocus: function () {
                navigationState.indexSubMenu = this.index;
                this.$parent.focus = this.index;
                this.focused = true;
            },
        }
    }
</script>

<style scoped>

</style>