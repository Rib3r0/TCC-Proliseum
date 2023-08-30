<template>
    <input :id="id" type="radio"  :name="name" :required="required" @input="onInput" :checked="checked"  hidden>
    <label v-if="!text" class="checkbox" v :for="id">
        <img  :src="icon">
    </label>
    <label v-else  class="button" :for="id">
        <p >{{ text }}</p>
    </label>
</template>

<script>
export default {
    name: "FormRatio",
    data(){
        return{
            font_size : "font-size: " + this.size
        }
    },
    props:{
        icon: {
            type: String,
            default: "../../src/assets/img/LOL.png",
        },
        name: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        required: {
            type: Boolean,
            default: false
        },
        type: {
            type: String
        },
        text : String,
        size : String,
        checked : {
            type : Boolean,
            default : false
        }

    },
    methods: {
      onInput(event) {
        if(event.target.value){
            this.$emit('on-input', event.target.value,this.id)
        }
        
      }
    }
}
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
}
.checkbox i {
    font-size: var(--font-subtitle);
}

:checked + .checkbox {
    background-color: #fff
}
:checked + .checkbox img {
    filter: brightness(0) saturate(100%) invert(49%) sepia(54%) saturate(7439%) hue-rotate(342deg) brightness(103%) contrast(104%);
}
:checked + .checkbox p {
    color: var(--red);
}

.button{
    background-color: var(--red);
    padding: 20px;
    border: 0;
    border-radius: 73px;
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
}
:checked + .button p{
    color: var(--red);
}

</style>