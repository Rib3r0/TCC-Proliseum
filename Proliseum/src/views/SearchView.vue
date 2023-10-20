<template>
  <div class="body">
    <div class="header">
      <h1>Jogares Disponiveis</h1>
    </div>
    <div class="main">
      <div class="main_header">
        <div>
          <h4>ELO MINIMO</h4>
          <select-form default="elo minimo" :list="Elo.map( (x) => { return x[0]})" v-model="elo"/>
        </div>
        <div>
          <h4>DISPONIBILIDADE A PARTIR</h4>
          <NewInputForm  type="time" v-model="horario"/>
        </div>
        <div>
          <h4>FUNÇÃO</h4>
          <select-form default="função" :list="Funcao.map( (x) => { return x[0]})" v-model="funcao"/>
        </div>
        <div>
          <h4>REMUNERAÇÃO</h4>
          <select-form default="remuneração" :list="['sim','não']" v-model="remuneracao"/>
        </div>
        <Newcustombutton label="BUSCAR" size="0.5vw"/>
      </div>
      <div class="main_main">
        <router-link to="/search/post">
          <Newcustombutton class="new" label="MINHA POSTAGEM"/>
        </router-link>
        <div class="card_props" v-for="card in cards" :key="card.id">
          <div class="profile">
            <miniIcon class="icon" :image="getImage(card.id_dono)" size="10vw"/>
            <p>{{ card.name }}</p>
          </div>
          <div class="info">
            <div class="description"><p>{{ card.description }}</p></div>
            <div class="info_main">
              <div class="info_card">
                <h3>ELO</h3>
                <img :src="Elo[parseInt(card.elo)][1]" alt="">
                <p>{{ Elo[parseInt(card.elo)][0] }}</p>
              </div>
              <div class="info_card">
                <h3>FUNÇÃO</h3>
                <img :src="Funcao[parseInt(card.funcao)][1]" alt="">
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
              <RouterLink :to="'/search/send/' + card.id_dono">
                <Newcustombutton label="ENVIAR PROPOSTA"/>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <rodape lined/>
  </div>
</template>

<script setup>
import SelectForm from '../components/form/SelectForm.vue'
import Rodape from '../components/Rodape.vue';
import { Elo } from '../components/enum/Elo'
import { Funcao } from '../components/enum/Funcao'
import NewInputForm from '../components/form/NewInputForm.vue'
import Newcustombutton from '../components/NewCustomButton.vue';
import miniIcon from '../components/miniIcon.vue';
import { ref } from 'vue';
import storage from '../firebase/firebase.js'
import { ref as refFB , getDownloadURL } from 'firebase/storage'


const elo = ref('')
const horario = ref('')
const funcao = ref('')
const remuneracao = ref('')

const cards = ref([
  {
    id: 1,
    id_dono: '7',
    name: "a",
    description: "a",
    elo: "0",
    funcao: "0",
    horario: "20:00 - 23:00",
    pros: ['1','2','3','4']
  },
  {
    id: 2,
    name: "b",
    id_dono: '10',
    description: "b",
    elo: "1",
    funcao: "1",
    horario: "19:00 - 23:30",
    pros: ['a','b','c','d']
  },

])

const getImage = async (id) =>{
  
  let image
  
  await getDownloadURL(refFB(storage, id + '/profile')).then(
    (download_url) => ( image = download_url)
    ).catch( (erro) => {
      image =  "https://i.ibb.co/jVvMSHY/image-6.png"
    })
    
    return image
    
    
  }


</script>

<style scoped>
.body{
  width: 100%;
}

.header{
  background-image: url(../assets/img/backgroundHome.png);
  background-repeat: no-repeat;
  background-size: cover, contain;
  background-position: 50% 20%;
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}


.main{
  min-height: 100vh;
}
.main_header{
  display: flex;
  gap: 20px;
  padding: 20px;
  max-width: 50%;
}



.main_main{
  display: flex;
  align-items: center;
  flex-direction: column;
}

.card_props{
  display: flex;
  padding: 20px;
  align-items: center;
}
.profile{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}



.info{
  background-color: #0005;
  padding: 20px;
  border-radius: 20px;
  min-width: 70vw;
  min-height: 16vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.info_buttons{
  display: flex;
  width: 100%;
  justify-content: end;
}
.info_main{
  display: flex;
  justify-content: space-evenly;
}

.info_card{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info_card img{
  height: 5vw;
}

.new{
  padding: 20px;
}

</style>