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
      return {
        path: '/aaa/aaachild1'
      };
    },
    created() {
      console.log('aaa created');
    },
    destroyed() {
      console.log('aaa destroyed');
    },
    activated() {
      console.log('只有使用了 keep-alive 组件的时候，才会回调这个方法，在路由激活的时候调用');
      this.$router.push(this.path).catch((err) => {
        err;
      });
    },
    deactivated() {
      console.log('只有使用了 keep-alive 组件的时候，才会回调这个方法，在路由退出的时候调用');
    },
    beforeRouteLeave(to, from, next) {
      this.path = this.$route.path;
      next();
    }
  };
</script>

<style scoped></style>
