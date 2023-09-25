<template>
  <div class="body">
    <div class="login">
      <div class="header">
        <img class="logo" src="../assets/img/logoMain.png">
      </div> 
      <div class="main">
        <h1 class="title">login</h1>
        <login-form/>
      </div>
    </div>
    <div class="background">
      <div>
        <h3 class="cadrastro"> Ainda não tem uma conta? </h3>
        <router-link to="/register">  
          <new-custom-button label="Cadastre-se" size="1.5vw" />
          <!-- <customised-button text="Cadrastre-se" @buttonFunction="teste"/> -->
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
import LoginForm from '../components/form/loginForm.vue';
import NewCustomButton from "../components/NewCustomButton.vue";
export default {
  name: "StartView",
  components: {
    LoginForm,
    NewCustomButton
},
  methods: {
    teste() {
      console.log("aaaaa");
    },
  },
};
</script>

<style scoped>

.body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
}

.background{
  background-image: url(../assets/img/backgroundLogin.png);
  background-repeat: no-repeat;
  background-size: cover, contain;
  background-position: right;
  display: flex;
  align-items: flex-end;
  justify-content: end;
  padding: 20px;
}

.login{
  display: grid;
  grid-template-rows: auto 1fr;
}

.header{
  display: flex;
  align-items: center;
  padding: 20px 20px;
  justify-content: space-between;
}

.main{
  display: flex;
  flex-direction: column;
  width: 50vw;
  align-items: center;
  justify-content: center;
  place-self: center;
  
}

.logo {
  height: 15vh;
}
.title{
  font-family: 'Cyberjunkies', sans-serif;
  font-size: var(--font-title);
  text-shadow: 0px 0.4vw red;
  font-weight: 100;
}
.cadrastro{
  color: var(--red);
  font-size: 1vw
}

.footer{
  align-self: flex-end;
  padding: 20px;
}

</style>