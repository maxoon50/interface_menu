<template>
    <div class="backAppli" :class="{focusborder: focused}">
        <div class="viewApp" :style="style">
        </div>
    </div>
</template>

<script>
import { mixinEltWithoutChild } from "../../mixins/mixinEltWithoutChild";

export default {
  props: ["content"],
  mixins: [mixinEltWithoutChild],
  created() {},
  computed: {
    style() {
      return "background-image: url(/imgs/" + this.content.img + ")";
    }
  },
  mounted() {}
};
</script>

<style lang="less">
.backAppli {
  height: 130.5px;
  width: 130.5px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10%;
}

.viewApp {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat center fixed;
  background-size: cover;
  background-clip: padding-box;
}

.backAppli:last-of-type {
  opacity: 0;
}
</style>
