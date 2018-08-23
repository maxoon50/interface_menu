<template>
    <div class="cont-chan">
        <component v-for="(elt,index) in data"
                   :key="index"
                   v-bind:is="categorie"
                   :content="elt"
                   ref="contents">
        </component>
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
        props: ['categorie', 'data'],
        data: function () {
            return {}
        },
        methods: {},
        created() {
            console.log(this.data)
        },
        mounted() {

        },


    }
</script>

<style scoped>
    .cont-chan {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 20%;
    }
</style>