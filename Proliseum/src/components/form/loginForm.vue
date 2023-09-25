<template>
  <form class="form" autocomplete="on">
    <NewInputForm icon="https://img.icons8.com/ios-glyphs/90/user--v1.png" v-model="login.login" label="NOME DE USUARIO:" autofocus/>
    <NewInputForm icon="https://img.icons8.com/ios-glyphs/240/lock--v1.png" v-model="login.senha" label="SENHA:" type="password" @keyup.enter="makeLogin" />
    <p class="awarn" v-if="errorLogin" >Login ou senha invalidos!</p>
    <router-link class="recuperar" to="/recovery">  
        <h3 style="font-size: 0.8vw"> Esqueceu sua senha?</h3>
    </router-link>
    <div class="login">
      <img v-if="loading" src="../../assets/img/Rolling-1s-323px.svg">
      <NewCustomButton class="loginButton" label="LOGIN" size="1vw" @onClick="makeLogin" />
    </div>
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

const errorLogin = ref(false)

const loading = ref(false)

 async function makeLogin(){
  errorLogin.value = false
  loading.value = true
  //const response = await axios.post('Register',cadastro)
  await axiosPerfil.post('login', JSON.stringify(login.value))
  .then( (response) => {
    loading.value = false
    createToast('Bem vindo!',{
      type : 'success',
      showIcon : true,
      position : "top-center"
    })
    router.push('/home')
  })
  .catch( (error) => {
    loading.value = false

    if(error.response.status == 400){
      errorLogin.value = true
      createToast('Login ou senha invalidos!',{
      type : 'warning',
      showIcon : true,
      position : "top-center"
    })
    }
    if(error.response.status == 500){
      createToast('Erro interno, Tente novamente!',{
      type : 'danger',
      showIcon : true,
      position : "top-center"
      })
    }

  })
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
  .awarn{
    color: var(--red);
  }
  .login{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
  }
  .login img{
    height: 7vh;
  }

</style>