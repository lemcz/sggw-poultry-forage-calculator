<template>
  <div class="form-input">
    <label :for="property" v-if="label">
      <span>{{ label }}</span>
    </label>
    <input
      type="text"
      v-if="mode === Mode.Edit"
      v-on:input="$emit('update:modelValue', $event.target.value)"
      :value="modelValue"
      :id="property"
      :name="property"
      :placeholder="placeholder"
    />
    <span v-if="mode === Mode.View">
      {{ value }}
    </span>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { FieldMode } from '@/models/fieldMode';

export default defineComponent({
  name: 'TextField',
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

label {
  font-size: 16px;
  color: #606266;
  margin-right: auto;
}

input {
  border: 1px solid #dcdfe6;
}

input:focus {
  border-color: #409eff;
}
</style>
