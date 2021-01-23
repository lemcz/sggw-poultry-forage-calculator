<template>
  <table>
    <thead>
      <tr>
        <th v-for="header in headers" v-bind:key="header.property">
          <span class="header_label"> {{ header.label }}</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" v-bind:key="product.property">
        <td v-for="header in headers" v-bind:key="header.property">
          <span>{{ product[header.property] }}</span>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td><strong>Suma</strong></td>
        <td v-for="sum in sums" v-bind:key="sum">
          {{ sum !== undefined ? sum : '-' }}
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script lang="ts">
import { FoodItemRecord } from '@/models/foodItem.model';

export default {
  name: 'FoodItemTable',
  props: {
    products: Object as () => FoodItemRecord,
    headers: Array,
  },
  setup(props: { headers: string[]; products: FoodItemRecord[] }) {
    // TODO this will probably be better to get from parent component
    return {
      sums: props.products.reduce((acc: number[], curr) => {
        Object.values(curr).forEach((value, idx) => {
          if (typeof value === 'number') {
            acc[idx] = acc[idx] ? acc[idx] + value : value;
          }
        });
        return acc;
      }, []),
    };
  },
};
</script>

<style scoped>
table {
  border: 1px solid grey;
}
th,
td {
  border: 0 solid darkgrey;
  border-left-width: 1px;
}

thead .header_label {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
