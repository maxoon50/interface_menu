<template>
    <div id="cont-btn">
        <button class="btn" v-for="btn in buttons" ref="contents">{{btn}}</button>
    </div>
</template>

<script>
    import {mixinEltWithChild} from "../../mixins/mixinEltWithChild";
    import {GLOBALS} from "../../const/globals";
    import {EventBus} from "../../main";

    export default {
        name: "ModalButtons",
        mixins: [mixinEltWithChild],
        data: function () {
            return {
                focused: false,
                buttonsArr: [GLOBALS.BTN_CANCEL, GLOBALS.BTN_SAVE],
            }
        },
        computed: {
            buttons: {
                get: function () {
                    return this.buttonsArr;
                },
                // mutateur
                set: function (newValue) {
                    this.buttonsArr = newValue;
                }
            }
        },
        methods: {

            ///----------Méthodes Navigation-------------///
            giveFocus: function () {
                // ici on vérifie s'il y a un last focused et on le remove au besoin
                if (this.lastFocused != null) {
                    this.lastFocused.removeFocus();
                }
                // ici on set le focus sur le nouvel élément (selon le this.focus))
                let eltToFocus = this.$refs.contents[this.focus];
                this.giveBtnFocus(eltToFocus);
            },
            giveBtnFocus(elt) {
                this.$refs.contents.forEach(elt => elt.classList.remove('focus'));
                elt.classList.add('focus')
            },
            listener: function ({code}) {
                {
                    switch (code) {
                        case 'ArrowRight':
                            this.setFocus(1);
                            break;
                        case 'ArrowLeft':
                            this.setFocus(-1);
                            break;
                        case 'ArrowUp':
                            this.$refs.contents.forEach(elt => elt.classList.remove('focus'));
                            this.focused = false;
                            this.removeListeners();
                            this.$parent.isFocus();
                            break;
                        case 'Enter':
                            this.focused = false;
                            this.removeListeners();
                            this.$parent.isFocus();
                            this.$refs.contents.forEach(elt => elt.classList.remove('focus'));
                            this.$parent.buttonEvent(this.$refs.contents[this.focus]);
                            break;
                    }
                }
            }
            ///----------Fin Méthodes Navigation-------------///
        },
        mounted() {
            /**
             * Event received from "navigation state"
             */
            EventBus.$on('ModalOpened', (source) => {
                if (source.type === 'MyContentModal') {
                    this.buttons = [GLOBALS.BTN_CANCEL, GLOBALS.BTN_REMOVE];
                }
            })
        }

    }
</script>

<style scoped>
    #cont-btn {
        margin-left: auto;
    }

    .btn{
        height: 25px;
        background-color: black;
        color: #25bbff;
        margin-right: 10px;
        border-radius: 3px;
        border: 1px solid #25bbff;
        transition: all 0.2s ease-in-out;
    }
    .btn.focus{
        background-color: #25bbff;
        color: black;
        margin-right: 10px;
        border-radius: 3px;
        border: 1px solid black;
    }
</style>