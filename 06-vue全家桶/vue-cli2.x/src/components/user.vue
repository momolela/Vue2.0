<template>
  <!-- $route 指的就是当前活跃的路由界面，可以拿到 params，hash，query 等数据 -->
  <div class="user">
    <div>我是用户，我接收的 params 参数{{ $route.params.userId }}</div>
    <div>我是用户，我接收的 query 参数{{ $route.query.userId }}</div>
  </div>
</template>

<script>
  export default {
    name: 'user',
    data() {
      return {};
    },
    created() {
      console.log('user created');
    },
    destroyed() {
      console.log('user destroyed');
    }
  };
</script>

<style scoped></style>
