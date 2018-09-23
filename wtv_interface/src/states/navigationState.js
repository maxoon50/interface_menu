import Vue from 'vue'
import {EventBus} from "../main";
import { myChannelState } from "./myChannelState";
import { myContentState } from "./myContentState";
import { myFilmState } from "./myFilmState";
import { myExtraState } from "./myExtraState";
import { myAppState } from "./myAppState";
import {STORE} from "./store";

export let navigationState = new Vue({

    /* indexSubMenu => index de l'élément sélectionné dans le subMenu
    *  modalOpened  => la modal est opened ou non
    *  modalY => position Y dans la modal
    *  modalX => position X dans la modal
    *  contentModal => renvoie la bonne dataSource selon le type de contenu pour la modal
    *  dataSource => permet de stocker les datas et de les renvoyer vers la modal
   */
    data: {
        indexSubMenu: 0,
        modalOpened: false,
        modalY: 0,
        modalX : 0,
        contentModal: null,
        dataSource : null,
        channelIndex : 0,
        myContentIndex : 0,
        appliIndex : 0,
        movieIndex : 0,
        extraIndex : 0,
        menuChanged: null,
        menuHome: ['channels', 'contents', 'apps', 'films', 'extras'],
        menuPage: ['change1', 'change2', 'change3', 'change4', 'change5']
    },methods:{

    },
    watch: {
        indexSubMenu: function () {
            EventBus.$emit('subMenuSelected', this.indexSubMenu);
        },
        contentModal(){
            switch (this.contentModal){
                case 'channels':
                    this.dataSource = {data:STORE.modalChannelContents, type: 'ChannelModal'};
                    break;
                case 'contents':
                    this.dataSource =  {data:STORE.myContentContents, type: 'MyContentModal'};
                    break;
                case 'apps':
                    this.dataSource =  {data:myAppState, type: 'MyContentModal'};
                    break;
                case 'films':
                    this.dataSource =  {data:myFilmState, type: 'MyContentModal'};
                    break;
                case 'extras':
                    this.dataSource =  {data:myExtraState, type: 'MyContentModal'};
                    break;
            }
        },
        modalOpened: function(){
            if(this.modalOpened){
                EventBus.$emit('ModalOpened', this.dataSource );
            }else{
                EventBus.$emit('ModalClosed', this.indexSubMenu);
            }
        },
        channelsIndex: function(){
            console.log(this.channelsIndex)
        },
        menuChanged: function() {
           // selon this.menuChanged reçu envoie de tableau de items pour sous-menu
            //comme ce component n'a qu'une ligne on remove les listeners directement au up & down
            switch (this.menuChanged) {
                case 'HOME' :
                    EventBus.$emit('MenuChanged', [this.menuHome, this.menuChanged])
                    break;
                default :
                    EventBus.$emit('MenuChanged', [this.menuPage, this.menuChanged])
                    break;
            }
        }
    }
})


