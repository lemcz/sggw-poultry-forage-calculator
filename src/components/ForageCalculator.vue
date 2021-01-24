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
      <form v-on:submit.prevent="addIngredient()" style="display: flex;">
        <component
          v-for="field in schema"
          :key="field.property"
          :is="field.type"
          v-model="ingredient[field.property]"
          v-bind="field"
        ></component>
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
import NumberField from '@/components/number-field/NumberField.vue';
import TextField from '@/components/text-field/TextField.vue';
import { FieldMode } from '@/models/fieldMode';

import { FoodItemService } from './foodItem/foodItem.service';

function alreadyExists<T>(collection: T[], item: T): boolean {
  return collection.some((collectionItem) => isEqual(collectionItem, item));
}

export default defineComponent({
  name: 'ForageCalculator',
  components: {
    FoodItemTable,
    TextField,
    NumberField,
  },
  setup() {
    const headers = FoodItemService.getHeaders();
    const products = FoodItemService.getProducts();
    // TODO add types to headers
    const schema = headers.map((header) => ({
      type: 'TextField',
      mode: FieldMode.Edit,
      property: header.property,
      label: header.label,
      placeholder: header.label,
    }));

    return {
      schema: ref(schema),
      headers,
      products,
      nutrient: ref(''),
      ingredient: ref({
        label: 'Foobar',
        percentage: 10,
        cost: 420,
      }),
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
      if (!this.ingredient.label || alreadyExists(this.products, this.ingredient)) {
        return;
      }

      this.products = [
        ...this.products,
        // TODO clean this up after adding types to headers
        {
          ...this.ingredient,
          percentage: parseInt(this.ingredient.percentage as unknown as string),
          cost: parseInt(this.ingredient.cost as unknown as string),
        },
      ];
      this.ingredient = {
        label: '',
        percentage: 0,
        cost: 0,
      };
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
