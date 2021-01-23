<template>
  <div class="hello">
    <h1>Kalkulator receptur mieszanek dla drobiu</h1>
    <FoodItemTable
      v-bind:products="products"
      v-bind:headers="headers"
    ></FoodItemTable>
    <div>
      <form v-on:submit.prevent="addIngredient()">
        <div>
          <label for="ingredient">
            <span>Składnik</span>
          </label>
          <input type="text" id="ingredient" v-model="ingredient" />
        </div>
        <button v-on:click="addIngredient()">
          Dodaj
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { isEqual } from 'lodash-es';
import FoodItemTable from '@/components/foodItemTable/FoodItemTable.vue';
import { FoodItemService } from './foodItem/foodItem.service';

function alreadyExists<T>(collection: T[], item: T): boolean {
  return collection.some((collectionItem) => isEqual(collectionItem, item));
}

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
      ingredient: ref(''),
    };
  },
  methods: {
    addIngredient() {
      const newIngredient = {
        label: this.ingredient,
        property: this.ingredient,
      };
      if (!this.ingredient || alreadyExists(this.headers, newIngredient)) {
        return;
      }

      this.headers = [
        ...this.headers,
        { label: this.ingredient, property: this.ingredient },
      ];
      this.ingredient = '';
    },
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
