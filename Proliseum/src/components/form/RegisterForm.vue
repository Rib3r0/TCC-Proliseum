<template>
  <form class="form" autocomplete="on">
    <div class="cadastro">
      <FormInput text="NOME DE USUARIO:" required/>
      <FormInput text="EMAIL:" type="email" required/>
      <FormInput text="SENHA:" type="password" required />
      <FormInput text="CONFIRMAR SENHA:" type="password" required/>
      <FormInput text="NOME COMPLETO:" required />
      <FormInput text="DATA DE NASCIMENTO:" type="date" required />
      <div>
        <p class="title">GÊNERO:</p>
        <div class="genero">
          <FormRatio name="genero" id="masculino" :value="genero.masculino" icon="../../src/assets/img/Male.png" required/>
          <FormRatio name="genero" id="feminino" :value="genero.feminino" icon="../../src/assets/img/Female.png" />
          <FormRatio name="genero" id="outro" :value="genero.outro" icon="../../src/assets/img/_.png" />
        </div>
      </div>
      <div>
        <h2>FOTO DE PERFIL:</h2>
        <ImageUpload @ImageUploded="imageUploded"/>
      </div>

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
        Image : null,
        genero : {
          masculino : false,
          feminino : false,
          outro : false
        }
      }
    },
    methods:{
      imageUploded(event){
        this.Image = event
        console.log(this.Image)
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
  }

  .cadastro{
    justify-content: space-between;
    width: 45vw;
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


</style>