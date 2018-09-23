<template>
    <transition>
        <div class="chan" :class="{focusborder: focused, selected: checked}">
            <div class="view" :style="style">
            </div>
            <div class="sub color-bg-sub">
                {{content.title}}
                <span class="input"> <input type="checkbox"  v-model="checked"></span>
            </div>
        </div>
    </transition>
</template>

<script>
    import {mixinSavePreferences} from "../../../mixins/mixinSavePreferences";

    export default {
        props: ['content'],
        mixins: [mixinSavePreferences],
        data: function () {
            return {
                focused: false,
                checked: false
            }
        },
        methods: {
            isFocus: function () {
                this.focused = true;
                this.initListener();
            },
            removeFocus: function () {
                this.focused = false;
                this.removeListener();
            },
            listener: function ({code}) {
                {
                    if (code === 'Enter') {
                        this.checked = this.checked == true ? false : true;
                        if(this.checked){
                            this.savePref();
                        }else{
                            this.removePref();
                        }
                    }
                }
            },
            initListener: function () {
                window.addEventListener('keydown', this.listener);
            },
            removeListener: function () {
                window.removeEventListener('keydown', this.listener);
            }
        },
        computed: {
            style() {
                return 'background-image: url(/imgs/' + this.content.img + ')';
            }
        },
        mounted() {
        }
    };
</script>

<style lang="less" scoped>
    @import '../../../../node_modules/normalize.css';
    @import '../../../assets/style/style.less';

    .chan {
        //border : solid 5px black;
        height: 29%;
        width: 80%;
        margin: 8% 10% 0% 10%;
        position: relative;
    }

    .sub {
        height: 15%;
    }

    .selected {
        border: 3px solid purple;
    }
    .input{
        position: absolute;
        top: 0px;
        right: 0px;
    }

</style>
