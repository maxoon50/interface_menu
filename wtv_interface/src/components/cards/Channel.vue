<template>
    <transition>
        <div class="globalChan trans" :class="{focusborder: focused}">
            <div class="view" :style="style">
                <video v-if="havePlayer" class="vid" :class="{hide: !playVideo}" ref="video" loop>
                    <source v-bind:src='getVideo()' type="video/mp4">
                </video>
            </div>
            <div class="sub color-bg-sub" :class="{defile: playVideo}" ref="resume">
                {{subtitle}}
            </div>
        </div>
    </transition>
</template>

<script>
    import {mixinEltWithoutChild} from "../../mixins/mixinEltWithoutChild";
    import {EventBus} from "../../main";

    export default {
        props: ["content", "havePlayer"],
        data() {
            return {
                timeOut: null,
                playVideo: false,
                subtitle: this.content.title
            };
        },
        mixins: [mixinEltWithoutChild],
        methods: {
            isFocus: function () {
                EventBus.$emit("changeBackground", this.content.img);
                this.focused = true;
                if (this.havePlayer) this.timeOut = setTimeout(this.playVid, 1500);
            },
            removeFocus: function () {
                this.focused = false;
                if (this.havePlayer) {
                    clearTimeout(this.timeOut);
                    this.stopVid();
                }
            },
            getImg() {
                return "/imgs/" + this.content.img;
            },
            getVideo() {
                return "/videos/" + this.content.video;
            },
            playVid() {
                this.playVideo = true;
                this.$refs.video.play();
                this.subtitle = this.content.sub;
            },
            stopVid() {
                this.playVideo = false;
                this.$refs.video.pause();
                this.subtitle = this.content.title;
            }
        },
        computed: {
            style() {
                return "background-image: url(/imgs/" + this.content.img + ")";
            }
        },
        created() {

        },
        mounted() {
        }
    };
  

</script>

<style lang="less">
    @import "~normalize.css";
    @import "../../assets/style/style.less";


    .vid {
        height: 100%;
        width: auto;
    }

    .sub {
        height: 15%;
    }

    .defile {
        //background: #ff002b;
        white-space: nowrap;
        overflow: hidden;
        animation: marquee 6s linear infinite;
    }

    @keyframes marquee {
        0% {
            text-indent: 100%;
        }
        100% {
            text-indent: -150%;
        }
    }
    .globalChan:last-of-type {
        opacity: 0;
    }


</style>
