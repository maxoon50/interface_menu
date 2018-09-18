<template>
    <transition>
        <div class="globalChan" :class="{focusborder: focused}">
            <div class="view" :style="style">
            </div>
            <div class="sub color-bg-sub">
                {{content.title}}
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
            myExtraState,
            filmsExtra: [],
            prefUser: ['sailing', 'hockey','horse']
          }
        },
        mixins: [ mixinEltWithoutChild ],
        created() {
          //console.log('ok')
          this.videoYt();
        },
        methods:{
            animate(){
                this.$emit('focusChange');
            },
            async videoYt() {
              try {
                  let film = await fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&q=sailing&maxResults=5&key=AIzaSyBGnQO5k02QBDTuMX-gmuVEiKA7_kfosOk');
                  let filmJson = await film.json();
                  let filmJsonItem = filmJson.items;
                  //console.log(filmJsonItem)
                  filmJsonItem.forEach(item => {
                    this.filmsExtra.push({
                        img:item.snippet.thumbnails.default.url,
                        id:item.id.videoId,
                        title: item.snippet.title,
                        desc:item.snippet.description
                        })
                  })
                  //console.log(this.filmsExtra[0].img)
                //   for (var {id:{videoId: id}, snippet:{title:title}, snippet:{description:desc}} of filmJsonItem) {
                //     Object.assign({id: id, title: title, desc:desc}, this.filmsExtra);
                //   }
                  console.log(this.filmsExtra)
              }
              catch(e) {
                  console.error("doh! network error")
              }

            }
        },
        computed: {
            style() {
                return 'background-image: url(/imgs/' + this.content.img + ')';
            }
        },
        mounted(){

        }
    };
</script>

<style lang="less">
    @import '~normalize.css';
    @import '../../assets/style/style.less';

    .globalChan {
        //border : solid 5px black;
        height: 29%;
        width: 80%;
        margin: 8% 10% 0% 10%;
    }

    .sub {
        height: 15%;
    }

</style>
