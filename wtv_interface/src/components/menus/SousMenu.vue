<template>
    <div id="sub-menu">
        <ItemMenu class="item-menu"
                  v-for="(item, index) in  menuElements"
                  :title="item"
                  :index="index"
                  ref="contents"
                  :key="index"
        />
    </div>
</template>

<script>
    import {mixinEltWithChild} from '../../mixins/mixinEltWithChild';
    import ItemMenu from './ItemMenu';
    import {navigationState} from "../../states/navigationState";
    import {EventBus} from "../../main";

    export default {
        components: {
            ItemMenu
        },
        mixins: [mixinEltWithChild],
        data: function () {
            return {
                menuElements: navigationState.menuHome
                // menuElements: ['channels', 'contents', 'apps', 'films', 'channels'],
            }
        },
        methods: {
            ///----------Méthodes Navigation-------------///
            isFocus: function () {
                this.focused = true;
                // on doit setter le focus sur le content qui était focus en dernier
                this.getFocus(this.focus);
            },
            giveFocusToModal() {
                //on reset la position dans la modal
                navigationState.modalX = 0;
                navigationState.modalY = 0;
                this.removeListeners(this.listener);
                this.$parent.removeListeners();
                navigationState.contentModal = this.menuElements[this.focus];
                navigationState.modalOpened = true;
            },
            listener: function ({code}) {
                {
                    //comme ce component n'a qu'une ligne on remove les listeners directement au up & down
                    switch (code) {
                        case 'ArrowRight' :
                            this.setFocus(1);
                            break;
                        case 'ArrowLeft' :
                            this.setFocus(-1);
                            break;
                        case 'ArrowUp' :
                            this.removeListeners(this.listener);
                            break;
                        case 'ArrowDown' :
                            this.removeListeners(this.listener);
                            break;
                        case 'Enter' :
                            this.giveFocusToModal();
                            break;
                    }
                }
            }
            ///----------Fin Méthodes Navigation-------------///
        },
        mounted() {
            EventBus.$on('subMenuSelected', (index) => {
                this.focus = index;
            });
            EventBus.$on('ModalClosed', (index) => {
                this.isFocus();
                this.$parent.initListeners();
            })
            EventBus.$on('MenuChanged', (tab) => {
                this.menuElements = tab[0]
            });
        }

    }
</script>

<style lang='less'>

    @import '../../assets/style/style.less';

    #sub-menu {
        height: 10%;
        display: flex;
        flex-direction: row;
    }

    .item-menu {
        .large-row;
        z-index: 11;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size:20px;
        font-weight:900;
        color:white;
    }
</style>