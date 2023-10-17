<template>
      <form class="body" autocomplete="off" @submit.prevent="handleSubmit($event)">
        <div class="preview">
          <div class="icon">
            <img  class="iconLarge" :key="logosrc" :src="logosrc">
          </div>
            <h3>"{{ nome_time }}"</h3>
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
            <new-input-form v-model="nome_time" label="NOME:" required/>
            <div>
            <span class="title">LOGO:</span>
                <image-upload id="teamPic" v-model="time.foto_perfil" :image="logosrc" />
            </div>
            <div>
                <span class="title">BIO:</span>
                <textarea name="" v-model="time.biografia" id="" maxlength="300" placeholder="Bio..."></textarea>
            </div>
            <div class="list">
                <new-input-form label="convidar jogador" icon="https://img.icons8.com/ios-filled/250/search--v1.png"/>
                <h4>JOGADORES [1/10]:</h4>
                <div class="jogador">
                    <mini-icon image="" />
                    <span>nome</span>
                    <img class="exclude" src="https://img.icons8.com/ios-filled/50/FFFFFF/multiply.png" alt="">
                </div>
            </div>
            <div class="list">
                <new-input-form label="mover jogador" icon="https://img.icons8.com/ios-glyphs/90/user--v1.png"/>
                <h4>JOGADORES ATIVOS [1/5]:</h4>
                <div class="jogador">
                    <mini-icon image="" />
                    <span>nome</span>
                    <img class="exclude" src="https://img.icons8.com/ios-filled/50/FFFFFF/multiply.png" alt="">
                </div>
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
import miniIcon from '../components/miniIcon.vue';



let usuario = ref("jogador")
const id = localStorage.getItem('id')

let nome_time = ref("")

let time = ref({
    jogo: "0",
    nome: "",
    foto_perfil: "",
    biografia: ""
})


let logosrc = ref("https://i.ibb.co/jVvMSHY/image-6.png")

watch(time.value , () => {
  const reader = new FileReader()
  reader.readAsDataURL(time.value.foto_perfil)
  reader.onload = e =>{
  logosrc.value =  e.target.result
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

    .jogador{
        display: flex;
        align-items: center;
        gap: 20px;
    }
    .list{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .exclude:hover{
        filter: opacity(50%);
    }
</style>