<template>
  <div class="body">
    <h1>Premium</h1>
    <div class="main">
      <img class="logo" src="../assets/img/logoIcon.png" />
      <div>
        <h3>assine o premium pra desbloquear todas as funcionalidades da nossa plataforma!</h3>
        <BR></BR>
        <NewCustomButton label="TORNAR-SE UMA LENDA!"/>
      </div>
    </div>

    <Rodape :lined="true"/>
  </div>
</template>

<script setup>
import NewCustomButton from '../components/NewCustomButton.vue';
import Rodape from '../components/Rodape.vue';


</script>

<style scoped>
.body{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: radial-gradient(circle,  var(--background-color) 36%,  var(--red)  76%);
  background-repeat: no-repeat;
}

@keyframes fire {
  0%{
    background-color: var(--red);
  }
  100% {

  }
}


.main{
  display: flex;
  align-items: center;
  width: 70%;
  gap: 20px;
}
.logo{
  filter: drop-shadow(0 20px 0.5rem #000);
}
</style>