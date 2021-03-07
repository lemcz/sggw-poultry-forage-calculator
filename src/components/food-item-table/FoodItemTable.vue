<template>
  <el-table
    sum-text="Suma"
    max-height="740"
    :data="model"
    show-summary
    :summary-method="getSummaries"
    @selection-change="toggleRowSelection"
  >
    <el-table-column type="selection" width="38px"></el-table-column>
    <el-table-column
      v-for="header in config.singularColumns"
      v-bind:key="header.property"
      :label="header.label"
      :prop="header.property"
    >
      <template #default="scope">
        <span v-if="header.property !== 'percentage'">
          {{ scope.row[header.property] }}
        </span>
        <component
          v-else
          :is="'NumberField'"
          :mode="FieldMode.Edit"
          v-model="scope.row[header.property]"
          :min="0"
          :max="100"
        ></component>
      </template>
    </el-table-column>
    <el-table-column v-for="header in config.doubleColumns" v-bind:key="header.property" :label="header.label">
      <el-table-column label="/ 1kg" :prop="header.property">
        <template #default="scope">
          <span v-if="!scope.row.edit">
            {{ scope.row[header.property] }}
          </span>
          <component
            v-else
            :is="'NumberField'"
            :mode="FieldMode.Edit"
            v-model="scope.row[header.property]"
            :min="0"
            :max="1000"
          ></component>
        </template>
      </el-table-column>
      <el-table-column label="w mieszance" :prop="header.property">
        <template #default="scope">
          <span class="ml-mid">{{ getMixValueCell(scope.row, header) }}</span>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column label="Akcje" min-width="120px">
      <template #default="scope">
        <div class="flex">
          <el-button
            v-if="!scope.row.edit"
            size="mini"
            type="info"
            @click="scope.row.edit = true"
            icon="el-icon-edit"
          ></el-button>
          <el-button v-else size="mini" type="primary" @click="scope.row.edit = false" icon="el-icon-check"></el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            icon="el-icon-delete"
          ></el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FoodItemRecord } from '@/models/foodItem.model';
import { TFieldType } from '@/helpers/food-item-table';
import { FieldMode } from '@/models/fieldMode';
import NumberField from '@/components/number-field/NumberField.vue';
import { formatNumberToDisplay, sumNumeric } from '@/helpers/utils';

export interface FoodItemModel {
  type: TFieldType;
  mode: FieldMode;
  property: string;
  label: string;
  placeholder: string;
}

export default defineComponent({
  name: 'FoodItemTable',
  props: {
    model: Array as () => FoodItemRecord[],
    config: Object as () => { singularColumns: any[]; doubleColumns: any[] },
  },
  components: {
    NumberField,
  },
  emits: ['select-change', 'product-remove'],
  setup(props, { emit }) {
    const getMixValue = (product: any, header: any): number => {
      return formatNumberToDisplay(((product.percentage as number) * product[header.property]) / 100);
    };

    return {
      handleDelete($index: number, row: FoodItemRecord): void {
        emit('product-remove', row);
      },
      toggleRowSelection(selectedItems: FoodItemRecord[]): void {
        emit('select-change', selectedItems);
      },
      getMixValueCell(product: any, header: any): number {
        return getMixValue(product, header);
      },
      getSummaries({ columns, data }: any): (string | number)[] {
        return columns.map((column: any, idx: number): string | number => {
          if (idx === 0) return '';
          if (idx === 1) return 'Suma';
          // NOTE these are the columns which represent values / 1kg
          if (column.no === 0) return '';

          const values = data.map((item: any): number =>
            column.property === 'percentage' ? Number(item[column.property]) : getMixValue(item, column),
          );
          if (!values.every((value: any) => isNaN(value))) {
            return formatNumberToDisplay(sumNumeric(values));
          }

          return '';
        });
      },
      FieldMode,
    };
  },
});
</script>

<style scoped>
.el-button {
  max-width: 44px;
}
</style>
