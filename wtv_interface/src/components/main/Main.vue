<template>
    <main id="main">
        <Modal/>
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
                       :nbreItemsShowed="child.nbreItemsShowed"
                       ref="contents"
                       :index="index"
            >
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
    import {myAppState} from "../../states/myAppState";
    import {myExtraState} from "../../states/myExtraState";
    import {mixinEltWithChild} from '../../mixins/mixinEltWithChild';
    import {EventBus} from "../../main";
    import {GLOBALS} from "../../const/globals";

    export default {

        components: {
            Contents,
            Modal
        },
        mixins: [mixinEltWithChild],
        data: function () {
            return {
                contentTypesAutre: [
                    {
                        type: GLOBALS.CHANNELS,
                        dataSource: [
                            {
                                'title': 'truc',
                                'img': 'truc.png',
                                'id': 2527
                            },
                            {
                                'title': 'truc 2',
                                'img': 'truc.jpg',
                                'id': 2528
                            },
                            {
                                'title': 'truc 3',
                                'img': 'truc.png',
                                'id': 2529
                            }
                        ],
                        nbreItemsShowed: 3
                    },
                    {
                        type: GLOBALS.CONTENTS,
                        dataSource: [
                            {
                                'title': 'truc',
                                'img': 'truc.png',
                                'id': 2527
                            },
                            {
                                'title': 'truc 2',
                                'img': 'truc.jpg',
                                'id': 2528
                            },
                            {
                                'title': 'truc 3',
                                'img': 'truc.png',
                                'id': 2529
                            }
                        ],
                        nbreItemsShowed: 3
                    },
                    {
                        type: GLOBALS.APPS,
                        dataSource: [
                            {
                                'title': 'truc',
                                'img': 'truc.png',
                                'id': 2527
                            },
                            {
                                'title': 'truc 2',
                                'img': 'truc.jpg',
                                'id': 2528
                            },
                            {
                                'title': 'truc 3',
                                'img': 'truc.png',
                                'id': 2529
                            }
                        ],
                        nbreItemsShowed: 3
                    },
                    {
                        type: GLOBALS.MOVIES,
                        dataSource: [
                            {
                                'title': 'truc',
                                'img': 'truc.png',
                                'id': 2527
                            },
                            {
                                'title': 'truc 2',
                                'img': 'truc.jpg',
                                'id': 2528
                            },
                            {
                                'title': 'truc 3',
                                'img': 'truc.png',
                                'id': 2529
                            }
                        ],
                        nbreItemsShowed: 1
                    },
                    {
                        type: GLOBALS.EXTRAS,
                        dataSource: [
                            {
                                'title': 'truc',
                                'img': 'truc.png',
                                'id': 2527
                            },
                            {
                                'title': 'truc 2',
                                'img': 'truc.jpg',
                                'id': 2528
                            },
                            {
                                'title': 'truc 3',
                                'img': 'truc.png',
                                'id': 2529
                            }
                        ],
                        nbreItemsShowed: 3
                    },
                ],
                contentTypesHome: [
                    {
                        type: GLOBALS.CHANNELS,
                        dataSource: myChannelState.contents,
                        nbreItemsShowed: 3
                    },
                    {
                        type: GLOBALS.CONTENTS,
                        dataSource: myContentState.contents,
                        nbreItemsShowed: 3
                    },
                    {
                        type: GLOBALS.APPS,
                        dataSource: myAppState.contents,
                        nbreItemsShowed: 3
                    },
                    {
                        type: GLOBALS.MOVIES,
                        dataSource: myFilmState.contents,
                        nbreItemsShowed: 1
                    },
                    {
                        type: GLOBALS.EXTRAS,
                        dataSource: myExtraState.contents,
                        nbreItemsShowed: 3
                    },
                ],
                contentTypes: null,
                focus: 0,

            }
        },
        methods: {
            test() {
                console.log('oki')

            },
            ///----------Méthodes Navigation-------------///
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
            ///---------- Fin Méthodes Navigation-------------///
        },
        mounted() {
            // on set le focus sur le content selon le sous menu selectionné
            EventBus.$on('subMenuSelected', (index) => {
                this.focus = index;
            });
            EventBus.$on('MenuChanged', (tab) => {
                if(tab[1] === 'MEDIA CENTER') {
                    this.contentTypes = this.contentTypesHome
                } else {
                    this.contentTypes = this.contentTypesAutre
                }
            });
            this.contentTypes = this.contentTypesHome;
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