<template>
  <div class="sidebar" :style="{ width: sidebarWidth}">
    <span class="collapsed-icon" @click="toggleSidebar">
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6CAYAAACI7Fo9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAC+ElEQVR4nO3dsQ3DMAwAwR/dmzMbxFXAQLoD1BvEm3KVFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8Hcexww00OkzaBwz0ECnz2D9ARwz0EBedBFYBBrIjS4Ci0AD+XQXgUUwZiACEWhgLpjB+gM4ZqCBvOgisAg0kBtdBBaBBvLpLgKLYMxABCLQwFwwg/UHcMxAA3nRRWARaCA3uggsAg3k010EFsGYgQhEoIG5YAbrD+CYgQbyoovAItBAbnQRWAQayKe7CCyCMQMRiEADc8EM1h/AMQMN5EUXgUWggdzoIrAINND7p/v2D8s7ZqCBfv8HDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8NXjmIEGOn0GjWMGGuj0Gaw/gGMGGsiLLgKLQAO50UVgEWggn+4isAjGDEQgAg3MBTNYfwDHDDSQF10EFoEGcqOLwCLQQD7dRWARjBmIQAQamAtmsP4AjhloIC+6CCwCDeRGF4FFoIF8uovAIhgzEIEINDAXzGD9ARwz0EBedBFYBBpwo4vAItBAPt1FYBFkBiIQgQa6YQbrD+CYgQbyoovAItBAbnQRWAQa6P3TffuH5R0z0EC//wMHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD46nHMQAOdPoPGMQMNdPoM1h/AMQMN5EUXgUWggdzoIrAINJBPdxFYBGMGIhCBBuaCGaw/gGMGGsiLLgKLQAO50UVgEWggn+4isAjGDEQgAg3MBTNYfwDHDDSQF10EFoEGcqOLwCLQQD7dRWARjBmIQAQamAtmsP4AjhloIC+6CCwCDeRGF4FFoIF8uovAIhgzEIEINDAXzGD9ARwz0EBedBFYBBrIjS4Ci0ADvX+6b/+wvGMGGuj3f+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD0Pz6hRPvp17TuNAAAAABJRU5ErkJggg==">
    </span>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";


const collapsed =ref(false)
const toggleSidebar = () => (collapsed.value = !collapsed.value)

const SIDEBAR_WIDTH = 20
const SIDEBAR_WIDTH_COLLAPSED = 5

const sidebarWidth = computed(
  () => `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}vw`
)

</script>

<style scoped>
.collapsed-icon img{
  height: 20%;
}

.sidebar{
  background-color: #191828;

  float: left;
  position: fixed;
  z-index: 1;
  padding: 0.5rem;
  height: 100vh;

  transition: 0.3s ease;

  display: flex;
  align-items: center;
  flex-direction: column;
}

</style>