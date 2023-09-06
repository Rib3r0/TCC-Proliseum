<template>
  <new-input-form label="TESTE" v-model="nome"  required/>
  <new-input-form label="TESTE" v-model="senha" required/>
</template>

<script setup>
import { ref } from 'vue';
import NewInputForm from '../components/form/NewInputForm.vue';

const nome = ref("")
const senha = ref("")

</script>

<style>

</style>