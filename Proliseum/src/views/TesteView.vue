<template>
  <pagination/>
</template>

<script setup>
import { ref } from 'vue';
import NewInputForm from '../components/form/NewInputForm.vue';
import NewCustomButtonVue from '../components/NewCustomButton.vue';
import Pagination from '../components/Pagination.vue';

const nome = ref("")
const senha = ref("")

function login(){
  console.log(nome.value)
  console.log(senha.value)
}

</script>

<style>

</style>