<template>
  <div class="body">
    <div class="header">
      <img class="logo" src="../assets/img/logoMain.png">
      <router-link to="/login">
        <customised-button text="LOGIN" @buttonFunction="teste"></customised-button>
      </router-link>
    </div>
    <div class="main">
      <div class="main1">
        <h1 class="name">proliseum</h1>
        <h1 class="text2">a melhor plataforma para</h1>
        <h1 class="text2">encontrar seu time dos sonhos</h1>
        <div class="games">
          <img class="icons" src="../assets/img/LOL.png" alt="" srcset="">
          <img class="icons" src="../assets/img/CSGO.png" alt="" srcset="">
          <img class="icons" src="../assets/img/Valorant.png" alt="" srcset="">
          <h2>mais em breve...</h2>
        </div>
      </div>
      <div class="pro">
        <img class="trofel" src="../assets/img/trofel.png">
        <router-link to="/register">
          <customised-button text="TORNE-SE UM PRO"  @buttonFunction="teste"></customised-button>
        </router-link>
      </div>
    </div>
    <div class="footer">
      <rodape/>
    </div>
  </div>
</template>

<script>
import CustomisedButton from '../components/CustomisedButton.vue'
import Rodape from '../components/Rodape.vue';
export default {
    name: 'StartView',
    components:{
        CustomisedButton,
        Rodape
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
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-template-rows: 150px 1fr auto ;
  background-image: url(../assets/img/backgroundStart.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.header{
  display: flex;
  align-items: center;
  padding: 0px 20px 0px 20px;
  justify-content: space-between;
}
.logo{
  height: 15vh;
}

.main{
  display: flex;
  padding: 0px 175px 0px 175px;
  gap: 100px;
  align-items: center;
  justify-content: center;
  
}
.main1{
  filter: drop-shadow(0 0 0.5rem #ccc);
}

.text1{
  font-size: var(--font-description);
}
.name{
  font-family: 'Cyberjunkies', sans-serif;
  font-size: var(--font-title);
  text-shadow: 0px 10px red;
  font-weight: 100;
}

.text2{
  font-size: var(--font-description);
}

.trofel{
  height: 50vh;
  animation: MoveUpDown 1s alternate infinite;
}
.pro{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.footer{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}

.proliseum{
  height: 15vh;
  
}
.games{
  display: flex;
  align-items: center;
  padding-top: 30px;
  gap: 20px;
  color: var(--background-color);
  align-self: flex-start;

}
.icons{
  height: 10vh;
}

h1,h2{
  text-transform: uppercase;
}

@keyframes MoveUpDown {
  0%{
    transform: translateY(0);
    filter: drop-shadow(0 0 0.5rem var(--red));
  }
  100% {

    transform: translateY(-20px);
    filter: drop-shadow(0 0 2rem var(--red));
    
  }
}



</style>