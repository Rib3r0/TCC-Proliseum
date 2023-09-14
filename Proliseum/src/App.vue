<template>
  <CustomNav v-if="showNav"/>
  <div :style="showNav ? { 'margin-left' : tamanho} : { 'margin-left' : '0' } "> 
    <router-view/>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import CustomNav from './components/CustomNav.vue';
import router from './router';
import { SIDEBAR_WIDTH_COLLAPSED } from './components/state';

const tamanho = SIDEBAR_WIDTH_COLLAPSED + "px"

const showNav = computed(
  () =>   router.currentRoute.value.path != '/' &&  
          router.currentRoute.value.path != '/login' &&
          router.currentRoute.value.path != '/recovery' &&
          router.currentRoute.value.path != '/register' 
)



</script>

<style scoped>


</style>

       