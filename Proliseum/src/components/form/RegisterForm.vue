<template>
  <form class="form" autocomplete="on">
    <div class="cadastro">
      <FormInput @on-input="handleInput" id="username" text="NOME DE USUARIO:" required/>
      <FormInput @on-input="handleInput" id="email" text="EMAIL:" type="email" required/>
      <FormInput @on-input="handleInput" id="password" text="SENHA:" type="password" required />
      <div>
        <FormInput @on-input="handleInput" id="confPassword" text="CONFIRMAR SENHA:" type="password" required/>
        <p v-if="cadastro.password != cadastro.confPassword && cadastro.confPassword != '' " >AS SENHAS NÃO SÃO IGUAIS</p>
      </div>
      <FormInput @on-input="handleInput" id="fullName"  text="NOME COMPLETO:" required />
      <FormInput @on-input="handleInput" id="birthDay" text="DATA DE NASCIMENTO:" type="date" required />
      <div>
        <p class="title">GÊNERO:</p>
        <div class="genero">
          <FormRatio name="genero" @on-input="handleInputGenero" id="masculino" icon="https://img.icons8.com/?size=512&id=6zILtwtIXOdA&format=png" required/>
          <FormRatio name="genero" @on-input="handleInputGenero" id="feminino" icon="https://img.icons8.com/?size=512&id=kkMgZBuqu205&format=png" />
          <FormRatio name="genero" @on-input="handleInputGenero" checked="true" id="outro" icon="https://img.icons8.com/?size=512&id=51Tr6obvkPgA&format=png" />
        </div>
      </div>
      <div>
        <h2>FOTO DE PERFIL:</h2>
        <ImageUpload @ImageUploded="imageUploded"/>
      </div>
    </div>
    <div class="formChanger">
      <FormRatio name="formChange" @on-input="handleInputForm" checked="true" id="souJogador"  text="SOU JOGADOR" size="2rem" />
      <FormRatio name="formChange" @on-input="handleInputForm" id="souOrganizador"  text="SOU ORGANIZADOR" size="2rem" />
    </div>
    <div v-if="!form.souOrganizador" class="cadastro">
      <h1>SOU JOGADOR</h1>
    </div>
    <div v-else-if="!form.souJogador" class="cadastro">
      <h1>SOU ORGANIZADOR</h1>
    </div>
  </form>
</template>

<script>
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
          genero : {
            masculino : false,
            feminino : false,
            outro : 'on'
          }
        },
        form : {
          souJogador : 'on',
          souOrganizador : false
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
        this.cadastro.genero.masculino = false
        this.cadastro.genero.feminino = false
        this.cadastro.genero.outro = false
        this.cadastro.genero[id] = value
      },
      handleInputForm(value,id) {
        this.form.souJogador = false
        this.form.souOrganizador = false
        this.form[id] = value
        console.log(this.form);
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
    justify-content: space-between;
    width: 47vw;
    height: fit-content;
    display: flex;
    flex-wrap: wrap;
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


</style>