<template>
  <div class="box">
    <div v-for="(item, index) in data" :key="index">{{item}}</div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      data: [1, 2, 3, 4, 5]
    }
  },
  created() {
  },
  mounted() {
    // this.data[0] = 100;
    // this.$forceUpdate(); // 重新渲染组件, 也可以更新数据到页面上

    this.data.shift();
    this.data.unshift('100 这个数据是通过数组的 shift，unshift 方法插入的，能够实现数据及时渲染，直接通过 this.data[0] = 100 不能实现及时渲染');
  },
  methods: {
  }
}
</script>
 
<style>
</style>