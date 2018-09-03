<template>
    <div id="modal" class="p-sm flex-column" :class="{hide: !navigationState.modalOpened}">
        <div id="container">
            <ContentsModal v-for="(elt, index) in nbreRow"
                           class="contents"
                           :categorie="'channel'"
                           :key="index"
                           :data="dataSource.slice(getIndex(index),(index+1)*3)"
                           ref="contents"
            />
        </div>
        <div>
            <ModalButtons ref="buttons"/>
        </div>
    </div>
</template>


<script>

    import ContentsModal from './ContentsModal';
    import {myContentState} from '../../states/myContentState';
    import {navigationState} from "../../states/navigationState";
    import {EventBus} from "../../main";
    import ModalButtons from "./ModalButtons"
    import {mixinEltWithChild} from "../../mixins/mixinEltWithChild";

    export default {
        name: "Modal",
        components: {
            ContentsModal,
            ModalButtons
        },
        mixins: [mixinEltWithChild],
        data: function () {
            return {
                myContentState,
                nbreRow: 0,
                navigationState,
                dataSource : myContentState.contents
            }
        },
        methods: {
            getIndex(num) {
                if (num == 0) {
                    return 0;
                }
                return num * 3;
            },
            nbreRowCalculate(){
                // ici on calcule le nbre de row qu'il faudra selon le nombre de films (3 par row)
                let nbreContents = this.dataSource.length;
                let mod = nbreContents % 3;
                this.nbreRow = mod != 0 ? ((nbreContents - mod) / 3) + 1 : ((nbreContents - mod) / 3);
            },
            ///----------Méthodes Navigation-------------///
            isFocus: function () {
                this.focused = true;
                this.getFocus(navigationState.modalX);
            },
            setFocus: function (pos) {
                if (this.focus <= 0 && pos == -1) {
                    this.focus = this.$refs.contents.length - 1;
                    navigationState.modalX = this.$refs.contents.length - 1;
                } else if (this.focus == this.$refs.contents.length - 1 && pos == 1) {
                    this.focus = 0;
                    navigationState.modalX = 0;
                } else if (this.focus >= -1 && this.focus <= this.$refs.contents.length - 1) {
                    this.focus += pos;
                    navigationState.modalX += pos;
                } else {
                    return
                }
                this.giveFocus();
            },
            listener: function ({code}) {
                {
                    switch (code) {
                        case 'ArrowRight' :
                            this.setFocus(1);
                            break;
                        case 'ArrowLeft' :
                            this.setFocus(-1);
                            break;
                        case 'Escape' :
                            this.removeFocus();
                            navigationState.modalOpened = false;
                            navigationState.modalY = 0;
                            break;
                    }
                }
            }
            ///----------Fin Méthodes Navigation-------------///
        },
        mounted() {
            EventBus.$on('ModalOpened', (source) => {
                this.dataSource = source.contents;
                this.nbreRowCalculate();
                this.isFocus();
            })
        },
        created() {
            this.nbreRowCalculate();
        }
    }
</script>

<style scoped lang="less">
    #container {
        height: 90%;
        padding-bottom: 20px;
        display: flex;
    }

    #modal {
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: azure;
        box-sizing: border-box;
    }
</style>