<template>
    <input :id="id" :name="name" type="radio" hidden>
        <label class="button" :for="id">
            <img v-if="icon"  :src="icon">
            <p v-if="label" >{{ label }}</p>
        </label>    


    <!-- <input :id="id" type="radio"  :name="name" :required="required" @input="onInput" :checked="checked"  hidden>
    <label v-if="!text" class="checkbox" v :for="id">
        <img  :src="icon">
    </label>
    <label v-else  class="button" :for="id">
        <img v-if="icon"  :src="icon">
        <p >{{ text }}</p>
    </label> -->
</template>

<script setup>
defineProps({
    id : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    icon : String,
    label : String,

})


// export default {
//     name: "FormRatio",
//     emits: ["input"],
//     data(){
//         return{
//             font_size : "font-size: " + this.size
//         }
//     },
//     props:{
//         icon: {
//             type: String,
//         },
//         name: {
//             type: String,
//             required: true
//         },
//         id: {
//             type: String,
//             required: true
//         },
//         required: {
//             type: Boolean,
//             default: false
//         },
//         type: {
//             type: String
//         },
//         text : String,
//         size : String,
//         checked : {
//             type : Boolean,
//             default : false
//         }

//     },
//     methods: {
//       onInput(event) {
//         if(event.target.value){
//             this.$emit('input', event.target.value,this.id)
//         }
        
//       }
//     }
// }
</script>

<style scoped>

.checkbox{
    background-color: var(--red);
    padding: 10px;
    display: grid;
    place-items: center;
    height: 6vw;
    width: 6vw;
    border-radius: 20px;
  }
.checkbox img {
    max-width: 90%;
    filter: brightness(0) saturate(100%)
}
.checkbox i {
    font-size: var(--font-subtitle);
}

:checked + .checkbox {
    background-color: #fff;
    transition: all 0.8s
}
:checked + .checkbox img {
    filter: brightness(0) saturate(100%) invert(49%) sepia(54%) saturate(7439%) hue-rotate(342deg) brightness(103%) contrast(104%);
}
:checked + .checkbox p {
    color: var(--red);
    transition: all 0.8s
}

.button{
    background-color: var(--red);
    border-radius: 10px;
    width: 5vw;
    height: 5vw;
}
.button img{
    width: 100%;
}

p{
    color: #fff;
    font-family: 'Poppins', sans-serif;
    font-weight: 900;
    font-size: var(--font-description);
    padding-left: 5px;
    padding-right: 5px;
}
:checked + .button{
    background-color: #fff;
    transition: all 0.8s
}
:checked + .button img{
    filter: brightness(0) saturate(100%) invert(49%) sepia(54%) saturate(7439%) hue-rotate(342deg) brightness(103%) contrast(104%);
}
:checked + .button p{
    filter: brightness(0) saturate(100%) invert(49%) sepia(54%) saturate(7439%) hue-rotate(342deg) brightness(103%) contrast(104%);
}




</style>