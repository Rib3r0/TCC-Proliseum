<template>
  <form class="form">
    <FormInput text="NOME DE USUARIO:" required/>
    <FormInput text="EMAIL:" type="email" required/>
    <FormInput text="SENHA:" type="password" required />
    <FormInput text="CONFIRMAR SENHA:" type="password" required/>
    <FormInput text="NOME COMPLETO:" required />
    <FormInput text="DATA DE NASCIMENTO:" type="date" required />
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
    justify-content: space-between;
    width: 45vw;
    display: flex;
    flex-wrap: wrap;
    padding: 50px;
    background-color: #0005;
    border-radius: 50px;
  }
</style>