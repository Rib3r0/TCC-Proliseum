<template>
<button type="button"><p>{{ text }}</p></button>
</template>

<script>
export default {
    name: "CustomisedButton",
    data(){
        return {
            text: "ab"
        }
    }
}
</script>

<style>
button{
    background-color: tomato;
}
</style>