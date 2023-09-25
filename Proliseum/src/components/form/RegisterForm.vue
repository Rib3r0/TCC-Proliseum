<template>
  <form class="form" autocomplete="off" @submit.prevent="handleSubmit($event)">
    <div>
      <div class="cadastro">
        <new-input-form icon="https://img.icons8.com/ios-glyphs/90/user--v1.png" v-model="novo_cadastro.nome_usuario" label="NOME DE USUARIO:" maxlength="30" autofocus required/>
        <new-input-form icon="https://img.icons8.com/ios-filled/100/new-post.png" v-model="novo_cadastro.email" label="EMAIL:" type="email" required/>
        <new-input-form
          ref="senha"
          icon="https://img.icons8.com/ios-glyphs/240/lock--v1.png"
          v-model="novo_cadastro.senha" 
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
          title="Precisa conter pelo menos um numero, uma letra maiuscula e minuscula e ao menos 8 caracteres" 
          label="SENHA:" 
          type="password" 
          required/>
        <div>
          <new-input-form icon="https://img.icons8.com/ios-glyphs/240/lock--v1.png" v-model="confPassword" label="CONFIRMAR SENHA:" type="password" required/>
          <p class="awarn" v-if="novo_cadastro.senha != confPassword && confPassword != '' " >AS SENHAS NÃO SÃO IDENTICAS!</p>
        </div>
        <new-input-form icon="https://img.icons8.com/ios-glyphs/90/user--v1.png" v-model="novo_cadastro.nome_completo" pattern="[A-Za-z\s]+" title="Não pode possuir numeros" label="NOME COMPLETO:" maxlength="50" optional/>
        <new-input-form icon="https://img.icons8.com/ios-filled/100/planner.png" v-model="novo_cadastro.data_nascimento" label="DATA DE NASCIMENTO:" type="date"  min="1900-01-02" required/>
        <div>
          <span class="title">GÊNERO:</span>
          <div class="genero">
            <FormRatio id="Masculino" icon="https://img.icons8.com/?size=512&id=6zILtwtIXOdA&format=png" name="genero" :value="0" v-model="novo_cadastro.genero"/>
            <FormRatio id="Feminino" icon="https://img.icons8.com/?size=512&id=kkMgZBuqu205&format=png" name="genero" :value="1" v-model="novo_cadastro.genero" />
            <FormRatio id="Outro" icon="https://img.icons8.com/?size=512&id=51Tr6obvkPgA&format=png" name="genero" :value="2" v-model="novo_cadastro.genero" checked/>
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
              <FormRatio name="jogo"  id="League of Legends" icon="https://img.icons8.com/?size=512&id=57606&format=png" :value="0" v-model="novo_cadastro.jogador.jogo" checked/>
          </div>
        </div>
        <new-input-form v-model="novo_cadastro.jogador.nickname" label="NICKNAME:" required/>
        <div>
          <span class="title">FUNÇÃO:</span>
            <div class="jogo">
              <FormRatio name="funcao"  id="top" icon="https://cdn3.emoji.gg/emojis/TopLane.png" :value="0" v-model="novo_cadastro.jogador.funcao"/>
              <FormRatio name="funcao"  id="jg" icon="https://cdn3.emoji.gg/emojis/Jungle.png" :value="1" v-model="novo_cadastro.jogador.funcao"/>
              <FormRatio name="funcao"  id="mid" icon="https://cdn3.emoji.gg/emojis/MidLane.png" :value="2" v-model="novo_cadastro.jogador.funcao"/>
              <FormRatio name="funcao"  id="adc" icon="https://cdn3.emoji.gg/emojis/ADC.png" :value="3" v-model="novo_cadastro.jogador.funcao"/>
              <FormRatio name="funcao"  id="sup" icon="https://cdn3.emoji.gg/emojis/Support.png" :value="4" v-model="novo_cadastro.jogador.funcao"/>
          </div>
        </div>

      </div>
      
      <div class="cadastro" v-if="usuario == 'organizador'">
        <new-input-form v-model="novo_cadastro.organizador.nome" label="NOME DA ORGANIZAÇÃO:" required/>
        <div>
          <span class="title">LOGO:</span>
          <ImageUpload id="orgPic" v-model="novo_cadastro.organizador.logo" />
        </div>
        
      </div>
    </div>
    <div class="second">
      <div class="submit">
        <ImageUpload id="profilePic" v-model="novo_cadastro.image" />
        <span class="title">BIO:</span>
        <textarea name="" v-model="novo_cadastro.biografia" id="" maxlength="300" placeholder="Bio..."></textarea>
      </div>
      <div class="end">
        <p class="awarnResponse" v-if="errorLogin" >Email ou Nome de Usuario já cadastrado!</p>
        <div  class="cadastrar">
          <img v-if="loading" src="../../assets/img/Rolling-1s-323px.svg">
          <NewCustomButton label="CADASTRAR" size="1.5vw" type="submit" />
        </div>
      </div>
    </div>

  </form>
</template>

<script setup>
import { ref } from "vue";
import FormRatio from './FormRatio.vue';
import ImageUpload from './ImageUpload.vue';
import NewInputForm from "./NewInputForm.vue";
import NewCustomButton from "../NewCustomButton.vue";
import { createToast } from 'mosha-vue-toastify'
import { axiosPerfil } from "../../axios/axios.js";
import router from "../../router";

const usuario = ref("jogador")

const confPassword = ref("")

const novo_cadastro = ref({
      nome_usuario: "" ,
      nome_completo: "",
      email: "",
      senha: "",
      data_nascimento: "",
      foto_perfil: "",
      foto_capa: "",
      genero: 2,
      tipo_de_usuario: 0,
      jogador: {
          nickname: "",
          biografia: "",
          jogo: 0,
          funcao: 3
      },
      organizador : {
        nome : "",
        logo : null,
      }
})

const loading = ref(false)

const errorLogin = ref(false)

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
  if(novo_cadastro.value.senha != confPassword.value && confPassword.value != '' ){
    window.scrollTo(0,0)
  }else{
    if(form.value.souJogador){
      novo_cadastro.value.tipo_de_usuario = 0
    }else{
      novo_cadastro.value.tipo_de_usuario = 1
    }
    
    loading.value = true
    errorLogin.value = false

    //const response = await axios.post('Register',cadastro)
    await axiosPerfil.post('register', JSON.stringify(novo_cadastro.value))
  .then( (response) => {
    loading.value = false
    createToast('Cadastrado com sucesso!',{
      type : 'success',
      showIcon : true,
      position : "top-center"
    })
    router.push('/login')
  })
  .catch( (error) => {
    loading.value = false

    if(error.response.status == 400){
      errorLogin.value = true
      createToast('Email ou Nome de Usuario já cadastrado!',{
      type : 'warning',
      showIcon : true,
      position : "top-center"
    })
    }
    if(error.response.status == 500){
      createToast('Erro interno, Tente novamente!',{
      type : 'danger',
      showIcon : true,
      position : "top-center"
      })
    }

  })
}

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
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
  }
  .cadastrar img{
    height: 7vh;
  }
  .awarnResponse{
    color: var(--red);
  }

  .end{
    display: flex;
  }
</style>