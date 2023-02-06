// loader是一个函数，它的入参是对象或字符串。它返回值可能是对象、字符串，还有可能是JS代码。
// 当这个loader是处理某种模块的最后一个loader，要求返回值JS代码。

const marked = require('marked') // 导入一个开源的markdown编译器
// const _loaderUtils = require("loader-utils")  // webpack loaders的一个工具包

function markdownLoader (source) {

  const html = marked.parse(source)  // 使用第三方编译器执行编译

  // 事实：webpack在处理文件模块时，有可能会使用个loader，要看这个loader在哪个环节工作
  // const options = (0, _loaderUtils.getOptions)(this)
  // const esModule = typeof options.esModule !== 'undefined' ? options.esModule : true
  // return `${esModule ? 'export default' : 'module.exports ='} ${JSON.stringify(html)}`
  return `export default ${JSON.stringify(html)}`

}

module.exports = markdownLoader
