<template>
    <div id="time">
        <p>{{date}}</p>
        <p>{{time}}</p>
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
                let day = date.getDate()
                let month = MONTHS[date.getMonth() - 1];
                this.date = day + " " + month;
                this.time = hours + " h " + minutes;
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
    }
</style>