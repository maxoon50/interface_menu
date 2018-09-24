<template>
    <div id="time">
        <p class="date">{{date}}</p>
        <p class="date">{{time}}</p>
    </div>
</template>

<script>
    const MONTHS = ['Janv', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];
    export default {
        data: function() {
            return {
                time: null,
                date: null,
            }
        },
        methods: {
            getTime() {
                let date = new Date();
                let hours = date.getHours();
                let minutes = date.getMinutes();
                minutes = minutes < 10 ? "0"+ minutes : minutes;
                let day = date.getDate()
                let month = MONTHS[date.getMonth()];
                this.date = day + " " + month;
                this.time = hours + ":" + minutes;
            },
            displayTime() {
                setInterval(this.getTime, 30000)
            }
        },
        mounted() {
            this.getTime();
            this.displayTime();
        },
    }
</script>

<style lang='less'>
    @import '~normalize.css';
    @import '../../assets/style/variables.less';
    #time {
        margin-left: auto;
        .align-center;
        margin-left: 30px;
        margin-right: 20px;
        z-index: 5;
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .date{
        margin: 0px;
        color: rgb(26, 159, 220);
    }
</style>