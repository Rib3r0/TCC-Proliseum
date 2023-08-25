<template>
  <div class="body">
    <div class="main">
      <div class="aviso">
        <div class="imagem-logo">
          <img src="../assets/img/logoIcon.png" alt="" class="logo" />
        </div>
        <div class="texto">
          <div class="titulo">
            <img src="../assets/img/Proliseum.png" alt="" class="proliseum" />
            <h1>Informa</h1>
          </div>
          <p>
            Uma mensagem de redefinição de senha foi enviada para o seu e-mail!
          </p>
          <router-link to="/">
            <customised-button
              text="Voltar para o inicio"
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

.main {
  display: grid;
  grid-template-areas: "imagem" "texto";
  grid-template-columns: auto auto;
  height: 100vh;
}

.aviso,
.imagem-logo,
.texto {
  display: flex;
  align-items: center;
  justify-content: center;
}

.aviso {
  gap: 80px;
  margin-top: 110px;
}

.imagem-logo {
  grid-area: imagem;
}

.logo {
  height: 75vh;
}
.texto {
  grid-area: texto;
  gap: 39px;
  width: 623px;
  flex-wrap: wrap;
  text-align: center;
}

.texto h1 {
  font-family: "Cyberjunkies", sans-serif;
  letter-spacing: 5px;
  font-size: 64px;
  color: var(--red);

}

.texto p {
  font-size: 36px;
  font-weight: 600;
}

.proliseum {
  height: 15vh;
}

.footer{
  display: flex;
  justify-content: center;
  align-items: end;
  margin-top: 100px;
  border-top:0.10px solid #ff3130;

}

</style>