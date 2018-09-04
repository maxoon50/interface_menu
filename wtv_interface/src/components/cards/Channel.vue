<template>
    <transition>
    <div class="globalChan" :class="{focusborder: focused}">
        <div class="view" :style="style">
        <video class="vid"  :class="{hide: !playVideo}" ref="video">
        <source v-bind:src='getVideo()'  >
        </video>
        </div>
        <div class="sub color-bg-sub">
            {{content.title}}
        </div>
    </div>
    </transition>
</template>

<script>
import { mixinEltWithoutChild } from "../../mixins/mixinEltWithoutChild";

export default {
  props: ["content"],
  data() {
    return {
      timeOut: null,
      playVideo: false
    };
  },
  mixins: [mixinEltWithoutChild],
  methods: {
    isFocus: function() {
      this.focused = true;
      this.timeOut = setTimeout(this.playVid, 1500);
    },
    removeFocus: function() {
      clearTimeout(this.timeOut);
      this.focused = false;
      this.stopVid();
    },
    getImg() {
      return "http://localhost:8081/imgs/" + this.content.img;
    },
    getVideo() {
      return "http://localhost:8081/videos/" + this.content.video;
    },
    playVid() {
      this.playVideo = true;
      this.$refs.video.play();
    },
    stopVid() {
      this.playVideo = false;
      this.$refs.video.pause();
    }
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
@import "~normalize.css";
@import "../../assets/style/style.less";

.globalChan {
  height: 29%;
  width: 80%;
  margin: 8% 10% 0% 10%;
}

.vid {
  height: 100%;
  width: auto;
}

.sub {
  height: 15%;
}
</style>
