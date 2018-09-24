<template>
    <div id="main-menu">
        <!-- name="slide"  -->
        <transition-group
                name="menu-page"
                tag="ul"
                appear>
            <li :class="{focusMenu: focused}"
                class="menu-page" ref="contents"
                v-for="(page, index) in pages"
                :key="page"
                :data-index="index">{{page}}
            </li>
        </transition-group>
        <div id="focusDiv"></div>
    </div>
</template>

<script>
    import {navigationState} from "../../states/navigationState";

    export default {
        components: {},
        data() {
            return {
                pages: ['MEDIA', 'TV', 'GUIDE', 'HOME', 'VOD', 'SETTINGS', 'SEARCH'],
                focus: 3,
                focused: false
            }
        },
        methods: {
            ///----------Méthodes Animation-------------///
            next() {
                const first = this.pages.shift();
                this.pages = this.pages.concat(first)
            },
            previous() {
                const last = this.pages.pop();
                this.pages = [last].concat(this.pages)
            },
            isFocus() {
                this.focused = true;
                this.initListeners();
            },
            removeFocus() {
                this.focused = false;
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
                            this.setFocus(-1);
                            this.previous();
                            break;
                        case 'ArrowLeft' :
                            this.setFocus(1);
                            this.next();
                            break;
                    }
                }
            },
        },
    }
</script>

<style scoped>
    #main-menu {
        display: flex;
        align-items: center;
        flex-direction: column;
        height: 10%;
        padding: 0;
    }

    #main-menu ul {
        display: flex;
        flex-grow: 1;
        justify-content: space-around;
        padding: inherit;
        width: 100%;
    }

    .menu-page {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 1 10em;
        list-style: none;
        text-decoration: none;
        font-weight: bold;
        font-size: 20px;
        color: white;
        cursor: pointer;
        left: 50%;
        right: 20%;
        opacity: 0;
        backface-visibility: hidden;
        z-index: 1;
        transition: opacity 0.3s ease-in-out;
    }

    /* backface-visibility: hidden => will ensure silky 60fps transitions and avoid fuzzy text rendering
    during transformations by tricking the browser into leveraging hardware acceleration.*/
    .menu-page-move {
        transition: all 1s;
    }

    .menu-page-move:first-of-type {
        opacity: 0 !important;
        /* position:absolute; */
        z-index: -5;
    }

    .menu-page-move:last-of-type {
        opacity: 0 !important;
        /* position:absolute; */
        z-index: -5;
    }

    .menu-page[data-index="0"] {
        opacity: 0;
    }

    .menu-page[data-index="1"] {
        opacity: 0.1;
    }

    .menu-page[data-index="2"] {
        opacity: 0.5;
    }

    .menu-page[data-index="3"] {
        opacity: 1;
    }


    .menu-page[data-index="4"] {
        opacity: 0.5;
    }

    .menu-page[data-index="5"] {
        opacity: 0.1;
    }

    .menu-page[data-index="6"] {
        opacity: 0;
    }

    .menu-page[data-index="3"].focusMenu {
        color: rgb(26, 159, 220);
        opacity: 1;
    }

    #focusDiv {
        opacity: 0.8;
        border-radius: 5px;
        padding: 10px;
        width: 10%;
        height: 7%;
        position: absolute;
    }


</style>