<template>
    <div><img :class="{focusborder: focused}" src="imgs/poppe2.jpg" alt=""></div>
</template>

<script>
    import RestResource from "../../services/dataService";
    import {STORE} from "../../states/store";

    export default {
        props: ['name'],
        data: function () {
            return {
                focused: false
            }
        },
        methods: {
            isFocus() {
                this.focused = true;
                this.initListeners();
            },
            removeFocus() {
                this.focused = false;
                window.removeEventListener('keyup', this.listener);
            },
            initListeners: function () {
                window.addEventListener('keyup', this.listener);
            },
            listener: function ({code}) {
                if (code === 'Enter') {
                    let user = STORE.currentUser === "Antoine la guez" ? 'Marlene la zouz' : "Antoine la guez";
                    STORE.currentUser = user;
                    RestResource.storeUsers(user)
                        .then(res => {
                            console.log('ok change')
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>