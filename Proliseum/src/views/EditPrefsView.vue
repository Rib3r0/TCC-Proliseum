<template>
    <form class="body" autocomplete="off" @submit.prevent="handleSubmit($event)">
        <div class="forms">
            <FormRatio id="jogador" label="SOU JOGADOR" name="cadastro" value="jogador" v-model="usuario" checked/>
            <FormRatio id="organizador" label="SOU ORGANIZADOR" name="cadastro" value="organizador" v-model="usuario"/>
        </div>
        <div class="preview">
            <img class="elo" src="../assets/img/trofel.png" alt="" srcset="">
        </div>
        <div class="cadastro" v-if="usuario == 'jogador'">
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
                    <FormRatio name="funcao"  id="top" icon="https://cdn3.emoji.gg/emojis/TopLane.png" :value="0" v-model="jogador.funcao"/>
                    <FormRatio name="funcao"  id="jg" icon="https://cdn3.emoji.gg/emojis/Jungle.png" :value="1" v-model="jogador.funcao"/>
                    <FormRatio name="funcao"  id="mid" icon="https://cdn3.emoji.gg/emojis/MidLane.png" :value="2" v-model="jogador.funcao"/>
                    <FormRatio name="funcao"  id="adc" icon="https://cdn3.emoji.gg/emojis/ADC.png" :value="3" v-model="jogador.funcao"/>
                    <FormRatio name="funcao"  id="sup" icon="https://cdn3.emoji.gg/emojis/Support.png" :value="4" v-model="jogador.funcao"/>
                </div>
            </div>
            <SelectForm name="elo" label="ELO:" :list="Elo" default="Porfavor informe o seu elo" v-model="jogador.elo"/>
        </div>
        <div class="cadastro" v-if="usuario == 'organizador'">
            <new-input-form v-model="organizador.nome" label="NOME DA ORGANIZAÇÃO:" required/>
            <div>
            <span class="title">LOGO:</span>
            <ImageUpload id="orgPic" v-model="organizador.logo" />
            </div>
        </div>
        <NewCustomButton type="submit" label="SALVAR"/>
    </form>
</template>

<script setup>
import FormRatio from '../components/form/FormRatio.vue';
import NewInputForm from '../components/form/NewInputForm.vue';
import NewCustomButton from '../components/NewCustomButton.vue';
import ImageUpload from '../components/form/ImageUpload.vue';
import { ref } from 'vue';
import SelectForm from '../components/form/SelectForm.vue';
import { Elo } from '../components/enum/Elo';

let usuario = ref("jogador")

let jogador = ref({
    elo: "",
    jogo: "0",
    funcao: "",
    nickname: "",
})

let organizador = ref({
    nome_organizacao: "",
    biografia: ""
})

async function handleSubmit () {
    console.log(jogador.value);
}


</script>

<style scoped>
    .body{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        height: 100vh;
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
    .jogo{
        display: flex;
        gap: 20px;
    }
    .preview{
        height: 500px;
        width: 500px;
        background-color: #0005;
    }
</style>