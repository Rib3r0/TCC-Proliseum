<template>
  <div class="body">
    <div class="header">
      <img class="logo" src="../assets/img/logoMain.png">
      <router-link to="/login">
        <customised-button text="LOGIN" @buttonFunction="teste" size="1rem"></customised-button>
      </router-link>
    </div>
    <div class="main">
      <div>
        <h1 class="text1">comece sua nova</h1>
        <h1 class="text1">jornada com</h1>
        <h1 class="name">proliseum</h1>
        <h1 class="text2">a melhor plataforma para</h1>
        <h1 class="text2">encontrar seu time dos sonhos</h1>
      </div>
      <div class="pro">
        <img class="trofel" src="../assets/img/trofel.png">
        <router-link to="/register">
          <customised-button text="TORNE-SE UM PRO" size="2.25rem" @buttonFunction="teste"></customised-button>
        </router-link>
      </div>
    </div>
    <div class="footer">
      <div class="games">
        <img class="icons" src="../assets/img/CSGO.png" alt="" srcset="">
        <img class="icons" src="../assets/img/LOL.png" alt="" srcset="">
        <img class="icons" src="../assets/img/Valorant.png" alt="" srcset="">
        <h2>mais em breve...</h2>
      </div>
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
  height: 15vh;
}

.main{
  display: flex;
  padding: 0px 175px 0px 175px;
  gap: 100px;
  align-items: center;
  justify-content: center;
}

.text1{
  font-size: var(--font-subtitle);
}
.name{
  font-family: 'Cyberjunkies', sans-serif;
  font-size: var(--font-title);
  text-shadow: 0px 10px red;
  font-weight: 100;
  filter: drop-shadow(0 0 2rem var(--red));
}

.text2{
  font-size: var(--font-description);
}

.trofel{
  height: 25vw;
  animation: MoveUpDown 1s alternate infinite;
  filter: drop-shadow(0 0 2rem var(--red));
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
  gap: 20px;
  color: var(--background-color);
  align-self: flex-start;
  padding-left: 100px;
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
  }
  100% {
    transform: translateY(-15px);
  }
}

</style>