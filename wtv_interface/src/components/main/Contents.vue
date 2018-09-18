<template>
    <div class="cont-chan">
        <transition-group name="vertical-slide" tag="div" class="cont-animate">
            <component v-for="(elt,index) in data"
                       :key="elt.id"
                       v-bind:is="categorie"
                       :content="elt"
                       ref="contents"
                       :havePlayer="true"
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
    import {mixinEltWithChild} from '../../mixins/mixinEltWithChild';
    import {navigationState} from "../../states/navigationState";


    export default {
        components: {
            Channel,
            MyContent,
            Appli,
            Movie,
            Extra
        },
        mixins: [mixinEltWithChild],
        props: ['categorie', 'data', 'index', 'nbreItemsShowed'],
        data: function () {
            return {
                animatedContent: false,
                showedItems: 0,
                indexShowedItems: [0, 1, 2],
            }
        },
        methods: {
            ///----------Méthodes Navigation-------------///
            isFocus: function () {
                // on reset l'index du SubMenu
                navigationState.indexSubMenu = this.index;
                this.showedItems = 0;
                this.focused = true;
                this.animatedContent = false;
                /*=> ici je lui envoie le focus sur le premier élément du 'indexShowItems'*/
                this.getFocus(this.indexShowedItems[0]);
            },
            setFocus: function (pos) {
                this.focus += pos;
                //===>  concerne les trois seuls éléments que l'on voit, gère le ArrowUp ///
                if (this.showedItems < this.nbreItemsShowed && pos == 1) {
                    this.showedItems++;
                } else if (pos == -1) {
                    this.animatedContent = false;
                    // vieux hack de la mort  ne pas remove !!//
                    if (this.showedItems == this.nbreItemsShowed) {
                        this.showedItems--;
                    }
                    this.showedItems--;
                    //===> on remove le focus du content vers le sous menu:
                    //==> on remove le focus du Main
                    //==> on donne le focus à App (index 2)
                    if (this.showedItems < 0) {
                    /*    this.removeFocus();
                        this.$parent.removeFocus();*/
                        this.$parent.$parent.isFocus(2);
                        this.lastFocused = null;
                        // il faut émit l'index ou se trouve l'élément au check out pour faciliter le check in
                        return;
                    }
                }

                // => quand on arrive en fin ou début de boucle
                if (this.focus == this.$refs.contents.length) {
                    this.focus = 0;
                } else if (this.focus < 0) {
                    this.focus = this.$refs.contents.length - 1
                }

                // --- concerne l'animation --- //
                if (pos == 1) {
                    if (this.animatedContent) {
                        this.changeFocus()
                    } else {
                        if (this.showedItems > this.nbreItemsShowed-1) {
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

            ///----------Fin Méthodes Navigation-------------///

            changeFocus() {
                /* ici on remplit un array des trois index qui sont montrés à l'écran*/
                this.indexShowedItems = [];
                // const first = this.pages.shift()
                // this.pages = this.pages.concat(first)
                this.data.push(this.data.shift());
                for(let i = 0; i< 3; i++){
                    this.indexShowedItems.push(this.data[i].index)
                }
            }

        },
        created() {
            // ici on ajoute un index pour faciliter le traitement des animations
            this.data.map((elt, index) => {
                    elt['index'] = index;
                    return elt;})
        },
        mounted() {
        }
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
