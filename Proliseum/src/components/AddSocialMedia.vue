<template>
  <div>
    <div class="redes_container">
      <div class="redes_card" v-for="rede in redes" :key="rede.id">
        <div class="redes_icon">
          <img :src="Rede[parseInt(rede.tipo)][1]" alt="">
        </div>
        <p>{{ rede.nome }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Rede } from './enum/Rede';

let redes = ref([
  {
    id: 1,
    tipo: 0,
    nome: "teste"
  },
  {
    id: 2,
    tipo: 1,
    nome: "teste2"
  },
])

</script>

<style scoped>

.redes_container{
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.redes_card{
  display: flex;
  align-items: center;
  gap: 5px;
}

.redes_icon{
  background-color: var(--red);
  border-radius: 10px;
  height: 6vh;
  width: 6vh;
  padding: 5px;
}
.redes_icon img{
  height: 100%;
}

</style>