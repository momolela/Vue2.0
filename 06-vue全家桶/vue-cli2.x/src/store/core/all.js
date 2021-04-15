export default {
  state: {
    // 全局共享的变量，页面可以直接使用 $store.state.all.counter，记得要加上 counter
    counter: 10
  },
  mutations: {
    // 修改全局共享变量的入口，
    // vue 文件中可以用 $store.commit('方法名') 来调用，
    // 通过 mutations 来做修改，可以通过 dev-tools 插件查看修改的链路
    // 不推荐使用这种方式
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    incrementParam(state, payload) {
      // payload 就是接收参数用的
      // 可以传递简单的参数，
      // 也可以传递对象
      // 针对页面的参数提交风格不同，payload 也可以完全作为一个对象接收
      state.counter += payload;
    }
  },
  getters: {
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
  },
  actions: {
    // 修改全局共享变量的入口，
    // vue文件中可以用 $store.dispatch('setIsLogin') 来调用，
    // 推荐使用这种方式 （这里面的都是些异步操作）
  }
};
