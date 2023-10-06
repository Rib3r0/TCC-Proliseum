<template>
  <div class="sidebar" :style="{ width: sidebarWidth}" :class="{ 'shadow' : !collapsed } ">
    <div>
      <div class="profile">
        <router-link @click="toggleSidebar"  :to="'/perfil/' + id">
          <div class="icon">
            <img v-if="!collapsed"  class="iconLarge" :key="src" :src="src">
          </div>
        </router-link>
        <p v-if="!collapsed">{{ nome }}</p>
      </div>  
      <SidebarLink to="/home" icon="https://img.icons8.com/windows/512/FFFFFF/home.png">HOME</SidebarLink>
      <SidebarLink to="/teams" icon="https://img.icons8.com/material-sharp/96/FFFFFF/conference-call.png">MEUS TIMES</SidebarLink>
      <SidebarLink to="/requests" icon="https://img.icons8.com/ios-filled/100/FFFFFF/man-raising-hand-icon.png">PROPOSTAS</SidebarLink>
      <SidebarLink to="/search" icon="https://img.icons8.com/sf-black/512/FFFFFF/search.png">BUSCAR TIME</SidebarLink>
      <SidebarLink to="/chanpionships" icon="https://img.icons8.com/glyph-neue/64/FFFFFF/trophy.png">CAMPEONATOS</SidebarLink>
      <SidebarLink to="/teste" icon="https://img.icons8.com/material-rounded/384/FFFFFF/settings.png">TESTE</SidebarLink>

    </div>
    <div>
      <SidebarLink to="/premium" icon="https://firebasestorage.googleapis.com/v0/b/proliseum-f06a1.appspot.com/o/logoIcon.png?alt=media&token=46c8f5de-ecc0-4bfe-91ab-ee0ffa24f8ff&_gl=1*1s5k6l1*_ga*MTU2NzgyOTI1Ni4xNjk1NzI0NjYy*_ga_CW55HF8NVT*MTY5NTk4ODg3My43LjEuMTY5NTk4ODkxNC4xOS4wLjA.">PREMIUM</SidebarLink>
      <SidebarLink @click="logoff" to="/" icon="https://img.icons8.com/windows/96/FFFFFF/exit.png">SAIR</SidebarLink>
    </div>
    <img class="collapsed-icon"
      :class="{ 'rotate-180' : collapsed } "
      @click="toggleSidebar" src="https://img.icons8.com/ios-filled/50/FFFFFF/menu--v6.png" alt="menu--v6"/>
  </div>
</template>

<script setup>
import { sidebarWidth, collapsed, toggleSidebar } from './state';
import SidebarLink from './SidebarLink.vue';
import { createToast } from 'mosha-vue-toastify';
import { ref, watch } from 'vue';
import storage from '../firebase/firebase.js'
import { ref as refFB , getDownloadURL } from 'firebase/storage'
import router from '../router';




let src = ref("https://i.ibb.co/jVvMSHY/image-6.png")

let nome = ref("")
let id = ref("")


watch(collapsed, (collapsedValue) => {
  if(!collapsedValue){
    nome = localStorage.getItem('user')
    id = localStorage.getItem('id')

    getDownloadURL(refFB(storage, id + '/profile')).then(
      (download_url) => ( src.value = download_url)
    ).catch( (erro) =>{
      src = "https://i.ibb.co/jVvMSHY/image-6.png"
    })
  }
})



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
  top: 4%;
  right: 20px;
  align-self: end;
  position: absolute;
  transition: 0.2s linear;
  height: 40px;
  width: 50px;
  transform: scaleY(15%) ;
  border-radius: 5px;
  background-color: #FFF;
}
.collapsed-icon img{
  width:  100%;
  height: 100%;
}

.rotate-180{
  transform: scaleX(100%) ;
  align-self: center;
  transition: 0.2s linear;
  background-color: #0000;
}

.profile{
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  background: #0005;
  margin-bottom: 5px ;
}

.shadow{
  box-shadow: 100px 0px 50px #0009;
}

.iconLarge{
    max-height: 8vh;
    min-height: 8vh;
    overflow: hidden;
  }
  .iconLarge:hover{
    transform: translateY(1px);
    filter: brightness(50%);
  }
  .icon:hover::after{
    display: grid;
    place-items: center;
    height: 100%;
    width: 100%;
    background-color: #0005;
    position: absolute;
  }
  .icon{
    max-height: 8vh;
    min-height: 8vh;
    clip-path: circle();
    display: grid;
    place-items: center;
    overflow: hidden;
    transition: 1s;
  }
  p{
    font-size: 20px;
  }

</style>