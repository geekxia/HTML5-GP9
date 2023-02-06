// index.js
Page({
  data: {
    num: 1
  },
  add () {
    this.setData({
      num: this.data.num + 1
    })
  }
})
