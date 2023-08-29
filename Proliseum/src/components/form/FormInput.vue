<template>
  <div v-if="type == 'checkbox'">
    <input id="checkbox" type="checkbox" hidden>
    <label class="checkbox" for="checkbox">
      <img src="../../assets/img/LOL.png">
    </label>
  </div>
  <div v-else-if="type == 'image'">
    <label class="upload" for="arquivo">UPLOAD</label>
    <input name="arquivo" id="arquivo" type="file" accept="image/*" @change="$emit('onChange', $event)" hidden/>
  </div>
  <div v-else-if="!required" class="container">
    <span class="title">{{ text }}</span>
    <input class="input" :type="type">
  </div>
  <div v-else class="container">
    <div>
      <span class="title">{{ text }}</span>
      <span class="required">*</span>
    </div>
    <input class="input" :type="type" required>
  </div>

</template>

<script>
export default {
    name: 'FormInput',
    data() {
      return {
      }
    },
    props: {
      text: String,
      required: Boolean,
      type: {
          type:String,
          default: "text"
      },
    }
}
</script>

<style scoped>
  .container{
    display: flex;
    flex-direction: column;
  }
  .title{
    padding-left:10px ;
    font-weight: 900;
    font-size: var(--font-text);
  }
  .input{
    max-height: 55px;
    height: 4vw;
    font-weight: 500;
    padding-left:10px ;
    font-size: var(--font-text);
    min-width: 18vw;
    width: 100%;
  }
  .required{
    color: var(--red);
    font-size: var(--font-text);
  }
  .upload{
    background-color: var(--red);
    padding: 20px;
    border: 0;
    border-radius: 73px;
    font-weight: 900;
    font-size: 1rem;
  }
  .checkbox{
    background-color: var(--red);
    padding: 10px;
    display: block;
    height: fit-content;
    border-radius: 20px;
  }
  .checkbox img {
    height: 4vw;
  }
  :checked + .checkbox {
    background-color: #fff
  }
  :checked + .checkbox img {
    filter: brightness(0) saturate(100%) invert(49%) sepia(54%) saturate(7439%) hue-rotate(342deg) brightness(103%) contrast(104%);
  }


</style>