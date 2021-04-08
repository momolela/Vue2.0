<template>
  <div class="aaa">
    aaa
    <router-link to="/aaa/aaachild1">aaachild1</router-link>
    <router-link to="/aaa/aaachild2">aaachild2</router-link>
    <!-- 这里是路由的嵌套占位 -->
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'aaa',
    data() {
      return {};
    }
  };
</script>

<style scoped></style>
