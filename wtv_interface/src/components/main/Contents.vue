<template>
    <div id="cont-chan">
  <Channel/>
  <Channel/>
  <Channel/>
</div>
</template>

<script>
import Channel from '../cards/Channel';

    export default {
        components: {
           Channel
        },

        data: function() {
            return {
        
            }
        },
        methods: {

        },
  
    }
</script>

<style scoped>
   #cont-chan {
       height : 100%;
   }
</style>