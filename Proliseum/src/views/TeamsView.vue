<template>
  <div class="body">
    <div class="header">
      <h1>Times</h1>
    </div>
    <div class="main">
      <div class="filter">
        <div class="manege">
          <NewCustomButton label="MEUS TIMES"/>
          <router-link to="/teams/create"><NewCustomButton label="CRIAR TIME"/></router-link>
        </div>
      </div>
      <div class="teams">
        <div class="card">
          <miniIcon image="" size="200px"/>
          <h3>NOME TIME</h3>
          <p>by Fulano</p>
        </div>
        <div class="card">
          <miniIcon image="" size="200px"/>
          <h3>NOME TIME</h3>
          <p>by Fulano</p>
        </div>
        <div class="card">
          <miniIcon image="" size="200px"/>
          <h3>NOME TIME</h3>
          <p>by Fulano</p>
        </div>
        <div class="card">
          <miniIcon image="" size="200px"/>
          <h3>NOME TIME</h3>
          <p>by Fulano</p>
        </div>
        <div class="card">
          <miniIcon image="" size="200px"/>
          <h3>NOME TIME</h3>
          <p>by Fulano</p>
        </div>
        <div class="card">
          <miniIcon image="" size="200px"/>
          <h3>NOME TIME</h3>
          <p>by Fulano</p>
        </div>
        <div class="card">
          <miniIcon image="" size="200px"/>
          <h3>NOME TIME</h3>
          <p>by Fulano</p>
        </div>
        <div class="card">
          <miniIcon image="" size="200px"/>
          <h3>NOME TIME</h3>
          <p>by Fulano</p>
        </div>
      </div>
    </div>
    <rodape lined/>
  </div>
</template>

<script setup>
import NewCustomButton from "../components/NewCustomButton.vue";
import rodape from "../components/Rodape.vue"
import miniIcon from "../components/miniIcon.vue";

</script>

<style scoped>
.body{
  width: 100%;
}

.header{
  background-image: url(../assets/img/backgroundHome.png);
  background-repeat: no-repeat;
  background-size: cover, contain;
  background-position: 50% 20%;
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}


.main{
  height: 100vh;
}

.filter{
  display: flex;
  padding: 20px;
}

.manege{
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.card{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  padding: 20px;
  background-color: #0005;
  border-radius: 20px;
}

.teams{
  padding: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 40px;
}
</style>