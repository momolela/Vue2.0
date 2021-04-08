<template>
  <!-- $route 指的就是当前活跃的路由界面，可以拿到 params，hash，query 等数据 -->
  <div class="user">我是用户{{ $route.params.userId }}</div>
</template>

<script>
  export default {
    name: 'user',
    data() {
      return {};
    }
  };
</script>

<style scoped></style>
