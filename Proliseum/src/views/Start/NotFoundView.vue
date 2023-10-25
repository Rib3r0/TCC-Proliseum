<template>
  <div class="body">
    <div class="titulo">
      <h1 class="title">Page not found!</h1>
      <router-link to="/home">retornar a home</router-link>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
  .title{
    font-family: 'Cyberjunkies', sans-serif;
    font-size: var(--font-title);
    text-shadow: 0px 10px red;
    font-weight: 100;
  }

  .titulo{
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: myAnim 4s alternate infinite;
  }
  .body{
    display: grid;
    height: 100vh;
    place-items: center;
  }
  @keyframes myAnim {
  0%{
    transform: rotate(5deg);
    filter: drop-shadow(0 0 0.5rem var(--red));
  }
  25%{
    transform: rotate(-5deg);
    filter: drop-shadow(0 0 0.5rem var(--red));
  }
  50%{
    transform: rotate(5deg);
    filter: drop-shadow(0 0 0.5rem var(--red));
  }
  75%{
    transform: rotate(-5deg);
    filter: drop-shadow(0 0 2rem var(--red));
  }
  100% {
    transform: rotate(5deg);
    filter: drop-shadow(0 0 2rem var(--red));
  }

}

</style>