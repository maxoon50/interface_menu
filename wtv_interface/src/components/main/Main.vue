<template>
    <main id="main">
            <Modal/>
        <!-- ici on envoie:
         => la catégorie pour créer les éléments 'Contents' en dynamique,
         => les datas en provenance des states
        -->
            <Contents class="contents"
                      ref="channels"
                      :categorie="'channel'"
                      :data="myChannelState.channels" />
            <Contents class="contents"
                      ref="contents"
                      :categorie="'channel'"
                      :data="myContentState.contents"/>
            <Contents class="contApp"
                      ref="apps"
                      :categorie="'appli'" />
            <Contents class="contents"
                      ref="films"
                      :categorie="'movie'"
                      :data="myFilmState.films"/>
            <Contents class="contents"
                      ref="extras"
                      :categorie="'channel'" />
    </main>
</template>

<script>
    import Contents from './Contents';
    import Modal from '../modal/Modal';
    import { myChannelState } from '../../states/myChannelState';
    import { myContentState } from '../../states/myContentState';
    import { myFilmState } from '../../states/myFilmState';
    export default {
    
        components: {
            Contents,
            Modal
        },
        data: function() {
            return {
                componentList: ['channels', 'contents', 'apps', 'films', 'extras'],
                myChannelState,
                myContentState,
                myFilmState
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
        position: relative;
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