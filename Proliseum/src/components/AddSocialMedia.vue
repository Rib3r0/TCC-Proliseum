<template>
  <div>
    <div style="display: flex; gap: 20px;">
      <select-form default="selecione"  :list="Rede.map( (x) => { return x[0]})" v-model="redToAdd.tipo"/>
      <new-input-form v-model="redToAdd.link"/>
      <new-custom-button label="ADICIONAR" @onClick="addRede"/>
    </div>
    <div class="redes_container">
      <div class="redes_card" v-for="rede in redes" :key="rede">
        <div class="redes_icon">
          <img :src="Rede[parseInt(rede.tipo)][1]" alt="">
        </div>
        <p>{{ rede.link }}</p><NewCustomButton label="EXCLUIR" size="0.5rem" @onClick="removeRede(rede.id)"/>
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
import { axiosPerfil } from '../axios/axios';
import { createToast } from 'mosha-vue-toastify';

const props = defineProps({
    list : {
        type : [Object],
    }
})



let redes = ref(props.list)

let redToAdd = ref({
  tipo: 0,
  link: ""
})

async function addRede(){
  console.log(redToAdd.value);
  await axiosPerfil.post('network',{tipo: redToAdd.value.tipo, link: redToAdd.value.link})
  .then( (response) => {

    console.log(response.data);

    createToast('Rede social Incerida',{
      type : 'success',
      showIcon : true,
      position : "top-center"
    })

  })

  redes.value.push(
    {
      id: response.data.id,
      tipo: redToAdd.value.tipo,
      link: redToAdd.value.link
    }
  )
}

async function removeRede(id){

  await axiosPerfil.delete('network/'+id)
  .then( (response) => {

    console.log(response.data);

    createToast('Rede excluida',{
      type : 'success',
      showIcon : true,
      position : "top-center"
    })

  })


  const index = redes.value.findIndex( x => id == x.id)
  console.log(id);
  redes.value.splice(index,1)
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