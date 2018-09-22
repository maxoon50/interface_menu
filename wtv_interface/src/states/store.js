import Vue from 'vue'
import {EventBus} from "../main";
import {GLOBALS} from "../const/globals";

export const STORE =new Vue({
    data: {
        currentUser: GLOBALS.USER_ONE,
        userPreferences: [],
        channelContents:[],
        myContentContents:[],
        appliContents:[],
        movieContents:[],
        extraContents:[],
        modalChannelContents:[],
        modalAppsContents:[],
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
        },
        userPreferences: function(){
            EventBus.$emit('updateData', {categorie : GLOBALS.PREFERENCES  ,datas : this.userPreferences, });
        }
    }
});