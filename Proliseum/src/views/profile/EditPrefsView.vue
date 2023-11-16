<template>
    <form class="body" autocomplete="off" @submit.prevent="handleSubmit($event)">
        <div class="preview"   >
            <img class="elo" :src="eloSrc" alt="" srcset="">
            <p>{{ eloName }}</p>
            <h3>"{{ jogador.nickname }}"</h3>
            <div class="jogoInfo">
              <div class="jogoicon">
                <img src="https://img.icons8.com/?size=512&id=57606&format=png" alt="">
              </div>
              <div class="jogoicon">
                <img :src="funcaoSrc" alt="">
              </div>
            </div>
        </div>
        <span>*ISSO PODERÁ SER VISUALIZADO NO SEU PERFIL*</span>
        <div class="cadastro" >
            <div>
            <span class="title">GAME:</span>
                <div class="jogo">
                <FormRatio name="jogo"  id="League of Legends" icon="https://img.icons8.com/?size=512&id=57606&format=png" :value="0" v-model="jogador.jogo" checked/>
            </div>
            </div>
            <new-input-form v-model="jogador.nickname" label="NICKNAME:" required/>
            <div>
            <span class="title">FUNÇÃO:</span>
                <div class="jogo">
                    <FormRatio name="funcao"  id="top" icon="https://cdn3.emoji.gg/emojis/TopLane.png" :value="0" v-model="jogador.funcao" :checked="jogador.funcao == 0 ? true : false"/>
                    <FormRatio name="funcao"  id="jg" icon="https://cdn3.emoji.gg/emojis/Jungle.png" :value="1" v-model="jogador.funcao" :checked="jogador.funcao == 1 ? true : false"/>
                    <FormRatio name="funcao"  id="mid" icon="https://cdn3.emoji.gg/emojis/MidLane.png" :value="2" v-model="jogador.funcao" :checked="jogador.funcao == 2 ? true : false"/>
                    <FormRatio name="funcao"  id="adc" icon="https://cdn3.emoji.gg/emojis/ADC.png" :value="3" v-model="jogador.funcao" :checked="jogador.funcao == 3 ? true : false"/>
                    <FormRatio name="funcao"  id="sup" icon="https://cdn3.emoji.gg/emojis/Support.png" :value="4" v-model="jogador.funcao" :checked="jogador.funcao == 4 ? true : false"/>
                </div>
            </div>
            <SelectForm name="elo" label="ELO:" :list="Elo.map( (x) => { return x[0]})" :selected="Elo.map( (x) => { return x[0]})[jogador.elo]" default="Porfavor informe o seu elo" v-model="jogador.elo"/>
        </div>
        <div class="button_div">
            <NewCustomButton type="submit" label="SALVAR"/>
            <img v-if="loading" src="../../assets/img/Rolling-1s-323px.svg">
            <NewCustomButton @onClick="deleteProfile" :label="'EXCLUIR PERFIL DE JOGADOR'"/>
        </div>
    </form>
</template>

<script setup>
import FormRatio from '../../components/form/FormRatio.vue';
import NewInputForm from '../../components/form/NewInputForm.vue';
import NewCustomButton from '../../components/NewCustomButton.vue';
import { ref, watch } from 'vue';
import SelectForm from '../../components/form/SelectForm.vue';
import { Elo } from '../../components/enum/Elo';
import { Funcao } from '../../components/enum/Funcao'
import { createToast } from 'mosha-vue-toastify'
import { axiosPerfil } from "../../axios/axios.js";
import router from '../../router';

const id = localStorage.getItem('id')

let jogador = ref({
    elo: "0",
    jogo: "0",
    funcao: "0",
    nickname: "",
})

const editJogador = ref(false)
await axiosPerfil.get('profile/' + id )
.then( (response) => {
    if(response.data.playerProfile){
        editJogador.value = true
        const profile = response.data.playerProfile

        jogador.value.elo = profile.elo
        jogador.value.funcao = profile.funcao
        jogador.value.jogo = profile.jogo
        jogador.value.nickname = profile.nickname
    }
})






let funcaoSrc = ref(Funcao[parseInt(jogador.value.funcao)][1])
let eloSrc = ref(Elo[parseInt(jogador.value.elo)][1])
let eloName = ref(Elo[parseInt(jogador.value.elo)][0])

watch(jogador.value, () => {
    funcaoSrc.value = Funcao[parseInt(jogador.value.funcao)][1]
    eloSrc.value = Elo[parseInt(jogador.value.elo)][1]
    eloName = Elo[parseInt(jogador.value.elo)][0]
})





const loading = ref(false)

async function handleSubmit () {
    if(!loading.value){
        loading.value = true
        if(!editJogador.value){
            await axiosPerfil.post('player', JSON.stringify(jogador.value))
                .then( (response) => {
                loading.value = false
                const message = 'Perfil Criado!'
                createToast(message,{
                type : 'success',
                showIcon : true,
                position : "top-center"
                })
                router.go(router.currentRoute)
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
            await axiosPerfil.put('player', JSON.stringify(jogador.value))
            .then( (response) => {
                loading.value = false
                const message = 'Perfil Atualizado!'
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
        }
    }
}

async function deleteProfile () {
    loading.value = true
    await axiosPerfil.delete('player').then( () => {
        loading.value = false
        createToast('Perfil Deletado com sucesso!',{
        type : 'success',
        showIcon : true,
        position : "top-center"
        })
        router.go(router.currentRoute)
    }).catch( (erro) => {
        createToast(erro.response.data.error,{
        type : 'danger',
        showIcon : true,
        position : "top-center"
        })
    })
    loading.value = false

}



</script>

<style scoped>
    .body{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px;
        gap: 20px;
    }
    .forms{
        display: flex;
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

    .button_div{
        display: flex;
        gap: 20px;
    }
    .button_div img{
        height: 50px;
    }

</style>