<template>
      <div class="body">
        <div class="header">
          <div class="edit" v-if="!editar && canProposta">  
            <Modal class="proposta" :open="isOpen" @close="isOpen = !isOpen">
              <form class="form" autocomplete="on">
                <SelectForm label="TIME:" v-model="selectedTeam" :list="list.map( (x) => { return x.nome_time})" default="Selecione o time"/>
                <span class="title">mensage:</span>
                <textarea name="" v-model="message"  id="" maxlength="300" placeholder="Olá..."></textarea>
                <div class="boton">
                  <img v-if="loading" style="height: 5vh;width: 5vh;" class="loading" src="../../assets/img/Rolling-1s-323px.svg">
                  <NewCustomButton label="ENVIAR" @onClick="proposta"  />
                </div>

            </form>
            </Modal>
            <NewCustomButton label="ENVIAR PROPOSTA" @onClick="isOpen = true"/>
          </div>
          <div v-if="editar" class="edit">
            <router-link to="/perfil/editar" >
              <NewCustomButton class="editar" label="EDITAR PERFIL"></NewCustomButton>
            </router-link>
          </div>
        </div>
        <div class="main">
          <div class="info" >
            <div class="icon">
              <miniIcon :image="src" size="29vh"/>
            </div>
            <h3 class="nome"><router-link class="select" :to="'/teams/' + timeAtual"><miniIcon :image="image"/></router-link>{{ nome }}</h3>
            <h4 class="nomeCompleto">{{ nomeCompleto }}</h4>
            <div v-if="orgExist">
              <p class="dono">DONO DA <router-link class="select" :to="'/org/' + id"> <span>{{ nome_organizacao }}</span> <mini-icon :image="srcLogo"/></router-link></p>
            </div>
            <div class="info_jogador" v-if="jogadorExist">
              <div class="card">
                <img :src="srcElo" alt="">
                <p>{{ elo }}</p>
                <h3>"{{ nickname }}"</h3>
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
            <div class="redes_container">
              <div class="redes_card" v-for="rede in redes" :key="rede.id">
                <div class="redes_icon">
                  <img :src="Rede[parseInt(rede.tipo)][1]" alt="">
                </div>
                <p>{{ rede.link }}</p>
              </div>
            </div>
            <div class="descricao">
              <p>{{ descricao }}</p>
            </div>
            <div>
              <div style=" display: flex; align-items: center; gap: 20px;">
                <h3>highlights:</h3>
                <Modal class="proposta" :open="addPost" @close="addPost = !addPost">
                <form class="form" autocomplete="on">
                  <NewInputForm label="Titulo" v-model="editPostValues.titulo"/>
                  <span class="title">Imagem:</span>
                  <ImageUpload :key="editPostValues" id="add" :normal="true" v-model="editPostValues.image"/>

                  <div class="boton">
                    <img v-if="loading" style="height: 5vh;width: 5vh;" class="loading" src="../../assets/img/Rolling-1s-323px.svg">
                    <new-custom-button label="SALVAR" @onClick="salvarPost"/>
                  </div>
                </form>
              </Modal>
                <new-custom-button v-if="editar" label="+" @onClick="newPost"/>
              </div>
              <Modal class="proposta" :open="isOpenEdit" @close="isOpenEdit = !isOpenEdit">
                <form class="form" autocomplete="on">
                  <NewInputForm label="Titulo" v-model="editPostValues.titulo"/>
                  <span class="title">Imagem:</span>
                  <ImageUpload :key="editPostValues.titulo" id="edit" :normal="true" :image="srcPost" v-model="editPostValues.image"/>

                  <div class="boton">
                    <img v-if="loading" style="height: 5vh;width: 5vh;" class="loading" src="../../assets/img/Rolling-1s-323px.svg">
                    <NewCustomButton label="SALVAR" @onClick="saveEditPost(editPostValues.id)"  />
                    <br>
                    <NewCustomButton label="APAGAR" @onClick="deletarPost"  />
                  </div>
                </form>
              </Modal>
              <div v-if="!loading" :key="redes.value" class="post_container">
                <div v-for=" post in posts" :key="post.id" class="post">
                  <div class="post_title">
                    <h3>{{ post.titulo }}</h3>
                    <img v-if="editar" width="32" height="32" src="https://img.icons8.com/material-sharp/FFFFFF/48/edit--v1.png" @click="editPost(post)" alt="edit--v1"/>
                  </div>
                  <div class="post_img">
                    <post-image :key="redes.value" :image="getImage(post.id)" size="100%" alt=""/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Rodape lined/>
      </div>
</template>

