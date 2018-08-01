<template>
    <main id="main">
        <div class="">
            <Contents ref="channels" :categorie="'channels'"/>
        </div>
        <div class="">
            <Contents ref="contents" :categorie="'contents'"/>
        </div>
        <div class="">
            <Contents ref="apps" :categorie="'apps'"/>
        </div>
        <div class="">
            <Contents ref="films" :categorie="'films'"/>
        </div>
        <div class="">
            <Contents ref="extras" :categorie="'extras'"/>
        </div>

    </main>
</template>

<script>
    import Contents from './Contents';


    export default {

        components: {
            Contents
        },
        data:function(){
            return {
                componentList: ['channels', 'contents', 'apps', 'films', 'extras'],
     
            }
        },
        methods: {
          

        }
    }
</script>

<style scoped>

</style>