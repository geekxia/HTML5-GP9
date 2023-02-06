// 一个webpack插件就是一个Class类（new），每一个插件都必须有一个apply方法，这个apply方法用于向webpack compiler的钩子中订阅事件，订阅事件有三种tap/tapAsync/tapPromise。当webpack按流程执行某个钩子时，这个插件就会被触发调用执行。

const _del = require('del')  // cnpm i del@6.1.0 -D
const path = require('path')

function isPlainObject(value) {
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.getPrototypeOf({});
}

class QfCleanPlugin {

  constructor(options = {}) {
    if (isPlainObject(options) === false) {
      throw new Error(`传入的options选项格式不对`)
    }
    this.outputPath = ''
    this.apply = this.apply.bind(this)
  }

  // 这个webpack插件的核心，compiler它是整个webpack运行环境那个唯一编译器实例
  apply(compiler) {

    this.outputPath = compiler.options.output.path;  // dist
    const hooks = compiler.hooks;
    // 1、注册emit（向compiler编译器emit钩子上添加一个函数）
    hooks.emit.tap('qf-clean-plugin', compilation => {
      console.info(`** 一起快乐地高薪就业 **`)
      // 删除目录可能会报错
      try {
        _del.sync(['**/*'], {
          force: false,
          cwd: this.outputPath,
        })
        console.log('---我执行了')
      } catch (error) {
        throw new Error('删除失败')
      }
    })
    // 2、注册done（向compiler编译器done钩子上添加一个函数）
    hooks.done.tap('qf-clean-plugin', stats => {
      console.info('恭喜你已经成功清除dist目录')
    })
  }
}

module.exports = QfCleanPlugin