<script setup>
import { ref, watch } from "vue";
import router from "../../router";
import storage from '../../firebase/firebase.js'
import { ref as refFB , getDownloadURL, uploadBytes } from 'firebase/storage'
import { axiosPerfil } from "../../axios/axios";
import Rodape from '../../components/Rodape.vue'
import { Elo } from '../../components/enum/Elo';
import { Rede } from '../../components/enum/Rede'
import { Funcao } from '../../components/enum/Funcao'
import  miniIcon  from '../../components/miniIcon.vue'
import NewCustomButton from "../../components/NewCustomButton.vue";
import NewInputForm from "../../components/form/NewInputForm.vue";
import Modal from "../../components/popup/Modal.vue";
import SelectForm from "../../components/form/SelectForm.vue";
import { createToast } from 'mosha-vue-toastify';
import ImageUpload from "../../components/form/ImageUpload.vue";
import postImage from "../../components/postImage.vue"

const isOpen = ref(false)
let canProposta = ref(false)
const editar = ref(false)
const id = router.currentRoute.value.params.id
const idLocal = localStorage.getItem('id')
let list = ref([])
let selectedTeam = ref(0)
let message = ref('')
let loading = ref(false)
let addPost = ref(false)
let srcPost = ref('')


async function proposta(){
  if(!loading.value){  
    loading.value = true
    await axiosPerfil.post('offer/' + list[selectedTeam.value].id +'/'+ id, JSON.stringify({ menssage: message.value }))
    .then( (response) => {
      loading.value = false
      const message = 'Proposta Enviada!'
      createToast(message,{
        type : 'success',
        showIcon : true,
        position : "top-center"
      })
    }).catch((erro) => {
      console.log(erro);
      const message = 'Não foi possivel enviar a proposta!'
      loading.value = false
      createToast(message,{
        type : 'danger',
        showIcon : true,
        position : "top-center"
      })
    })}
}

async function getImage(id){
  
  let image = ""
  
  
  await getDownloadURL(refFB(storage, 'post/'+id)).then(
    (download_url) => ( image = download_url)
    ).catch( (erro) => {
      image =  "https://firebasestorage.googleapis.com/v0/b/proliseum-f06a1.appspot.com/o/Rectangle%2048.png?alt=media&token=ad4d5cb4-c92b-4414-8c2a-615d6deb4e8c"
    })
    
    return image
}



let src = ref('')
let srcCapa = ref('')
let nome = ref('nome')
let nomeCompleto = ref('nomecompleto')
let descricao = ref('Descricao')
let timeAtual = ref("")
let image = ref("")

let jogadorExist = ref(false)
let orgExist = ref(false)
let isOpenEdit = ref(false)

let jogo = ref('0')
let srcFuncao = ref(Funcao[parseInt(2)][1])
let elo = ref("Unranked")
let srcElo = ref(Elo[parseInt(0)][1])
let nickname = ref("")

let nome_organizacao = ref("")

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

let posts = ref([
  {
    id: 1,
    titulo: "a"
  },
  {
    id: 2,
    titulo: "b"
  },
])



if(localStorage.getItem('id') == id){
  editar.value = true
}
await axiosPerfil.get('profile/' + id )
.then( (response) => {
  
  const profile = response.data.user


  redes.value = profile.redeSocial
  posts.value = profile.highlights

  if(response.data.playerProfile){
    if(response.data.playerProfile.time_atual){
      timeAtual = response.data.playerProfile.time_atual.id
    }
  }
  nome = profile.nickname
  nomeCompleto = profile.nome_completo
  descricao = profile.biografia ? profile.biografia : ""

  if(response.data.playerProfile){
    jogadorExist = true
    const jogador = response.data.playerProfile

    elo = Elo[parseInt(jogador.elo)][0]
    nickname = jogador.nickname
    srcFuncao = Funcao[parseInt(jogador.funcao)][1]
    srcElo = Elo[parseInt(jogador.elo)][1]
    jogo = jogador.jogo
    nickname = jogador.nickname
  }else{
    jogadorExist = false
  }
  if(response.data.orgProfile){
    orgExist = true
    const org = response.data.orgProfile

    nome_organizacao = org.nome_organizacao

  }else{
    orgExist = false
  }
  
}).catch( (erro) => {

  console.log(erro);

  router.push({name: "Not_Found", params: { notFound: "perfil/" + id }})

})

await axiosPerfil.get('profile/' + idLocal )
.then( (response) => {
  if(response){
    canProposta = true
  }else{
    canProposta = false
  }
  
}).catch( (erro) => {

  console.log(erro);

  router.push({name: "Not_Found", params: { notFound: "perfil/" + id }})

})




await getDownloadURL(refFB(storage, id + '/capa')).then(
  (download_url) => ( srcCapa.value = "url("+download_url+")" )
).catch( (erro) => {
  srcCapa.value = "url(https://firebasestorage.googleapis.com/v0/b/proliseum-f06a1.appspot.com/o/Rectangle%2048.png?alt=media&token=ad4d5cb4-c92b-4414-8c2a-615d6deb4e8c&_gl=1*w1vlxx*_ga*MTU2NzgyOTI1Ni4xNjk1NzI0NjYy*_ga_CW55HF8NVT*MTY5NTk5NDgzNC45LjEuMTY5NTk5NDg3OS4xNS4wLjA.)"
})

