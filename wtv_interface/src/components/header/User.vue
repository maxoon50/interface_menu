<template>
    <div id="user">
        <div class="user-cont">
            <div class="flex-row animate" :class="{noanimate: !focused}" >
                <UserItem class="m-sm"
                          v-for="(elt, index) in users"
                          :key="index"
                          :name="elt"
                          ref="contents"
                />
            </div>

            <img src="/imgs/logo-user.png" alt="logo user">


        </div>
    </div>
</template>

<script>
    import {mixinEltWithChild} from "../../mixins/mixinEltWithChild";
    import UserItem from './UserItem';
    import {STORE} from "../../states/store";
    import {GLOBALS} from "../../const/globals";

    export default {
        components: {UserItem},
        data: function () {
            return {
                users: ['jojo', 'lulu']
            }
        },
        mixins: [mixinEltWithChild],
        methods: {
            isFocus(){
                this.focused = true;
                if(STORE.currentUser === GLOBALS.USER_ONE){
                    this.getFocus(0);
                }else{
                    this.getFocus(1);
                }
            },
            listener: function ({code}) {
                {
                    switch (code) {
                        case 'ArrowRight':
                            this.setFocus(1);
                            break;
                        case 'ArrowLeft':
                            this.setFocus(-1);
                    }
                }
            },
        }
    }
</script>

<style lang='less'>
    @import '~normalize.css';
    @import '../../assets/style/variables.less';

    #user {
        flex-grow: 1;
        .flex-row;
        .align-center;
    }
    .animate{
        transition: all 0.7s ease-in-out, opacity 0.5s ease-in-out;
        opacity: 1;
    }
    .noanimate{
        transform: translateX(105px);
        opacity: 0;
    }

    .user-cont {
        margin-left: auto;
        position: relative;
        .flex-row;
        .align-center;
        img {
            height: 60px;
            margin-left: 25px;
        }
    }
</style>