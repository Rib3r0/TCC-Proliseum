<template>
  <div class="container">
    <div v-if="lined" class="line"></div>
    <p class="text">©2023 - TECNO CEOS</p>
  </div>
</template>

<script setup>

defineProps({
  lined : {
    type : Boolean,
    default : false
  }
})




</script>

<style scoped>

  div{
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    margin-top: 20px;
    
  }
  .line{
    border-top: 1px solid var(--red);
    height: 1px;
  }
  .text{
    font-size: var(--font-text);
  }
  .container{
    display: flex;
    flex-direction: column;
  }

</style>