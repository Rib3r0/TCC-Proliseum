<template>
    <form class="form">
      <FormInput text="NOME DE USUARIO:" required/>
      <FormInput text="SENHA:" type="password" required />
    </form>
  </template>
  
  <script>
  import FormInput from './FormInput.vue';
  export default {
      name: 'RegisterForm',
      components:{
        FormInput
      }
  }
  </script>
  
  <style scoped>
    .form{
        width: 380px;
      display: flex;
      flex-wrap: wrap;
      border-radius: 50px;
      flex-direction: column;
      gap: 20px;
    }
  </style>