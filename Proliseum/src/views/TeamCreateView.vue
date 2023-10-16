<template>
      <form class="body" autocomplete="off" @submit.prevent="handleSubmit($event)">
        <div class="preview">
          <div class="icon">
            <img  class="iconLarge" :key="eloSrc" :src="eloSrc">
          </div>
            <p>{{ time.nome }}</p>
            <div class="jogoInfo">
              <div class="jogoicon">
                <img src="https://img.icons8.com/?size=512&id=57606&format=png" alt="">
              </div>
            </div>
        </div>
        <span v-if="usuario == 'jogador'">*ISSO PODERÁ SER VISUALIZADO NO SEU PERFIL*</span>
        <div class="cadastro">
            <div>
            <span class="title">GAME:</span>
                <div class="jogo">
                <FormRatio name="jogo"  id="League of Legends" icon="https://img.icons8.com/?size=512&id=57606&format=png" :value="0" v-model="time.jogo" checked/>
            </div>
            </div>
            <new-input-form v-model="time.nome" label="NOME:" required/>
            <div>
            <span class="title">LOGO:</span>
                <image-upload id="teamPic" v-model="time.foto_perfil" />
            </div>
        </div>
        <div>
            <NewCustomButton type="submit" label="SALVAR"/>
        </div>
    </form>
</template>

<script setup>
import FormRatio from '../components/form/FormRatio.vue';
import NewInputForm from '../components/form/NewInputForm.vue';
import NewCustomButton from '../components/NewCustomButton.vue';
import ImageUpload from '../components/form/ImageUpload.vue';
import { ref, watch } from 'vue';
import SelectForm from '../components/form/SelectForm.vue';
import { Elo } from '../components/enum/Elo';
import { Funcao } from '../components/enum/Funcao'
import { createToast } from 'mosha-vue-toastify'
import { axiosPerfil } from "../axios/axios.js";




let usuario = ref("jogador")
const id = localStorage.getItem('id')

let time = ref({
    jogo: "0",
    nome: "",
    foto_perfil: "",
})



const edit = ref(false)
await axiosPerfil.get('profile/' + id )
.then( (response) => {
    if(response.data.playerProfile){
        edit.value = true
        const profile = response.data.playerProfile

        time.value.elo = profile.elo
        time.value.funcao = profile.funcao
        time.value.jogo = profile.jogo
        time.value.nome = profile.nickname
    }

})






let funcaoSrc = ref(Funcao[parseInt(time.value.funcao)][1])
let eloSrc = ref(Elo[parseInt(time.value.elo)][1])
let eloName = ref(Elo[parseInt(time.value.elo)][0])

watch(time.value , () => {
  console.log(time.value.foto_perfil);
  const reader = new FileReader()
  reader.readAsDataURL(time.value.foto_perfil)
  reader.onload = e =>{
  eloSrc.value =  e.target.result
  }
})



let organizador = ref({
    nome_organizacao: "",
    biografia: ""
})

const loading = ref(false)

async function handleSubmit () {
    if(!loading.value && !edit.value ){
        if(usuario.value == time){
            loading.value = true
            await axiosPerfil.post('createPlayer', JSON.stringify(time.value))
                .then( (response) => {
                loading.value = false
                const message = 'Perfil Criado!'
                createToast(message,{
                type : 'success',
                showIcon : true,
                position : "top-center"
                })
            })
            .catch( (error) => {
                loading.value = false
                console.log(error);
                console.log("error");

                createToast('Erro!',{
                type : 'warning',
                showIcon : true,
                position : "top-center"
                })
                }
                )
        }else{
            console.log(organizador.value);
        }

}else{
    if(!loading.value){
    loading.value = true
    if(usuario.value == time){
        await axiosPerfil.post('updatePlayer', JSON.stringify(time.value))
        .then( (response) => {
            loading.value = false
            const message = 'Perfil Criado!'
            createToast(message,{
            type : 'success',
            showIcon : true,
            position : "top-center"
            })
        })
        .catch( (error) => {
            loading.value = false
            console.log(error);
            console.log("error");

            createToast('Erro!',{
            type : 'warning',
            showIcon : true,
            position : "top-center"
            })
            }
            )
    }else{
        console.log(organizador.value);
    }

}

    
}

}


</script >

<style scoped>
    .body{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px;
        gap: 20px;
    }
    .cadastro{
        background-color: #0005;
        padding: 20px;
        display:  grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        width: 60vw;
    }
    .text{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .jogo{
        display: flex;
        gap: 20px;
    }
    .preview{
        min-height: 350px;
        min-width: 400px;
        background-color: #0005;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }
    .jogoInfo{
        display: flex;
        padding-top: 25px;
        gap: 50px;
    }
    .jogoicon{
        display: block;
        background-color: var(--red);
        border-radius: 10px;
        height: fit-content;
        width: fit-content;
        padding: 10px;
    }
    .elo{
        width: 10vw ;
        position: static;
    }
    .jogoicon img{
        width: 10vh;
        filter: brightness(0) saturate(100%)
    }
    .icon{
    clip-path: circle();
    display: grid;
    place-items: center;
    overflow: hidden;
    }
    .iconLarge{
    max-height: 30vh;
    min-height: 30vh;
    /* max-width: 18vw;
    min-width: 18vw; */
    overflow: hidden;
  }
</style>