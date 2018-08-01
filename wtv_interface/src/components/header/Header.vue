<template>
    <header>
        <div id="logo">
            <img src="/imgs/wiztivi.png" alt="wiztivi logo">
        </div>
        <div id="user"></div>
        <Time/>
    </header>
</template>

<script>
    import Time from './Time';
    
    export default {
        components: {
            Time
        },
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
        height: 15%;
    }
    #user{
        flex-grow: 1;
    }
    #logo{
        img{
            height: 70%;
        }
    }
</style>