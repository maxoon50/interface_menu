<template>
    <div class="movie" :class="{focusborder: focused}">
        <div class="view" :style="style" :class="{playBo: havePlayerYt}">
            <div :id="playerVideo"></div>
    <div class="movie trans" :class="{focusborder: focused}">
        <div class="view" :style="style" :class="{playBo: havePlayer}">
              <div :id="playerVideo"></div>
        </div>
        <div class="sub color-bg-sub" :class="{invisibleSub: havePlayerYt}">
            {{ content.title }}
        </div>
    </div>
</template>

<script>
    import {mixinEltWithoutChild} from "../../mixins/mixinEltWithoutChild";
    import {mixinCreayeYoutubeIframe} from "../../mixins/mixinCreayeYoutubeIframe";
    import {EventBus} from "../../main";

    export default {
        props: ['content'],
        data() {
            return {
                subtitle: this.content.title,
                timeOut: null,
                havePlayerYt: false,
                videoId: null,
                state: null,
                playerVideo: null
            };
        },
        mixins: [mixinEltWithoutChild, mixinCreayeYoutubeIframe],
        created() {
            this.playerVideo = "player" + this.content._id
        },
        computed: {
            style() {
                return 'background-image: url(/imgs/' + this.content.img + ')';
            }
        },
        methods: {
            onYouTubeIframeAPIReady(videoId) {
              this.player = new YT.Player(this.playerVideo, {height: '480',width: '854',videoId: videoId, playerVars: {
                  'color': 'white',
                  'controls': 2,
                  'fs': 0,
                  'loop': 1,
                  'modestbranding': 1,
                  'branding': 0,
                  'enablejsapi': 1,
                  'origin': 'http://localhost:8080/',
                  'rel': 0,
                  'showinfo': 0
                },
                events: {
                  'onReady': this.playVideoOnDelay,
                  'onStateChange': this.videoPlayPause
                }
              });
            },
            playVideoOnDelay(event) {
              this.havePlayer = true;
              this.focused = false;
              document.getElementsByTagName('iframe')[0].setAttribute("style", "position:absolute;top:20px;left: 60px;");
              event.target.playVideo();
            },
            videoPlayPause(eventPlayer){
              this.state = eventPlayer.target.getPlayerState();
              document.addEventListener('keypress',event => {
                // pause
                switch(event.keyCode) {
                  case 32:
                    if (this.state == 1){
                      eventPlayer.target.pauseVideo();
                    } else if (this.state == 2){
                      eventPlayer.target.playVideo();
                    }
                    break;
                  // sortie video BO
                  case 13:
                    this.havePlayer = false;
                    this.player.destroy();
                    this.isFocus();
                    break;
                }
              });
              // loop video
              if (this.state == 0) {eventPlayer.target.playVideo();};
            },
            stopVideo() {
              this.player.stopVideo();
            },
            destroyVideo() {
              this.player.destroy();
            },
            getVideo() {
                return this.content.url;
            },
            isFocus: function () {
                EventBus.$emit("changeBackground", this.content.img);
                this.focused = true;
                this.videoId = this.content.videoId;
                this.timeOut = setTimeout(()=>{
                    this.onYouTubeIframeAPIReady(this.videoId);
                }, 2000);
                this.subtitle = this.content.sub;
            },
            removeFocus: function () {
              if(this.havePlayer){
                this.stopVideo();
                this.destroyVideo();
              }
                this.havePlayer = false;
                this.focused = false;
                clearTimeout(this.timeOut);
            }
        }
    }
</script>

<style scoped lang="less">
    @import '~normalize.css';
    @import '../../assets/style/style.less';

    .movie {
        height: 95%;
        width: 80%;
        margin: 8% 10% 0% 10%;
        .view {
            background-repeat: no-repeat;
            background-size: cover;
            background-clip: padding-box;
            height: 90%;
            background-position: center;
        }
        .playBo {
            z-index: 200;
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background-size: 100%;
            background-color: black;
            background-position-x: 85%;
            animation: fadeplayer 1s ease-in;
        }
        .sub {
            height: 7%;
            text-overflow: ellipsis;
        }
        .invisibleSub {
            display: none;
        }

    }

    @keyframes fadeplayer {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .defile {
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
</style>
