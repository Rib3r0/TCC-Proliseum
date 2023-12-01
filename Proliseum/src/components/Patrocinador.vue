<template>
  <div class="card">
    <h3>SEJA UM PATROCINADOR</h3>
    <h4>e tenha acesso a conteúdos exclusivos!</h4>
    <router-link to="/premium">
      <new-custom-button label="TORNAR-SE PRO"/>
    </router-link>
    
  </div>
</template>

<script setup>
import NewCustomButton from './NewCustomButton.vue';

</script>

<style scoped>
.card{
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FFF1;
  padding: 20px;
}

</style>