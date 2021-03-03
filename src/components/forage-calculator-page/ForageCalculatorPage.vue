<template>
  <el-container>
    <el-header><h1>Kalkulator receptur mieszanek dla drobiu</h1></el-header>
    <div style="margin: 15px;">
      <FoodItemTable
        v-bind:model="products"
        v-bind:config="headers"
        @select-change="updateSelected"
        @product-remove="removeProduct"
      ></FoodItemTable>
    </div>
    <div style="display: flex; margin: 15px;">
      <div style="width: 180px;">
        <form v-on:submit.prevent="addNutrient()">
          <TextField v-model="nutrient" :label="'Składnik odżywczy'" :mode="FieldMode.Edit"></TextField>
          <div style="margin: 5px"><AddButton :type="'primary'" /></div>
        </form>
      </div>
      <div style="margin-left: 10px;">
        <form class="flex-wrap" v-on:submit.prevent="addIngredient()">
          <div class="flex-wrap">
            <component
              style="margin-left: 5px"
              v-for="field in schema"
              :key="field.property"
              :is="field.type"
              v-model="ingredient[field.property]"
              v-bind="field"
            ></component>
          </div>
          <div style="margin: 5px"><AddButton :type="'primary'" /></div>
        </form>
      </div>
    </div>
    <div style="display: flex; margin: 15px;">
      <SelectField
        style="width: 180px;"
        v-model="forageType"
        v-on:change="changeForageRequirements(forageType)"
        :label="'Typ paszy'"
        :mode="FieldMode.Edit"
        :options="limitOptions"
      ></SelectField>
      <NumberField
        style="width: 180px; margin-left: 10px;"
        :label="'Tolerancja błędu wyniku'"
        v-model="tolerance"
        :mode="FieldMode.Edit"
        :max="1"
        :step="0.01"
      ></NumberField>
      <el-button style="margin-left: 10px" type="success" v-on:click="calculateMinimalCostMix()">
        Wyznacz automatycznie
      </el-button>
      <el-button type="info" v-on:click="resetToDefaults()">Reset danych</el-button>
    </div>
    <div style="display: flex; flex-direction: column; margin: 15px;">
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
import { ElMessage } from 'element-plus';
import { computed, defineComponent, ref } from 'vue';
import TextField from '@/components/text-field/TextField.vue';
import AddButton from '@/components/add-button/AddButton.vue';
import NumberField from '@/components/number-field/NumberField.vue';
import SelectField from '@/components/select-field/SelectField.vue';
import { FieldMode } from '@/models/fieldMode';
import { alreadyExists } from '@/helpers/collection-helpers';
import FoodItemTable, { FoodItemModel } from '@/components/food-item-table/FoodItemTable.vue';
import { FoodItemRecord, NutrientItem } from '@/models/foodItem.model';
import { FieldType, FoodItemService, ForageType, getLimitsData, getLimitsHeaders } from '@/helpers/food-item.service';
import { fillProductWithDefaults, getDefaultState, getHeaderType } from '@/helpers/food-item-table';
import { calculateFeedMix } from '@/helpers/calculate-feed-mix-api';
import { getSuggestedPercentage } from '@/helpers/utils';

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
    const { headers: defaultHeaders, products: defaultProducts, tolerance: defaultTolerance } = getDefaultState();
    const headers = ref(defaultHeaders);
    const products = ref(defaultProducts);
    const tolerance = ref(defaultTolerance);

    const schema = computed(() =>
      headers.value.map(
        (header): FoodItemModel => ({
          type: getHeaderType(header.type),
          mode: FieldMode.Edit,
          property: header.property,
          label: header.label,
          placeholder: header.label,
        }),
      ),
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
      // TODO this should only take into account current "macros"/"headers", not the hardcoded limits
      const limits = FoodItemService.limits[forageType.value] ?? {};
      return [getLimitsData(limits, 'min'), getLimitsData(limits, 'max')];
    });
    const limitsHeaders = computed(() => {
      // TODO this should only take into account current "macros"/"headers", not the hardcoded limits
      const limits = FoodItemService.limits[forageType.value] ?? {};
      return getLimitsHeaders(limits, schema?.value);
    });
    let selectedProducts: FoodItemRecord[] = [];

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
        if (selectedProducts.length === 0) {
          ElMessage.error({
            type: 'error',
            showClose: true,
            message: 'Należy wybrać produkty do wyliczenia mieszanki',
          });
          return;
        }
        const variables = selectedProducts.reduce((acc: { [key: string]: FoodItemRecord }, curr: FoodItemRecord): {
          [key: string]: FoodItemRecord;
        } => {
          acc[curr.property ?? ''] = curr;
          return acc;
        }, {});
        const constraints = {
          ...FoodItemService.limits[forageType.value],
        };
        try {
          const suggestedMix = await calculateFeedMix(constraints, variables, {
            optimize: 'cost',
            opType: 'min',
            options: { tolerance: tolerance.value },
          });
          console.info('got some mix!', suggestedMix);
          if (suggestedMix.feasible) {
            ElMessage.success({
              type: 'success',
              showClose: true,
              message: 'Pomyślnie wyznaczono składniki',
            });
            products.value.forEach((product) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { feasible, bounded, result, ...rest } = suggestedMix;

              product.percentage = getSuggestedPercentage(rest, product);
            });
          } else {
            ElMessage.error({
              type: 'error',
              showClose: true,
              message: 'Nie udało się znaleźć rozwiązania dla wybranych składników',
            });
          }
        } catch (e) {
          ElMessage.error({
            type: 'error',
            showClose: true,
            message: 'Błąd połączenia z serwerem. Proszę spróbować ponownie później.',
          });
        }
      },
      changeForageRequirements(type: ForageType) {
        console.log('registered select field change', type, forageType.value, forageType);
      },
      resetToDefaults() {
        const { products: defaultProducts, headers: defaultHeaders } = getDefaultState();
        products.value = defaultProducts as any;
        headers.value = defaultHeaders;
      },
      updateSelected(products: FoodItemRecord[]): void {
        selectedProducts = products;
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
        if (!ingredient.value.label || alreadyExists(products.value, ingredient.value as any)) {
          return;
        }

        products.value = [...products.value, fillProductWithDefaults(ingredient.value, headers.value)] as any;
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
  align-items: center;
}
</style>
