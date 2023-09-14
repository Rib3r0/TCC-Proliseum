<template>
  <div class="sidebar" :style="{ width: sidebarWidth}" :class="{ 'shadow' : !collapsed } ">
    <h1 v-if="!collapsed">
      Perfil
    </h1>
    <span 
        class="collapsed-icon"
        :class="{ 'rotate-180' : collapsed } "
        @click="toggleSidebar">
        <img  src="https://img.icons8.com/ios-filled/100/FFFFFF/forward--v1.png" alt="menu--v6"/>
      </span>
  </div>
</template>

<script setup>
import { collapsed, toggleSidebar, sidebarWidth } from './nav/state.js';

</script>

<style scoped>
.sidebar{
  background-color: #191828;
  overflow: hidden;
  float: left;
  position: fixed;
  z-index: 1;
  padding: 0.5rem;
  height: 100vh;

  transition: 0.3s ease;

  display: flex;
  align-items: center;
  flex-direction: column;
}
.collapsed-icon{
  align-self: end;
  position: absolute;
  transition: 0.2s linear;
  height: 50px;
  width: 50px;
}
.collapsed-icon img{
  width:  100%;
  height: 80%;
}

.rotate-180{
  transform: rotate(180deg);
  transition: 0.2s linear;
}

.profile{
  display: flex;
  justify-content: space-between;
}

.shadow{
  filter : drop-shadow(60px 0px 200px #000);
}

</style>