<template>
  <div class="form-input">
    <label :for="property" v-if="label">
      <span>{{ label }}</span>
    </label>
    <input
      type="number"
      v-if="mode === Mode.Edit"
      v-on:input="$emit('update:modelValue', handleInput($event))"
      :value="modelValue"
      :id="property"
      :name="property"
      :step="step"
      :max="max"
      :min="min ?? 0"
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
  props: ['property', 'label', 'placeholder', 'mode', 'modelValue', 'min', 'max', 'step'],
  setup() {
    return {
      Mode: FieldMode,
      handleInput($event) {
        const max = parseFloat($event.target.max);
        const min = parseFloat($event.target.min);
        const value = parseFloat($event.target.value);
        if (!isNaN(max) && value > max) {
          $event.target.value = max;
        }
        if (!isNaN(min) && value < min) {
          $event.target.value = min;
        }
        return $event.target.value ? parseFloat($event.target.value) : $event.target.value;
      },
    };
  },
});
</script>

<style scoped></style>
