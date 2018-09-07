<template>
    <div class="movie" :class="{focusborder: focused}">
        <div class="view" :style="style">

            <iframe :class="{hide: !playVideo}" class="iframeVid"  ref="iframe" width="560" height="315" v-bind:src="urlVid" 
            frameborder="0" allow="autoplay;encrypted-media" allowfullscreen></iframe>

        </div>
        <div class="sub color-bg-sub">
            {{ content.title }}
        </div>
    </div>
</template>

<script>
    import {mixinEltWithoutChild} from "../../mixins/mixinEltWithoutChild";

    export default {
        props: ['content'],
        data() {
            return {
                timeOut: null,
                playVideo: false,
                subtitle: this.content.title,
                urlVid: this.content.url
            };
        },
        mixins: [mixinEltWithoutChild],
        created() {
            
        },
        computed: {
            style() {
                return 'background-image: url(/imgs/' + this.content.img + ')';
            }
        },
        methods: {
            isFocus: function () {
                this.focused = true;
                this.timeOut = setTimeout(()=>{
                    this.playVideo = true;
                    this.urlVid =  this.urlVid+'?autoplay=1';
                }, 2000);
                this.subtitle = this.content.sub;
            },
            removeFocus: function () {
                this.focused = false;
                clearTimeout(this.timeOut);
                this.stopVid();
            },
            stopVid() {
                this.playVideo = false;
                this.urlVid = this.urlVid.replace('?autoplay=1','')
                this.subtitle = this.content.title;
            },
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
        .sub {
            height: 7%;
        }

    }

    .iframeVid {
        height: 100%;
        width: auto;
    }

    .defile {
        white-space: nowrap;
        overflow: hidden;
        animation: marquee 6s linear infinite;
    }

    @-webkit-keyframes marquee {
        0% {
            text-indent: 100%;
        }
        100% {
            text-indent: -150%;
        }
    }
</style>
