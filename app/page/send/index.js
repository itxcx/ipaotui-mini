// page/send/send.js
import { getAddress } from '../../assets/libs/utils'
import { getPriceCalc } from '../../assets/libs/apis'

const defaultAddress = getAddress(0)
Page({
  data: {
    fromAddress: defaultAddress,
    fromAddressIndex: defaultAddress ? 0 : -1,
    toAddressIndex: -1,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.calcPriceIfNeed()
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  getAddressInfo(index) {
    const addressList = wx.getStorageSync('addressList') || []
    return addressList[index]
  },
  calcPriceIfNeed() {
    const fromAddress = this.data.fromAddress,
      toAddress = this.data.toAddress,
      that = this
    if (fromAddress && toAddress) {
      getPriceCalc({
        fromAddress, toAddress,
        success: function(data) {
          that.setData({
            priceInfo: data
          })
        }
      })
    }

  }
})