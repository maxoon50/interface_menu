<template>
    <div class="cont-chan">
  <Channel/>
 <Appli/>
 <Channel/>
</div>
</template>

<script>
import Channel from '../cards/Channel';
import Appli from '../cards/Appli';

    export default {
        components: {
           Channel,
           Appli
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
   .cont-chan {
       display:flex;
       flex-direction: column;
       align-items:center;
       height : 100%;
   }
</style>