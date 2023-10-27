<template>
  <div class="loading_div" v-if="loading">
    <img class="loading" src="../../assets/img/Rolling-1s-323px.svg">
  </div>
  <div class="body">
    <div class="header">
      <h1>Propostas</h1>
    </div>
    <div class="main">
      <div class="preview">
        <div class="card_props" v-if="cards.length < 1">
          <div class="info_sem">
            <h2>NENHUMA PROPOSTA ATIVA</h2>
          </div>
        </div>
      <div class="card_props" v-for="card in cards" :key="card.id">
        <div class="profile">
          <miniIcon class="icon" :image="getImage(card.de.id)" size="10vw" />
          <p>{{ card.de.nome_time }}</p>
        </div>
        <div class="info">
          <div class="description">
            <p>{{ card.menssagem }}</p>
          </div>
          <div class="info_buttons">
            <Newcustombutton label="ACEITAR PROPOSTA" @onClick="accept(card.de.id)" />
            
            <Newcustombutton label="RECUSAR PROPOSTA" @onClick="reject(card.de.id)" />
          </div>
        </div>
      </div>
      </div>
          
     
    </div>
    <rodape lined/>
  </div>
  
</template>

<script setup>
import Rodape from '../../components/Rodape.vue';
import Newcustombutton from '../../components/NewCustomButton.vue';
import miniIcon from '../../components/miniIcon.vue';
import { ref } from 'vue';
import storage from '../../firebase/firebase.js'
import { ref as refFB , getDownloadURL } from 'firebase/storage'
import { axiosPerfil } from '../../axios/axios';
import router from '../../router';
import { createToast } from 'mosha-vue-toastify';




const id = localStorage.getItem('id');
let loading = ref(false)
const getImage = async (id) =>{
  
  let image
  
  await getDownloadURL(refFB(storage,'team/'+ id + '/profile')).then(
    (download_url) => ( image = download_url)
    ).catch( (erro) => {
      image =  "https://i.ibb.co/jVvMSHY/image-6.png"
    })
    
    return image
    
    
  }

let cards = ref([]);

await axiosPerfil.get('offer')
  .then( (response) => {
    console.log(response.data.propostas);
    cards = response.data.propostas
  })




async function accept (id2)  {
  if(!loading.value){ 
      loading = true 
      await axiosPerfil.delete('offer/' + id2 + '/1')
      .then( (response) => {
        console.log(response.data);
        loading = false 
        router.go(router.currentRoute)
        const message = 'Proposta Aceita!'
          createToast(message,{
            type : 'success',
            showIcon : true,
            position : "top-center"
          })
      }).catch( (erro) => {
        loading = false
        console.log(erro);
        const message = 'Erro!'
          createToast(message,{
            type : 'danger',
            showIcon : true,
            position : "top-center"
          })
      })
    }
  
}
async function reject(id2){
  if(!loading){ 
      loading = true 
      await axiosPerfil.delete('offer/' + id2 + '/0')
      .then( (response) => {
        loading = false 
        router.go(router.currentRoute)
        const message = 'Proposta Aceita!'
          createToast(message,{
            type : 'success',
            showIcon : true,
            position : "top-center"
          })
       
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

.header{
  background-image: url(../../assets/img/backgroundHome.png);
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

.card_props{
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: center;
}
.profile{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}



.info{
  background-color: #0005;
  padding: 20px;
  border-radius: 20px;
  min-width: 70vw;
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