<template>
    <div id="main-menu">
        <transition-group name="slide" tag="ul">
            <li class="menu-page" ref="contents"
                v-for="(page, index) in pages"
                :key="page">{{page}}
            </li>
        </transition-group>
        <div id="focusDiv"></div>
    </div>
</template>

<script>
    import {mixinEltWithChild} from '../../mixins/mixinEltWithChild';
    import {navigationState} from "../../states/navigationState";
    export default {
        components: {},
        data() {
            return {
                pages: ['MEDIA CENTER', 'TV', 'GUIDE', 'HOME', 'VOD', 'SETTINGS', 'SEARCH'],
                focus: 3
            }
        },
        methods: {
            ///----------Méthodes Animation-------------///
            next() {
                const first = this.pages.shift()
                this.pages = this.pages.concat(first)
            },
            previous() {
                const last = this.pages.pop()
                this.pages = [last].concat(this.pages)
            },
            isFocus() {
                this.initListeners();
            },
            removeFocus() {
                window.removeEventListener('keydown', this.listener);
            },
            setFocus: function (pos) {
                if (this.focus <= 0 && pos == -1) {
                    this.focus = this.$refs.contents.length - 1;
                } else if (this.focus == this.$refs.contents.length - 1 && pos == 1) {
                    this.focus = 0;
                } else {
                    this.focus += pos;
                }
                navigationState.menuChanged = this.$refs.contents[this.focus].innerText;
            },
            initListeners: function () {
                window.addEventListener('keydown', this.listener);
            },
            listener: function ({code}) {
                {
                    //comme ce component n'a qu'une ligne on remove les listeners directement au up & down
                    switch (code) {
                        case 'ArrowRight' :
                            this.setFocus(-1)
                            this.previous()
                            break;
                        case 'ArrowLeft' :
                            this.setFocus(1)
                            this.next()
                            break;
                    }
                }
            },
            mounted() {
               
            }
            //     ///----------Fin Méthodes Navigation------///
            // },
        },
    }
</script>

<style scoped>
    #main-menu {
        display: flex;
        align-items: center;
        flex-direction: column;
        height: 10%;
        border: 1px solid grey;
        padding: 0;
    }

    #main-menu ul {
        display: flex;
        flex-grow: 1;
        justify-content: space-around;
        padding: inherit;
        width: 100%;
    }

    li.menu-page {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 10em;
        list-style: none;
        text-decoration: none;
        font-weight: bold;
        font-size: 20px;
        color: salmon;
        cursor: pointer;
        left: 50%;
        right: 20%;
        transition: transform 1s;
    }

    li.menu-page[data-v-664b5cca] {
        opacity: 0.5;
    }

    .visible {
        opacity: 0;
    }

    #focusDiv {
        -webkit-box-shadow: inset -1px -1px 5px 12px rgba(255, 255, 255, 1);
        -moz-box-shadow: inset -1px -1px 5px 12px rgba(255, 255, 255, 1);
        box-shadow: inset -1px -1px 5px 5px rgba(255, 255, 255, 1);
        opacity: 1;
        border-radius: 5px;
        padding: 10px;
        width: 10%;
        height: 7%;
        position: absolute;
    }

    li.menu-page:nth-child(4) {
        opacity: 1;
    }


</style>