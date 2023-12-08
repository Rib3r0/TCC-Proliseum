<template>
    <div class="body">
      <div class="header">
        <h1>VAGAS</h1>
      </div>
      <div class="main">
        <div class="main_header">
          <div class="main_header">
            <div>
              <h4>ELO MINIMO</h4>
              <select-form default="elo minimo" :list="Elo.map( (x) => { return x[0]})" v-model="elo"/>
            </div>
            <div>
              <h4>DISPONIBILIDADE A PARTIR</h4>
              <NewInputForm  type="time" v-model="horario"/>
            </div>
            <div>
              <h4>FUNÇÃO</h4>
              <select-form default="função" :list="Funcao.map( (x) => { return x[0]})" v-model="funcao"/>
            </div>
          </div>
          <Newcustombutton @onClick="filter" label="BUSCAR" size="1vw"/>
        </div>
        <div class="aviso" v-if="!hasJogador && !isOnTeam">
          <p>PARA SE INSCREVER É NECESSARIO UM PERFIL DE JOGADOR, CRIE <router-link to="/edit">AQUI.</router-link></p>
        </div>
        <div class="main_main">
          
          <Newcustombutton v-if="hasTeam" class="new" @onClick="isOpen = true" label="MINHA POSTAGEM"/>
          <Modal :open="isOpen" @close="isOpen = !isOpen">
            <form class="body" autocomplete="off" @submit.prevent="handleSubmit">
              <SelectForm label="TIME:" v-model="selectedTeam" :list="list.map( (x) => { return x.nome_time})" default="Selecione o time"/>
              <div v-if=" selectedTeam != '' " class="preview" :key="selectedTeam">
                <div class="card_props">
                  <div class="profile">
                    <router-link :to="'/teams/' + card.time">
                      <miniIcon class="icon" :image="getImage(card.time)" size="10vw" />
                      <p>{{ card.n }}</p>
                    </router-link>
                  </div>
                  <div class="info">
                    <div class="description">
                      <p>{{ card.descricao }}</p>
                    </div>
                    <div class="info_main">
                      <div class="info_card">
                        <h3>ELO</h3>
                        <img :src="Elo[parseInt(card.elo)][1]" alt="" />
                        <p>{{ Elo[parseInt(card.elo)][0] }}</p>
                      </div>
                      <div class="info_card">
                        <h3>FUNÇÃO</h3>
                        <img :src="Funcao[parseInt(card.funcao)][1]" alt="" />
                        <p>{{ Funcao[parseInt(card.funcao)][0] }}</p>
                      </div>
                      <div class="info_card">
                        <h3>HORARIO</h3>
                        <h4>{{ card.hora }}</h4>
                      </div>
                      <div class="info_card">
                        <h3>PROS</h3>
                        <p>{{ card.pros }}</p>
                      </div>
                    </div>
                    <div class="info_buttons">
                      <Newcustombutton label="INSCREVER-SE" />
                    </div>
                  </div>
                </div>
              </div>
              <div>

              </div>
              <span v-if=" selectedTeam != '' ">*ISSO PODERÁ SER VISUALIZADO NO POST*</span>
              <div v-if=" selectedTeam != '' " class="cadastro">
                <div class="text">
                  <h4>ELO MINIMO</h4>
                  <select-form default="elo minimo" :list="Elo.map( (x) => { return x[0]})" v-model="card.elo"/>
                </div>
                <div class="text">
                  <h4>FUNÇÃO</h4>
                  <select-form default="função" :list="Funcao.map( (x) => { return x[0]})" v-model="card.funcao"/>
                </div>
                <div class="text">
                  <span class="title">DESCRIÇÃO:</span>
                  <textarea name="desc" v-model="card.descricao"  id="desc" maxlength="300" placeholder="olá..."></textarea>
                </div>
                <NewInputForm label="horario" v-model="card.hora" type="time"/>
                <div class="text">
                  <span class="title">Prós:</span>
                  <textarea name="pros" v-model="card.pros"  id="pros" maxlength="300" placeholder="Tranquilo..."></textarea>
                </div>
              </div>
              <div class="boton">
                <img v-if="loading" src="../../assets/img/Rolling-1s-323px.svg" />
                <Newcustombutton v-if=" selectedTeam != '' " type="submit" label="SALVAR" />
                <Newcustombutton v-if=" selectedTeam != '' " @onClick="remove(card.time)" label="RETIRAR" />
              </div>
            </form>
            <peneira-view :key="card.id" :team="card.id" v-if=" selectedTeam != '' "/>
          </Modal>
          <template v-if="loading" >
            <img v-if="loading" src="../../assets/img/Rolling-1s-323px.svg">
          </template>
          <template v-else>
            <div v-if="cards.length < 1" class="card_props">
              <div class="info">
                <div class="info_sem">
                  <h3>AINDA NÃO HÁ VAGAS DISPONÍVEIS... &#128531;</h3>
                </div>
              </div>
            </div>
            <div class="card_props" v-for="card in cards" :key="card.id">
              <div class="profile">
                <router-link class="profile" :to="'/teams/' + card.time.id"> 
                  <miniIcon class="icon" :image="getImage(card.time.id)" size="10vw"/>
                  <p>{{ card.time.nome_time}}</p>
                </router-link>
              </div>
              <div class="info">
                <div class="description"><p>{{ card.descricao }}</p></div>
                <div class="info_main">
                  <div class="info_card">
                    <h3>ELO</h3>
                    <img :src="Elo[parseInt(card.elo)][1]" alt="">
                    <p>{{ Elo[parseInt(card.elo)][0] }}</p>
                  </div>
                  <div class="info_card">
                    <h3>FUNÇÃO</h3>
                    <img :src="Funcao[parseInt(card.funcao)][1]" alt="">
                    <p>{{ Funcao[parseInt(card.funcao)][0] }}</p>
                  </div>
                  <div class="info_card">
                    <h3>HORARIO</h3>
                    <h4>{{ card.hora }}</h4>
                  </div>
                  <div class="info_card">
                    <h3>PROS</h3>
                    <p>{{ card.pros }}</p>
                  </div>

                </div>
                <div class="info_buttons">
                  <Newcustombutton v-if="!isOnTeam && hasJogador" label="INSCREVER-SE" @onClick="subscribe(card.time.id)"/>
                </div>
              </div>
            </div>
          </template>
          <div class="pagination">
            <pagination :elements="limit" :key="cards" :per-page="perPage" v-model="page"/>
          </div>
        </div>
      </div>
      <rodape lined/>
    </div>
  </template>
  
  <script setup>
  import SelectForm from '../../components/form/SelectForm.vue'
  import Rodape from '../../components/Rodape.vue';
  import { Elo } from '../../components/enum/Elo'
  import { Funcao } from '../../components/enum/Funcao'
  import NewInputForm from '../../components/form/NewInputForm.vue'
  import Newcustombutton from '../../components/NewCustomButton.vue';
  import miniIcon from '../../components/miniIcon.vue';
  import { nextTick, ref, watch } from 'vue';
  import storage from '../../firebase/firebase.js'
  import { ref as refFB , getDownloadURL } from 'firebase/storage'
  import Modal from '../../components/popup/Modal.vue';
  import { axiosPerfil } from '../../axios/axios.js';
  import Pagination from '../../components/Pagination.vue';
  import { createToast } from 'mosha-vue-toastify';
  import PeneiraView from './PeneiraView.vue';

  const id = localStorage.getItem('id');
  let hasJogador = ref(false)
  const isOpen= ref(false)
  const perfilExist = ref(false);
  const elo = ref('')
  const horario = ref('')
  const funcao = ref('')
  let loading = ref(true)
  let selectedTeam = ref(0)
  let list = ref([])
  const perPage = ref(5)
  const page = ref(1)
  let limit = ref(0)
  const hasTeam = ref(false)
  const editPost = ref(false)
  const isOnTeam = ref(false)
  
  let cards = ref([])
  
