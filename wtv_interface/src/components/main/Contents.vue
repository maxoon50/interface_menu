<template>
    <div class="cont-chan" >
        <component v-for="(elt,index) in data"
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
        props: ['categorie', 'data'],
        data: function () {
            return {}
        },
        methods: {
            isFocus: function () {
                navigationState.indexSubMenu = this.index;
                this.focused = true;
                this.getFocus();
            },
            setFocus: function (pos) {
                /* si on arrive en haut /*/
                if (this.focus <= 0 && pos == -1) {
                    this.removeFocus();
                    this.$parent.removeFocus();
                    this.$parent.$parent.isFocus();
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
                            console.log('down contents');
                            this.setFocus(1);
                            break;
                        case 'ArrowUp':
                            console.log('up contents');
                            this.setFocus(-1);
                    }
                }
            }
        },
        created() {
        },
        mounted() {
        },
    }
</script>

<style scoped>
    .cont-chan {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 20%;
    }
</style>