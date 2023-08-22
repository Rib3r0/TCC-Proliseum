<template>
<button type="button" @click="$emit('buttonFunction')"><p :style="font_size">{{ text }}</p></button>
</template>

<script>
export default {
    name: "CustomisedButton",
    data(){
        return {
            font_size: "font-size: " + this.size
        }
    },
    props:{
        text: String,
        size: Number
    }

}
</script>

<style>
button{
    background-color: var(--red);
    padding: 20px;
    border: 0;
    border-radius: 73px;
}
p{
    color: #fff;
    font-family: 'Poppins', sans-serif;
    font-weight: 900;
    font-size: 1rem;
}
button:active{
    background-color: #fff;
}
button:active p{
    color: var(--red);
}
</style>