const getImage = async (id) =>{
    
    let image
    
    await getDownloadURL(refFB(storage,'team/' + id + '/profile')).then(
      (download_url) => ( image = download_url)
      ).catch( (erro) => {
        image =  "https://i.ibb.co/jVvMSHY/image-6.png"
      })
      
      return image
      
      
}
  
  
let card = ref({
    id: 0,
    jogo: '0',
    elo: '0',
    descricao: '',
    funcao: '0',
    hora: '00:00',
    pros: '',
    tipo: true,
    time: 0
  });

watch(page, async() => {
  loading.value = true
  await axiosPerfil.get('post/1',{ params: { perPage: perPage.value , page: page.value } }).then( (response) => {
    cards = response.data.post
    loading.value = false
})
} )

  
  
  
nextTick( async () => {
    await axiosPerfil.get('profile/' + id).then(async (response) => {
      if(response.data.playerProfile){
        hasJogador.value = true
        if(response.data.playerProfile.time_atual){
          isOnTeam.value = true
        }
        
      }
      
    });
    await axiosPerfil.get('/team/user/' + id).then(async (response) => {
      list.value = response.data.teams
      if(list.value.length > 0){
        hasTeam.value = true
      }
    })

    await axiosPerfil.get('post/1',{ params: { perPage: perPage.value , page: page.value } })
      .then(async (response) => {
        console.log(response.data);
    cards.value = response.data.post
    console.log(cards.value)
    limit.value = response.data.limit
    })

    loading.value = false
    
})
  

  
async function remove(id){
  if(!loading.value){
    loading.value = true
    await axiosPerfil.delete('post',{ params: { time: id }}).then(async (response) => {
      const message = 'postagem retidada!'
      loading.value = false
      createToast(message,{
        type : 'success',
        showIcon : true,
        position : "top-center"
      })

      isOpen.value = !isOpen.value
      loading.value = true

      await axiosPerfil.get('post/1',{ params: { perPage: perPage.value , page: page.value } })
        .then(async (response) => {
        cards = response.data.post
        limit = response.data.limit
        loading.value = false
      })


    }).catch( (error) => {
      console.log(error);
      loading.value = false
    })
    loading.value = false
  }
}
  
