<template>
    <main id="main">
        <Modal/>
        <!-- ici on envoie:
         => la catégorie pour créer les éléments 'Contents' en dynamique,
         => les datas en provenance des states
         => le ref contents, ref 'générique' pour récupérer un array de composants :: this.$refs.contents
        -->
        <template v-for="(child, index) in contents">
            <component :class="{opacFull: !hideIt}" id="opac" :is="'contents'"
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
    import Contents from "./Contents";
    import Modal from "../modal/Modal";
    import {defaultState} from "../../states/defaultState";
    import {mixinEltWithChild} from "../../mixins/mixinEltWithChild";
    import {EventBus} from "../../main";
    import {GLOBALS} from "../../const/globals";
    import {STORE} from "../../states/store";

    export default {
        components: {
            Contents,
            Modal
        },
        mixins: [mixinEltWithChild],
        data: function () {
            return {
                hideIt: true,
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
                        dataSource: STORE.channelContents,
                        nbreItemsShowed: 3
                    },
                    {
                        type: GLOBALS.CONTENTS,
                        dataSource: STORE.myContentContents,
                        nbreItemsShowed: 3
                    },
                    {
                        type: GLOBALS.APPS,
                        dataSource: STORE.appliContents,
                        nbreItemsShowed: 3
                    },
                    {
                        type: GLOBALS.MOVIES,
                        dataSource: STORE.movieContents,
                        nbreItemsShowed: 1
                    },
                    {
                        type: GLOBALS.EXTRAS,
                        dataSource: STORE.extraContents,
                        nbreItemsShowed: 3
                    }
                ],
                contentTypes: null,
                focus: 0
            };
        },
        computed: {
            contents() {
                return this.contentTypes;
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
                        case "ArrowRight":
                            this.setFocus(1);
                            break;
                        case "ArrowLeft":
                            this.setFocus(-1);
                    }
                }
            }
            ///---------- Fin Méthodes Navigation-------------///
        },
        created() {
            let that = this;
            setTimeout(function () {
                that.hideIt = false;
            }, 100);
        },
        mounted() {
            // on set le focus sur le content selon le sous menu selectionné
            EventBus.$on("subMenuSelected", index => {
                this.focus = index;
            });
            EventBus.$on("MenuChanged", tab => {
                this.hideIt = true;
                let that = this;
                setTimeout(function () {
                    that.hideIt = false;
                }, 100);
                if (tab[1] === "HOME") {
                    this.contentTypes = this.contentTypesHome;
                } else {
                    this.contentTypes = this.contentTypesAutre;
                }
            });

            EventBus.$on('updateData', () => {
                this.contentTypesHome[0].dataSource = STORE.channelContents;
                this.contentTypesHome[1].dataSource = STORE.myContentContents;
                this.contentTypesHome[2].dataSource = STORE.appliContents;
                this.contentTypesHome[3].dataSource = STORE.movieContents;
                this.contentTypesHome[4].dataSource = STORE.extraContents;
                this.contentTypes = this.contentTypesHome;
            });
            this.contentTypes = this.contentTypesHome;
        }
    };
</script>

<style lang='less'>
    @import "~normalize.css";
    @import "../../assets/style/variables.less";

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

    #opac {
        opacity: 0;
    }

    #opac.opacFull {
        -webkit-transition: all 0.6s ease;
        transition: all 0.6s ease;
        opacity: 1;
    }
</style>
