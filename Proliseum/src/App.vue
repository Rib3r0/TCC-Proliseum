<template>
  <CustomNav v-if="showNav"/>
  <div :style="showNav ? { 'margin-left' : tamanho} : { 'margin-left' : '0' } "> 
    <RouterView :key="$route.fullPath" v-slot="{ Component }">
      <template v-if="Component">
        <Transition mode="out-in">
          <KeepAlive>
            <Suspense>
              <!-- main content -->
              <component :is="Component"></component>

              <!-- loading state -->
              <template #fallback>
                <div class="loadingScreen">
                  <img src="./assets/img/Rolling-1s-323px.svg">
                </div>
              </template>
            </Suspense>
          </KeepAlive>
        </Transition>
      </template>
    </RouterView>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import CustomNav from './components/CustomNav.vue';
import router from './router';
import { SIDEBAR_WIDTH_COLLAPSED } from './components/state';

const tamanho = SIDEBAR_WIDTH_COLLAPSED + "px"

const showNav = computed(
  () =>   router.currentRoute.value.path != '/' &&  
          router.currentRoute.value.path != '/login' &&
          router.currentRoute.value.path != '/recovery' &&
          router.currentRoute.value.path != '/register' &&
          router.currentRoute.value.name != 'Not_Found'
)



</script>

<style scoped>
.loadingScreen{
  height: 100vh;
  display: grid;
  place-items: center;
}

</style>

       