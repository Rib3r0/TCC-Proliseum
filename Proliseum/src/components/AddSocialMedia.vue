<template>
  <div>
    <div style="display: flex; gap: 20px;">
      <select-form default="selcione" :list="Rede.map( (x) => { return x[0]})" v-model="redToAdd.tipo"/>
      <new-input-form v-model="redToAdd.nome"/>
      <new-custom-button label="ADICIONAR" @onClick="addRede"/>
    </div>
    <div class="redes_container">
      <div class="redes_card" v-for="rede in redes" :key="rede">
        <div class="redes_icon">
          <img :src="Rede[parseInt(rede.tipo)][1]" alt="">
        </div>
        <p>{{ rede.nome }}</p><NewCustomButton label="EXCLUIR" size="0.5rem" @onClick="removeRede(redes.findIndex( x => rede == x))"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Rede } from './enum/Rede';
import SelectForm from './form/SelectForm.vue';
import NewInputForm from './form/NewInputForm.vue';
import NewCustomButton from './NewCustomButton.vue';

let redes = ref([
  {
    tipo: 0,
    nome: "teste"
  },
  {
    tipo: 1,
    nome: "teste2"
  },
])

let redToAdd = ref({
  id: 3,
  tipo: 0,
  nome: ""
})

async function addRede(){
  console.log(redToAdd.value);
  redes.value.push(
    {
      id: 3,
      tipo: redToAdd.value.tipo,
      nome: redToAdd.value.nome
    }
  )
}

async function removeRede(id){
  console.log(id);
  redes.value.splice(id,1)
}

</script>

<style scoped>

.redes_container{
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
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