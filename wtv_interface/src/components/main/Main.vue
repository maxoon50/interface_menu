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
    import {defaultState} from "../../states/defaultState";
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
                        type: GLOBALS.MOVIES,
                        dataSource: defaultState.contents,
                        nbreItemsShowed: 1
                    },
                    {
                        type: GLOBALS.MOVIES,
                        dataSource: defaultState.contents,
                        nbreItemsShowed: 1
                    },
                    {
                        type: GLOBALS.MOVIES,
                        dataSource: defaultState.contents,
                        nbreItemsShowed: 1
                    },
                    {
                        type: GLOBALS.MOVIES,
                        dataSource: defaultState.contents,
                        nbreItemsShowed: 1
                    },
                    {
                        type: GLOBALS.MOVIES,
                        dataSource: defaultState.contents,
                        nbreItemsShowed: 1
                    }
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
            },
            // essai API Youtube
            async videoYoutube() {   
                try {
                    let films = await fetch('https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyBGnQO5k02QBDTuMX-gmuVEiKA7_kfosOk&part=snippet')
                    filmsJson = await films.json();
                    console.log(this.myFilmState.items[0])

                    jsonMovies.forEach(({id, name, srcImg}) => movieFiltered.push({id, name, srcImg}))
                    // return this.myFilmState
                } 
                catch(e) {
                    console.error(e)
                }
            }
            // .then(resp => resp.json())
                // .then((data) => {
                //     console.log(data);
                //     this.myFilmState = data.items[0];
                //     console.log(this.myFilmState);
                // });
            // this.myFilmState.contents = films
            // console.log(films)

            ///---------- Fin Méthodes Navigation-------------///
        },
        mounted() {
            // on set le focus sur le content selon le sous menu selectionné
            EventBus.$on('subMenuSelected', (index) => {
                this.focus = index;
            });
            EventBus.$on('MenuChanged', (tab) => {
                if(tab[1] === 'HOME') {
                    this.contentTypes = this.contentTypesHome
                } else {
                    this.contentTypes = this.contentTypesAutre
                }
            });
            this.contentTypes = this.contentTypesHome;
            this.videoYoutube() 
        },

    }
</script>

<style lang='less'>
    @import '~normalize.css';
    @import '../../assets/style/variables.less';

    #main {
        position: relative;
        height: 70%;
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

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

</style>