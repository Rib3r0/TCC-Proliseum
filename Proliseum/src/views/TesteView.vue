<template>
  <NovoInputForm label="TESTE" :value="teste" @onInput="testando" required/>
</template>

<script>
import NovoInputForm from '../components/form/NovoInputForm.vue';

export default {
    data(){
        return {
            teste : "",
            nome : ""
        }
    },
    methods:{
      testando(input){
        this.nome = input
      }  
    },
    components: { NovoInputForm }
}
</script>

<style>

</style>