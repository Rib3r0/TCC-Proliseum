<template>
  <label class="layout">
    <span class="title">{{ label }} <p v-if="required">*</p></span>
    <input class="input" type="text" :name="name" v-model="model" @input="onInput" />
    <p v-if="error">{{ error }}</p>
  </label>
  
</template>

<script>

export default {
    name: 'newInput',
    props: {
        label: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: true,
        },
        required: Boolean,
    },
    data(){
        return {
            error : ""
        }
    },
    methods: {
        onInput(event) {
            let value = event.target.value;
            console.log(value);
            console.log(value.length > 0);
            if (!value && this.required) {
                this.error = 'O campo não pode estar vazio!';
                console.log(this.error);
            }else if( value.length > 1){
                this.error = ""
            }
        }
    },
    computed: {
        name() {
            return this.label.toLowerCase();
        },
        model: {
            get(){
                return this.value;
            },
            set(value){
                this.$emit('onInput', value)
            }
        }
    },

}

</script>

<style scoped>
.layout{
   display: flex;
   flex-direction: column;
}
textarea:focus, input:focus{
    outline: none;
    border-bottom: 5px solid var(--red);
    transition: 0.3s;
}
textarea, input{
    outline: none;
    border: none;
    font-family: 'Poppins', sans-serif;
}
span{
    display: flex;
}
p{
    color: var(--red);
}

.input{
    max-height: 55px;
    height: 4vw;
    font-weight: 500;
    padding-left:10px ;
    font-size: var(--font-text);
    min-width: 18vw;
    width: 100%;
}

</style>