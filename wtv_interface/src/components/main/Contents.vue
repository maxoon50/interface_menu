<template>
    <div class="cont-chan">
        <component  v-for="elt in listeElements" v-bind:is="categorie"></component>

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
        props:['categorie'],
        data: function() {
            return {
                listeElements : 3
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
       align-content: center;
       height : 100%;
   }
</style>