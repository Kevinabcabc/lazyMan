class LazyMan {
  constructor() {
    this.task = [];
    setTimeout(() => {
      this.next();
    });
  }

  sleep(t) {
    this.task.push(() => {
      setTimeout(() => {
        console.log('sleep' + t + 'ms');
        this.next();
      }, t);
    });
    return this;
  }

  eat(t) {
    this.task.push(() => {
      setTimeout(() => {
        console.log('eating' + t + 'ms');
        this.next();
      }, t);
    });
    return this;
  }

  next() {
    const fn = this.task.shift();
    fn && fn();
  }

  // 自定义事件
  add(name, t) {
    if (this[name]) {
      return this[name](t);
    } else {
      this[name] = (t2) => {
        this.task.push(() => {
          setTimeout(() => {
            console.log(name + t2 + 'ms');
            this.next();
          }, t2);
        });
        return this;
      }
      return this[name](t);
    }
  }
}

let tom = new LazyMan();

tom.sleep(1000).eat(1000).sleep(1000);
tom.add('run', 1000).add('jump', 1000).add('pingPong', 1000);

