<template>
  <el-table sum-text="Suma" max-height="740" :data="model" @selection-change="toggleRowSelection" show-summary>
    <el-table-column type="selection"></el-table-column>
    <el-table-column
      v-for="header in config.singularColumns"
      v-bind:key="header.property"
      :label="header.label"
      :prop="header.property"
    >
    </el-table-column>
    <el-table-column v-for="header in config.doubleColumns" v-bind:key="header.property" :label="header.label">
      <el-table-column label="/ 1kg" :prop="header.property"></el-table-column>
      <el-table-column label="w mieszance">
        <template #default="scope">
          <span style="margin-left: 10px">{{
            parseFloat(((scope.row.percentage * scope.row[header.property]) / 100).toFixed(2))
          }}</span>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column label="Akcje">
      <template #default="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit"></el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          icon="el-icon-delete"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FoodItemRecord } from '@/models/foodItem.model';
import { TFieldType } from '@/helpers/food-item-table';
import { FieldMode } from '@/models/fieldMode';

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
  emits: ['select-change', 'product-remove'],
  setup(props, { emit }) {
    return {
      handleEdit($index: number, row: FoodItemRecord): void {
        console.info('implement me!', $index, row);
      },
      handleDelete($index: number, row: FoodItemRecord): void {
        emit('product-remove', row);
      },
      toggleRowSelection(selectedItems: FoodItemRecord[]): void {
        emit('select-change', selectedItems);
      },
    };
  },
});
</script>

<style scoped></style>
