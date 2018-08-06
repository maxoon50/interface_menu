<template>
    <div class="global">
        <div class="view">
        </div>
        <div class="sub">
            subsubsubsubsub
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.global {
  //border : solid 5px black;
  height: 25%;
  width: 80%;
  margin: 10% 10% 0% 10%;
}
.view {
  background: url("/imgs/stanislas.jpg");
  background-repeat: no-repeat center fixed;
  background-size: cover;
  background-clip: padding-box;
  height: 85%;
}
.sub {
  height: 15%;
  background-color: white;
}
</style>
