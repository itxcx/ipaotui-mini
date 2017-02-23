// page/buy/index.js
import { getAddress } from '../../assets/libs/utils'
import { getPriceCalc, getPriceCan } from '../../assets/libs/apis'
const defaultAddress = getAddress(0)
Page({
  data: {
    toAddress: defaultAddress,
    toAddressIndex: defaultAddress ? 0 : -1,
    buyAddressIndex: -1,
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
  calcPriceIfNeed() {
    const {toAddress, buyAddress} = this.data
    const  that = this
    if (buyAddress && toAddress) {
      getPriceCalc({
        fromAddress: buyAddress,
        toAddress,
        success: function (data) {
          that.setData({
            priceInfo: data
          })
        }
      })
    } else if(toAddress) {
      const {city_id, district_id} = toAddress
      getPriceCan({
        city_id, district_id,
        success: function(data) {
          that.setData({
            priceInfo: {
              price: data.order_buy
            }
          })
        }
      })
    }

  }
})