<template>
  <div class="body">
    <div class="header">
      <img class="logo" src="../assets/img/logoMain.png" />
    </div>

    <div class="main">
      <div class="login">
        <h1 id="textLogin">login</h1>

        <div class="dados">
          <div class="username">
            <label for="username"> username </label>
            <input type="text" id="username" placeholder=" " required />
          </div>

          <div class="password">
            <label for="password"> password </label>
            <input type="password" id="password" placeholder=" " required />
          </div>

          <div class="login-recuperar">
            <router-link to="/recovery">
              <span class="recuperacao">Esqueci minha senha</span>
            </router-link>

            <router-link to="/recovery">
              <customised-button
                text="LOGIN"
                @buttonFunction="teste"
              ></customised-button>
            </router-link>
          </div>
        </div>
      </div>
      
    </div>

    <div class="footer">
      <div class="cadastro">
        <router-link to="/recovery">
          <span class="cadrastro"> Ainda não tem uma conta? </span>
        </router-link>

        <router-link to="/recovery">
          <customised-button
            text="Cadrastre-se"
            @buttonFunction="teste"
          ></customised-button>
        </router-link>
      </div>
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

<style>
@import url("https://fonts.cdnfonts.com/css/cyberjunkies");

.body {
  display: flex;
  flex-direction: column;

  background-image: url(../assets/img/backgroundLogin.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  padding: 47px 65px 0px 65px;
}

.main {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
}

.login {
  width: 495px;
  margin-left: 76px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#textLogin {
  font-family: "Cyberjunkies", sans-serif;
  font-size: 84px;
  margin: 15px 0px 15px 0px;
  letter-spacing: 8px;
  text-shadow: 0.09em 0.03em #ff3130;
  color: #f0f8ff;
  
}

.dados {
  padding-top: 50px;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: flex-start;
  flex-direction: column;
  gap: 25px;
  width: 495px;
  height: 415px;
  border-radius: 30px;
  background-color: rgba(0, 0, 0, 0.322);
}

.username,
.password {
  display: flex;
  flex-direction: column;
}

label {
  text-transform: uppercase;
  font-weight: 900;
  font-size: 16px;
}

input {
  background-color: transparent;
  border: 1px solid #f7f7f7;
  width: 380px;
  height: 45px;
  border-radius: 10px;
}

.login-recuperar {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  margin-right: 130px;
  gap: 30px;
  width: 100%;
}

.recuperacao,
.cadrastro {
  color: var(--red);
}

.recuperacao:hover,
.recuperacao:focus,
.cadrastro:hover,
.cadrastro:focus {
  transition: 0.1;
  text-shadow: 2px 2px 8px var(--red);
}

.logo {
  height: 129px;
}

.footer {

  display: flex;
  justify-content: center;
}

.cadastro {
  margin: 0px 60px 0px 0px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  gap: 10px;
}
</style>