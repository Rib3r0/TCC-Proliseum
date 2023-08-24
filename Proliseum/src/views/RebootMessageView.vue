<template>
  <div class="body">
    <div class="main">
      <div class="aviso">
        <div class="imagem-logo">
          <img src="../assets/img/logoIcon.png" alt="" />
        </div>
        <div class="texto">
          <div class="titulo">
            <img src="../assets/img/Proliseum.png" alt="" class="proliseum"/>
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

    <div class="footer"></div>
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
}

.aviso{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 80px;
}

.imagem-logo{
    grid-area: imagem;
    height: 10vh;
}

.texto p{
    grid-area: texto;
font-size: 32px;
font-weight: 400;
}

.proliseum{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    height: 25vh;
}

.titulo{
    font-family: "Cyberjunkies", sans-serif;
    font-size: 68px;
    text-align: center;
    color: var(--red);
    letter-spacing: 5px;
}

</style>