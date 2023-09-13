<template>
  <custom-nav v-if="showNav"/>
  <div :style="{ 'margin-left' : tamanho }"> 
    <router-view/>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import CustomNav from './components/Nav/CustomNav.vue';
import router from './router';
import { SIDEBAR_WIDTH_COLLAPSED } from './components/nav/state';

const tamanho = SIDEBAR_WIDTH_COLLAPSED + "vw"

const showNav = computed(
  () =>  router.currentRoute.value.path == '/home'
)



</script>

<style scoped>


</style>

       