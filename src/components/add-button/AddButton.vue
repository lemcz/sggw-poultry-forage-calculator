<template>
  <el-button :type="type" :native-type="'submit'">
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
