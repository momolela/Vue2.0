<template>
  <div class="box">
    <button @click="pushRoute('storageA')">push route storageA</button>
    <div v-for="(item, index) in dataA" :key="index">{{ item }}</div>
  </div>
</template>

<script>
  export default {
    name: 'storageB',
    data() {
      return {
        dataA: []
      };
    },
    created() {},
    mounted() {
      sessionStorage.setItem('sessionDataB', ['hufy']);
    },
    methods: {
      pushRoute(routeName) {
        // 在 html 中通过打开新标签页
        // <router-link target="_blank" :to="{path:'/routeName',query:{id:'100'}}">打开页面</router-link>
        // 新标签页打开
        let routeData = this.$router.resolve({
          name: routeName
        });
        window.open(routeData.href, '_blank');

        // this.$router.push(routeName).catch((err) => {
        //   err;
        // });
      }
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        vm.dataA = sessionStorage.getItem('sessionDataA') || [];
      });
    },
    beforeRouteLeave(to, from, next) {
      next();
    },
    beforeRouteUpdate(to, from, next) {
      next();
    }
  };
</script>

<style></style>
