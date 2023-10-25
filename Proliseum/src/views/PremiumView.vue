<template>
  <div class="body">
    <h1>Premium</h1>
    <div class="main">
      <img class="logo" src="../assets/img/logoIcon.png" />
    </div>

    <Rodape :lined="true"/>
  </div>
</template>

<script setup>
import Rodape from '../components/Rodape.vue';


</script>

<style scoped>
.body{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* animation: fire 10s alternate infinite ; */
  background-repeat: no-repeat;
}

@keyframes fire {
  0%{
    background-color: var(--red);
  }
  100% {

  }
}
</style>