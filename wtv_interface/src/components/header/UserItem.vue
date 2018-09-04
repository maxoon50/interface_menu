<template>
    <div :class="{focus: focused}">{{name}}</div>
</template>

<script>
    import {mixinEltWithoutChild} from "../../mixins/mixinEltWithoutChild";
    export default {
        props: ['name'],
        mixins:[mixinEltWithoutChild],

    }
</script>

<style scoped>

</style>