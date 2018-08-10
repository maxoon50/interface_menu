<template>
    <div id="modal" class="p-sm flex-column">
        <div id="container">
           <Contents v-for="elt, index in nbreRow" 
                      class="contents"
                      :categorie="'channel'"
                      :data="myContentState.contents.slice(getIndex(0),3)"/>
        </div>
        <div>
            <button>annuler</button>
            <button>valider</button>
        </div>
    </div>
</template>

<script>

import Contents from '../main/Contents';
import { myContentState } from '../../states/myContentState';

    export default {
        name: "Modal",
        components:{
            Contents,
        },
        data: function(){
            return {
                myContentState,
                nbreRow: 0
            }
        },
        methods:{
            getIndex(num){
                if(num == 0){
                    return 0;
                }
                return num * 3 ;
            }
        },
        created(){
            // ici on calcule le nbre de row qu'il faudra selon le nombre de films (3 par row)
            let nbreContents = myContentState.contents.length;
            let mod = nbreContents % 3;
            this.nbreRow = mod != 0 ? ((nbreContents-mod) / 3) + 1 : ((nbreContents-mod) / 3);
        }
    }
</script>

<style scoped lang="less">
#container{
    height: 90%;
    padding-bottom: 20px;
    display: flex;
}
#modal{
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: azure;
    box-sizing: border-box;
    display: none;
}
</style>