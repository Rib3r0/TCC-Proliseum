<template>
  <form class="form" autocomplete="on">
    <FormInput text="NOME DE USUARIO:"/>
    <FormInput text="SENHA:" type="password"/>
    <router-link class="recuperar" to="/recovery">  
        <span> Ainda não tem uma conta? </span>
    </router-link>
    <CustomisedButton class="loginButton" text="LOGIN" type="submit" size="1.5rem"/>
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
    width: 25vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 50px 50px 50px;
    background-color: #0005;
    border-radius: 50px;
  }
.recuperar{
    margin-top: 20px;
    align-self: flex-end;
    color: var(--red);
    text-decoration: underline;
}
  .loginButton{
    margin-top: 20px;
    align-self: flex-end;
  }
</style>