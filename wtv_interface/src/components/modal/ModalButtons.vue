<template>
    <div>
        <button v-for="btn in buttons" ref="contents">{{btn}}</button>
    </div>
</template>

<script>
    import {mixinEltWithChild} from "../../mixins/mixinEltWithChild";
    import {GLOBALS} from "../../const/globals";

    export default {
        name: "ModalButtons",
        mixins: [mixinEltWithChild],
        data: function () {
            return {
                buttons: [GLOBALS.BTN_CANCEL, GLOBALS.BTN_SAVE],
                focused: false,
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
        }

    }
</script>

<style scoped>

</style>