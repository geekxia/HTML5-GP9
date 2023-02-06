// ESLint配置文件有六种写法，这里用的优先级最高的一种

// 1、eslint-webpack-plugin 用法。

// 2、ESlint的六种配置文件及其常用配置字段（parser、extends、rules...）

// 3、ESLint的三种错误级别（error、warn、off）

// 4、四五种处理ESlint报错方法：（1）遇到ESlint错误，去到代码中手动修复。（2）修改eslint及其插件的规则。（3）使用eslint注释。（4）在项目根目录添加.eslintignore选择性忽略检测。
  // eslint-disable-line
  // eslint-disable-next-line
  /* eslint-disable */ /* eslint-enable */
  /* eslint semi: 0 */

// 5、解析器 @babel/eslint-parser，在ES6开发环境常常使用这个解析器。

module.exports = {
  // 配置解析器，可以兼容ESlint，它的前身是 babel-eslint。
  parser: "@babel/eslint-parser",
  // 解析选项
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,  // 也支持jsx检测
    }
  },
  // ESlint插件配置插件
  extends: ["airbnb", "airbnb/hooks"],
  // 自定义检测规则
  // eslint错误的三种级别：error(2)表示违背规则就报错；warn(1)表示违背规则给个警告；off(0)表示关闭当前规则。
  rules: {
    "semi": 2,  // 0
    "react/react-in-jsx-scope": 0,
    "jsx-quotes": 0,
    "react/jsx-filename-extension": 0,
    "no-undef": 1,
    "import/no-unresolved": 0
  }
}
