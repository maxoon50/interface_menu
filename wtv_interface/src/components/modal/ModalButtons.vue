<template>
    <div>
        <button v-for="btn in buttons" ref="contents">{{btn}}</button>
    </div>
</template>

<script>
    import {mixinEltWithChild} from "../../mixins/mixinEltWithChild";

    export default {
        name: "ModalButtons",
        mixins: [mixinEltWithChild],
        data: function () {
            return {
                buttons: ['annuler', 'réinitialiser', 'valider'],
                focused: false,
            }
        },
        methods: {

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
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .focus {
        background-color: orangered;
    }
</style>