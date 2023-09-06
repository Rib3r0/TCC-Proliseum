<template>
  <form class="form" autocomplete="on">
    <new-input-form v-model="userName" label="NOME DE USUARIO" autofocus/>
    <new-input-form v-model="password" label="SENHA" type="password" />
    <router-link class="recuperar" to="/recovery">  
        <span> Esqueceu sua senha?</span>
    </router-link>
    <CustomisedButton class="loginButton" text="LOGIN" type="submit"/>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import CustomisedButton from '../CustomisedButton.vue';
import NewInputForm from './NewInputForm.vue';

const userName = ref("")
const password = ref("")


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