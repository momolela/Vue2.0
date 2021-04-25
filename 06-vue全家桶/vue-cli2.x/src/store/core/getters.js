export default {
  // 类似组件的计算属性，全局共享变量需要经过一系列的变化之后，才被使用，可以在这里处理
  // 虽然在组件里面可以通过 computed 来实现，但是如果多个组件都要使用的话，代码就会冗余，在这里做就省略了很多重复代码
  powerCount(state) {
    return state.counter * state.counter;
  },
  powerCountLength(state, getters) {
    // 第二个参数可以获取到已经存在的 getters 对象
    return (getters.powerCount + '').length;
  },
  countAdd(state) {
    // 返回一个函数，然后页面上 $store.getters.countAdd(8) 可以调用到，$store.getters.countAdd 和 (8) 分开理解
    return function(num) {
      return state.counter + num;
    };
  }
};
