<template>
    <div class="movie" :class="{focusborder: focused}">
        <div class="view" :style="style" :class="{playBo: havePlayerYt}">
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
            this.playerVideo = "player"+this.content._id
        },
        computed: {
            style() {
                return 'background-image: url(/imgs/' + this.content.img + ')';
            }
        },
        methods: {
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
          position:absolute;
          width:100%;
          height:100%;
          left:0;
          top:0;
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
