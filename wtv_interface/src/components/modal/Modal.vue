<template>
    <div id="modal" class="p-sm flex-column" :class="{hide: !navigationState.modalOpened}">
        <div id="container">
            <ContentsModal v-for="(elt, index) in contentRows"
                           :categorie="categorie"
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
    import {STORE} from "../../states/store";
    import {GLOBALS} from "../../const/globals";
    import ModalService from "../../services/modalService"

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
                dataSource : STORE.modalChannelContents,
                categorie : 'ChannelModal',
                modalService : null
            }
        },
        computed: {
            contentRows() {
                return this.nbreRow;
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
                            this.resetModal();
                            break;
                    }
                }
            },
            ///----------Fin Méthodes Navigation-------------///
            resetModal: function(){
                this.removeFocus();
                navigationState.modalOpened = false;
                navigationState.modalY = 0;
            },
            storeNewPref: function(elt) {
                this.modalService.addEltToSave(elt);
            },
            removePref: function(elt) {
                this.modalService.removeEltToSave(elt);
            },
            buttonEvent: function(btn) {
                switch(btn.innerText){
                    case GLOBALS.BTN_CANCEL:
                        this.cancelModification();
                        break;
                    case GLOBALS.BTN_SAVE:
                        this.saveModifications();
                        break;
                    case GLOBALS.BTN_REMOVE:
                        this.saveModifications();
                        break;
                }
            },
            saveModifications: function() {
                this.modalService.savePreferences(this.categorie);
                navigationState.modalOpened = false;
                navigationState.modalY = 0;
            },
            cancelModification: function(){
                navigationState.modalOpened = false;
                navigationState.modalY = 0;
            },

        },
        mounted() {
            this.modalService = new ModalService(this.categorie);
            /**
             * Event received from "navigation state"
             */
            EventBus.$on('ModalOpened', (source) => {
                this.categorie = source.type;
                this.modalService = new ModalService(this.categorie);
                if(source.data.contents){
                    this.dataSource = source.data.contents;
                }else{
                    this.dataSource = source.data;
                }
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