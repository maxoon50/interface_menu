import Vue from 'vue'
import {EventBus} from "../main";
import { myChannelState } from "./myChannelState";
import { myContentState } from "./myContentState";
import { myFilmState } from "./myFilmState";

export let navigationState = new Vue({
    data: {
        indexSubMenu: 0,
        modalOpened: false,
        modalY: 0,
        modalX : 0,
        contentModal: null,
        dataSource : null
    },methods:{
        getDataSource(){

        }
    },
    watch: {
        indexSubMenu: function () {
            EventBus.$emit('subMenuSelected', this.indexSubMenu);
        },
        contentModal(){
            switch (this.contentModal){
                case 'channels':
                    this.dataSource = myChannelState;
                    break;
                case 'contents':
                    this.dataSource = myContentState;
                    break;
                case 'apps':
                    this.dataSource = myChannelState;
                    break;
                case 'films':
                    this.dataSource = myFilmState;
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
    }
})


