<template>
  <div class="body">
    <div class="header">
    </div>
    <div class="main">
      <div class="info">
        <div class="icon">
          <img  class="iconLarge" :key="src" :src="src">
        </div>
      </div>
      <div>
        <h1>OI</h1>
      </div>
    </div>
    <div class="footer"></div>
  </div>
  
</template>

<script setup>
import { onMounted, ref } from "vue";
import router from "../router";
import storage from '../firebase/firebase.js'
import { ref as refFB , getDownloadURL } from 'firebase/storage'

const src = ref('')

const id = router.currentRoute.value.params.id
getDownloadURL(refFB(storage, id + '/profile')).then(
  (download_url) => ( src.value = download_url)
)
  

console.log(router.currentRoute.value.params.id)
</script>
  
<style scoped>
  .body{
    min-height: 100vh;
  }
  .header{
    height: 30vh;
    background-image: url(https://firebasestorage.googleapis.com/v0/b/proliseum-f06a1.appspot.com/o/Rectangle%2048.png?alt=media&token=ad4d5cb4-c92b-4414-8c2a-615d6deb4e8c&_gl=1*w1vlxx*_ga*MTU2NzgyOTI1Ni4xNjk1NzI0NjYy*_ga_CW55HF8NVT*MTY5NTk5NDgzNC45LjEuMTY5NTk5NDg3OS4xNS4wLjA.);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .main{
    display: grid;
    grid-template-columns: 40vh 1fr;
    padding: 0px 50px 0px 50px;
  }
  .info{

  }

  .iconLarge{
    max-height: 28vh;
    min-height: 28vh;
    overflow: hidden;
    clip-path: circle();
  }
  .icon{
    min-width: 30vh;
    position: initial;
    clip-path: circle();
    background-color: var(--background-color);
    display: grid;
    place-items: center;
    overflow: hidden;
    transform: translateY(-14vh);
  }
</style>