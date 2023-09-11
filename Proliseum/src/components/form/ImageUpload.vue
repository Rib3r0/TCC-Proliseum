<template >
  <!-- <div v-if="Image == null " class="icons">
    <div class="icon">
      <img class="iconSmall" src="https://i.ibb.co/jVvMSHY/image-6.png">
    </div>
    <div class="icon">
      <img class="iconMedium" src="https://i.ibb.co/jVvMSHY/image-6.png">
    </div>
    <div class="icon">
      <img class="iconLarge" src="https://i.ibb.co/jVvMSHY/image-6.png">
    </div>
    <FormInput type="image" :id="id" text="UPLOAD" @onChange="changeImage" />
  </div>
  <div v-else class="icons">
    <div class="icon">
      <img class="iconSmall" :src="Image">
    </div>
    <div class="icon">
      <img class="iconMedium" :src="Image">
    </div>
    <div class="icon">
      <img class="iconLarge" :src="Image">
    </div>
    <FormInput type="image" :id="id" text="UPLOAD" @onChange="changeImage" />
  </div> -->

  <div class="container">
    <div class="icon">
      <img class="iconLarge" src="https://i.ibb.co/jVvMSHY/image-6.png">
    </div>
    <label class="upload" :for="id">UPLOAD</label>
    <input name="arquivo" :id="id" type="file" accept="image/*" @change="getImage" hidden/>
  </div>

</template>

<script setup>
defineProps({
  id : {
    type : String,
    required : true
  }
})
defineEmits(['onChange'])

function getImage(event){
  console.log(event)
}


</script>

<style scoped>

  .icons{
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 25vw;
  }
  .icon{
    clip-path: circle();
    display: grid;
    place-items: center;
    overflow: hidden;
  }

  .iconLarge{
    max-height: 15vw;
    min-height: 15vw;
    overflow: hidden;
  }
  .upload{
    background-color: var(--red);
    padding: 20px;
    width: fit-content;
    border: 0;
    border-radius: 10px;
    font-weight: 900;
    font-size: 1.3vw;
  }
  .upload:hover{
    transform: translateY(1px);
  }
  .upload:active{
    background-color: #fff;
    color: var(--red);
    transform: translateY(3px);
  }
  .container{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
</style>