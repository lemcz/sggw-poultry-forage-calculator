<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th v-for="header in headers" v-bind:key="header.property">
          <span class="header_label">{{ header.label }}</span>
        </th>
        <th>
          <span class="header_label">Akcje</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="product in selectableProducts"
        v-bind:key="product.label"
        v-on:click="toggleRowSelection(product)"
        :class="{
          selectable: true,
          selected: selected[product.label],
        }"
      >
        <td>
          <input type="checkbox" v-model="selected[product.label]" />
        </td>
        <td v-for="header in headers" v-bind:key="header.property">
          <span>{{ product[header.property] }}</span>
        </td>
        <td class="actions">
          <button v-on:click="$emit('product-remove', product)">Usuń</button>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td><strong>W 1 kg mieszanki jest: </strong></td>
        <td v-for="(sum, index) in sums" v-bind:key="index">
          {{ sum !== undefined ? sum : '-' }}
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref } from 'vue';
import { FoodItem, FoodItemRecord } from '@/models/foodItem.model';
import { calculateSums } from '@/helpers/collection-helpers';

// TODO add select/deselect all rows
// NOTE selection also probably can be done better, but there's no time for that
export default defineComponent({
  name: 'FoodItemTable',
  props: {
    products: Array as () => FoodItemRecord[],
    headers: Array,
  },
  emits: ['select-change', 'product-remove'],
  setup(props, { emit }) {
    const sums = computed(() => calculateSums(props.products));

    const selectableProducts = computed(
      () =>
        props.products?.map((product: FoodItemRecord & { selected?: boolean }) => ({
          ...product,
          selected: !!product.selected,
        })) ?? [],
    );

    const selected: Ref<Record<string, boolean>> = ref({});

    return {
      sums,
      selected,
      selectableProducts,
      toggleRowSelection(product: FoodItemRecord & { selected: boolean }): void {
        product.selected = !product.selected;
        selected.value[(product as FoodItem).label] = !selected.value[(product as FoodItem).label];
        const selectedItems = selectableProducts.value.filter((product) =>
          Object.keys(selected.value).includes((product as FoodItem).label),
        );
        emit('select-change', selectedItems);
      },
    };
  },
});
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

thead tr {
  background-color: grey;
}

tbody tr.selectable {
  cursor: pointer;
}

tbody tr.selected,
tbody tr:hover {
  background-color: lightgrey;
}

tfoot tr {
  background-color: beige;
}

.actions button {
  cursor: pointer;
}
</style>
