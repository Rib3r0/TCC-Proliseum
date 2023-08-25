<template>
  <form class="form">
    <FormInput text="NOME DE USUARIO:"/>
    <FormInput text="SENHA:" type="password"/>
    <CustomisedButton class="loginButton" text="LOGIN" size="1.5rem"/>
  </form>
</template>

<script>
import CustomisedButton from '../CustomisedButton.vue';
import FormInput from './FormInput.vue'
export default {
    name: "loginForm",
    components: {
    FormInput,
    CustomisedButton
},
}
</script>

<style scoped>
  .form{
    width: 20vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 50px 50px 50px;
    background-color: #0005;
    border-radius: 50px;
  }
  .loginButton{
    margin-top: 20px;
    align-self: flex-end;
  }
</style>