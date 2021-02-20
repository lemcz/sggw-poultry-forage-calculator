<template>
  <el-container>
    <el-header><h1>Kalkulator receptur mieszanek dla drobiu</h1></el-header>
    <FoodItemTable
      v-bind:products="products"
      v-bind:headers="headers"
      @select-change="updateSelected"
      @product-remove="removeProduct"
    ></FoodItemTable>
    <div style="display: flex;">
      <div style="width: 10vw;">
        <form v-on:submit.prevent="addNutrient()">
          <TextField v-model="nutrient" :label="'Składnik odżywczy'" :mode="FieldMode.Edit"></TextField>
          <div><AddButton :type="'primary'" /></div>
        </form>
      </div>
      <div style="margin-left: 10px;">
        <form class="flex-wrap" v-on:submit.prevent="addIngredient()">
          <component
            v-for="field in schema"
            :key="field.property"
            :is="field.type"
            v-model="ingredient[field.property]"
            v-bind="field"
          ></component>
          <div><AddButton :type="'primary'" /></div>
        </form>
      </div>
    </div>
    <div style="display: flex;">
      <NumberField
        style="width: 180px;"
        :label="'Tolerancja błędu wyniku'"
        v-model="tolerance"
        :mode="FieldMode.Edit"
        :max="1"
        :step="0.01"
      ></NumberField>
      <el-button type="success" v-on:click="calculateMinimalCostMix()">Wyznacz automatycznie</el-button>
      <el-button type="info" v-on:click="resetToDefaults()">Reset danych</el-button>
    </div>
    <div class="information-panel flex-wrap">
      <SelectField
        v-model="forageType"
        v-on:change="changeForageRequirements(forageType)"
        :label="'Typ paszy'"
        :mode="FieldMode.Edit"
        :options="limitOptions"
      ></SelectField>
      <div>
        <h3>
          Zalecane w 1 kg paszy dla grupy produkcyjnej
          <strong>{{ chosenForage }}</strong>
          :
        </h3>
        <el-table border :data="limitsData">
          <el-table-column
            v-for="limitHeader in limitsHeaders"
            v-bind:key="limitHeader.property"
            :prop="limitHeader.property"
            :label="limitHeader.label"
          >
          </el-table-column>
        </el-table>
      </div>
    </div>
  </el-container>
</template>

<script lang="ts">
import axios from 'axios';
import { computed, defineComponent, ref } from 'vue';
import TextField from '@/components/text-field/TextField.vue';
import AddButton from '@/components/add-button/AddButton.vue';
import NumberField from '@/components/number-field/NumberField.vue';
import SelectField from '@/components/select-field/SelectField.vue';
import FoodItemTable from '@/components/food-item-table/FoodItemTable.vue';
import { FieldMode } from '@/models/fieldMode';
import { alreadyExists } from '@/helpers/collection-helpers';
import { FieldType, ForageType, FoodItemService } from '@/helpers/food-item.service';
import { FoodItemRecord, NutrientItem } from '@/models/foodItem.model';
import { fillProductWithDefaults, getDefaultState, getHeaderType } from '@/helpers/food-item-table';

export default defineComponent({
  name: 'ForageCalculator',
  components: {
    FoodItemTable,
    TextField,
    NumberField,
    SelectField,
    AddButton,
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
    // TODO add possibility to display amount of g's in kg's in a table (2 columns per nutrient)
    // TODO edit the cells in the table on click

    const forageType = ref(ForageType.Grower);
    const limitOptions: { value: ForageType; label: string }[] = [
      { value: ForageType.Starter, label: 'Starter' },
      { value: ForageType.Prester, label: 'Prester' },
      { value: ForageType.Grower, label: 'Grower' },
      { value: ForageType.Finiszer, label: 'Finiszer' },
      { value: ForageType.Nioska, label: 'Nioska' },
    ];
    const chosenForage = computed(() =>
      (limitOptions.find(({ value }) => value === forageType.value)?.label ?? '').toLowerCase(),
    );
    const limitsData = computed(() => {
      const limits = FoodItemService.limits[forageType.value] ?? {};
      // TODO this should only take into account the macros, not every single header
      return [
        {
          limit: 'min',
          ...Object.keys(limits).reduce((acc: any, curr) => {
            acc[curr] = limits[curr].min ?? '-';
            return acc;
          }, {}),
        },
        {
          limit: 'max',
          ...Object.keys(limits).reduce((acc: any, curr) => {
            acc[curr] = limits[curr].max ?? '-';
            return acc;
          }, {}),
        },
      ];
    });
    const limitsHeaders = computed(() => {
      const limits = FoodItemService.limits[forageType.value] ?? {};
      // TODO this should only take into account the macros, not every single header
      const firstColumn = {
        property: 'limit',
        label: '',
      };
      return (
        schema?.value?.reduce(
          (acc: any[], header: any): any[] => {
            if (!limits[header?.property]) {
              return acc;
            }

            return [
              ...acc,
              {
                property: header.property,
                label: header.label,
              },
            ];
          },
          [firstColumn],
        ) ?? []
      );
    });
    const tolerance = ref(0.01);

    return {
      schema,
      headers,
      products,
      nutrient,
      ingredient,
      forageType,
      FieldMode,
      ForageType,
      chosenForage,
      limitsData,
      limitOptions,
      limitsHeaders,
      tolerance,
      async calculateMinimalCostMix() {
        // TODO pass the data properly (mapped from the chosen products)
        try {
          const variables = products.value.reduce((acc: any, curr): any => {
            const property = ((curr.label ?? '') as string)
              .toLowerCase()
              .split(' ')
              .join('_') as string;
            acc[property] = curr;
            return acc;
          }, {});
          const constraints = {
            ...FoodItemService.limits[forageType.value],
          };
          console.info(constraints, variables);
          const suggestedMix = await axios.post('http://localhost:3000/api/calculate-feed-mix', {
            optimize: 'cost',
            opType: 'min',
            constraints,
            variables,
            options: {
              // TODO make tolerance configurable from FE
              tolerance: tolerance.value,
            },
          });
          // TODO display those values in the table (percentage) IF the result is feasible
          console.info('got some mix!', suggestedMix);
          if (suggestedMix.data.feasible) {
            console.info('and it succeeded!');
          } else {
            console.info('but it failed  :(');
          }
        } catch (e) {
          // TODO handle error - display one (library - vee-validate)
        }
      },
      changeForageRequirements(type: ForageType) {
        console.log('registered select field change', type, forageType.value, forageType);
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
