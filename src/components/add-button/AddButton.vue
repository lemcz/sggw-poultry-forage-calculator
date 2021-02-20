<template>
  <el-button :type="type">
    <span>Dodaj</span>
  </el-button>
</template>

<script>
export default {
  name: 'add-button',
  props: ['type'],
};
</script>

<style scoped></style>
