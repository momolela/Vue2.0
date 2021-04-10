<template>
  <div class="aaachild1">
    <ul>
      <li>aaachild1</li>
      <li>aaachild1</li>
      <li>aaachild1</li>
      <li>aaachild1</li>
      <li>aaachild1</li>
      <li>aaachild1</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'aaachild1',
    data() {
      return {};
    },
    created() {
      console.log('aaa/aaachild1 created');
    },
    destroyed() {
      console.log('aaa/aaachild1 destroyed');
    }
  };
</script>

<style scoped></style>
