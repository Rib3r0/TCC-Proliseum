<template>
      <div class="body">
        <div class="header">
          <router-link to="/perfil/editar" >
            <div v-if="editar" class="edit">
              <img src="https://img.icons8.com/material-rounded/96/ffffff/create-new.png" alt="">
              <h1 class="editar">editar</h1>
            </div>
          </router-link>
        </div>
        <div class="main">
          <div class="info">
            <div class="icon">
              <img  class="iconLarge" :key="src" :src="src">
            </div>
            <h1 class="nome">{{ nome }}</h1>
            <h1 class="nomeCompleto">{{ nomeCompleto }}</h1>
            <div class="jogoInfo">
              <div class="jogo">
                <img src="https://img.icons8.com/?size=512&id=57606&format=png" alt="">
              </div>
              <div class="jogo">
                <img src="https://cdn3.emoji.gg/emojis/ADC.png" alt="">
              </div>
            </div>
          </div>
          <div class="main2">
            <div class="plusInfo">
              <div class="card">
                <h1>ATUALMENTE</h1>
                <img src="https://firebasestorage.googleapis.com/v0/b/proliseum-f06a1.appspot.com/o/default%2FTime.png?alt=media&token=577f8c90-3552-414a-9d11-a1313d2303a7" alt="">
                <p>{{ timeAtual }}</p>
              </div>
              <div class="card">
                <h1>ELO</h1>
                <img src="https://firebasestorage.googleapis.com/v0/b/proliseum-f06a1.appspot.com/o/default%2FTime.png?alt=media&token=577f8c90-3552-414a-9d11-a1313d2303a7" alt="">
                <p>{{ elo }}</p>
              </div>
            </div>
            <div class="descricao">
              <p>{{ descricao }}</p>
            </div>
            <!-- <div>
              <h1>highlights:</h1>
            </div> -->
          </div>
        </div>
        <Rodape lined/>
      </div>
</template>

<script setup>
import { ref } from "vue";
import router from "../router";
import storage from '../firebase/firebase.js'
import { ref as refFB , getDownloadURL } from 'firebase/storage'
import { axiosPerfil } from "../axios/axios";
import Rodape from '../components/Rodape.vue'


const editar = ref(false)
const id = router.currentRoute.value.params.id

let src = ref('')
let srcCapa = ref('')
let nome = ref('nome')
let nomeCompleto = ref('nomecompleto')
let descricao = ref('Descricao')
let jogo = ref('eae bl')
let funcao = ref('eae bl')
let timeAtual = ref("FA")
let elo = ref("Unranked")


if(localStorage.getItem('id') == id){
  editar.value = true
}
await axiosPerfil.get('profile/' + id )
.then( (response) => {
  const profile = response.data.user
  nome = profile.nickname
  nomeCompleto = profile.nome_completo
  descricao = profile.biografia ? profile.biografia : ""
  
})
await getDownloadURL(refFB(storage, id + '/capa')).then(
  (download_url) => ( srcCapa.value = "url("+download_url+")" )
).catch( (erro) => {
  srcCapa.value = "url(https://firebasestorage.googleapis.com/v0/b/proliseum-f06a1.appspot.com/o/Rectangle%2048.png?alt=media&token=ad4d5cb4-c92b-4414-8c2a-615d6deb4e8c&_gl=1*w1vlxx*_ga*MTU2NzgyOTI1Ni4xNjk1NzI0NjYy*_ga_CW55HF8NVT*MTY5NTk5NDgzNC45LjEuMTY5NTk5NDg3OS4xNS4wLjA.)"
})

await getDownloadURL(refFB(storage, id + '/profile')).then(
  (download_url) => ( src.value = download_url)
).catch( (erro) => {
  src.value =  "https://i.ibb.co/jVvMSHY/image-6.png"
})
  

</script>
  
<style scoped>
  .body{
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .header{
    height: 30vh;
    background-image: v-bind(srcCapa);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: grid;
    padding-right: 30px;
    place-items: end;
  }
  .editar{
    color: #fff;
    font-size: var(--font-description);
  }
  .main{
    display: grid;
    grid-template-columns: 40vh 1fr;
    padding: 0px 50px 0px 50px;
  }
  .info{
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateY(-14vh);
  }

  .iconLarge{
    max-height: 28vh;
    min-height: 28vh;
    overflow: hidden;
    clip-path: circle();
  }
  .icon{
    min-width: 30vh;
    min-height: 30vh;
    clip-path: circle();
    background-color: var(--background-color);
    display: grid;
    place-items: center;
    overflow: hidden;
  }
  .jogoInfo{
    display: flex;
    padding-top: 25px;
    gap: 50px;
  }
  .jogo{
    display: block;
    background-color: var(--red);
    border-radius: 10px;
    height: fit-content;
    width: fit-content;
    padding: 10px;
  }
  .jogo img{
    width: 10vh;
    filter: brightness(0) saturate(100%)
}

  .nome{
    font-size: var(--font-subtitle);
  }
  .nomeCompleto{
    font-size: var(--font-description);
  }
  .main2{
    display: flex;
    flex-direction: column;
    gap: 50px;
  }

  .plusInfo{
    display: flex;
    gap: 100px;
  }

  .card{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .card img{
    height: 12vh;
  }

  .descricao{
    display: block;
    background-color: #0002;
    border-radius: 10px;
    padding: 10px;
    width: 80%;
  }
  .edit{
    display: flex;
    align-items: center;
  }
  .edit img{
    width: 30px;
    height: 30px;
  }
</style>
