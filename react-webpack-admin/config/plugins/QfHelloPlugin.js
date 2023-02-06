
class QfHelloPlugin {
  construtor (options) {
    this.apply = this.apply.bind(this)
  }

  apply (compiler) {
    // 注册事件的三种方式：tap同步执行 / tapAsync异步执行 / tapPromise异步执行

    compiler.hooks.run.tap('QfHelloPlugin', () => {
      // do something
      console.info('----------------------欢迎你来到千锋')
    })
    compiler.hooks.done.tap('QfHelloPlugin', () => {
      // do something
      console.info('----------------------你可以高薪就业')
    })
  }
}

module.exports = QfHelloPlugin
