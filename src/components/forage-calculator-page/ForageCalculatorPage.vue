<template>
  <el-container>
    <el-header><h1>Kalkulator receptur mieszanek dla drobiu</h1></el-header>
    <div class="container">
      <FoodItemTable
        v-bind:model="products"
        v-bind:config="{
          singularColumns,
          doubleColumns,
        }"
        @select-change="updateSelected"
        @product-remove="removeProduct"
      ></FoodItemTable>
    </div>
    <div class="container flex-space-between">
      <div>
        <el-popconfirm
          confirmButtonText="Tak"
          cancelButtonText="Anuluj"
          icon="el-icon-info"
          iconColor="red"
          title="Czy na pewno przywrócić dane do ustawień domyślnych?"
          v-on:confirm="resetToDefaults()"
        >
          <template #reference>
            <el-button type="info">Reset danych</el-button>
          </template>
        </el-popconfirm>
      </div>
      <div class="button-group">
        <el-button type="primary" @click="addSubstanceDialogVisible = true">Dodaj substancję</el-button>
        <el-dialog title="Dodaj substancję" v-model="addSubstanceDialogVisible">
          <TextField v-model="nutrient" :label="'Substancja'" :mode="FieldMode.Edit"></TextField>
          <template #footer>
            <span class="dialog-footer button-group">
              <el-button @click="addSubstanceDialogVisible = false">Anuluj</el-button>
              <AddButton
                @click="
                  addNutrient();
                  addSubstanceDialogVisible = false;
                "
                type="primary"
              />
            </span>
          </template>
        </el-dialog>
        <el-button type="primary" @click="addIngredientDialogVisible = true">Dodaj składnik</el-button>
        <el-dialog title="Dodaj składnik" v-model="addIngredientDialogVisible" width="75%" destroy-on-close center>
          <div class="flex-wrap">
            <component
              class="ml-mid"
              v-for="field in schema"
              :key="field.property"
              :is="field.type"
              v-model="ingredient[field.property]"
              v-bind="field"
            ></component>
          </div>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="addIngredientDialogVisible = false">Anuluj</el-button>
              <AddButton
                @click="
                  addIngredient();
                  addIngredientDialogVisible = false;
                "
                type="primary"
              />
            </span>
          </template>
        </el-dialog>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="container">
      <SelectField
        style="width: 180px;"
        v-model="forageType"
        :label="'Typ paszy'"
        :mode="FieldMode.Edit"
        :options="limitOptions"
      ></SelectField>
      <NumberField
        class="ml-mid"
        style="width: 180px;"
        :label="'Tolerancja błędu wyniku'"
        v-model="tolerance"
        :mode="FieldMode.Edit"
        :max="1"
        :step="0.01"
      ></NumberField>
      <el-button class="ml-mid" type="success" v-on:click="calculateMinimalCostMix()">
        Wyznacz automatycznie
      </el-button>
    </div>
    <div class="container flex-column">
      <h3>
        Zalecane w 1 kg paszy dla grupy produkcyjnej
        <strong>{{ chosenForage }}</strong>
        :
      </h3>
      <el-table stripe :data="limitsData">
        <el-table-column
          v-for="limitHeader in limitsHeaders"
          v-bind:key="limitHeader.property"
          :prop="limitHeader.property"
          :label="limitHeader.label"
        >
        </el-table-column>
      </el-table>
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
import { extendFoodItemByProperty, getSuggestedPercentage } from '@/helpers/utils';

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
      label: '',
      percentage: 0,
      cost: 0,
    });
    const nutrient = ref('');
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
    const { singularColumns, doubleColumns } = headers.value.reduce(
      (acc: { singularColumns: NutrientItem[]; doubleColumns: NutrientItem[] }, curr) => {
        curr.ingredientValue ? acc.doubleColumns.push(curr) : acc.singularColumns.push(curr);
        return acc;
      },
      { singularColumns: [], doubleColumns: [] },
    );

    return {
      addSubstanceDialogVisible: ref(false),
      addIngredientDialogVisible: ref(false),
      schema,
      headers,
      products,
      nutrient,
      singularColumns,
      doubleColumns,
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
          ingredientValue: true,
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

        ingredient.value = extendFoodItemByProperty(ingredient.value) as any;

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

<style scoped></style>
