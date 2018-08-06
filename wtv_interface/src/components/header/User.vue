<template>
    <div id="user">
        <div class="user-cont">
            <p>name user</p>
            <img src="/imgs/logo-user.png" alt="logo user">
    
        </div>
    </div>
</template>

<script>
    export default {
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
    #user {
        flex-grow: 1;
        .flex-row;
        .align-center;
    }
    
    .user-cont {
        margin-left: auto;
        .flex-row;
        .align-center;
        img {
            height: 60px;
            margin-left: 25px;
        }
    }
</style>