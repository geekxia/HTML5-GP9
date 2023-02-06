// pages/find/find.js
const { fetchCnode } = require('../../utils/api.js')
const app = getApp()
console.log('---app全局数据', app.globalData)
const { calDis } = require('../../utils/map.js')
const img = require('../../utils/img')
// app.globalData.userinfo.name = '李四'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    img,
    msg: 'Hello World',
    list: [
      { id: 1, name: '张三', age: 10 },
      { id: 2, name: '张三', age: 20 },
      { id: 3, name: '张三', age: 30 }
    ],
    idx: 2,
    bol: true,
    size: 100,
    cc: 'c2',
    name: '',
    nick: '',
    cateList: [
      { id: 1, cate: 'html', cate_zh: 'HTML5' },
      { id: 2, cate: 'java', cate_zh: 'Java' },
      { id: 3, cate: 'python', cate_zh: 'Python' },
      { id: 4, cate: 'test', cate_zh: 'Test' }
    ],
    cateIdx: 0,
    articleList: [],
    page: 1,
    navs: [
      { id: 1, label: '热门1', value: 'a', },
      { id: 2, label: '热门2', value: 'a', },
      { id: 3, label: '热门3', value: 'a', },
      { id: 4, label: '热门4', value: 'a', },
      { id: 5, label: '热门5', value: 'a', },
      { id: 6, label: '热门6', value: 'a', },
      { id: 7, label: '热门7', value: 'a', },
      { id: 8, label: '热门8', value: 'a', },
      { id: 9, label: '热门9', value: 'a', },
      { id: 10, label: '热门10', value: 'a', },
      { id: 11, label: '热门11', value: 'a', },
      { id: 12, label: '热门12', value: 'a', },
      { id: 13, label: '热门13', value: 'a', },
    ],
    onId: 1,
    toId: 1,
    shopInfo: {
      latitude: 39.984060,
      longitude: 116.307520,
      tel: '0755-89898989',
      markers: [
        {
          latitude: 39.984060,
          longitude: 116.307520,
          iconPath: '/assets/icon/shop.png',
          width: '30',
          height: '30'
        }
      ]
    },
    goods: [
      { id: 1, name: 'A2牛奶', src: 'https://img10.360buyimg.com/n2/s240x240_jfs/t1/105036/33/33186/126876/632d8976Eb15a6c28/177d063c9707ccba.jpg!q70.jpg.webp', search: "100009628665.html?extension_id=eyJhZCI6IjEyMjMiLCJjaCI6IjIiLCJza3UiOiIxMDAwMDk2Mjg2NjUiLCJ0cyI6IjE2Njc5NjM4MTkiLCJ1bmlxaWQiOiJ7XCJjbGlja19pZFwiOlwiMWU3ZmQ1MGMtYTA5NS00OGU1LThhZWYtNTZlNTY2NzMzZDRlXCIsXCJtYXRlcmlhbF9pZFwiOlwiODgyMDU5ODk3MlwiLFwicG9zX2lkXCI6XCIxMjIzXCIsXCJzaWRcIjpcImYyMzc2YWYwLTA4ZmItNGFjMy1iOTA3LTg0Njk0MjBlNTQ5NlwifSJ9&jd_pop=1e7fd50c-a095-48e5-8aef-56e566733d4e&abt=0" },
      { id: 2, name: '德保牛奶', src: 'https://img13.360buyimg.com/n2/s240x240_jfs/t1/165429/23/32805/112021/636b0696Eba87af83/2bb6606d21f6120d.jpg!q70.jpg.webp', search: "627718.html?_fd=jdm&price=129.90&fs=1&sceneval=2&jxsid=16679623833146755114&pos=2&csid=f8b87e8ab660992de3d7ce917417ecf9_1667963515866_1_1667963515866&ss_projid=undefined&ss_expid=undefined&ss_ruleid=undefined&scan_orig=search.1.undefined.undefined.undefinedsearch.2.undefined.undefined&ss_sexpid=undefined&ss_sruleid=undefined&ss_symbol=10&ss_mtest=shop_entrance_b&key=%E8%BF%9B%E5%8F%A3%E7%89%9B%E5%A5%B6" }
    ]
  },

  skipH5 (ev) {
    wx.navigateTo({
      url: '/pages/user/user?search='+ev.target.dataset.search,
    })
  },

  navigate () {
    wx.openLocation({
      latitude: this.data.shopInfo.latitude,
      longitude: this.data.shopInfo.longitude,
      name: '千锋深圳',
      address: '广东深圳西部硅谷B座108号'
    })
  },

  call () {
    wx.makePhoneCall({
      phoneNumber: this.data.shopInfo.tel,
    })
  },

  navChange (ev) {
    const id = ev.target.dataset.id
    console.log('---id', id)
    this.setData({
      onId: id,
      toId: id-2
    })
  },

  cateChange (ev) {
    console.log('---来自子组件的数据', ev)
    this.setData({
      cateIdx: ev.detail
    })
  },

  toggle () {
    this.setData({
      idx: (this.data.idx + 1) % 3
    })
  },

  // 事件处理器的第一个参数，就是事件对象！！！！
  handler1 (ev) {
    console.log('---tapped', ev)
    const qf = ev.target.dataset.qf
    console.log('使用dataset实现事件传参')
  },

  getName (ev) {
    console.log('---ev', ev)
    // 表单手动取值
    this.setData({
      name: ev.detail.value
    })
  },

  handler2 () {
    const $ = wx.createSelectorQuery()
    const box = $.select('#box')
    console.log('box', box.boundingClientRect())
  },

  start () {
    this.animate(
      '#foo', 
      [
        { width: 0, backgroundColor: 'white' },
        { width: '50%', backgroundColor: 'red' },
        // 在小程序中，最后一帧的样式默认是保留的！
        { width: '100%', backgroundColor: 'blue' }
      ],
      5000,
      () => {
        // 当动画执行结束后，要清除动画（提升性能）
        this.clearAnimation(
          '#foo', 
          // 如果属性为true，当动画结束时，不保留动画帧的样式！！
          { backgroundColor: true }, 
          ()=>{
            console.log('---动画清除完成')
          }
        )
      }
    )
  },

  getList (page) {
    const params = {
      tab: '',
      page: page || 1,
      limit: 10
    }
    fetchCnode(params).then(list=>{
      console.log('---文章列表', list)
      if (params.page === 1) {
        this.setData({
          articleList: list
        })
        // 每次下拉调接口成功后，手动停止下拉的状态
        wx.stopPullDownRefresh()
      } else {
        this.setData({
          articleList: [...this.data.articleList, ...list]
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('1---接收路由参数', options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    console.log('3---页面渲染完成')
    this.getList()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log('2---页面出来了')
    this.draw()
    // 先判断用户是否授权过位置
    wx.getSetting({
      withSubscriptions: true,
      success: res => {
        if (res.authSetting['scope.userLocation']) {
          const from = {
            latitude: 39.984060,
            longitude: 116.307520
          }
          const list = [
            {
              name: '大学城',
              latitude: 39.984070,
              longitude: 116.307522
            },
            {
              name: '公主坟',
              latitude: 49.984090,
              longitude: 116.307522
            }
          ]
          calDis(from, list).then(res => {
            console.log('---计算成功', res)
          })
          // 当用户授权过位置
          wx.getLocation({
            altitude: true,
            success: res => {
              // 如果符合行业类型（先备案）
              console.log('---当前位置', res)
              
              // 有了经度和维度，调接口获取附近的商家
              // 需求：计算距离？推荐腾讯地图API
            },
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    console.log('4---页面隐藏了')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    console.log('5---页面销毁了')
  },

  /**
   在配置文件中，开启下拉刷新。
   每次下拉，都会触发！！
   */
  onPullDownRefresh() {
    this.data.page = 1
    this.getList(this.data.page)
  },

  /**
  当页面触底时，触发这个钩子
   */
  onReachBottom() {
    this.data.page++
    this.getList(this.data.page)
  },

  // 当页面滚动时，触发这个钩子
  onPageScroll (ev) {
    // console.log('---页面滚动了', ev)
  },
  backUp () {
    wx.pageScrollTo({
      duration: 5000,
      scrollTop: 0
    })
  },

  /**
  第一种情况，当用户点击右上的胶囊按钮的三个点时
  第二种情况，当用户点击<button open-type='share'>时
   */
  onShareAppMessage(res) {
    console.log('---转发', res)
    if (res.from === 'button') {
      return {
        title: '你的好友夏海峰邀请你参与拼团',
        path: '/pages/index/index?id=100', // “团”的详情页onLoad中接收路由参数
        imageUrl: 'https://img10.360buyimg.com/seckillcms/s280x280_jfs/t1/157925/6/11631/132957/6364c50cE144d51fa/dda554ced695e3de.jpg.avif'
      }
    }
  },

  rpx2px (arg) {
   const info =  wx.getSystemInfoSync()
  //  console.log('---当前手机信息', info)
   const width = info.windowWidth
   return arg * width / 750
  },

  // 获取图片对象
  async getImage (url) {  
    const off = wx.createOffscreenCanvas({type:'2d'})
    const image = off.createImage()   
    await new Promise((resolve, reject)=>{
      image.onload = resolve  // 绘制图片逻辑
      image.src = url
    })
    return image
  },

  draw () {
    const query = wx.createSelectorQuery()
    query.select('#canvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        // 得到canvas的“类DOM节点”
        const canvas = res[0].node
        this.canvas = canvas
        // 创建2D画布上下文（得到了一支画笔）
        const ctx = canvas.getContext('2d')
        // 解决画布在移动端的适配问题
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)
        // 开始绘制（这套新的canvas api，请参考HTML5 Canvas）
        // canvas api绘制的单位只能是px

        ctx.fillStyle = 'orange'
        ctx.fillRect(0, 0, this.rpx2px(750), this.rpx2px(500))

        ctx.fillStyle = 'white'
        ctx.font = `bold ${this.rpx2px(80)}px serif`        
        ctx.fillText('千锋教育', this.rpx2px(215), this.rpx2px(100), this.rpx2px(300))

        const url = 'https://img11.360buyimg.com/seckillcms/s280x280_jfs/t1/205131/9/26552/60914/6368a54eE7eeab5b0/996e41aaee294a71.jpg'
        this.getImage(url).then(img => {
          // 获取图片信息
          wx.getImageInfo({
            src: url,
            success: res => {
              console.log('---图片信息', res)
              // 图片绘制
              ctx.drawImage(
                img, 
                this.rpx2px(375)-res.width/2, this.rpx2px(150), 
                res.width, res.height
              )
            }
          })
          
        })
      })
  },
  save () {
    wx.canvasToTempFilePath({
      destWidth: 1500,
      destHeight: 1000,
      // canvasId: 'canvas',\
      canvas: this.canvas,
      fileType: 'jpg',
      success: res => {
        // console.log('---canvas临时路径', res)
        // 保存到相册（自动弹出授权框）
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath
        })
      }
    })
  },

  getInfo (res) {
    console.log('---当前用户信息', res)
    // 调接口，把rawData传给你的后端
  },
  getInfo2 () {
    // 小程序中，获取用户信息的最新玩法
    wx.getUserProfile({
      desc: '希望使用你的头像',
      success: res => {
        console.log('---用户信息', res)
      }
    })
  },

  getMobile (ev) {
    console.log('----手机信息', ev)
  },

  openAuth () {
    // 打开内置授权框
    wx.openSetting({
      withSubscriptions: true,
    })
  }
})