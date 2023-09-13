<template>
  <div class="sidebar" :style="{ width: sidebarWidth}">
    <span class="collapsed-icon" @click="toggleSidebar">
      <img  src="https://img.icons8.com/ios-filled/150/FFFFFF/menu--v6.png" alt="menu--v6"/>
    </span>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";


const collapsed =ref(true)
const toggleSidebar = () => (collapsed.value = !collapsed.value)

const SIDEBAR_WIDTH = 15
const SIDEBAR_WIDTH_COLLAPSED = 3.5

const sidebarWidth = computed(
  () => `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}vw`
)

</script>

<style scoped>
.collapsed-icon img{
  height: 20%;
}

.sidebar{
  background-color: #191828;

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

</style>