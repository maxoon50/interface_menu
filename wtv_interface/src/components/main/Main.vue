<template>
    <main id="main">
            <Contents class="contents" ref="channels" :categorie="'channels'" />
            <Contents class="contents" ref="contents" :categorie="'contents'" />      
            <Contents class="contApp" ref="apps" :categorie="'apps'" />    
            <Contents class="contents" ref="films" :categorie="'films'" />      
            <Contents class="contents" ref="extras" :categorie="'extras'" />
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
        height: 70%;
        border: 1px solid grey;
        .flex-row;
    }
    
    .contents {
        .full-height;
        width: 250px;
        box-sizing: border-box;
        border: 1px solid grey;
    }

     .contApp {
        .full-height;
        width: 16%;
        box-sizing: border-box;
        border: 1px solid grey;
    }
</style>