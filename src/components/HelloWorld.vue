<template>
  <div class="hello">
    <h1>Kalkulator receptur mieszanek dla drobiu</h1>
    <FoodItemTable :products="products" :headers="headers"></FoodItemTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FoodItemTable from '@/components/foodItemTable/FoodItemTable.vue';
import { FoodItemService } from './foodItem/foodItem.service';

export default defineComponent({
  name: 'HelloWorld',
  components: {
    FoodItemTable,
  },
  props: {},
  setup: () => {
    const headers = FoodItemService.getHeaders();
    const products = FoodItemService.getProducts();

    return {
      headers,
      products,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
