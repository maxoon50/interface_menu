export const mixinCreayeYoutubeIframe = {
    data: function () {
        return {
            havePlayerYt: false,
            videoId: null,
            state: null,
            playerVideo: null
        }
    },
    methods: {
        onYouTubeIframeAPIReady(videoId) {
            this.player = new YT.Player(this.playerVideo, {height: '463',width: '700',videoId: videoId, playerVars: {
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
            this.havePlayerYt = true;
            this.focused = false;
            document.getElementsByTagName('iframe')[0].setAttribute("style", "position:absolute;top:0;left:20%;");
            event.target.playVideo();
          },
          videoPlayPause(eventPlayer){
            this.state = eventPlayer.target.getPlayerState();
            // loop video
            if (this.state == 0) {this.player.playVideo();};
          },
          stopVideo() {
            this.player.stopVideo();
          },
          destroyVideo() {
            this.player.destroy();
          },
          listener(eventPlayer) {

            switch(eventPlayer.keyCode) {
              case 32:
                if (this.state == 1){
                  this.player.pauseVideo();
                } else if (this.state == 2){
                  this.player.playVideo();
                }
                break;
              // sortie video BO
              case 13:
                this.player.destroy();
                this.havePlayerYt = false;
                this.isFocus();
                break;
              default:
                console.log('Sorry, we are out of ' + eventPlayer + '.');
            }
          },
          initListenersYt: function () {
            window.addEventListener('keypress', this.listener );
          },
          removeListenersYt: function() {
            window.removeEventListener('keypress', this.listener);
          },
          isFocus: function () {
            this.focused = true;
            this.videoId = this.content.videoId;
            console.log(this.videoId)
            this.initListenersYt();
            this.timeOut = setTimeout(()=>{
                this.onYouTubeIframeAPIReady(this.videoId);
            }, 2000);
            this.subtitle = this.content.sub;
          },
          removeFocus: function () {
              if(this.havePlayerYt){
                this.stopVideo();
                this.destroyVideo();
              }
              this.removeListenersYt();
              this.havePlayerYt = false;
              this.focused = false;
              clearTimeout(this.timeOut);
          }
    }
}



