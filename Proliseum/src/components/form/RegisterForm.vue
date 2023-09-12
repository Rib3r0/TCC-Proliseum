<template>
  <form class="form" autocomplete="off" @submit="submit">
    <div>
      <div class="cadastro">
        <new-input-form v-model="cadastro.username" label="NOME DE USUARIO:" maxlength="30" autofocus required/>
        <new-input-form v-model="cadastro.email" label="EMAIL:" type="email" required/>
        <new-input-form 
          v-model="cadastro.password" 
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
          title="Precisa conter pelo menos um numero, uma letra maiuscula e minuscula e ao menos 8 caracteres" 
          label="SENHA:" 
          type="password" 
          required/>
        <div>
          <new-input-form v-model="cadastro.confPassword" label="CONFIRMAR SENHA:" type="password" required/>
          <p class="awarn" v-if="cadastro.password != cadastro.confPassword && cadastro.confPassword != '' " >AS SENHAS NÃO SÃO IDENTICAS!</p>
        </div>
        <new-input-form v-model="cadastro.fullName" pattern="[A-Za-z\s]+" title="Não pode possuir numeros" label="NOME COMPLETO:" maxlength="50" optional/>
        <new-input-form v-model="cadastro.birthDay" label="DATA DE NASCIMENTO:" type="date"  min="1900-01-02" required/>
        <div class="genero">
          <FormRatio id="Masculino" icon="https://img.icons8.com/?size=512&id=6zILtwtIXOdA&format=png" name="genero" value="masculino" v-model="cadastro.genero"/>
          <FormRatio id="Feminino" icon="https://img.icons8.com/?size=512&id=kkMgZBuqu205&format=png" name="genero" value="feminino" v-model="cadastro.genero" />
          <FormRatio id="Outro" icon="https://img.icons8.com/?size=512&id=51Tr6obvkPgA&format=png" name="genero" value="outro" v-model="cadastro.genero" checked/>
        </div>
      </div>
      <div class="forms">
        <FormRatio id="jogador" label="SOU JOGADOR" name="cadastro"/>
        <FormRatio id="organizador" label="SOU ORGANIZADOR" name="cadastro"/>
      </div>
    </div>
    <div>
      <div class="submit">
        <ImageUpload id="profilePic" v-model="cadastro.image" />
        <NewCustomButton label="CADASTRAR" size="1.5vw" type="submit" @onClick="makeRegister" />
        <!-- <CustomisedButton  text="ENVIAR" type="submit"/> -->
      </div>
    </div>




    <!-- <div class="cadastro">
        <p class="title">GÊNERO:</p>
        <div class="genero">
          <FormRatio name="genero" @input="handleInputGenero" id="masculino" icon="https://img.icons8.com/?size=512&id=6zILtwtIXOdA&format=png" required/>
          <FormRatio name="genero" @input="handleInputGenero" id="feminino" icon="https://img.icons8.com/?size=512&id=kkMgZBuqu205&format=png" />
          <FormRatio name="genero" @input="handleInputGenero" :checked="true" id="outro" icon="https://img.icons8.com/?size=512&id=51Tr6obvkPgA&format=png" />
        </div>
      </div>
      <div>
        <h2>FOTO DE PERFIL:</h2>
        <ImageUpload @ImageUploded="imageUploded" id="profile"/>
      </div>
    </div>
    <div class="formChanger">
      <FormRatio name="formChange" @input="handleInputForm" :checked="true" id="souJogador"  text="SOU JOGADOR" size="2rem" />
      <FormRatio name="formChange" @input="handleInputForm" id="souOrganizador"  text="SOU ORGANIZADOR" size="2rem" />
    </div>
    <div v-if="!form.souOrganizador" class="cadastro">
      <div>
        <p class="title">GAME:</p>
        <div class="jogo">
            <FormRatio name="jogo" @input="handleInputJogo" :checked="true" id="League of Legends" icon="https://img.icons8.com/?size=512&id=57606&format=png" required/>
        </div>
      </div>
      <FormInput @on-input="getRanking" id="nickname" text="NICKNAME:" required/>
      <div>
        <p class="title">FUNÇÃO:</p>
          <div class="jogo">
              <FormRatio name="funcao" @input="handleInputFuncao" id="TOP" icon="https://cdn3.emoji.gg/emojis/TopLane.png" required/>
              <FormRatio name="funcao" @input="handleInputFuncao" id="JG" icon="https://cdn3.emoji.gg/emojis/Jungle.png" />
              <FormRatio name="funcao" @input="handleInputFuncao" id="MID" icon="https://cdn3.emoji.gg/emojis/MidLane.png" />
              <FormRatio name="funcao" @input="handleInputFuncao" id="ADC" icon="https://cdn3.emoji.gg/emojis/ADC.png" />
              <FormRatio name="funcao" @input="handleInputFuncao" id="SUP" icon="https://cdn3.emoji.gg/emojis/Support.png" />
        </div>
      </div>
      <div>
          <p class="title">{{jogador.elo}}</p>
      </div>

    </div>
    <div v-else-if="!form.souJogador" >
      <div class="cadastro">
        <FormInput @on-input="handleInputOrganizacao" id="nome" text="NOME DA ORGANIZAÇÃO:" required/>
        <ImageUpload @ImageUploded="imageLogoUploded" id="logo"/>
      </div>

    </div> -->

  </form>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import CustomisedButton from '../CustomisedButton.vue';
import FormRatio from './FormRatio.vue';
import ImageUpload from './ImageUpload.vue';
import NewInputForm from "./NewInputForm.vue";
import NewCustomButton from "../NewCustomButton.vue";


const cadastro = ref({
  username : "",
  email : "",
  password : "",
  confPassword : "",
  fullName: "",
  birthDay: "",
  image : null,
  genero : "outro",
  socialMedia : [],
  jogador : {
    jogo : "League of legends",
    nickname : "",
    funcao : "",
    id : "",
    elo : ""
  },
  organizador : {
    nome : "",
    logo : null,
  }
})

const form = ref({
  souJogador : true,
  souOrganizador : false
})

const getRanking = (value, id) =>{
  this.jogador[id] = value

  let key = "?api_key=RGAPI-43d90271-d8cc-493f-bb71-5d29e39152bf"
  axios
    .get("https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ value.replace(/ /g, '%20') + key)//mudar aqui!!
    .then((res) => {
      this.jogador.id = res.data.id
      let url = "https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + this.jogador.id + key
      axios.get(url)
        .then( (res) => {
            let data = res.data.filter( x => x.queueType == "RANKED_SOLO_5x5")[0]
            this.jogador.elo = data.tier + " "+ data.rank
        })
        .catch((error) => {
        });
    })
    .catch((error) => {

    });

}

function makeRegister () {
  console.log(cadastro.value);
}


</script>

<style scoped>
  .form{
    padding:30px ;
    display: grid;
    column-gap: 5%;
    grid-template-columns: 1fr 20vw;
  }
  .forms{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    height: 200px;
  }

  .cadastro{
    width: 100%;
    height: fit-content;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: row dense;
    gap: 20px;
    padding: 50px;
    background-color: #0005;
  }

  .genero{
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .formChanger{
    width: 100%;
    display: flex;
    padding: 30px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 50px;
  }

  .jogo{
    display: flex;
    gap: 15px;
    width: 100%;
  }

  .select{
    max-height: 55px;
    height: 4vw;
    font-weight: 500;
    padding-left:10px ;
    font-size: var(--font-text);
    min-width: 18vw;
    width: 100%;
  }
  
  .submit{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 50px;
    background-color: #0005;
  }

  .awarn{
    color: var(--red);
  }


</style>