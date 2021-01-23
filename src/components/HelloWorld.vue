<template>
  <div>
    <h1>Kalkulator receptur mieszanek dla drobiu</h1>
    <FoodItemTable v-bind:products="products" v-bind:headers="headers"></FoodItemTable>
    <div>
      <form v-on:submit.prevent="addNutrient()">
        <div class="form-input">
          <label for="nutrient">
            <span>Składnik odżywczy</span>
          </label>
          <input type="text" id="nutrient" v-model="nutrient" />
        </div>
        <button>
          Dodaj
        </button>
      </form>
    </div>
    <div>
      <form v-on:submit.prevent="addIngredient()">
        <div class="form-input">
          <label for="ingredient">
            <span>Produkt</span>
          </label>
          <input type="text" id="ingredient" v-model="ingredient" />
        </div>
        <button>
          Dodaj
        </button>
      </form>
    </div>
    <div class="information-panel">
      <h3>Zalecane w 1 kg paszy dla różnych grup produkcyjnych:</h3>
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
      nutrient: ref(''),
      ingredient: ref(''),
    };
  },
  methods: {
    addNutrient() {
      const nutrient = {
        label: this.nutrient,
        property: this.nutrient,
      };
      if (!this.nutrient || alreadyExists(this.headers, nutrient)) {
        return;
      }

      this.headers = [...this.headers, nutrient];
      this.nutrient = '';
    },
    addIngredient() {
      const ingredient = {
        label: this.ingredient,
        percentage: 0,
        cost: 0,
      };
      if (!this.ingredient || alreadyExists(this.products, ingredient)) {
        return;
      }

      this.products = [...this.products, ingredient];
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
.form-input {
  display: flex;
  flex-direction: column;
}
</style>
