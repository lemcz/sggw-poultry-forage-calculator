<template>
  <div class="form-input">
    <label :for="property" v-if="label">
      <span>{{ label }}</span>
    </label>
    <select
      :id="property"
      :name="property"
      :multiple="multi"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <span v-if="mode === Mode.View">
      {{ modelValue }}
    </span>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { FieldMode } from '@/models/fieldMode';

export default defineComponent({
  name: 'SelectField',
  props: ['property', 'label', 'mode', 'multi', 'modelValue', 'options'],
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
