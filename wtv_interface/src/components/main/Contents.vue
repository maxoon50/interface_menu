<template>
    <div class="cont-chan" >
        <component v-for="(elt,index) in firstDatas"
                   :key="index"
                   v-bind:is="categorie"
                   :content="elt"
                   ref="contents">
        </component>
    </div>
</template>

<script>
    import Channel from '../cards/Channel';
    import Appli from '../cards/Appli';
    import Movie from '../cards/Movie';
    import { mixinEltWithChild } from '../../mixins/mixinEltWithChild';
    import { navigationState } from "../../states/navigationState";

    export default {
        components: {
            Channel,
            Appli,
            Movie
        },
        mixins: [mixinEltWithChild],
        props: ['categorie', 'data', 'index'],
        data: function () {
            return {
                firstDatas : null,
            }
        },
        methods: {
            isFocus: function () {
                // on reset l'index pour que le subMenu le récupère
                navigationState.indexSubMenu = this.index;
                this.focused = true;
                this.getFocus();
            },
            setFocus: function (pos) {
                /* si on arrive en haut:
                    => on remove le focus du Main
                    => on donne le focus à App (index 2)
                */
                if (this.focus <= 0 && pos == -1) {
                    this.removeFocus();
                    this.$parent.removeFocus();
                    this.$parent.$parent.isFocus(2);
                    return;
                } else if (this.focus == this.$refs.contents.length - 1 && pos == 1) {
                    this.focus = 0;
                } else {
                    this.focus += pos;
                }
                this.giveFocus();
            },
            listener: function ({ code }) {
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

        },
        created() {
            this.firstDatas = this.data.slice(0,3);
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
</style>