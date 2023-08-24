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
            <router-link to="/">
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
@import url("https://fonts.cdnfonts.com/css/cyberjunkies");
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
}
.logo {
  margin-top: 25px;
  height: 20vh;
}

.titulo {
  font-family: "Cyberjunkies", sans-serif;
  font-size: 2.2rem;
  letter-spacing: 3px;
  text-shadow: 0.05em 0.04em #ff3130;
  color: #f0f8ff;
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.reiniciarSenha {
  background: #0000003a;
  border-radius: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 920px;
  height: 375px;
  padding-top: 44px;
  gap: 50px;
}

.reiniciarSenha p{
font-weight: 400;
font-size: 24px;
}

.email {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.botaoReiniciar{
    display: flex;
    width: 100%;
    justify-content: flex-end;
    margin: 25px 85px 0px 0px ;
}

.footer{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  border-top:0.10px solid #ff3130;

}

.footer p{
    font-size: 10px;
    font-weight: 600;
    margin-top: 5px;
}

</style>