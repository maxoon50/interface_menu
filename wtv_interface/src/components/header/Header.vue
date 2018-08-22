<template>
    <header :class="{focus: focused}">
        <div id="logo">
            <img src="/imgs/wiztivi.png" alt="wiztivi logo">
        </div>
        <User/>
        <Time/>
    </header>
</template>

<script>
    import Time from './Time';
    import User from './User';
    import { mixinEltWithoutChild } from '../../mixins/mixinEltWithoutChild';
    
    export default {
        components: {
            Time,
            User
        },
        mixins: [ mixinEltWithoutChild ],
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
        img{
            height: 100%;
        }
    }
</style>