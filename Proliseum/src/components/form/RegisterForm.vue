<template>
  <form class="form" autocomplete="on" @submit="submit">
    <div class="cadastro">
      <FormInput @on-input="handleInput" id="username" text="NOME DE USUARIO:" required/>
      <FormInput @on-input="handleInput" id="email" text="EMAIL:" type="email" required/>
      <FormInput @on-input="handleInput" id="password" text="SENHA:" type="password" required />
      <div>
        <FormInput ref="password" @on-input="handleInput" id="confPassword" text="CONFIRMAR SENHA:" type="password" required/>
        <p v-if="cadastro.password != cadastro.confPassword && cadastro.confPassword != '' " >AS SENHAS NÃO SÃO IGUAIS</p>
      </div>
      <FormInput @on-input="handleInput" id="fullName"  text="NOME COMPLETO:" required />
      <FormInput @on-input="handleInput" id="birthDay" text="DATA DE NASCIMENTO:" type="date" required />
      <div>
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
            <!--<FormRatio name="jogo" @input="handleInputJogo" id="CSGO" icon="https://img.icons8.com/?size=512&id=d29kdhkzGD55&format=png" />
            <FormRatio name="jogo" @input="handleInputJogo" id="Valorant" icon="https://img.icons8.com/?size=512&id=GSHWFnD9x56D&format=png" />-->
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

    </div>
    <div class="submit">
      <CustomisedButton  text="ENVIAR" type="submit"/>
    </div>

    
  </form>
</template>

<script>
import axios from "axios";
import CustomisedButton from '../CustomisedButton.vue';
import FormInput from './FormInput.vue';
import FormRatio from './FormRatio.vue';
import ImageUpload from './ImageUpload.vue';



export default {
    name: 'RegisterForm',
    data(){
      return {
        cadastro :{
          username : "",
          email : "",
          password : "",
          confPassword : "",
          fullName: "",
          birthDay: "",
          Image : null,
          genero : "",
          socialMedia : []
        },
        form : {
          souJogador : true,
          souOrganizador : false
        },
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

      }
    },
    methods:{
      imageUploded(event){
        this.cadastro.Image = event
      },
      handleInput(value,id) {
        this.cadastro[id] = value
      },
      handleInputGenero(value,id) {
        this.cadastro.genero = id
      },
      handleInputForm(value,id) {
        this.form.souJogador = false
        this.form.souOrganizador = false
        this.form[id] = true
      },
      handleInputJogo(value,id) {
        this.jogador.jogo = id
      },
      handleInputFuncao(value,id) {
        this.jogador.funcao = id
      },
      handleInputJogador(value , id) {
        this.jogador[id] = value
      },
      handleInputSocialMedia(value , id) {
        this.cadastro.socialMedia.push({ socialMedia : value , id : id  })
        this.jogador[id] = value
      },
      getRanking(value, id){
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
          
      },
      handleInputOrganizacao(value , id) {
        this.organizador[id] = value
      },
      imageLogoUploded(event){
        this.organizador.logo = event
      },
      submit(e){
        e.preventDefault()
        console.log("teste")
        this.$router.push("/login")
        
      }

    },
    components:{
    FormInput,
    CustomisedButton,
    FormRatio,
    ImageUpload
},
    
}
</script>

<style scoped>
  .form{
    padding-top:20px ;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .cadastro{
    width: 80vw;
    height: fit-content;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: row dense;
    gap: 20px;
    padding: 50px;
    background-color: #0005;
    border-radius: 50px;
  }

  .genero{
    display: flex;
    gap: 15px;
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
    padding-top: 30px;
    align-self: flex-end;
  }


</style>