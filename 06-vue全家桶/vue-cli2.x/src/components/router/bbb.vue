<template>
  <div class="bbb">bbb</div>
</template>

<script>
  export default {
    name: 'bbb',
    data() {
      return {};
    },
    methods: {},
    created() {
      console.log('bbb created');
    },
    destroyed() {
      console.log('bbb destroyed');
    },
    beforeRouteEnter(to, from, next) {
      console.log('组件内部守卫，进入 bbb 之前');
      next((vm) => {
        console.log(vm, '组件内部守卫，进入 bbb 之前打印 vue 组件对象数据');
      });
    },
    beforeRouteLeave(to, from, next) {
      console.log('组件内部守卫，离开 bbb 之前');
      next();
    },
    beforeRouteUpdate(to, from, next) {
      // /foo/:id  /foo/1 到 /foo/2 的切换会触发
      console.log('组件内部守卫，当前路由改变之前，但是该组件被复用时调用');
      next();
    }
  };
</script>

<style scoped></style>
