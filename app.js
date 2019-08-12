//app.js
App({
  onLaunch: function () {
    console.log("zmm: onLaunch") 

    /**
    var m = new Map();
    var data = {};
    data["x"] = "zzza"
    data["y"] = "zzzb"

    var dataText = JSON.stringify(data);

    console.log("zmm: dataText is: " + dataText)

    // dataText = '{"1":"a","2":"b"}';
    // data = JSON.parse(dataText);

    console.log("zmm: " + data.x)
    console.log("zmm: " + data.y)

    /**/


    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log("zmm: login success: "+res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log("zmm: getSetting success")
        
        if (res.authSetting['scope.userInfo']) {
          console.log("zmm: authSetting")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log("zmm: getUserInfo success: ", res.userInfo)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              wx.redirectTo({ url: "/pages/poll/poll"})
            },
            fail: res => {
              console.log("zmm: getUserInfo fail")
            }
          })
        } else {
          /*
          console.log("zmm: not authSetting")
          // wx.authorize({ scope: "scope.userInfo" })

          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              console.log("zmm: authorize success")
            },
            fail() {
              console.log("zmm: authorize fail")
            }
          })
          */
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openid: "Tyler"
  }
})