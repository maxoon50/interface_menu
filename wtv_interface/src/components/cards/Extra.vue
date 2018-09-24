<template>
    <transition>
        <div class="extra" :class="{focusborder: focused}">
            <div class="view" :style="style" :class="{playBo: havePlayer}">
              <div :id="playerVideo"></div>
        </div>
        <div class="sub color-bg-sub" :class="{invisibleSub: havePlayer}">
            {{ content.title }}
        </div>
        </div>
    </transition>
</template>

<script>
    import { mixinEltWithoutChild } from "../../mixins/mixinEltWithoutChild";
    import { myExtraState } from "../../states/myExtraState";

    export default {
        props: ['content'],
        data() {
          return {
            timeOut: null,
            havePlayer: false,
            subtitle: this.content.title,
            videoId: null,
            state: null,
            playerVideo: null
          }
        },
        mixins: [ mixinEltWithoutChild ],
        created() {
            this.playerVideo = "player"+this.content._id
        },
        methods:{
            onYouTubeIframeAPIReadyExtra(videoId) {
              this.player = new YT.Player(this.playerVideo, {height: '360',width: '480',videoId: videoId, playerVars: {
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
              document.getElementsByTagName('iframe')[0].setAttribute("style", "position:absolute;top:20px;left: 30%;");
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
                this.focused = true;
                this.videoId = this.content.videoId;
                if(this.focused) {
                    this.timeOut = setTimeout(()=>{
                        this.onYouTubeIframeAPIReadyExtra(this.videoId);
                    }, 2000);
                }
                
                this.subtitle = this.content.title;
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
        },
        computed: {
            style() {
                return 'background-image: url('+ this.content.img + ')';
            }
        },
        mounted(){

        }
    };
</script>

<style lang="less">
    @import '~normalize.css';
    @import '../../assets/style/style.less';

    .extra {
        height: 29%;
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
          position:absolute;
          width:100%;
          height:100%;
          left:0;
          top:0;
        //   background-size: 270px 446px;
          background-color: black;
          background-position-x: 85%;
          animation: fadeplayer 1s ease-in;
        }
        .sub {
            height: 7%;
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
        opacity:1;
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
