<template>
  <div class="sidebar" :style="{ width: sidebarWidth}" :class="{ 'shadow' : !collapsed } ">
    <div>
      <div class="profile">

      </div>  
      <SidebarLink to="/home" icon="https://img.icons8.com/windows/512/FFFFFF/home.png">HOME</SidebarLink>
      <SidebarLink to="/teste" icon="https://img.icons8.com/material-rounded/384/FFFFFF/settings.png">TESTE</SidebarLink>
    </div>
    <div>
      <SidebarLink to="/teste" icon="@/assets/img/logoIcon.png">PREMIUM</SidebarLink>
      <SidebarLink @click="logoff" to="/" icon="https://img.icons8.com/windows/96/FFFFFF/exit.png">SAIR</SidebarLink>
    </div>

    <span 
        class="collapsed-icon"
        :class="{ 'rotate-180' : collapsed } "
        @click="toggleSidebar">
        <img  src="https://img.icons8.com/ios-filled/100/FFFFFF/forward--v1.png" alt="menu--v6"/>
      </span>
  </div>
</template>

<script setup>
import { sidebarWidth, collapsed, toggleSidebar } from './state';
import SidebarLink from './SidebarLink.vue';
import { createToast } from 'mosha-vue-toastify';

const logoff = () => {
  localStorage.clear()
  createToast('Até a Proxima!',{
    type : 'success',
    showIcon : true,
    position : "top-center"
  })
}


</script>

<style scoped>
.sidebar{
  background-color: #191828;
  overflow: hidden;
  float: left;
  position: fixed;
  z-index: 1;
  height: 100vh;

  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2px;
}
.collapsed-icon{
  top: 40px;
  right: 20px;
  align-self: end;
  position: absolute;
  transition: 0.2s linear;
  height: 40px;
  width: 50px;
  transform: rotate(180deg);
}
.collapsed-icon img{
  width:  100%;
  height: 100%;
}

.rotate-180{
  transform: rotate(0deg);
  align-self: center;
  transition: 0.2s linear;
}

.profile{
  height: 120px;
}

.shadow{
  box-shadow: 100px 0px 50px #0009;
}

</style>