class MVVM {
  constructor(config) {
    // mvvm 挂载的根节点
    this.$el = config.el;
    this.$data = config.data;
    this.$methods = config.methods;

    if (this.$el) {
      // 将 data 的所有属性进行数代理，返回一个对象，有 get set 方法和一些配置属性，通过 this.xxx = this.$data.xxx
      new Observe(this.$data);
      // 将 this.$data 的数据全部挂载到 this 对象上面
      this.proxyData(this.$data);
      // 编译模板
      new Compile(this.$el, this);
    }
  }

  proxyData(data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        get() {
          return data[key];
        },
        set(newValue) {
          data[key] = newValue;
        }
      })
    })
  }
}

class Dep {
  constructor() {
    this.subs = [];
  }

  addSub(watcher) {
    this.subs.push(watcher);
  }

  // 通知 watcher，通知更新
  notify() {
    this.subs.forEach((watcher) => {
      watcher.update();
    });
  }
}

class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    // 先获取老值
    this.get();
  }

  get() {
    Dep.target = this;
    let value = this.getVal(this.vm, this.expr);
    Dep.target = null;
    return value;
  }

  getVal(vm, expr) {
    expr = expr.split('.');
    return expr.reduce((prev, next) => {
      return prev[next];
    }, vm.$data);
  }

  // 对外的方法，更新依赖的每一个元素
  update() {
    let newValue = this.getVal(this.vm, this.expr);
    let oldValue = this.value;
    if (newValue != oldValue) {
      this.cb(newValue);
    }
  }
}

class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    if (this.el) {
      // 开始编译
      // 1.先把真实的 dom 移入到内存种 fragment
      let fragment = this.node2fragment(this.el);

      // 2.编译 => 提取想要的元素节点 v-model 和文本节点 {{}}
      this.compile(fragment);

      // 3.把编译好的 fragment 再塞回到页面里去
      this.el.appendChild(fragment);
    }
  }

  /* 辅助方法 */

  // 判断是否为 dom（这是个知识点）
  isElementNode(node) {
    return node.nodeType === 1;
  }

  // 判断是否为指令
  isDirective(name) {
    return name.includes('v-');
  }


  /* 核心方法 */

  // 将 el 的内容全部放到内存中，原 dom 中不再存在该 el（这是个知识点）
  node2fragment(el) {
    let fragment = document.createDocumentFragment(); // 文档碎片
    let firstChild;
    while (firstChild = el.firstChild) {
      fragment.appendChild(firstChild);
    }
    return fragment; // 内存中的节点
  }

  // 
  compile(fragment) {
    let childNodes = fragment.childNodes;
    Array.from(childNodes).forEach(node => {
      if (this.isElementNode(node)) {
        // 这里需要编译元素 v-model
        this.compileElement(node);
        // dom，需要递归调用
        this.compile(node);
      } else {
        // 文本
        // 这里需要编译文本 {{}}
        this.compileText(node)
      }
    })
  }

  // 
  compileElement(node) {
    let attrs = node.attributes;
    Array.from(attrs).forEach(attr => {
      // 判断属性名称是否是 v- 开头
      let attrName = attr.name;
      if (this.isDirective(attrName)) {
        // 取到对应的值放到节点中
        let expr = attr.value;
        let [, type] = attrName.split('-');
        CompileUtil[type](node, this.vm, expr);
      }
    })
  }

  // 
  compileText(node) {
    let expr = node.textContent;
    let reg = /\{\{([^}]+)\}\}/g; // {{a}} {{b}} {{c}}
    if (reg.test(expr)) {
      CompileUtil['text'](node, this.vm, expr)
    }
  }
}

class Observe {
  constructor(data) {
    this.observe(data)
  }

  // 数据代理，通过访问 this.xxx，就相当于访问了 this.$data.xxx
  observe(data) {
    if (!data || typeof data !== 'object') {
      return;
    }
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key]);
      this.observe(data[key]); // 递归深度劫持
    });
  }

  defineReactive(obj, key, value) {
    let ths = this;
    let dep = new Dep(); // 每个变化的数据，都会对应一个数组，这个数组存放所有更新的操作
    Object.defineProperty(obj, key, {
      configurable: false, // 是否可配置
      enumerable: true, // 是否可枚举
      get() { // 当取值时调用的方法
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set(newValue) { // 当设置值调用的方法
        if (value != newValue) {
          ths.observe(newValue); // 如果是对象继续劫持添加 set get
          value = newValue;
          dep.notify(); // 通知所有人数据更新了
        }
      }
    });
  }

  // Proxy 对象是 ES6 的新特性，对对象进行拦截和代理，相对于上面 Object.defineProperties 对对象属性进行代理更先进
  _observe(data) {
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
}

CompileUtil = {
  // 获取对应数据值
  getVal(vm, expr) {
    expr = expr.split('.');
    return expr.reduce((prev, next) => {
      return prev[next];
    }, vm.$data)
  },
  getTextVal(vm, expr) {
    return expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
      return this.getVal(vm, arguments[1]);
    });
  },
  text(node, vm, expr) {
    let updateFn = this.updater['textUpdater'];
    // "message.a"
    let value = this.getTextVal(vm, expr);
    // {{a}} {{b}}
    expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
      new Watcher(vm, arguments[1], (newValue) => {
        updateFn && updateFn(node, this.getTextVal(vm, expr));
      });
    })
    updateFn && updateFn(node, value);
  },
  setVal(vm, expr, value) {
    expr = expr.split('.');
    return expr.reduce((prev, next, currentIndex) => {
      if (currentIndex == expr.length - 1) {
        return prev[next] = value;
      }
      return prev[next];
    }, vm.$data)
  },
  model(node, vm, expr) {
    let updateFn = this.updater['modelUpdater'];
    new Watcher(vm, expr, (newValue) => {
      updateFn && updateFn(node, this.getVal(vm, expr));
    });
    node.addEventListener('input', (e) => {
      let newValue = e.target.value;
      this.setVal(vm, expr, newValue);
    })
    updateFn && updateFn(node, this.getVal(vm, expr));
  },
  updater: {
    textUpdater(node, value) {
      node.textContent = value;
    },
    modelUpdater(node, value) {
      node.value = value;
    }
  }
}