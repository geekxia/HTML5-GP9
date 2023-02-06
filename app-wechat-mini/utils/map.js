var QQMapWX = require('./qqmap.js')

// 认证
var map = new QQMapWX({
  key: 'TF5BZ-UOBCX-QX543-747WT-RC7MJ-EUFFA'
})

function calDis (from, list) {
  return new Promise(resolve=>{
    map.calculateDistance({
      mode: 'straight',
      from: from,
      to: list,
      success: res => {
        resolve(res)
      },
      fail: err => console.log('---距离计算', err)
    })
  })
}

 module.exports = {
   calDis
 }