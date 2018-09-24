<template>
    <transition>
        <div class="extra" :class="{focusborder: focused}">
            <div class="view" :style="style" :class="{playBo: havePlayerYt}">
                <div :id="playerVideo"></div>
            </div>
            <div class="sub color-bg-sub sub-extras" :class="{invisibleSub: havePlayerYt}">
                {{ content.title }}
            </div>
        </div>
    </transition>
</template>

<script>
    import {mixinEltWithoutChild} from "../../mixins/mixinEltWithoutChild";
    import {mixinCreayeYoutubeIframe} from "../../mixins/mixinCreayeYoutubeIframe";

    export default {
        props: ['content'],
        data() {
            return {
                timeOut: null,
                havePlayerYt: false,
                subtitle: this.content.title,
                videoId: null,
                state: null,
                playerVideo: null
            }
        },
        mixins: [mixinEltWithoutChild, mixinCreayeYoutubeIframe],
        created() {
            this.playerVideo = "player" + this.content._id
        },
        methods: {},
        computed: {
            style() {
                return 'background-image: url(' + this.content.img + ')';
            }
        },
        mounted() {

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
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
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

    .sub-extras {
        position: relative;
        top: -7px;
        height: 20px !important;
    }
</style>
