<template>
  <div class="body">
    <div class="header">
      <h1>Times</h1>
    </div>
    <div class="main">
      <div class="filter">
        <div>

        </div>
        <div class="manege">
          <NewCustomButton @Click="getMyTimes()" label="MEUS TIMES"/>
          <router-link to="/teams/create"><NewCustomButton label="CRIAR TIME"/></router-link>
          <router-link to="/teams/create"><NewCustomButton label="DELETAR TIME"/></router-link>
        </div>
      </div>
      <template v-if="loading" >
        <img v-if="loading" src="../assets/img/Rolling-1s-323px.svg">
      </template>
      <template v-else>
        <div class="teams">
          <div v-for="card in listOfTeams" :key="card.id" class="card">
            <router-link class="router" :to="`/teams/${card.id}`">
              <miniIcon :image="getImage(card.id)"  :size="sizeImg"/>
              <h3>{{ card.nome_time }}</h3>
              <p v-if="!myteams">gerenciado por {{ card.organizacao.dono_id.nickname }}</p>
            </router-link>
          </div>
        </div>
      </template>
    </div>
    <rodape lined/>
  </div>
</template>

<script setup>
import NewCustomButton from "../components/NewCustomButton.vue";
import rodape from "../components/Rodape.vue"
import miniIcon from "../components/miniIcon.vue";
import { axiosPerfil } from "../axios/axios.js";
import { ref } from "vue";
import storage from '../firebase/firebase.js'
import { ref as refFB , getDownloadURL } from 'firebase/storage'

const loading = ref(true)
const myteams = ref(false)
const sizeImg = ref("15vw")

const listOfTeams = ref({})

await axiosPerfil.get('team').then( (response) => {
  listOfTeams.value = response.data.teams


  console.log(listOfTeams.value);
  loading.value = false
})

const getImage = async (id) =>{

  let image

  await getDownloadURL(refFB(storage, 'team/'+ id + '/profile')).then(
  (download_url) => ( image = download_url)
  ).catch( (erro) => {
    image =  "https://i.ibb.co/jVvMSHY/image-6.png"
  })

  return image
  

}




const getMyTimes = async () => {
  loading.value = true
  myteams.value = true
  await axiosPerfil.get('team/myteams').then( (response) => {
  listOfTeams.value = response.data.time

  console.log(listOfTeams.value);
  loading.value = false
})

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

.filter{
  display: flex;
  padding: 20px;
  justify-content: space-between;
}

.manege{
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.card{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  padding: 20px;
  background-color: #0005;
  border-radius: 20px;
  max-width: 18vw;
  
}
.router{
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  border-radius: 20px;
  text-align: center;
}

.teams{
  padding: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 40px;
}
</style>