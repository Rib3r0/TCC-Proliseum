<template>
  <div class="body">
    <div class="header">
      <img class="logo" src="../assets/img/logoMain.png">
    </div> 
    <div class="main">
      <h1 class="title">login</h1>
      <login-form/>
      
    </div>

    <div class="footer">
        <span class="cadrastro"> Ainda não tem uma conta? </span>
        <router-link to="/register">  
          <customised-button text="Cadrastre-se" size="2rem" @buttonFunction="teste"/>
        </router-link>
    </div>
  </div>
</template>

<script>
import CustomisedButton from "../components/CustomisedButton.vue";
import LoginForm from '../components/form/loginForm.vue';
export default {
  name: "StartView",
  components: {
    CustomisedButton,
    LoginForm,
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: url(../assets/img/backgroundLogin.png);
  background-repeat: no-repeat;
  background-size: cover, contain;
  background-position: center;
  height: 100vh;
}

.header{
  display: flex;
  align-items: center;
  padding: 47px 65px 0px 65px;
  justify-content: space-between;
}

.main{
  display: flex;
  flex-direction: column;
  width: 50vw;
  align-items: center;
  justify-content: center;
  
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
  color: var(--red)
}

.footer{
  align-self: flex-end;
  padding: 20px;
}

</style>