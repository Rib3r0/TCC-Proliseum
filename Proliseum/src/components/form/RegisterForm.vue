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
        <FormInput type="checkbox" />
      </div>

      <div v-if="Image == null " class="icons">
        <div class="icon">
          <img class="iconSmall" src="https://i.ibb.co/jVvMSHY/image-6.png">
        </div>
        <div class="icon">
          <img class="iconMedium" src="https://i.ibb.co/jVvMSHY/image-6.png">
        </div>
        <div class="icon">
          <img class="iconLarge" src="https://i.ibb.co/jVvMSHY/image-6.png">
        </div>
        <FormInput type="image" text="UPLOAD" @onChange="changeImage" />
      </div>
      <div v-else class="icons">
        <div class="icon">
          <img class="iconSmall" :src="Image">
        </div>
        <div class="icon">
          <img class="iconMedium" :src="Image">
        </div>
        <div class="icon">
          <img class="iconLarge" :src="Image">
        </div>
        <FormInput type="image" text="UPLOAD" @onChange="changeImage" />
      </div>
    </div>
  </form>
</template>

<script>
import CustomisedButton from '../CustomisedButton.vue';
import FormInput from './FormInput.vue';
export default {
    name: 'RegisterForm',
    data(){
      return { 
        Image : null
      }
    },
    components:{
      FormInput,
        CustomisedButton
    },
    methods: {
      changeImage(event){
        const image = event.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onload = e =>{
          this.Image = e.target.result
          console.log(e.target.result)
        }
      }
    }
}
</script>

<style scoped>
  .form{
    padding-top:20px ;
  }
  .icons{
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 60%;
    max-width: 60%;
  }
  .cadastro{
    justify-content: space-between;
    width: 45vw;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 50px;
    background-color: #0005;
    border-radius: 50px;
  }

  .icon{
    clip-path: circle();
    display: grid;
    place-items: center;
    overflow: hidden;
  }

  .iconSmall{
    max-height: 3vw;
    min-height: 3vw;
    overflow: hidden;
  }
  .iconMedium{
    max-height: 6vw;
    min-height: 6vw;
    overflow: hidden;
  }

  .iconLarge{
    max-height: 9vw;
    min-height: 9vw;
    overflow: hidden;
  }

</style>