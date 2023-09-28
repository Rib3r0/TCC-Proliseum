<template >
  <div class="container">

    <label class="upload" :for="id">
      <div class="icon">
        <img  class="iconLarge" :key="src" :src="src">
      </div>
    </label>
    <input name="arquivo" :id="id" type="file" accept="image/*" @change="getImage" hidden/>
  </div>
</template>

<script setup>
import { ref } from "vue"

defineProps({
  id : {
    type : String,
    required : true
  }
})
let src = ref("https://i.ibb.co/jVvMSHY/image-6.png")
const emit = defineEmits(['update:modelValue'])

function getImage(event){
  const image = event.target.files[0]
  console.log(image);
  
  // const storageRef = refFB(storage, 'id/profile')
  // uploadBytes(storageRef, image).then( (snapshot) => { console.log('uploaded') } )

  const reader = new FileReader()
  reader.readAsDataURL(image)
  reader.onload = e =>{
    src.value = e.target.result
    emit('update:modelValue', event.target.files[0])
  }
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
  .iconLarge:hover{
    transform: translateY(1px);
    filter: brightness(50%);
  }
  .icon:hover::after{
    content: url(https://img.icons8.com/sf-black/64/FFFFFF/edit-image.png);
    display: grid;
    place-items: center;
    height: 100%;
    width: 100%;
    background-color: #0005;
    position: absolute;
  }
  .container{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    gap: 20px;
  }
</style>