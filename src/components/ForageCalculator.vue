<template>
  <div>
    <h1>Kalkulator receptur mieszanek dla drobiu</h1>
    <FoodItemTable
      v-bind:products="products"
      v-bind:headers="headers"
      @select-change="updateSelected"
      @product-remove="removeProduct"
    ></FoodItemTable>
    <div>
      <form v-on:submit.prevent="addNutrient()">
        <TextField v-model="nutrient" :label="'Składnik odżywczy'" :mode="FieldMode.Edit"></TextField>
        <div>
          <button>
            Dodaj
          </button>
        </div>
      </form>
    </div>
    <div>
      <form class="flex-wrap" v-on:submit.prevent="addIngredient()">
        <component
          v-for="field in schema"
          :key="field.property"
          :is="field.type"
          v-model="ingredient[field.property]"
          v-bind="field"
        ></component>
        <div>
          <button>
            Dodaj
          </button>
        </div>
      </form>
    </div>
    <div>
      <button v-on:click="resetToDefaults()">Reset do fabrycznych</button>
    </div>
    <div class="information-panel">
      <SelectField
        v-model="forageType"
        v-on:change="logChange(forageType)"
        :label="'Typ paszy'"
        :mode="FieldMode.Edit"
        :options="[
          { value: ForageType.Starter, label: 'Starter' },
          { value: ForageType.Prester, label: 'Prester' },
          { value: ForageType.Grower, label: 'Grower' },
          { value: ForageType.Finiszer, label: 'Finiszer' },
          { value: ForageType.Nioska1, label: 'Nioska I' },
          { value: ForageType.Nioska2, label: 'Nioska II' },
        ]"
      ></SelectField>
      <h3>Zalecane w 1 kg paszy dla różnych grup produkcyjnych:</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import TextField from '@/components/text-field/TextField.vue';
import NumberField from '@/components/number-field/NumberField.vue';
import SelectField from '@/components/select-field/SelectField.vue';
import FoodItemTable from '@/components/foodItemTable/FoodItemTable.vue';
import { FieldMode } from '@/models/fieldMode';
import { FieldType } from '@/helpers/food-item.service';
import { alreadyExists } from '@/helpers/collection-helpers';
import { FoodItemRecord, NutrientItem } from '@/models/foodItem.model';
import { fillProductWithDefaults, getDefaultState, getHeaderType } from '@/helpers/food-item-table';

export enum ForageType {
  Prester,
  Starter,
  Grower,
  Finiszer,
  Nioska1,
  Nioska2,
}

export default defineComponent({
  name: 'ForageCalculator',
  components: {
    FoodItemTable,
    TextField,
    NumberField,
    SelectField,
  },
  setup() {
    const { headers: defaultHeaders, products: defaultProducts } = getDefaultState();
    const headers = ref(defaultHeaders);
    const products = ref(defaultProducts);

    const schema = computed(() =>
      headers.value.map((header) => ({
        type: getHeaderType(header.type),
        mode: FieldMode.Edit,
        property: header.property,
        label: header.label,
        placeholder: header.label,
      })),
    );

    const ingredient = ref({
      label: 'Foobar',
      percentage: 10,
      cost: 420,
    });
    const nutrient = ref('');
    const forageType = ref(ForageType.Grower);

    return {
      schema,
      headers,
      products,
      nutrient,
      ingredient,
      forageType,
      FieldMode,
      ForageType,
      logChange(type: ForageType) {
        console.log('registered select field change', type);
      },
      resetToDefaults() {
        const { products: defaultProducts, headers: defaultHeaders } = getDefaultState();
        products.value = defaultProducts;
        headers.value = defaultHeaders;
      },
      updateSelected(products: FoodItemRecord[]): void {
        // TODO finish this (calculate optimal Forage with selected items)
        console.log('update selected!', products);
      },
      removeProduct(product: FoodItemRecord): void {
        products.value = products.value.filter(({ label }) => label !== product.label);
      },
      addNutrient() {
        const newNutrient: NutrientItem = {
          label: nutrient.value,
          property: nutrient.value,
          type: FieldType.Number,
        };
        if (!nutrient.value || alreadyExists(headers.value, newNutrient)) {
          return;
        }

        headers.value = [...headers.value, newNutrient];
        products.value = products.value.map((product) => ({
          ...product,
          ...fillProductWithDefaults(product, headers.value),
        }));
        nutrient.value = '';
      },
      addIngredient() {
        if (!ingredient.value.label || alreadyExists(products.value, ingredient.value)) {
          return;
        }

        products.value = [...products.value, fillProductWithDefaults(ingredient.value, headers.value)];
        ingredient.value = {
          label: '',
          percentage: 0,
          cost: 0,
        };
      },
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

.flex-wrap {
  display: flex;
  flex-wrap: wrap;
}
</style>
