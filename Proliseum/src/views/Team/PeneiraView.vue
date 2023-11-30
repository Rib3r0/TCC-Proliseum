<template>
  <div>
    <!-- <div class="loading_div" v-if="loading">
      <img class="loading" src="../../assets/img/Rolling-1s-323px.svg">
    </div> -->
    <div class="body">
      <div class="header">
        <h2>INSCRITOS:</h2>
      </div>
      <div class="main">
        <template v-if="loading" >
          <div class="loading">
            <img v-if="loading" src="../../assets/img/Rolling-1s-323px.svg">
          </div>
        </template>
        <template v-else >
          <div class="preview" :key="cards.length">
            <div class="card_props" v-if="cards.length < 1">
              <div class="info_sem">
                <h2>NENHUM INSCRITO AINDA... &#128533;</h2>
              </div>
            </div>
          <div v-else class="card_props" v-for="card in cards" :key="card.id">
            <div class="info">
              <RouterLink :to="'/perfil/' + card.perfil_id.id">
                <div class="profile">
                  <miniIcon class="icon" :image="getImage(card.perfil_id.id)" size="10vw" />
                  <p>{{ card.nickname }}</p>
                </div>
              </RouterLink>
              <div class="info_buttons">
                <Newcustombutton label="ACEITAR" @onClick="accept(card.perfil_id.id)" />
                
                <Newcustombutton label="RECUSAR" @onClick="reject(card.perfil_id.id)" />
              </div>
            </div>
          </div>
          </div>
        </template>

      </div>
    </div>
  </div>
  
  
</template>

<script setup>
import Rodape from '../../components/Rodape.vue';
import Newcustombutton from '../../components/NewCustomButton.vue';
import miniIcon from '../../components/miniIcon.vue';
import { nextTick, ref } from 'vue';
import storage from '../../firebase/firebase.js'
import { ref as refFB , getDownloadURL } from 'firebase/storage'
import { axiosPerfil } from '../../axios/axios';
import { createToast } from 'mosha-vue-toastify';
import router from '../../router';


const props = defineProps({
  team: {
    type : Number,
    required: true
  }
})




const id = localStorage.getItem('id');
const loading = ref(true)

const getImage = async (id) =>{
  
  let image
  
  await getDownloadURL(refFB(storage, id + '/profile')).then(
    (download_url) => ( image = download_url)
    ).catch( (erro) => {
      image =  "https://i.ibb.co/jVvMSHY/image-6.png"
    })
    
    return image
}

let cards = ref([]);

nextTick( async () => {
  await axiosPerfil.get('sieve/' + props.team)
  .then( (response) => {
    console.log(response.data);
    if(response.data.acepted[0]){
      cards.value = response.data.acepted[0].jogadores
    }
    loading.value = false
  }).catch( () => {
    loading.value = false
  })
  loading.value = false
})


async function accept (id2){
  if(!loading.value){ 
      loading.value = true
      await axiosPerfil.delete('offer/' + id2 + '/1')
      .then( (response) => {
        console.log(response.data);
        loading.value = false 
        const message = 'Jogador Aceito!'
          createToast(message,{
            type : 'success',
            showIcon : true,
            position : "top-center"
          })
          const index = cards.value.findIndex( x => id2 == x.id)
          cards.value.splice(index,1)
      }).catch( (erro) => {
        loading.value = false
        console.log(erro);
          createToast(erro.data.error,{
            type : 'danger',
            showIcon : true,
            position : "top-center"
          })
      })
    }
  
}
async function reject(id2){
  if(!loading.value){ 
      loading.value = true 

      await axiosPerfil.delete('offer/' + id2 + '/0')
      .then( (response) => {
        loading.value = false 
        const message = 'Jogador Recusado!'
          createToast(message,{
            showIcon : true,
            position : "top-center"
          })

          const index = cards.value.findIndex( x => id2 == x.id)
          cards.value.splice(index,1)
       
      }).catch( () => {
        loading = false
        const message = 'Erro!'
          createToast(message,{
            type : 'danger',
            showIcon : true,
            position : "top-center"
          })
      })
    }
}

</script>

<style scoped>
.body{
  width: 100%;
}

.preview{
  display: flex;
  flex-wrap: wrap;
}

.header{
  background-image: url(../../assets/img/backgroundHome.png);
  background-repeat: no-repeat;
  background-size: cover, contain;
  background-position: 50% 20%;
  height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}


.main{
  min-height: 100vh;
}

.card_props{
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: center;
  width: fit-content;
}
.profile{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: #FFF;
}



.info{
  background-color: #0005;
  padding: 20px;
  border-radius: 20px;
  max-width: 25vw;
  min-height: 16vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

.info_buttons{
  display: flex;
  width: 100%;
  justify-content: end;
  gap: 20px;
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

.new{
  padding: 20px;
}

.loading{
  height: 10vh;
  display: grid;
  place-items: center;
}
.loading_div{
  display: grid;
  background-color: #0005;
  place-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
}
</style>