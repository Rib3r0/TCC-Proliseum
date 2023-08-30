<template>
    <input :id="id" type="radio"  :name="name" :required="required" @input="onInput"  hidden>
    <label class="checkbox" :for="id">
        <img :src="icon">
    </label>
</template>

<script>
export default {
    name: "FormRatio",
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

<style>

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

</style>