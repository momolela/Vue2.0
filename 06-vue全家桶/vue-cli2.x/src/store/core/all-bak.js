import { INCREMENT } from './mutations-type.js';

export default {
  state: {
    // 全局共享的变量，页面可以直接使用 $store.state.all.counter，记得要加上 counter
    counter: 10
  },
  mutations: {
    // 修改全局共享变量的入口，
    // vue 文件中可以用 $store.commit('方法名') 来调用，
    // 通过 mutations 来做修改，可以通过 dev-tools 插件查看修改的链路
    // [INCREMENT] 常量名是官方推荐的做法，防止这边定义，页面 commit 错，然后页面出错，所以选了常量，页面上用 this.$store.commit(INCREMENT);
    // 这里面的都是些同步操作，因为要配合 dev-tools 插件记录链路，异步操作不好记录
    [INCREMENT](state) {
      state.counter++;

      // 这里不能用异步操作，在 dev-tools 插件记录链路数据不会变
      // setTimeout(() => {
      //   state.counter++;
      // }, 1000);
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
    // vue文件中可以用 $store.dispatch('incrementAsync') 来调用，
    // 这里面的都是些异步操作，同步操作直接放在 mutations 里面
    // 虽然这里是异步，但是内部操作还是通过 context.commit('increment') 去调用 mutations 的操作，绕不过 mutations 的
    // 也可以通过 paload 传递参数进来，payload 可以是几个简单参数，也可以是一个对象参数，页面通过 $store.dispatch('incrementAsync', payload)
    // 异步修改后，修改完成的信息，返回给调用的页面；payload 可以是一个对象，里面有函数支持页面回调；也可以利用 Promise 对象
    incrementAsync(context, payload) {
      setTimeout(() => {
        context.commit('increment');
      }, 1000);

      // setTimeout(() => {
      //   context.commit('increment');
      //   console.log(payload.param); // 打印其他的参数
      //   payload.success(); // 调用传递进来的回调函数
      // }, 1000);

      // return new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     context.commit('increment');
      //     resolve('异步处理完成');
      //   }, 1000);
      // });
    }
  }
};
