<template>
  <div v-if="Image == null " class="icons">
        <div class="icon">
          <img class="iconSmall" src="https://i.ibb.co/jVvMSHY/image-6.png">
        </div>
        <div class="icon">
          <img class="iconMedium" src="https://i.ibb.co/jVvMSHY/image-6.png">
        </div>
        <div class="icon">
          <img class="iconLarge" src="https://i.ibb.co/jVvMSHY/image-6.png">
        </div>
        <FormInput type="image" text="UPLOAD" @onChange="changeImage" />
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
        <FormInput type="image" text="UPLOAD" @onChange="changeImage" />
      </div>
</template>

<script>
import FormInput from './FormInput.vue'
export default {
    name: "ImageUpload",
    data() {
        return{
            Image: null
        }
    },
    components: {
         FormInput
    },
    methods: {
      changeImage(event){
        const image = event.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onload = e =>{
          this.Image = e.target.result
          this.$emit('ImageUploded',this.Image)
        }
      },
    }
}
</script>

<style>
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
  .iconSmall{
    max-height: 3vw;
    min-height: 3vw;
    overflow: hidden;
  }
  .iconMedium{
    max-height: 6vw;
    min-height: 6vw;
    overflow: hidden;
  }

  .iconLarge{
    max-height: 9vw;
    min-height: 9vw;
    overflow: hidden;
  }
</style>