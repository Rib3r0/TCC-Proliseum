<template>
  <div v-if="type == 'image'">
    <label class="upload" :for="id">UPLOAD</label>
    <input name="arquivo" :id="id" type="file" accept="image/*" @change="$emit('onChange', $event)" hidden/>
  </div>
  <div v-else-if="!required" class="container">
    <span class="title">{{ text }}</span>
    <input class="input" :type="type" @input="onInput">
  </div>
  <div v-else class="container">
    <div>
      <span class="title">{{ text }}</span>
      <span class="required">*</span>
    </div>
    <input class="input" :type="type" @input="onInput" required>
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
      id :{
        type:String,
        default: ""
      },
    },
    methods: {
      onInput(event) {
        this.$emit('on-input', event.target.value,this.id)
      }
    }
}
</script>

<style scoped>
  .container{
    display: flex;
    flex-direction: column;
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
  


</style>