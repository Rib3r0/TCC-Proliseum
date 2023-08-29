<template>
    <input :id="id" type="radio" :value="value" :name="name" :required="required"  hidden>
    <label class="checkbox" :for="id">
        <img :src="icon">
    </label>
</template>

<script>
export default {
    name: "FormRatio",
    props:{
        icon: {
            type: String,
            default: "../../src/assets/img/LOL.png",
        },
        name: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        required: {
            type: Boolean,
            default: false
        },
        value: {
            type: Boolean,
            required: true
        }
    }
}
</script>

<style>

.checkbox{
    background-color: var(--red);
    padding: 10px;
    display: grid;
    justify-content: center;
    height: 6vw;
    width: 6vw;
    border-radius: 20px;
  }
  .checkbox img {
    max-width: 100%;
  }
  :checked + .checkbox {
    background-color: #fff
  }
  :checked + .checkbox img {
    filter: brightness(0) saturate(100%) invert(49%) sepia(54%) saturate(7439%) hue-rotate(342deg) brightness(103%) contrast(104%);
  }

</style>