watch(selectedTeam, async() => {
  card.value.name = list.value[selectedTeam.value].nome_time
  card.value.time= list.value[selectedTeam.value].id

  await axiosPerfil.get('post/time/'+ card.value.time)
      .then(async (response) => {
        if(response.data.postProfile){
          let time = card.value.time
          card.value = response.data.postProfile
          card.value.time = time
          editPost.value = true
        }else{
          card.value = {
              time: list.value[selectedTeam.value].id,
              id: 0,
              jogo: '0',
              elo: '0',
              descricao: '',
              funcao: '0',
              hora: '00:00',
              pros: '',
              tipo: true
            }
            editPost.value = false
        }
        
    }
  )

} )
  

async function handleSubmit () {
    if(!loading.value){
        loading.value = true
        if(!editPost.value){
            await axiosPerfil.post('post', JSON.stringify(card.value))
                .then( async (response) => {
                loading.value = false
                const message = 'Post Criado!'
                createToast(message,{
                type : 'success',
                showIcon : true,
                position : "top-center"
                })
                isOpen.value = !isOpen.value
                loading.value = true

                await axiosPerfil.get('post/1',{ params: { perPage: perPage.value , page: page.value } })
                  .then(async (response) => {
                  cards.value = response.data.post
                  limit.value = response.data.limit
                  loading.value = false
                })

            })
            .catch( (error) => {
                loading.value = false
                console.log(error);
                createToast('Erro!',{
                type : 'warning',
                showIcon : true,
                position : "top-center"
                })
                }
                )
        }else{
            await axiosPerfil.put('post', JSON.stringify(card.value),{params: { time: card.value.id }})
            .then( async (response) => {
                loading.value = false
                const message = 'Post Atualizado!'
                createToast(message,{
                type : 'success',
                showIcon : true,
                position : "top-center"
                })
                isOpen.value = !isOpen.value
                loading.value = true

                await axiosPerfil.get('post/1',{ params: { perPage: perPage.value , page: page.value } })
                  .then(async (response) => {
                cards = response.data.post
                limit = response.data.limit
                loading.value = false
                })

            })
            .catch( (error) => {
                loading.value = false
                console.log(error);

                createToast('Erro!',{
                type : 'warning',
                showIcon : true,
                position : "top-center"
                })
                }
                )
        }
    }

}
  


async function filter() {
  loading.value = true
  await axiosPerfil.get('post/1',{ params: { perPage: perPage.value , page: page.value, elo: elo.value, funcao: funcao.value, hora: horario.value } })
      .then(async (response) => {
    cards.value = response.data.post
    limit.value = response.data.limit
    loading.value = false
  }
  )
  
}


async function subscribe(idTime){

  if(!loading.value){
    loading.value = true
    await axiosPerfil.put('sieve/'+ idTime)
      .then(async (response) => {
        createToast('Você foi inscrito!',{
          type : "success",
          showIcon : true,
          position : "top-center"
        })
        loading.value = false
      })
      .catch( (error) => {
        console.log(error);
        createToast(error.response.data.error,{
          type : "warning",
          showIcon : true,
          position : "top-center"
        })
        loading.value = false

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
  .main_header{
    display: flex;
    gap: 20px;
    padding: 10px;
    max-width: 100%;
    align-items: center;
  }
  
  
  
  .main_main{
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  
  .card_props{
    display: flex;
    padding: 20px;
    align-items: center;
    height: fit-content;
  }
  .profile{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    color: #fff;
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
  
  .info_buttons{
    display: flex;
    width: 100%;
    justify-content: end;
  }
  .info_main{
    display: flex;
    justify-content: space-evenly;
  }
  
  .info_card{
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 10vw;
  }
  
  .info_card img{
    height: 5vw;
  }
  
  .new{
    padding: 20px;
  }
  
  .aviso{
    display: flex;
    justify-content: center;
    background-color: #FFF1;
    padding: 10px;
    margin-bottom: 10px;
  }


.boton{
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
  padding: 10px;
}

.boton img{
  height: 50px;
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


  </style>