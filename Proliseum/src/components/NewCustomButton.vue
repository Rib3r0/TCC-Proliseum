<template>
  <button type="button" v-bind="$attrs" @click="handleClick" >{{ label }}</button>
</template>

<script setup>
defineProps({
    label : {
        type : String,
        default : "BUTTON"
    }
})

const handleClick = (event) => {
    console.log("olá")
}

</script>

<style scoped>
    button{
        background-color: var(--red);
        border-radius: 4px;
        border-style: none;
        box-sizing: border-box;
        color: #fff;
        cursor: pointer;
        display: inline-block;
        font-size: 16px;
        font-weight: 700;
        line-height: 1.5;
        margin: 0;
        max-width: none;
        min-height: 44px;
        min-width: 10px;
        outline: none;
        overflow: hidden;
        padding: 9px 20px 8px;
        position: relative;
        text-align: center;
        text-transform: none;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
    }
    button:hover{
        transform: translateY(1px);
    }
    button:active{
        background-color: #fff;
        color: var(--red);
        transform: translateY(3px);
    }
</style>