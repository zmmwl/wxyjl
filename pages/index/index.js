//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '易接龙',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
    // canIUse: false 
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log("zmm: index onLoad")
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理

      console.log("zmm: index before wx.getUserInfo")
      wx.getUserInfo({
        success: res => {
          console.log("zmm: index wx.getUserInfo success: ", res.userInfo)
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log("zmm: getUserInfo event")
    console.log(e)
    if (e.detail.userInfo) {
      console.log("zmm: getUserInfo success")
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      wx.redirectTo({ url: "/pages/poll/poll" })
    } else {
      console.log("zmm: getUserInfo fail")
    }
  }
})
