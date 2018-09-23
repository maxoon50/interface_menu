<template>
    <div :class="{menuFocus: focused}" class="menu">{{title}}</div>
</template>

<script>
    import {navigationState} from "../../states/navigationState";
    import {mixinEltWithoutChild} from "../../mixins/mixinEltWithoutChild";

    export default {
        name: "ItemMenu",
        props: ['title', 'index'],
        mixins: [mixinEltWithoutChild],
        data: function () {
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
    .menu {
        transition: all 0.3s;
    }

    .menuFocus {
        color: rgb(26, 159, 220);
        position: relative;
       // animation: bounce 0.3s ease-out;
    }

    .menu::after {
        content: '';
        display: block;
        width: 0;
        height: 1px;
        background: rgb(26, 159, 220);
        transition: width .3s;
        position: relative;
        top: 5px;
    }
    .menuFocus::after {
        width: 40%;
        transition: width .2s;
    }

 /*   @keyframes bounce{
        from {bottom: 0px;}
        50%  {
            bottom: 5px;
        }
        to   {bottom: 0px;}
    }*/
</style>