import Vue from 'vue'
import {EventBus} from "../main";
import {GLOBALS} from "../const/globals";

export const STORE =new Vue({
    data: {
        channelContents:[],
        myContentContents:[],
        appliContents:[],
        movieContents:[],
        extraContents:[],
    },
    watch:{
        channelContents: function(){
            EventBus.$emit('updateData', {categorie : GLOBALS.CHANNELS  ,datas : this.channelContents, });
        },
        myContentContents: function(){
            EventBus.$emit('updateData', {categorie : GLOBALS.CONTENTS  ,datas : this.myContentContents, });
        },
        appliContents: function(){
            EventBus.$emit('updateData', {categorie : GLOBALS.APPS  ,datas : this.appliContents, });
        },
        movieContents: function(){
            EventBus.$emit('updateData', {categorie : GLOBALS.MOVIES ,datas : this.movieContents, });
        },
        extraContents: function(){
            EventBus.$emit('updateData', {categorie : GLOBALS.EXTRAS  ,datas : this.extraContents, });
        }
    }
});