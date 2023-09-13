<template>
</template>

<script setup>
import { ref } from 'vue';
import CustomNav from '../components/Nav/CustomNav.vue';
import NewInputForm from '../components/form/NewInputForm.vue';
import NewCustomButtonVue from '../components/NewCustomButton.vue';

const nome = ref("")
const senha = ref("")

function login(){
  console.log(nome.value)
  console.log(senha.value)
}

</script>

<style>

</style>