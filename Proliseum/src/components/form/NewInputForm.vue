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
  </div>
</template>

<script setup>
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


</script>

<style scoped>
  .input-wrap{
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .input{
    max-height: 55px;
    font-weight: 500;
    padding-left:10px ;
    font-size: var(--font-text);
    min-width: 20vw;
    max-width: 100%;
    border-bottom: 3px solid transparent;
    height: 3vw;
  }
  .optional{
    font-size: var(--font-text);
  }
  input:focus{
    outline: none;
    border-bottom: 5px solid var(--red);
    transition: 0.2s;
  }
  input:hover{
    outline: none;
    border-bottom: 5px solid var(--red);
    transition: 0.2s;
  }

  input{
    outline: none;
    border: none;
    font-family: 'Poppins', sans-serif;
  }
  .title{
    font-weight: 900;
    font-size: var(--font-text);
}
</style>