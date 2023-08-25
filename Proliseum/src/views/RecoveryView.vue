<template>
  <div class="body">
    <div class="header">
      <img class="logo" src="../assets/img/logoIcon.png" />
      <h1 class="titulo">Recuperar senha</h1>
    </div>
    <div class="main">
      <div class="reiniciarSenha">
        <p>Para reiniciar a senha digite seu E-mail</p>
        <div class="email">
          <label for="email">Email:</label>
          <input type="email" id="email" placeholder=" " required />
        </div>

        <div class="botaoReiniciar">
            <router-link to="/reboot-message">
              <customised-button
                text="RESTART"
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
  .title{
          font-family: 'Cyberjunkies', sans-serif;
          font-size: var(--font-subtitle);
          text-shadow: 0px 0.4vw red;
          font-weight: 100;
      }

</style>