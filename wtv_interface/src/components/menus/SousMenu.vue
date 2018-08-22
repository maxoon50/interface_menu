<template>
    <div id="sub-menu" :class="{focus: focused}">
  sous menu
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
 #sub-menu{
     height: 10%;
     border: 1px solid grey;
 }
</style>