<template>
  <div class="body">
    <div class="main">
      <div class="aviso">
        <div class="imagem-logo">
          <img src="../assets/img/logoIcon.png" alt="" class="icon" />
        </div>
        <div class="texto">
          <div class="titulo">
            <h1 class="name">proliseum</h1>
            <h1 class="informa">Informa</h1>
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

.aviso {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;
}

.imagem-logo {
  grid-area: imagem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 110px 0 0 0;

}

.icon {
  height: 80vh;
}

.texto {
  grid-area: texto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
  width: 550px;
  text-align: center;
}

.texto p {
  font-size: 32px;
  font-weight: 600;
  margin: 50px 0 50px 0;
}

.titulo {
  font-family: "Cyberjunkies", sans-serif;
  text-align: center;
  letter-spacing: 5px;
  margin: 80px 0 0 0;
}

.informa {
  color: var(--red);
  font-size: 72px;
}
.name {
  color: #f7f7f7;
  font-size: var(--font-title);
  text-shadow: 0px 10px red;
  font-weight: 100;
  text-transform: uppercase;
}

</style>