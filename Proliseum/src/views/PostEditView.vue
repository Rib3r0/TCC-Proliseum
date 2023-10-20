<template>
  <div v-if="perfilExist" class="nExist">
    <div>
      <h3>VOCÊ AINDA NÃO TEM PERFIL DE JOGADOR!</h3>
      <router-link to="/edit">
        <Newcustombutton label="CRIE AQUI!" />
      </router-link>
    </div>
  </div>
  <form v-else class="body" autocomplete="off" @submit.prevent="handleSubmit">
    <div class="preview">
      <div class="card_props">
        <div class="profile">
          <miniIcon class="icon" :image="getImage()" size="10vw" />
          <p>{{ card.name }}</p>
        </div>
        <div class="info">
          <div class="description">
            <p>{{ card.description }}</p>
          </div>
          <div class="info_main">
            <div class="info_card">
              <h3>ELO</h3>
              <img :src="Elo[parseInt(card.elo)][1]" alt="" />
              <p>{{ Elo[parseInt(card.elo)][0] }}</p>
            </div>
            <div class="info_card">
              <h3>FUNÇÃO</h3>
              <img :src="Funcao[parseInt(card.funcao)][1]" alt="" />
              <p>{{ Funcao[parseInt(card.funcao)][0] }}</p>
            </div>
            <div class="info_card">
              <h3>HORARIO</h3>
              <h4>{{ card.horario }}</h4>
            </div>
            <div class="info_card">
              <h3>PROS</h3>
              <p v-for="pro in card.pros" :key="pro">{{ pro }}</p>
            </div>
          </div>
          <div class="info_buttons">
            <Newcustombutton label="ENVIAR PROPOSTA" />
          </div>
        </div>
      </div>
    </div>
    <span>*ISSO PODERÁ SER VISUALIZADO NO POST*</span>
    <div class="cadastro">
      <div class="text">
        <span class="title">DESCRIÇÃO:</span>
        <textarea name=""  id="" maxlength="300" placeholder="olá..."></textarea>
      </div>
      <NewInputForm label="horario" type="time"/>
      <div class="text">
        <span class="title">Prós:</span>
        <textarea name=""  id="" maxlength="300" placeholder="Tranquilo..."></textarea>
      </div>
    </div>
    <div class="button_div">
      <Newcustombutton type="submit" label="SALVAR" />
      <img v-if="loading" src="../assets/img/Rolling-1s-323px.svg" />
    </div>
  </form>
</template>

<script setup>
import Newcustombutton from '../components/NewCustomButton.vue';
import ImageUpload from '../components/form/ImageUpload.vue';
import { ref } from 'vue';
import { Elo } from '../components/enum/Elo';
import { Funcao } from '../components/enum/Funcao';
import { axiosPerfil } from '../axios/axios.js';
import storage from '../firebase/firebase.js';
import { ref as refFB, getDownloadURL } from 'firebase/storage';
import miniIcon from '../components/miniIcon.vue';
import NewInputForm from '../components/form/NewInputForm.vue';

const id = localStorage.getItem('id');
const perfilExist = ref(false);

let card = ref({
  elo: '0',
  funcao: '0',
  horario: '00:00',
  pros: ['A']
});

const getImage = async () =>{
  
  let image
  
  await getDownloadURL(refFB(storage, id + '/profile')).then(
    (download_url) => ( image = download_url)
    ).catch( (erro) => {
      image =  "https://i.ibb.co/jVvMSHY/image-6.png"
    })

    console.log(image);
    
    return image
    
    
}





await axiosPerfil.get('profile/' + id).then(async (response) => {
  if (!response.data.playerProfile) {
    perfilExist.value = true
  }else{
    const jogador = response.data.playerProfile
    console.log(jogador);
    
    
    card.value.elo = jogador.elo
    card.value.funcao = jogador.funcao
  }
});

const loading = ref(false);








async function handleSubmit() {
  // implementation of handleSubmit
}

</script>

<style scoped>
  .body {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    gap: 20px;
  }
  .cadastro {
    background-color: #0005;
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    width: 60vw;
  }
  .text {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .preview {
    min-height: 350px;
    min-width: 400px;
    background-color: #0005;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  .button_div {
    display: flex;
  }
  .button_div img {
    height: 50px;
  }
  .nExist {
    display: grid;
    height: 100vh;
    place-items: center;
  }
  .nExist div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .card_props {
    display: flex;
    padding: 20px;
    align-items: center;
  }
  .profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  .info {
    background-color: #0005;
    padding: 20px;
    border-radius: 20px;
    min-width: 70vw;
    min-height: 16vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .info_buttons {
    display: flex;
    width: 100%;
    justify-content: end;
  }
  .info_main {
    display: flex;
    justify-content: space-evenly;
  }
  .info_card {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .info_card img {
    height: 5vw;
  }
</style>
