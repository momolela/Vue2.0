class MVVM {
  constructor(config) {
    // mvvm 挂载的根节点
    this.$el = config.el;
    this.$data = config.data;
    this.$methods = config.methods;

    // 将 data 的所有属性进行数代理，返回一个对象，有 get set 方法和一些配置属性，通过 this.xxx = this.$data.xxx
    Object.keys(this.$data).forEach((key) => {
      this.DataProxy(key);
    });

    // 递归给每个 data 的数据，加上 __parent __name 属性，__parent 指向 data[key]，__name 就是data[key] 的 key
    this.setParent(this.$data);

    //
    this.dep = new Dep(this.$data);

    // 将 data 整个对象进行代理
    this._Observe(this.$data);

    this.list.push('100');

    console.log(this.list);

    console.log(this.dep.watcherTask);
  }

  // 数据代理，通过访问 this.xxx，就相当于访问了 this.$data.xxx
  DataProxy(key) {
    let ths = this;
    Object.defineProperty(ths, key, {
      configurable: false, // 是否可配置
      enumerable: true, // 是否可枚举
      get() {
        return this.$data[key];
      },
      set(val) {
        this.$data[key] = val;
      }
    });
  }

  // Proxy 对象是 ES6 的新特性，对对象进行拦截和代理，相对于上面 Object.defineProperties 对对象属性进行代理更先进
  _Observe(data) {
    var ths = this;
    let handler = {
      get(target, key) {
        let item = target[key];
        if (typeof item === 'object') {
          return new Proxy(item, handler);
        } else {
          return item;
        }
      },
      set(target, key, value) {
        if (target[key] !== value) {
          target[key] = value;
          console.log('start update');
          if (target.__parent) {
            ths.dep.notify(ths.getParent(target).__name);
          } else {
            ths.dep.notify(key);
          }
        }
        return true;
      }
    };

    this.$data = new Proxy(data, handler);
  }

  setParent(datas) {
    for (let i in datas) {
      if (typeof datas[i] === 'object') {
        if (i !== '__parent' && i !== '__proto__') {
          datas[i].__parent = datas;
          datas[i].__name = i;
          this.setParent(datas[i]);
        }
      }
    }
  }

  getParent(target) {
    while (target.__parent && target.__parent.__parent) {
      target = target.__parent;
    }
    return target;
  }
}

class Dep {
  constructor(data) {
    this.watcherTask = {};
    Object.keys(data).forEach((key) => {
      this.watcherTask[key] = [];
    });
  }

  // 添加 watcher
  add(key, keys, node, vm, type) {
    this.watcherTask[key].push(new watcher(node, vm, keys, type));
  }

  // 通知 watcher，通知更新
  notify(key) {
    this.watcherTask[key].forEach((task) => {
      task.update();
    });
  }
}

class watcher {
  // node.innerHTML = this.$data['name'];
  // el 是 dom 元素，node
  // vm 是 viewModel 实例，this
  // keys 是属性，name
  // type 是 dom 的属性，innerHTML
  constructor(el, vm, keys, type) {
    this.el = el;
    this.vm = vm;
    this.keys = keys;
    this.type = type;
  }

  // 更新依赖的每一个元素
  update() {
    if (this.keys.length > 1) {
      let v = null;
      this.keys.forEach((val) => {
        v = !v ? this.vm.$data[val] : v[val];
      });
      // user.student.name
      // v = this.$data[user]
      // v = user[student]
      // v = student[name]
      this.el[this.type] = v;
    } else {
      this.el[this.type] = this.vm.$data[this.keys[0]];
    }
  }
}

class compile {}
