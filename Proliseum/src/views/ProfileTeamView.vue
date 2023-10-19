<template>
    <div class="body">
      <div class="header">
        <router-link :to="'/teams/editar/'+ id" >
          <div v-if="editar" class="edit">
            <img src="https://img.icons8.com/material-rounded/96/ffffff/create-new.png" alt="">
            <h4 class="editar">editar</h4>
          </div>
        </router-link>
      </div>
      <div class="main">
        <div class="info" >
          <div class="icon">
            <img  class="iconLarge" :key="src" :src="src">
          </div>
          <h3 class="nome"> <img src="https://firebasestorage.googleapis.com/v0/b/proliseum-f06a1.appspot.com/o/default%2FTime.png?alt=media&token=577f8c90-3552-414a-9d11-a1313d2303a7" alt="">{{ nome }}</h3>
          <h4 class="nomeCompleto">gerenciado por {{ nomeCompleto }}</h4>
          <div class="jogo">
            <img src="https://img.icons8.com/?size=512&id=57606&format=png" alt="">
          </div>
          <div v-if="jogadorExist">
            <div class="card">
              <img :src="srcElo" alt="">
              <p>{{ elo }}</p>
            </div>
            <div class="jogoInfo">
              <div class="jogo">
                <img src="https://img.icons8.com/?size=512&id=57606&format=png" alt="">
              </div>
              <div class="jogo">
                <img :src="srcFuncao" alt="">
              </div>
            </div>
          </div>

        </div>
        <div class="main2">
          <div class="descricao">
            <p>{{ descricao }}</p>
          </div>
          <div>
            <h3>highlights:</h3>
          </div>
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
import { Elo } from '../components/enum/Elo';
import { Funcao } from '../components/enum/Funcao'


const editar = ref(false)
const id = router.currentRoute.value.params.id

let src = ref('')
let srcCapa = ref('')
let nome = ref('nome')
let nomeCompleto = ref('nomecompleto')
let descricao = ref('Descricao')
let timeAtual = ref("FA")

let jogadorExist = ref(false)

let jogo = ref('0')
let srcFuncao = ref(Funcao[parseInt(2)][1])
let elo = ref("Unranked")
let srcElo = ref(Elo[parseInt(0)][1])
let nickname = ref("")


if(localStorage.getItem('id') == await axiosPerfil.get('team')){

}
await axiosPerfil.get('team/' + id )
.then( (response) => {
  const profile = response.data.teams[0]
  nome = profile.nome_time
  nomeCompleto = profile.organizacao.nome_organizacao
  if(localStorage.getItem('id') == profile.organizacao.dono_id.id){
    editar.value = true
  }
  descricao = profile.biografia ? profile.biografia : ""

// if(response.data.playerProfile){
//   jogadorExist = true
//   const jogador = response.data.playerProfile

//   elo = Elo[parseInt(jogador.elo)][0]
//   srcFuncao = Funcao[parseInt(jogador.funcao)][1]
//   srcElo = Elo[parseInt(jogador.elo)][1]
//   jogo = jogador.jogo
//   nickname = jogador.nickname
// }else{
//   jogadorExist = false
// }

})
await getDownloadURL(refFB(storage,'team/'+ id + '/capa')).then(
(download_url) => ( srcCapa.value = "url("+download_url+")" )
).catch( (erro) => {
srcCapa.value = "url(https://firebasestorage.googleapis.com/v0/b/proliseum-f06a1.appspot.com/o/Rectangle%2048.png?alt=media&token=ad4d5cb4-c92b-4414-8c2a-615d6deb4e8c&_gl=1*w1vlxx*_ga*MTU2NzgyOTI1Ni4xNjk1NzI0NjYy*_ga_CW55HF8NVT*MTY5NTk5NDgzNC45LjEuMTY5NTk5NDg3OS4xNS4wLjA.)"
})

await getDownloadURL(refFB(storage, 'team/'+ id + '/profile')).then(
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
  height: 45vh;
  background-image: v-bind(srcCapa);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: grid;

  place-items: end;
}
.editar{
  color: #fff;
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
  transform: translateY(-16vh);
  gap: 10px;
  width: 20vw;
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
  display: flex;
  align-items: center;
  gap: 10px;
  transform: translateX(-30px);
  word-break: break-all;
}
.nome img{
  height: 8vh;
}
.nomeCompleto{
  color: #fff5;
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
  height: 20vh;
}

.descricao{
  display: block;
  background-color: #0002;
  border-radius: 10px;
  max-width: 50vw;
  min-height: 200px;
  padding: 10px;
  width: 80%;
  word-break: break-all;
  margin-top: 20px;
}
.edit{
  display: flex;
  align-items: center;
  background: #0008;
  margin: 0px 30px 10px 0px;
  padding: 0px 5px 0px 5px;
}
.edit img{
  width: 40px;
  height: 40px;
}
</style>
