import WxValidate from 'assets/libs/WxValidate'

import { alert, getPois } from 'assets/libs/utils'
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
    currentAddress: null,
  },
  getCurrentAddress: function (callback) {
    const that = this
    if (that.globalData.currentAddress) {
      callback(null, that.globalData.currentAddress)
    } else {
      wx.getLocation({
        type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        success: function (res) {
          // success
          
        },
        fail: function (err) {
          // fail
          callback(err.errMsg)
        },
        complete: function () {
          // complete
        }
      })
    }
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
                  // alert('获取用户信息失败')
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


})
