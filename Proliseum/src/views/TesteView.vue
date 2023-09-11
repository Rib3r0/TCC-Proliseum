<template>
  <new-input-form label="TESTE" v-model="nome"  required/>
  <new-input-form label="TESTE" v-model="senha" required/>
  <NewCustomButtonVue label="LOGIN" size="10px" @onClick="login" />
</template>

<script setup>
import { ref } from 'vue';
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