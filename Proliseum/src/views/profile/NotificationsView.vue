<template>
    <div class="body">
        <div v-if="cards.length < 0"  class="card_props">
            <div class="info_sem">
                <h2>SEM NOTIFICAÇÕES &#128554;</h2>
            </div>
        </div>
        <div v-for="card in cards" :key="card.id" class="card_props">
            <div class="info">
                <h3>{{ card.titulo }}</h3>
                <p>{{ card.descricao }}</p>
            </div>
            <img class="close" src="https://img.icons8.com/sf-black-filled/64/FFFFFF/x.png" @click="handle(card.id)" alt="" srcset="">
        </div>
    </div>
</template>

<script setup>

const cards = [
    {
        id: 1,
        titulo: "a",
        descricao: "oie"
    },
    {
        id: 2,
        titulo: "b",
        descricao: "oiee"
    },
    {
        id: 3,
        titulo: "c",
        descricao: "oieee"
    },
]


function handle(e){
    console.log(e);
}


</script>

<style scoped>

.body{
    padding: 30px;
}
.card_props{
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  justify-content: center;
}

.info_sem{
  background-color: #0005;
  padding: 20px;
  border-radius: 20px;
  min-width: 70vw;
  min-height: 16vw;
  display: grid;
  place-items: center;
  filter: opacity(20%);
  place-self: center;
}

.info{
  background-color: #0005;
  padding: 20px;
  border-radius: 20px;
  min-width: 70vw;
  min-height: 16vw;
  display: grid;
}
.close{
    position: absolute;
    transform: translate( 34vw, -7.5vw );
}
.close:hover{
    filter: brightness(0) saturate(100%) invert(42%) sepia(42%) saturate(5000%) hue-rotate(338deg) brightness(95%) contrast(112%);
}


</style>