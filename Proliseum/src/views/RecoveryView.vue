<template>
  <div class="body">
    <div class="header">
      <img class="logo" src="../assets/img/logoIcon.png" />
      <h1 class="titulo">Recuperar senha</h1>
    </div>
    <div class="main">
      <div class="reiniciarSenha">
        <p class="text">Para reiniciar a senha digite seu E-mail</p>
        <div class="email">
          <label for="email">Email:</label>
          <input type="email" id="email" placeholder=" " required />
        </div>

        <div class="botaoReiniciar">
          <router-link to="/reboot-message">
            <customised-button
              text="Reiniciar Senha"
              @buttonFunction="teste"
            ></customised-button>
          </router-link>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>©2023 - TECNO CEOS</p>
    </div>
  </div>
</template>
  

<script>
import CustomisedButton from "../components/CustomisedButton.vue";
export default {
  name: "StartView",
  components: {
    CustomisedButton,
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
  background: #1f1e31;
  height: 100vh;
}
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 50px;
}
.logo {
  margin-top: 25px;
  height: 20vh;
}

.main {
  display: flex;
  padding: 0px 175px 0px 175px;
  gap: 100px;
  align-items: center;
  justify-content: center;
}
.titulo {
  font-family: 'Cyberjunkies', sans-serif;
  font-size: 48px;
  text-shadow: 0px 5px red;
  font-weight: 100;
}

.reiniciarSenha {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  width: 980px;
  height: 376px;
  background-color: #0005;
  border-radius: 50px;
}

.text{
  margin:45px 0 0 0 ;
  font-size: 32px;
  font-weight: 400;
}

.email{
  display: flex;
  flex-direction: column;
}

input{
  width: 625px;
  height: 56px;
}

label{
  font-weight: 900;
}
.botaoReiniciar{
margin: 35px 0 0 0 ;
}

.footer{
display: flex;
justify-content: center;
margin: 100px 0 0 0 ;
border-top: solid 1.5px var(--red);
}

.footer p{
  padding: 10px;
}
</style>