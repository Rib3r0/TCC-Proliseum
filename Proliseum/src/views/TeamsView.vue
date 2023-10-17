<template>
  <div class="body">
    <div class="header">
      <h1>Times</h1>
    </div>
    <div class="main">
      <div class="filter">
        <div class="manege">
          <NewCustomButton label="MEUS TIMES"/>
          <router-link to="/teams/create"><NewCustomButton label="CRIAR TIME"/></router-link>
        </div>
      </div>
      <template v-if="loading">
        <h1>teste</h1>
      </template>
      <template v-else>
        <div class="teams">
          <div v-for="card in listOfTeams.teams" :key="card.id" class="card">
            <router-link class="router" :to="`/teams/${card.id}`">
              <miniIcon :image="src[card.id]" size="200px"/>
              <h3>{{ card.nome_time }}</h3>
              <p>gerenciado por {{ card.organizacao.dono_id.nickname }}</p>
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

let loading = ref(true)

let listOfTeams = ref({})
let src = ref([])

await axiosPerfil.get('team').then( (response) => {
  listOfTeams = response.data
  console.log(listOfTeams);
  loading = false
})




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
  
}
.router{
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  border-radius: 20px;
}

.teams{
  padding: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 40px;
}
</style>