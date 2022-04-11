<template>
  <div class="box">
    <button @click="pushRoute('storageB')">push route storageB</button>
    <div v-for="(item, index) in dataB" :key="index">{{ item }}</div>
  </div>
</template>

<script>
  export default {
    name: 'storageA',
    data() {
      return {
        dataB: []
      };
    },
    created() {},
    mounted() {
      sessionStorage.setItem('sessionDataA', ['sunzj']);
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
        vm.dataB = sessionStorage.getItem('sessionDataB') || [];
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
