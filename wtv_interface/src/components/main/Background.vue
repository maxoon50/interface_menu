<template>
        <div>
                <img v-bind:src="imgSrc1" id="bg" class="bg"/>
                <img v-bind:src="imgSrc2" id="bg2" class="bg"/>
            <div class="bg-filter"></div>
        </div>

</template>

<script>
    import {EventBus} from "../../main";

    export default {
        name: "Background",
        data: function(){
          return {
              imgSrc1 : "/imgs/stanislas.jpg",
              imgSrc2 : "/imgs/galet_backg.jpg"
          }
        },
        mounted(){
            EventBus.$on('changeBackground', (img)=>{
                this.imgSrc1 = `/imgs/${img}`;
            })
        }
    }
</script>

<style scoped>
    .bg {
        position: absolute;
        height: 1035%;
        width: 1000%;
        top: -500%;
        left: -500%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-filter: blur(5px);
        filter: blur(5px);
        z-index: 0;
    }
    .bg-filter{
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,0.5);
    }
</style>