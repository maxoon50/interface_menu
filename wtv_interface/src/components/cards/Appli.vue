<template>
    <div class="backAppli">
            <div class="view" :style="style">
            </div>
            <div class="sub color-bg-sub">
                {{content.title}}
            </div>
    </div>
</template>

<script>
export default {
    props: ['content'],
    created() {

    },
    computed: {
        style() {
            return 'background-image: url(/imgs/' + this.content.img + ')';
        }
    },
    mounted(){

    }
};
</script>

<style lang="less" >
.backAppli {
  //border : solid 5px black;
  height: 25%;
  width: 70%;
  margin: 10% 10% 0% 10%;
  background: url("/imgs/reca.jpg");
  background-repeat: no-repeat center fixed;
  background-size: cover;
  background-clip: padding-box;
}
</style>
