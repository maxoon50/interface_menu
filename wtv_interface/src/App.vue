<template>
    <div id="app">
   <Background/>
        <template v-if="okData" v-for="child in componentList">
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
    import RestResource from "./services/dataService";
    import {STORE} from "./states/store";
    import Background from "./components/main/Background";

    export default {
        name: 'app',
        mixins: [mixinEltWithChild],
        components: {
            Background,
            'app-header': Header,
            'app-menu': Menu,
            'app-sous-menu': SousMenu,
            'app-main': Main
        },
        data: function () {
            return {
                componentList: ['app-header', 'app-menu', 'app-sous-menu', 'app-main'],
                okData: false
            }
        },
        methods: {
            isFocus: function (index) {
                this.focused = true;
                this.getFocus(index || this.focus);
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
        beforeCreate() {
            Promise.all([
                RestResource.storeUsers(),
                RestResource.storeChannels(),
                RestResource.storeApps()
                ])
                .then(res => {
                    STORE.objectUser = res[0];
                    this.okData = true;
                })
                .catch(err => {
                    console.error('une erreur est survenue, merci de contacter l\'administrateur \n' + err);
                });
        },
        updated() {
            this.initListeners();
            this.isFocus(1);
        },
    }
</script>

<style lang='less'>

    @import '~normalize.css';
    @import './assets/style/variables.less';

    html,
    body {
        .full-height;
        overflow: hidden;
    }

    #app {
        .full-height;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        padding: 2% 2% 2% 2%;
        box-sizing: border-box;

    }

    .focus {
        background-color: lime;
    }

    .focusborder {
        -moz-box-shadow: 0 0 10px rgb(26, 159, 220);
        -webkit-box-shadow: 0 0 10px rgb(26, 159, 220);
        box-shadow: 0 0 10px rgb(26, 159, 220);
        transition: all 0.3s;
    }

    .hide {
        display: none !important;
    }
</style>
