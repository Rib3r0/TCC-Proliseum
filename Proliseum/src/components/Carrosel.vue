<template>
  <div class="container">
    <button  id="back" v-on:click="change"  hidden>back</button>
    <label for="back" class="arrow-left"><img src="https://img.icons8.com/ios-filled/100/FFFFFF/back.png"></label>
    <button id="front" v-on:click="change"  hidden>front</button>
    <label for="front" class="arrow-right"><img src="https://img.icons8.com/ios-filled/100/FFFFFF/forward--v1.png"></label>
    <div class="gallery-wrapper">
        <div class="gallery" >
            <div  class="card" v-for="card in items" :key="card.id">
                <p>{{ card.name }}</p>
                <img  src="https://source.unsplash.com/random/250x400/?leagueoflegends " :class="items.indexOf(card) == current ? 'item current-item' : 'item'  " alt="">
                <span>VEJA MAIS</span>
            </div>
        </div>
    </div>

  </div>
</template>

<script setup>
import { ref, nextTick } from "vue"

const current = ref(0)



const items = [
    {   
        name: "ola1",
        id: 7
    },
    {   
        name: "ola2",
        id: 11
    },
    {   
        name: "ola3",
        id: 12
    },
    {   
        name: "ola4",
        id: 14
    },
    {   
        name: "ola5",
        id: 20
    },

]
const maxItems = items.length


const change = async (e) => {

    if(e.srcElement.id == 'front'){
        current.value += 1 
    }
    if(e.srcElement.id == 'back'){
        current.value -= 1 
    }

    if (current.value >= maxItems) {
      current.value = 0;
    }

    if (current.value < 0) {
      current.value = maxItems - 1;
    }

    await nextTick();
    
    console.log(document.querySelector('.current-item'));
    document.querySelector('.current-item').scrollIntoView({ behavior: 'smooth', inline: "center"});
}




</script>

<style scoped>
.container{
    position: relative;
    padding: 15px;
    max-width: 95%;
    margin: 0 auto;
}
.gallery{
    display: flex;
    flex-flow: row nowrap;
    gap: 15px;
}
.gallery-wrapper{
    overflow-x: auto;
}

.arrow-left img,
.arrow-right img{
    height: 30px;
}

.arrow-left:hover,
.arrow-right:hover{
    opacity: 1;
}

.arrow-left{
    position: absolute;
    top: 0;
    left: 0;
    right: auto;
    bottom: 0;
    display: grid;
    place-items: center;
    width: 60px;
    z-index: 10;
    background: linear-gradient(to left, transparent 0%, black 200%);
    opacity: 0.1;
    transition: all 600ms ease-in-out;
}


.arrow-right {
    position: absolute;
    top: 0;
    left: auto;
    right: 0;
    bottom: 0;
    display: grid;
    place-items: center;
    width: 60px;
    z-index: 10;
    background: linear-gradient(to right, transparent 0%, black 200%);
    opacity: 0.1;
    transition: all 600ms ease-in-out;
}

.item{
    width:400px;
    height:250px;
    flex-shrink: 0;
    transition: all 600ms ease-in-out;
    opacity: 0.5;
}

.current-item {
  opacity: 1;

}

.gallery-wrapper::-webkit-scrollbar {
  display: none;
}

.card{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #0005;
    padding: 10px;
    border-radius: 30px;
}

</style>