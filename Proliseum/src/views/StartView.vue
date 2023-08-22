<template>
  <div class="body">
    <div class="header">
      <img class="logo" src="../assets/img/logoMain.png">
      <router-link to="/login">
        <customised-button text="LOGIN" @buttonFunction="teste"></customised-button>
      </router-link>
    </div>
    <div class="main">
      <div>
        <h1 class="text1">COMECE SUA NOVA JORNADA COM </h1>
        <img src="../assets/img/Proliseum.png">
        <h2>A MELHOR PLATAFORMA PARA ENCONTRAR SEU TIME DOS SONHOS</h2>
      </div>
      <div class="pro">
        <img class="trofel" src="../assets/img/trofel.png">
        <router-link to="/register">
          <customised-button text="TORNE-SE  UM  PRO" size="3rem" @buttonFunction="teste"></customised-button>
        </router-link>
      </div>
    </div>
    <div class="footer">
      <p>©2023 - TECNO CEOS</p>
    </div>
  </div>
</template>

<script>
import CustomisedButton from '../components/CustomisedButton.vue'
export default {
    name: 'StartView',
    components:{
        CustomisedButton
    },
    methods:{
      teste(){
        console.log("aaaaa");
      }
    }
}
</script>

<style scoped>

.body{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: url(../assets/img/backgroundStart.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
}
.header{
  display: flex;
  align-items: center;
  padding: 47px 65px 0px 65px;
  justify-content: space-between;
}
.logo{
  height: 129px;
}

.main{
  display: flex;
  padding: 0px 175px 0px 175px;
  justify-content: center;
}

.text1{
  font-size: 3rem;
}
.trofel{
  height: 30vh;
}
.pro{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.footer{
  display: flex;
  justify-content: center;
}
</style>