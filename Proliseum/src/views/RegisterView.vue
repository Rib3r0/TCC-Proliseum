<template>
  <div class="body">
    <img class="logo" src="../assets/img/logoIcon.png" alt="" srcset="">
    <H1 class="title ">CADASTRO</H1>
    <RegisterForm/>
  </div>

</template>

<script>
import RegisterForm from '../components/form/RegisterForm.vue';
export default {
    name: "RegisterView",
    components:{
        RegisterForm
    }
}
</script>

<style scoped>
    .logo{
        height: 160px;
    }
    .body{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .title{
        font-family: 'Cyberjunkies', sans-serif;
        font-size: var(--font-subtitle);
        text-shadow: 0px 0.4vw red;
        font-weight: 100;
    }
</style>