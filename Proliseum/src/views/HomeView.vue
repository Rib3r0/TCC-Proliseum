<template>
  <div class="body">
    <div class="header">
      <NewInputForm class="search" icon="https://img.icons8.com/ios-filled/250/search--v1.png" v-model="buscar"/>
      <div class="glhf">
        <img class="logo" src="../assets/img/logoIcon.png" />
        <h1 class="title">GLHF</h1>
      </div>
    </div>
    <div class="main">

    </div>
    <rodape lined/>
  </div>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import NewInputForm from '../components/form/NewInputForm.vue';
import Rodape from '../components/Rodape.vue';
import router from '../router';

onBeforeMount( () => {
  if(!localStorage.getItem('token')){
    router.push('login')
  }
  
})

const buscar = ""

</script>

<style scoped>
.body{
  width: 100%;
}

.header{
  background-image: url(../assets/img/backgroundHome.png);
  background-repeat: no-repeat;
  background-size: cover, contain;
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
  height: 100vh;
}

</style>