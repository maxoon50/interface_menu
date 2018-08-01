<template>
    <main id="main">
        <div class="contents">
            <Contents ref="channels" :categorie="'channels'" />
        </div>
        <div class="contents">
            <Contents ref="contents" :categorie="'contents'" />
        </div>
        <div class="contents">
            <Contents ref="apps" :categorie="'apps'" />
        </div>
        <div class="contents">
            <Contents ref="films" :categorie="'films'" />
        </div>
        <div class="contents">
            <Contents ref="extras" :categorie="'extras'" />
        </div>
    
    </main>
</template>

<script>
    import Contents from './Contents';
    
    
    export default {
    
        components: {
            Contents
        },
        data: function() {
            return {
                componentList: ['channels', 'contents', 'apps', 'films', 'extras'],
    
            }
        },
        methods: {
    
    
        }
    }
</script>

<style lang='less'>
    @import '~normalize.css';
    @import '../../assets/style/variables.less';
    #main {
        height: 65%;
        border: 1px solid grey;
        .flex-row;
    }
    
    .contents {
        .full-height;
        width: 20%;
        box-sizing: border-box;
        border: 1px solid grey;
    }
</style>