<template>
    <div id="app">
        <template v-for="child in componentList">
            <component :is="child" :key="child" ref="contents"></component>
        </template>
    </div>
</template>

<script>
    import Header from './components/header/Header.vue';
    import Menu from './components/menus/Menu.vue';
    import SousMenu from './components/menus/SousMenu.vue';
    import Main from './components/main/Main.vue';
    import {mixinEltWithChild} from './mixins/mixinEltWithChild';

    export default {
        name: 'app',
        mixins: [mixinEltWithChild],
        components: {
            'app-header': Header,
            'app-menu': Menu,
            'app-sous-menu': SousMenu,
            'app-main': Main
        },
        data: function () {
            return {
                componentList: ['app-header', 'app-menu', 'app-sous-menu', 'app-main'],
            }
        },
        methods: {
            isFocus: function () {
                this.focused = true;
                this.focus = 1;
                this.getFocus(1);
            },
            setFocus: function (pos) {
                if (this.focus <= 0 && pos == -1) {
                    return;
                } else if (this.focus == (this.componentList.length - 1) && pos == 1) {
                    return;
                } else {
                    this.focus += pos;
                }
                this.giveFocus();
            },
            listener({code}) {
                switch (code) {
                    case 'ArrowDown':
                        this.setFocus(1);
                        break;
                    case 'ArrowUp':
                        this.setFocus(-1);
                        break;
                }
            },
        },
        mounted: function () {
            this.initListeners();
            this.lastFocused = this.$refs.contents[0];
            this.lastFocused.isFocus();
        },
    }
</script>

<style lang='less'>

    @import '~normalize.css';
    @import './assets/style/variables.less';

    html,
    body {
        .full-height;
    }

    #app {
        .full-height;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        padding: 2% 2% 2% 2%;
        box-sizing: border-box;
        background-image: url('/imgs/stanislas.jpg');
        background-repeat: no-repeat center fixed;
        background-size: cover;
    }
    .focus{
        background-color: lime;
    }
</style>
