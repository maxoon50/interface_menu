<template>
    <header>
        <div id="logo">
            <img src="/imgs/wiztivi.png" alt="wiztivi logo">
        </div>

        <User v-for="elt in 1" ref="contents"/>
        <Time/>
    </header>
</template>

<script>
    import Time from './Time';
    import User from './User';
    import { mixinEltWithChild } from '../../mixins/mixinEltWithChild';
    
    export default {
        components: {
            Time,
            User
        },
        mixins: [ mixinEltWithChild ],
        data: function() {
            return {
    
            }
        },
        methods: {
    
        }
    }
</script>

<style lang='less'>
    @import '~normalize.css';
    @import '../../assets/style/variables.less';
    header {
        .flex-row;
        height: 10%;
    }
    #user{
        flex-grow: 1;
    }
    #logo{
        .flex-row;
        .align-center;
        z-index: 10;
        img{
            height: 100%;
        }
    }
</style>