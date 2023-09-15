<template>
  <form class="form" autocomplete="off" @submit.prevent="handleSubmit($event)">
    <div>
      <div class="cadastro">
        <new-input-form icon="https://img.icons8.com/ios-glyphs/90/user--v1.png" v-model="cadastro.username" label="NOME DE USUARIO:" maxlength="30" autofocus required/>
        <new-input-form icon="https://img.icons8.com/ios-filled/100/new-post.png" v-model="cadastro.email" label="EMAIL:" type="email" required/>
        <new-input-form 
          icon="https://img.icons8.com/ios-glyphs/240/lock--v1.png"
          v-model="cadastro.password" 
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
          title="Precisa conter pelo menos um numero, uma letra maiuscula e minuscula e ao menos 8 caracteres" 
          label="SENHA:" 
          type="password" 
          required/>
        <div>
          <new-input-form icon="https://img.icons8.com/ios-glyphs/240/lock--v1.png" v-model="cadastro.confPassword" label="CONFIRMAR SENHA:" type="password" required/>
          <p class="awarn" v-if="cadastro.password != cadastro.confPassword && cadastro.confPassword != '' " >AS SENHAS NÃO SÃO IDENTICAS!</p>
        </div>
        <new-input-form icon="https://img.icons8.com/ios-glyphs/90/user--v1.png" v-model="cadastro.fullName" pattern="[A-Za-z\s]+" title="Não pode possuir numeros" label="NOME COMPLETO:" maxlength="50" optional/>
        <new-input-form icon="https://img.icons8.com/ios-filled/100/planner.png" v-model="cadastro.birthDay" label="DATA DE NASCIMENTO:" type="date"  min="1900-01-02" required/>
        <div>
          <span class="title">GÊNERO:</span>
          <div class="genero">
            <FormRatio id="Masculino" icon="https://img.icons8.com/?size=512&id=6zILtwtIXOdA&format=png" name="genero" value="masculino" v-model="cadastro.genero"/>
            <FormRatio id="Feminino" icon="https://img.icons8.com/?size=512&id=kkMgZBuqu205&format=png" name="genero" value="feminino" v-model="cadastro.genero" />
            <FormRatio id="Outro" icon="https://img.icons8.com/?size=512&id=51Tr6obvkPgA&format=png" name="genero" value="outro" v-model="cadastro.genero" checked/>
          </div>
        </div>

      </div>
      <div class="forms">
        <FormRatio id="jogador" label="SOU JOGADOR" name="cadastro" value="jogador" v-model="usuario" checked/>
        <FormRatio id="organizador" label="SOU ORGANIZADOR" name="cadastro" value="organizador" v-model="usuario"/>
      </div>
      <div class="cadastro" v-if="usuario == 'jogador'">
        <div>
          <span class="title">GAME:</span>
            <div class="jogo">
              <FormRatio name="jogo"  id="League of Legends" icon="https://img.icons8.com/?size=512&id=57606&format=png" value="league of legends" v-model="cadastro.jogador.jogo" checked/>
          </div>
        </div>
        <new-input-form v-model="cadastro.jogador.nickname" label="NICKNAME:" required/>
        <div>
          <span class="title">FUNÇÃO:</span>
            <div class="jogo">
              <FormRatio name="funcao"  id="top" icon="https://cdn3.emoji.gg/emojis/TopLane.png" value="top" v-model="cadastro.jogador.funcao"/>
              <FormRatio name="funcao"  id="jg" icon="https://cdn3.emoji.gg/emojis/Jungle.png" value="jg" v-model="cadastro.jogador.funcao"/>
              <FormRatio name="funcao"  id="mid" icon="https://cdn3.emoji.gg/emojis/MidLane.png" value="mid" v-model="cadastro.jogador.funcao"/>
              <FormRatio name="funcao"  id="adc" icon="https://cdn3.emoji.gg/emojis/ADC.png" value="adc" v-model="cadastro.jogador.funcao"/>
              <FormRatio name="funcao"  id="sup" icon="https://cdn3.emoji.gg/emojis/Support.png" value="sup" v-model="cadastro.jogador.funcao"/>
          </div>
        </div>

      </div>
      
      <div class="cadastro" v-if="usuario == 'organizador'">
        <new-input-form v-model="cadastro.organizador.nome" label="NOME DA ORGANIZAÇÃO:" required/>
        <div>
          <span class="title">LOGO:</span>
          <ImageUpload id="orgPic" v-model="cadastro.organizador.logo" />
        </div>
        
      </div>
    </div>
    <div class="second">
      <div class="submit">
        <ImageUpload id="profilePic" v-model="cadastro.image" />
        <span class="title">BIO:</span>
        <textarea name="" v-model="cadastro.bio" id="" maxlength="300" placeholder="Bio..."></textarea>
      </div>
      <NewCustomButton class="cadastrar" label="CADASTRAR" size="1.5vw" type="submit" />
    </div>

  </form>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import FormRatio from './FormRatio.vue';
import ImageUpload from './ImageUpload.vue';
import NewInputForm from "./NewInputForm.vue";
import NewCustomButton from "../NewCustomButton.vue";
import { createToast } from 'mosha-vue-toastify'
import router from "../../router";

const usuario = ref("jogador")

const cadastro = ref({
  username : "",
  email : "",
  password : "",
  confPassword : "",
  fullName: "",
  birthDay: "",
  bio: "",
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

async function handleSubmit () {
  console.log(cadastro.value);
  createToast('Cadastro criado com sucesso!',{
    type : 'success',
    showIcon : true,
    position : "top-center"
  })
  router.push('/login')

  
}


</script>

<style scoped>
  .form{
    padding:30px ;
    display: grid;
    column-gap: 5%;
    grid-template-columns: 1fr 30vw;
  }
  .title{
    font-weight: 900;
    font-size: var(--font-text);
}
  .forms{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    height: 100px;
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
    justify-content: space-evenly;
    width: 100%;
  }

  .jogo{
    display: flex;
    gap: 15px;
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
  textarea:focus{
    outline: none;
    border-bottom: 5px solid var(--red);
    transition: 0.2s;
  }
  textarea:hover{
    outline: none;
    border-bottom: 5px solid var(--red);
    transition: 0.2s;
  }
  textarea{
    outline: none;
    border: none;
    font-family: 'Poppins', sans-serif;
    font-weight: 200;
    font-size: var(--font-text);
    resize: none;
    padding: 10px;
    width: 100%;
    height: 10vw;
  }
  .second{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .cadastrar{
    align-self: end;
  }

</style>