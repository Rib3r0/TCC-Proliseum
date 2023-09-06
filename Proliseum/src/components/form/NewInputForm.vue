<template>
  <div class="input-wrap">
    <span class="title" for="">{{ label }} </span>
    <input
      class="input" 
      type="text" 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    />
    <span class="optional" v-if="optional">opcional</span>
    <span class="optional" v-if="error">opcional</span>
  </div>
</template>

<script setup>
import { ref } from "vue"

defineProps({
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: ""
  },
  optional: {
    type: Boolean,
    default: false
  }
})

const error = ref(false)



</script>

<style scoped>
  .input-wrap{
    display: flex;
    flex-direction: column;
  }
  .input{
    max-height: 55px;
    height: 4vw;
    font-weight: 500;
    padding-left:10px ;
    font-size: var(--font-text);
    min-width: 18vw;
    max-width: 100%;
  }
  .optional{
    font-size: var(--font-text);
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
</style>