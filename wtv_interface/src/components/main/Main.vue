<template>
    <main id="main">
        <!-- ici on envoie:
         => la catégorie pour créer les éléments 'Contents' en dynamique,
         => les datas en provenance des states
         => le ref contents, ref 'générique' pour récupérer un array de composants :: this.$refs.contents
        -->
        <template v-for="(child, index) in contentTypes">
            <component :is="'contents'"
                       :key="index"
                       :categorie="child.type"
                       :data="child.dataSource"
                       ref="contents">
            </component>
        </template>
    </main>
</template>

<script>
    import Contents from './Contents';
    import Modal from '../modal/Modal';
    import {myChannelState} from '../../states/myChannelState';
    import {myContentState} from '../../states/myContentState';
    import {myFilmState} from '../../states/myFilmState';
    import {mixinEltWithChild} from '../../mixins/mixinEltWithChild';
    import { EventBus } from "../../main";

    export default {

        components: {
            Contents,
            Modal
        },
        mixins: [mixinEltWithChild],
        data: function () {
            return {
                contentTypes: [
                    {
                        type: 'channel',
                        dataSource: myChannelState.channels
                    },
                    {
                        type: 'channel',
                        dataSource: myContentState.contents
                    },
                    {
                        type: 'appli',
                        dataSource: myChannelState.channels
                    },
                    {
                        type: 'movie',
                        dataSource: myFilmState.films
                    },
                    {
                        type: 'channel',
                        dataSource: myChannelState.channels
                    },
                ],
            }
        },
        methods: {
            getFocus: function () {
                this.initListeners();
                this.giveFocus();
                this.$parent.removeListeners();
            },
            listener: function ({code}) {
                {
                    switch (code) {
                        case 'ArrowRight' :
                            this.setFocus(1);
                            break;
                        case 'ArrowLeft' :
                            this.setFocus(-1);
                    }
                }
            }

        },
        mounted() {
            // on set le focus sur le content selon le sous menu selectionné
           // EventBus.$on('subMenuSelected', (index) => this.focus = index);
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
        width: 23%;
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