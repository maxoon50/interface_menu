<template>
    <div class="cont-modal">
        <component v-for="(elt,index) in data"
                   :key="index"
                   v-bind:is="categorie"
                   :content="elt"
                   ref="contents">
        </component>
    </div>
</template>


<script>
    import AppliModal from './cards/AppliModal.vue';
    import MyContentModal from './cards/MyContentModal.vue';
    import ChannelModal from './cards/ChannelModal.vue';
    import ExtraModal from './cards/ExtraModal.vue';
    import MovieModal from './cards/MovieModal.vue';
    import {mixinEltWithChild} from "../../mixins/mixinEltWithChild";
    import {navigationState} from "../../states/navigationState";


    export default {
        name: "ContentsModal",
        components: {
            AppliModal,
            MyContentModal,
            ChannelModal,
            ExtraModal,
            MovieModal
        },
        mixins: [mixinEltWithChild],
        props: ['categorie', 'index', "data"],
        data: function () {
            return {
                focused: false,
            }
        },
        methods: {
            ///----------Méthodes Navigation-------------///
            isFocus: function () {
                this.focused = true;
                this.getFocus(navigationState.modalY);
            },
            setFocus: function (pos) {
                /* si on arrive en haut /*/
                if (this.focus <= 0 && pos == -1) {
                    this.focus = this.$refs.contents.length - 1;
                    navigationState.modalY += this.$refs.contents.length - 1;
                } else if (this.focus == this.$refs.contents.length - 1 && pos == 1) {
                    this.$parent.removeFocus();
                    // on set le button du parent a focus
                    this.$parent.$refs.buttons.isFocus();
                    return;
                } else if (this.focus >= -1 && this.focus <= this.$refs.contents.length - 1) {
                    this.focus += pos;
                    navigationState.modalY += pos;
                } else {
                    return;
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
                            break;
                    }
                }
            }
            ///----------Fin Méthodes Navigation-------------///

        },
        created() {
        }
    }
</script>

<style scoped>
  .cont-modal{
      width: 15%;
  }
</style>