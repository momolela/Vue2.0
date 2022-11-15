<template>
  <div class="container">控制台会输出：hello from mixin!</div>
</template>
<script>
import myMixins from "../components/mixin/myMixin";
export default {
  name: 'mixin',
  mixins: [myMixins],
  data() {
    return {
    }
  },
  methods: {
    hello() {
      // 出现同名方法，优先使用组件中的属性和方法
      console.log('hello from MixinsDemo!');
    },
  },
  computed: {
  },
  watch: {
  },
  beforeCreate() {
  },
  created() {
    console.log('hello from MixinsDemo create');
  },
  beforeMount() {
  },
  mounted() {
  },
  beforeUpdate() {
  },
  updated() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  activated() {
  },
  deactivated() {
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
}
</script>
<style scoped>
</style>