await getDownloadURL(refFB(storage, id + '/profile')).then(
  (download_url) => ( src = download_url)
).catch( (erro) => {
  src =  "https://i.ibb.co/jVvMSHY/image-6.png"
})

let srcLogo = ref("")

await getDownloadURL(refFB(storage, id + '/orgprofile')).then(
  (download_url) => ( srcLogo = download_url)
).catch( (erro) => {
  srcLogo =  "https://i.ibb.co/jVvMSHY/image-6.png"
})

await getDownloadURL(refFB(storage,'team/'+ timeAtual + '/profile')).then(
  (download_url) => ( image = download_url)
).catch( (erro) => {
  image =  ""
})

if(!editar.value){

  await axiosPerfil.get('team/user/' + idLocal )
  .then( (response) => {
      list = response.data.teams
  })

}

let editPostValues = ref({
  titulo: "",
  id: 0,
  image: ""
})

async function newPost() {
    editPostValues.value = {
    titulo: "",
    image: ""
  }
  console.log(editPostValues.value);

  addPost.value = true
}


async function editPost(post) {
  console.log(post);
  isOpenEdit.value = true
  await getDownloadURL(refFB(storage,'post/'+post.id)).then(
  (download_url) => {  
    editPostValues.value.image = download_url
    srcPost.value = download_url
  }
  ).catch( (erro) => {
    editPostValues.value.image = ""
    srcPost.value = ""
  })
  editPostValues.value.titulo = post.titulo
  editPostValues.value.id = post.id
  console.log(editPostValues.value);
}

async function saveEditPost(id2) {
  loading.value = true
  await axiosPerfil.put('highlight/'+id2,{ titulo: editPostValues.value.titulo })
  .then( async (response) => {

    const storageRefProfile = refFB(storage, 'post/'+ id2)
    if(editPostValues.value.image != ''){
      console.log("oi");
      uploadBytes(storageRefProfile, editPostValues.value.image)
    }
    createToast('Highlight atualizado!',{
      type : 'success',
      showIcon : true,
      position : "top-center"
    })

    await axiosPerfil.get('profile/' + id )
    .then( (response) => {
      const profile = response.data.user
      posts.value = profile.highlights
      
    })

    loading.value = false
    isOpenEdit.value = !isOpenEdit.value

  })

}









async function salvarPost() {

  await axiosPerfil.post('highlight',{ titulo: editPostValues.value.titulo })
  .then( async (response) => {

    const storageRefProfile = refFB(storage, 'post/'+ response.data.id)
    if(editPostValues.value.image != ''){
      uploadBytes(storageRefProfile, editPostValues.value.image)
    }
    createToast('Highlight adicionado!',{
      type : 'success',
      showIcon : true,
      position : "top-center"
    })

    await axiosPerfil.get('profile/' + id )
    .then( (response) => {
      const profile = response.data.user
      redes.value = profile.redeSocial
      posts.value = profile.highlights
      
    })


    addPost.value = !addPost.value

  })

}

async function deletarPost(id2) {

  console.log(editPostValues.value);

  await axiosPerfil.delete('highlight/'+editPostValues.value.id,{ titulo: editPostValues.value.titulo })
  .then( async (response) => {

    const storageRefProfile = refFB(storage, 'post/'+ response.data.id)
    if(editPostValues.value.image != ''){
      uploadBytes(storageRefProfile, editPostValues.value.image)
    }
    createToast('Highlight retirado!',{
      type : 'success',
      showIcon : true,
      position : "top-center"
    })

    await axiosPerfil.get('profile/' + id )
    .then( (response) => {
      const profile = response.data.user
      posts.value = profile.highlights
      
    })


    isOpenEdit.value = false


  })

  
}


watch(isOpenEdit, async () => {

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
    padding: 0px 0px 0px 50px;
    
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
    gap: 30px;
    background-color: rgba(46, 44, 75, 0.58);
    padding: 20px;
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
  }
  .edit{
    display: flex;
    align-items: center;
    margin: 0px 30px 10px 0px;
    padding: 0px 5px 0px 5px;
    gap: 20px;
  }
  .edit img{
    width: 40px;
    height: 40px;
  }
  .dono{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
  }
  .select{
    color: #fff;
    display: flex;
    align-items: center;
  }

  .loading{
  height: 20vw;
}
.loading_div{
  display: grid;
  background-color: #0005;
  place-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
}
.boton{
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
  padding: 10px;
}

.post_container{
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
}

.post_img{
  padding: 20px;
  background-color: #0005;
  max-width: 50vw;
}

.post_img_edit{
  padding: 20px;
  background-color: #0005;
  width: 50%;
}

.post_img_edit img{
  width: 100%;
  cursor: pointer;
}

.post_img_img{
  max-width: 100%;
}

.post_title{
  display: flex;
  align-items: center;
}

.post_title img:hover{
 filter: brightness(0);
}

.info_jogador{
  background-color: #0002;
  padding: 20px;
}

.redes_container{
  padding-top: 20px;
  display: flex;
  gap: 20px;
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
