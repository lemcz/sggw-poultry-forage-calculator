<template>
  <ForageCalculatorPage />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ForageCalculatorPage from '@/components/forage-calculator-page/ForageCalculatorPage.vue';

export default defineComponent({
  name: 'App',
  components: {
    ForageCalculatorPage,
  },
});
</script>

<style>
#app {
  text-align: center;
}
</style>
