<template>
  <pagination :elements="elements" :per-page="perPage" :page="page"/>
</template>

<script setup>
import { ref } from 'vue';
import Pagination from '../components/Pagination.vue';

const elements= ref(50)
const perPage= ref(20)
const page= ref(1)

function login(){
  console.log(nome.value)
  console.log(senha.value)
}

</script>

<style>

</style>