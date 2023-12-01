<template>
  <div class="body">
    <div class="header">
      <NewInputForm class="search" icon="https://img.icons8.com/ios-filled/250/search--v1.png" v-model="buscar"/>
      <div class="glhf">
        <img class="logo" src="../../assets/img/logoIcon.png" />
        <h1 class="title">GLHF</h1>
      </div>
    </div>
    <div class="main">
      <!-- <h3>Campeonatos:</h3>
      <Carrosel/> -->
      <template v-if="loading" >
            <img v-if="loading" src="../../assets/img/Rolling-1s-323px.svg">
      </template>
      <template v-else>
        <h3>ALGUMAS VAGAS NO SEU PERFIL:</h3>
        <div class="card_props" v-for="card in cards" :key="card.id">
              <div class="profile">
                <router-link class="profile" :to="'/teams/' + card.time.id"> 
                  <miniIcon class="icon" :image="getImage(card.time.id)" size="10vw"/>
                  <p>{{ card.time.nome_time}}</p>
                </router-link>
              </div>
              <div class="info">
                <div class="description"><p>{{ card.descricao }}</p></div>
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
                    <h4>{{ card.hora }}</h4>
                  </div>
                  <div class="info_card">
                    <h3>PROS</h3>
                    <p>{{ card.pros }}</p>
                  </div>

                </div>
                <div class="info_buttons">
                  <Newcustombutton v-if="jogador" label="INSCREVER-SE" @onClick="subscribe(card.time.id)"/>
                </div>
              </div>
        </div>
      </template>

    </div>
    <PatrocinadorVue/>
    <rodape lined/>
  </div>
</template>

<script setup>
import { nextTick, onBeforeMount, ref } from 'vue';
import NewInputForm from '../../components/form/NewInputForm.vue';
import Rodape from '../../components/Rodape.vue';
import router from '../../router';
import Carrosel from '../../components/Carrosel.vue';
import { Elo } from '../../components/enum/Elo'
import { Funcao } from '../../components/enum/Funcao'
import Newcustombutton from '../../components/NewCustomButton.vue';
import miniIcon from '../../components/miniIcon.vue';
import storage from '../../firebase/firebase.js'
import { ref as refFB , getDownloadURL } from 'firebase/storage'
import { axiosPerfil } from '../../axios/axios';
import PatrocinadorVue from '../../components/Patrocinador.vue';

onBeforeMount
( () => {
  if(!localStorage.getItem('token')){
    router.push('login')
  }
  
})

const id = localStorage.getItem('id');


const buscar = ""
const loading = ref(true)
let jogador = ref(false)
let perfil = ref({})


let cards = ref([])

const getImage = async (id) =>{
  
  let image
  
  await getDownloadURL(refFB(storage,'team/' + id + '/profile')).then(
    (download_url) => ( image = download_url)
    ).catch( (erro) => {
      image =  "https://i.ibb.co/jVvMSHY/image-6.png"
    })
    
    return image
    
    
}

nextTick( async () => {
  
  await axiosPerfil.get('profile/' + id).then(async (response) => {
      if(response.data.playerProfile){
        perfil.value = response.data.playerProfile
        if(!response.data.playerProfile.time_atual){
          jogador.value = true
        }
        
      }
    })

    await axiosPerfil.get('post/1',{ params: { perPage: 3 , page: 1, elo: perfil.value.elo , funcao: perfil.value.funcao } })
  .then(async (response) => {
    console.log(response.data.post)
    cards = response.data.post
  })


  loading.value = false
})


async function subscribe(idTime){

await axiosPerfil.put('sieve/'+ idTime)
    .then(async (response) => {
      createToast('Você foi inscrito!',{
        type : "success",
        showIcon : true,
        position : "top-center"
      })
    })
    .catch( (error) => {
      console.log(error);
      createToast(error.response.data.error,{
        type : "warning",
        showIcon : true,
        position : "top-center"
      })

    })


}





</script>

<style scoped>
.body{
  width: 100%;
}

.header{
  background-image: url(../../assets/img/backgroundHome.png);
  background-repeat: no-repeat;
  background-size: cover, contain;
  background-attachment: fixed;
  background-position: center;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-between;
}

.title{
  font-size: 5vw;
}

.glhf{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  filter: drop-shadow(0 0 1rem #000);
}


.search{
  padding: 20px;
}

.logo {
  height: 10vw;
}

.main{
  min-height: 100vh;
  padding: 20px;
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
  color: #FFF;
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

</style>