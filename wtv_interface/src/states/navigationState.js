import Vue from 'vue'
import {EventBus} from "../main";

let source = new Vue({
    data: {
        indexSubMenu: 0,
        modalOpened: false,
        modalY: 0,
        modalX : 0
    },
    watch: {
        indexSubMenu: function () {
            EventBus.$emit('subMenuSelected', this.indexSubMenu);
        },
        modalOpened: function(){
            if(this.modalOpened){
                EventBus.$emit('ModalOpened', this.indexSubMenu);
            }else{
                EventBus.$emit('ModalClosed', this.indexSubMenu);
            }
        }


    }
})

export default source;
