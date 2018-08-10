<template>
    <div class="cont-chan">
        <component  v-for="elt in data" v-bind:is="categorie" :content="elt"></component>

</div>
</template>

<script>
import Channel from '../cards/Channel';
import Appli from '../cards/Appli';
import Movie from '../cards/Movie';

    export default {
        components: {
           Channel,
           Appli,
           Movie
        },
        props:['categorie', 'data'],
        data: function() {
            return {
         

            }
        },
        methods: {

        },
        created() {

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