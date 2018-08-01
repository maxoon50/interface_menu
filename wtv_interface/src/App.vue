<template>
  <div id="app">
    <app-header></app-header>
    <app-menu></app-menu>
    <app-sous-menu></app-sous-menu>
    <app-main></app-main>
  </div>
</template>

<script>
  import Header from './components/header/Header.vue';
  import Menu from './components/menus/Menu.vue';
  import SousMenu from './components/menus/SousMenu.vue';
  import Main from './components/main/Main.vue';
  
  export default {
    name: 'app',
    components: {
      'app-header': Header,
      'app-menu': Menu,
      'app-sous-menu': SousMenu,
      'app-main': Main
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
