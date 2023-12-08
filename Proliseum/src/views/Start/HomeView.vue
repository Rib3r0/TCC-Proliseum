<template>
  <div class="body">
    <div class="header">
      <NewInputForm class="search" icon="https://img.icons8.com/ios-filled/250/search--v1.png" v-model="buscar"/>
      <div class="glhf">
        <img class="logo" src="../../assets/img/logoIcon.png" />
        <h1 >GLHF</h1>
      </div>
    </div>
    <div class="main">
      <!-- <h3>Campeonatos:</h3>
      <Carrosel/> -->
      <template v-if="loading" >
        <img class="loading" v-if="loading" src="../../assets/img/Rolling-1s-323px.svg">
      </template>
      <template v-else>
        <div v-if="hasJogador" class="container">
          <h3 class="title">ALGUMAS VAGAS NO SEU PERFIL:</h3>
          <div v-if="cardsVagas.length < 1" class="card_props">
            <div class="info">
              <div class="info_sem">
                <h3>AINDA NÃO HÁ NENHUMA VAGA NO SEU PERFIL... &#128547;</h3>
              </div>
            </div>
          </div>
          <div v-else class="card_props"  v-for="card in cardsVagas" :key="card.id">
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
          <RouterLink to="/offers">
            <Newcustombutton label="VEJA MAIS" size="1vw"/>
          </RouterLink>
        
        </div>
        <div v-if="hasTime" class="container">
          <Modal class="proposta" :open="isOpenProps" @close="isOpenProps = !isOpenProps">
            <form class="form" autocomplete="on">
              <SelectForm label="TIME:" v-model="selectedTeam" :list="list.map( (x) => { return x.nome_time})" default="Selecione o time"/>
              <span >mensage:</span>
              <textarea name="" v-model="message"  id="" maxlength="300" placeholder="Olá..."></textarea>
              <div class="boton">
                <img v-if="loading" style="height: 5vh;width: 5vh;" class="loading" src="../../assets/img/Rolling-1s-323px.svg">
                <Newcustombutton label="ENVIAR" @onClick="proposta"  />
              </div>

            </form>
          </Modal>
          <h3 class="title">ALGUNS JOGADORES DISPONIVEIS:</h3>
          <div v-if="cards.length < 1" class="card_props">
            <div class="info">
              <div class="info_sem">
                <h3>AINDA NÃO HÁ JOGADORES DISPONÍVEIS... &#128531;</h3>
              </div>
            </div>
          </div>
          <div class="card_props" v-for="card in cards" :key="card.id">
              <div class="profile">
                <router-link class="profile" :to="'/perfil/' + card.dono_id.id"> 
                  <miniIcon class="icon" :image="getImagePlayer(card.dono_id.id)" size="10vw"/>
                  <p>{{ card.dono_id.nickname }}</p>
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
                  <Newcustombutton label="ENVIAR PROPOSTA" @onClick="toProposta(card.dono_id.id)"/>
                </div>
              </div>
          </div>
          <RouterLink to="/search">
            <Newcustombutton label="VEJA MAIS" size="1vw"/>
          </RouterLink>
          
        </div>
        <div v-if="!hasTime && !hasJogador" class="new">
          <div class="new1">
            <h2>SEJA UM JOGADOR</h2>
            <P>Para procura por time é necessario criar um perfil de jogador</P>
            <RouterLink to="/edit">
              <Newcustombutton label="CRIE UM PERFIL AQUI!" size="1vw"/>
            </RouterLink>
          </div>
          <div class="new3">
            <h1>ou</h1>
          </div>
          <div class="new1">
            <h2>CRIE UM TIME</h2>
            <P>Criando um time, você poderá buscar por jogadores que desejar</P>
            <RouterLink to="/teams/create">
              <Newcustombutton label="CRIE UM TIME AQUI!" size="1vw"/>
            </RouterLink>
          </div>
        </div>

      </template>

    </div>
    <br>
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
import Modal from '../../components/popup/Modal.vue'
import SelectForm from '../../components/form/SelectForm.vue'
import { createToast } from 'mosha-vue-toastify';


onBeforeMount( () => {
  if(!localStorage.getItem('token')){
    router.push('login')
  }
  
})

const id = localStorage.getItem('id');

let idLocal = ref('')
const buscar = ""
const loading = ref(true)
let jogador = ref(false)

const hasJogador = ref(false)
const hasTime = ref(false)

const isOpenProps = ref(false)
let list = ref([])
let selectedTeam = ref(0)
let message = ref('')




let perfil = ref({})


let cardsVagas = ref([])
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

const getImagePlayer = async (id) =>{
  
  let image
  
  await getDownloadURL(refFB(storage,id + '/profile')).then(
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
        hasJogador.value = true
        if(!response.data.playerProfile.time_atual){
          jogador.value = true
        }
        
      }
    })

    await axiosPerfil.get('post/1',{ params: { perPage: 5 , page: 1, eloPlayer: perfil.value.elo , funcao: perfil.value.funcao } })
  .then(async (response) => {
    console.log(response.data.post)
    cardsVagas = response.data.post
  })

  await axiosPerfil.get('post/0',{ params: { perPage: 5 , page: 1} })
  .then(async (response) => {
    console.log(response.data.post)
    cards = response.data.post
  })


  await axiosPerfil.get('team/user/'+id)
    .then(async (response) => {
      console.log(response.data.teams);
      if (response.data.teams.length > 0) {
        hasTime.value = true
        list.value = response.data.teams
      }
    })


  loading.value = false
})


async function subscribe(idTime){

  if(!loading.value){
    loading.value = true
    await axiosPerfil.put('sieve/'+ idTime)
        .then(async (response) => {
          createToast('Você foi inscrito!',{
            type : "success",
            showIcon : true,
            position : "top-center"
          })
          loading.value = false
        })
        .catch( (error) => {
          console.log(error);
          createToast(error.response.data.error,{
            type : "warning",
            showIcon : true,
            position : "top-center"
          })
          loading.value = false

        })
  }




}

async function proposta() {

  if(!loading.value){  
    loading.value = true
    console.log(list[selectedTeam.value]);
    console.log(message.value);
    await axiosPerfil.post('offer/' + list.value[selectedTeam.value].id +'/'+ idLocal.value, JSON.stringify({ menssage: message.value }))
    .then( (response) => {
      loading.value = false
      const message = 'Proposta Enviada!'
      createToast(message,{
        type : 'success',
        showIcon : true,
        position : "top-center"
      })
      console.log(response.data);
    }).catch((erro) => {
      console.log(erro);
      const message = 'Não foi possivel enviar a proposta!'
      loading.value = false
      createToast(message,{
        type : 'danger',
        showIcon : true,
        position : "top-center"
      })
    })}
  
}


function toProposta(idr){
  isOpenProps.value = true
  idLocal.value = idr
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
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
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

.container{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title{
  background-color: #FFF1;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}


.loading{
  height: 20vh;
}

.new{
  display: grid;
  grid-template-columns: 1fr 200px 1fr;
  padding: 40px;
  height: 50vh;
}

.new1{
  background-color: #0002;
  margin: 10px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.new3{
  display: grid;
  place-items: center;
}

.info_sem{
  background-color: #0005;
  padding: 20px;
  border-radius: 20px;
  min-width: 70vw;
  min-height: 16vw;
  display: grid;
  place-items: center;
  filter: opacity(20%);
  place-self: center;
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

.boton{
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
  padding: 10px;
}

</style>