<template>
    <div id="main-menu" :class="{focus: focused}">
  menu
    </div>
</template>

<script>
    import { mixinEltWithoutChild } from '../../mixins/mixinEltWithoutChild';

    export default {
        components: {
     
        },
        mixins: [ mixinEltWithoutChild ],
        data: function() {
            return {
        
            }
        },
        methods: {

        },
  
    }
</script>

<style scoped>
  #main-menu{
      height: 10%;
      border: 1px solid grey;
  }
</style>