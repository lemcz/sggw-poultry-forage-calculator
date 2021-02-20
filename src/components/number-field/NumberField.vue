<template>
  <div class="form-input">
    <label :for="property" v-if="label">
      <span>{{ label }}</span>
    </label>
    <input
      type="number"
      v-if="mode === Mode.Edit"
      v-on:input="$emit('update:modelValue', parseFloat($event.target.value))"
      :value="modelValue"
      :id="property"
      :name="property"
      :min="0"
      :placeholder="placeholder"
    />
    <span v-if="mode === Mode.View">
      {{ modelValue }}
    </span>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { FieldMode } from '@/models/fieldMode';

export default defineComponent({
  name: 'NumberInput',
  props: ['property', 'label', 'placeholder', 'mode', 'modelValue'],
  setup() {
    return {
      Mode: FieldMode,
    };
  },
});
</script>

<style scoped>
.form-input {
  display: flex;
  flex-direction: column;
}
</style>
