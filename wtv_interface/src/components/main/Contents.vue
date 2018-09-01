<template>
    <div class="cont-chan">
        <transition-group name="vertical-slide" tag="span" class="cont-animate">
            <component v-for="(elt,index) in firstDatas"
                       :key="elt.id"
                       v-bind:is="categorie"
                       :content="elt"
                       ref="contents"
            >
            </component>
        </transition-group>
    </div>
</template>

<script>
    import Channel from '../cards/Channel';
    import Appli from '../cards/Appli';
    import Movie from '../cards/Movie';
    import Extra from '../cards/Extra';
    import MyContent from '../cards/MyContent';
    import { mixinEltWithChild } from '../../mixins/mixinEltWithChild';
    import { navigationState } from "../../states/navigationState";
    import { GLOBALS } from "../../const/globals";

    export default {
        components: {
            Channel,
            MyContent,
            Appli,
            Movie,
            Extra
        },
        mixins: [mixinEltWithChild],
        props: ['categorie', 'data', 'index'],
        data: function () {
            return {
                firstDatas: null,
                animatedContent: false,
                maximumItem: 0
            }
        },
        methods: {
            ///----------Méthodes Navigation-------------///
            isFocus: function () {
                // on reset l'index du SubMenu
                navigationState.indexSubMenu = this.index;
                this.maximumItem = 0;
                this.focused = true;
                 /*=> ici je lui envoie le focus selon le navigation state, pour que si on ressort du content ver subMenu,
                 la navigation se mette directement sur le bon élément*/
                let navStateElt = this.categorie + 'Index';
                this.getFocus(navigationState[navStateElt]);
            },
            setFocus: function (pos) {
                this.focus += pos;
                //===>  concerne les trois seuls éléments que l'on voit, gère le ArrowUp ///
                if (this.maximumItem < 3 && pos == 1) {
                    this.maximumItem++;
                } else if (pos == -1) {
                    this.animatedContent = false;
                    // vieux hack de la mort  ne pas remove !!//
                    if (this.maximumItem == 3) {
                        this.maximumItem--;
                    }
                    this.maximumItem--;
                    //===> on remove le focus du content vers le sous menu:
                    //==> on remove le focus du Main
                    //==> on donne le focus à App (index 2)
                    if (this.maximumItem < 0) {
                        this.saveLastIndexFocused();
                        this.removeFocus();
                        this.$parent.removeFocus();
                        this.$parent.$parent.isFocus(2);
                        // il faut émit l'index ou se trouve l'élément au check out pour faciliter le check in
                        return;
                    }
                }

                // => quand on arrive en fin ou début de boucle
                if (this.focus == this.$refs.contents.length) {
                    this.focus = 0;
                }else if (this.focus < 0) {
                    this.focus = this.$refs.contents.length - 1
                }

                // --- concerne l'animation --- //
                if (pos == 1) {
                    if (this.animatedContent) {
                        this.changeFocus()
                    } else {
                        if (this.maximumItem > 2) {
                            this.animatedContent = true;
                            this.changeFocus()
                        }
                    }
                }
                this.giveFocus();
            },
            listener: function ({code}) {
                {
                    switch (code) {
                        case 'ArrowDown':
                            this.setFocus(1);
                            break;
                        case 'ArrowUp':
                            this.setFocus(-1);
                    }
                }
            },
            saveLastIndexFocused(){
                {
                    switch (this.categorie) {
                        case GLOBALS.CHANNELS:
                            navigationState.channelIndex = this.focus +1;
                            break;
                        case GLOBALS.CONTENTS:
                            navigationState.myContentIndex = this.focus +1;
                            break;
                        case GLOBALS.APPS:
                            navigationState.appliIndex = this.focus +1;
                            break;
                        case GLOBALS.MOVIES:
                            navigationState.movieIndex = this.focus +1;
                            break;
                        case GLOBALS.EXTRAS:
                            navigationState.extraIndex = this.focus +1;
                            break;
                    }
                }
            },
            ///----------Fin Méthodes Navigation-------------///
            
            changeFocus() {
                this.firstDatas.push(this.firstDatas.shift());
            }

        },
        created() {
            this.firstDatas = this.data.slice(0, 5);
        },
        mounted() {
        },
    }
</script>

<style lang='less'>

    @import '../../assets/style/style.less';

    .cont-chan {
        .large-row;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .cont-animation {
        .full-height;
        .full-width;
    }

    .vertical-slide-move {
        transition: transform 0.4s ease-out;
    }

    .cont-animate {
        .full-height;
        .full-width;
        overflow: hidden;
    }
</style>