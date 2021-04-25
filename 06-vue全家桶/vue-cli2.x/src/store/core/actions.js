export default {
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
};
