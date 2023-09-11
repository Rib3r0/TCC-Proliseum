<template>
  <div class="body">
    <h1 class="title ">cadastro</h1>
    <RegisterForm/>
    <Rodape :lined="true" />
  </div>

</template>

<script>
import RegisterForm from '../components/form/RegisterForm.vue';
import Rodape from '../components/Rodape.vue';
export default {
    name: "RegisterView",
    components:{
        RegisterForm,
        Rodape
    }
}
</script>

<style scoped>
    .body{
        display: flex;
        flex-direction: column;
    }
    .title{
        padding: 40px;
        font-family: 'Cyberjunkies', sans-serif;
        font-size: var(--font-subtitle);
        text-shadow: 0px 0.4vw red;
        font-weight: 100;
        text-transform: uppercase;
    }
</style>