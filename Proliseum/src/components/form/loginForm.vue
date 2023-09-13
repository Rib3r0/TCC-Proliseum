<template>
  <form class="form" autocomplete="on">
    <NewInputForm v-model="userName" label="NOME DE USUARIO:" autofocus/>
    <NewInputForm v-model="password" label="SENHA:" type="password" />
    <router-link class="recuperar" to="/recovery">  
        <h3 style="font-size: 0.8vw"> Esqueceu sua senha?</h3>
    </router-link>
    <NewCustomButton class="loginButton" label="LOGIN" size="1vw" @onClick="makeLogin" />
    <!-- <CustomisedButton class="loginButton" text="LOGIN" type="submit"/> -->
  </form>
</template>

<script setup>
import { ref } from 'vue';
import router from '../../router';
import CustomisedButton from '../CustomisedButton.vue';
import NewCustomButton from '../NewCustomButton.vue';
import NewInputForm from './NewInputForm.vue';

const userName = ref("")
const password = ref("")

function makeLogin(){
  console.log(userName.value);
  console.log(password.value);
  router.push('/home')
}


</script>

<style scoped>
  .form{
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 40px 50px 50px 50px;
    background-color: #0005;
    border-radius: 50px;
  }
.recuperar{
    align-self: flex-end;
    color: var(--red);
    text-decoration: underline;
}
  .loginButton{
    align-self: flex-end;
  }
</style>