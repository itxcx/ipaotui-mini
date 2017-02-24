import WxValidate from 'assets/libs/WxValidate'
import { alert } from 'assets/libs/utils'
import { login } from 'assets/libs/apis'

require('assets/libs/object-assign').polyfill();
const openIdUrl = require('./config').openIdUrl

App({
  WxValidate: (rules, messages) => new WxValidate(rules, messages),
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  onError: function (msg) {
    wx.showToast(msg)
  },
  globalData: {
    userInfo: null,
    loginInfo: null,
    openid: null
  },
  getUserInfo: function (callback) {
    const that = this;
    if (that.globalData.userInfo) {
      callback(null, that.globalData.userInfo)
    } else {
      wx.login({

        success: function (res) {
          login({
            code: res.code,
            success(data) {
              that.globalData.userInfo = data
              if (data['session_3rd']) {
                wx.setStorageSync('session_3rd', data['session_3rd'])
              }
              wx.getUserInfo({
                success: function (res) {
                  that.globalData.userInfo = Object.assign(
                    that.globalData.userInfo, res.userInfo
                  )
                },
                fail: function (res) {
                  // fail
                  alert('获取用户信息失败')
                },
                complete: function (res) {
                  // complete
                  
                  callback(null, that.globalData.userInfo)
                }
              })
            }
          })
        },
        fail: function (err) {
          console.log(err)
        }
      })
    }
  },

  // lazy loading openid
  getUserOpenId: function (callback) {
    var self = this

    if (self.globalData.openid) {
      callback(null, self.globalData.openid)
    } else {
      wx.login({
        success: function (data) {
          wx.request({
            url: openIdUrl,
            data: {
              code: data.code
            },
            success: function (res) {
              console.log('拉取openid成功', res)
              self.globalData.openid = res.data.openid
              callback(null, self.globalData.openid)
            },
            fail: function (res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
              callback(res)
            }
          })
        },
        fail: function (err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
          callback(err)
        }
      })
    }
  }
})
