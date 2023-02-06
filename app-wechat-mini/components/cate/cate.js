// components/cate/cate.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: Number,
      value: 0
    },
    list: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    change (ev) {
      console.log('---picker change', ev)
      this.triggerEvent('change', Number(ev.detail.value))
    }
  }
})
