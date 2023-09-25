<template>
  <form class="form" autocomplete="on">
    <NewInputForm icon="https://img.icons8.com/ios-glyphs/90/user--v1.png" v-model="login.login" label="NOME DE USUARIO:" autofocus/>
    <NewInputForm icon="https://img.icons8.com/ios-glyphs/240/lock--v1.png" v-model="login.senha" label="SENHA:" type="password" />
    <router-link class="recuperar" to="/recovery">  
        <h3 style="font-size: 0.8vw"> Esqueceu sua senha?</h3>
    </router-link>
    <NewCustomButton class="loginButton" label="LOGIN" size="1vw" @onClick="makeLogin" />
    <!-- <CustomisedButton class="loginButton" text="LOGIN" type="submit"/> -->
  </form>
</template>

<script setup>
import { createToast } from 'mosha-vue-toastify';
import { ref } from 'vue';
import router from '../../router';
import NewCustomButton from '../NewCustomButton.vue';
import NewInputForm from './NewInputForm.vue';
import { axiosPerfil } from '../../axios/axios';


const login = ref({
  login: "",
  senha: ""
})

 async function makeLogin(){
  //const response = await axios.post('Register',cadastro)
  const response = await axiosPerfil.post('login', JSON.stringify(login.value))
    

  console.log(response.status == 200);
  if(response.status == 201){
    createToast('Cadastro criado com sucesso!' + response.data.nome_completo,{
      type : 'success',
      showIcon : true,
      position : "top-center"
    })
    router.push('/login')
  }

  createToast('Logado com sucesso!',{
    type : 'success',
    showIcon : true,
    position : "top-center"
  })
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