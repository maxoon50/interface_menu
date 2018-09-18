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
  methods: {
    initListeners: function() {
      window.addEventListener("keydown", this.listener);
    },
    removeListeners: function() {
      window.removeEventListener("keydown", this.listener);
    },
    isFocus: function() {
      this.focused = true;
      this.initListeners()
    },
    removeFocus: function() {
      this.focused = false;
     this.removeListeners()
    },
    listener: function(event) {
        if (event.key === 'Enter') {
          //window.open(this.content.url,'_blank');
          window.location = this.content.url;
        }
    }
  },
  created() {
  },
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
