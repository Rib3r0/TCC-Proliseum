<template>
<button :type="type" @click="$emit('buttonFunction')"><p :style="font_size">{{ text }}</p></button>
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
        size: Number,
        type: {
            type:String,
            default: "button"
        }
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
    padding-left: 5px;
    padding-right: 5px;
}
button:active{
    background-color: #fff;
}
button:active p{
    color: var(--red);
}
</style>