const path = require('path')
const fs = require('fs')

function resolve (arg) {
  return path.resolve(__dirname, '../', arg)
}

// 从.env文件读取变量，放在NodeJS的process.env上
function readEnv (env='development') {
  const envFile = resolve(`.env.${env}`)
  fs.existsSync(envFile) && require('dotenv-expand').expand(
    require('dotenv').config({
      path: envFile
    })
  )
}

module.exports = {
  resolve,
  readEnv
}
