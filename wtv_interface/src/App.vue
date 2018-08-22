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
  import { mixinEletWithChild } from './mixins/mixinEletWithChild';
  
  export default {
    name: 'app',
    mixins: [ mixinEletWithChild ],
    components: {
      'app-header': Header,
      'app-menu': Menu,
      'app-sous-menu': SousMenu,
      'app-main': Main
    },
      data:function(){
        return {
            componentList: ['app-header', 'app-menu', 'app-sous-menu', 'app-main'],
        }
      }
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
    background-repeat:no-repeat center fixed;
      background-size: cover;
     
  }
</style>
