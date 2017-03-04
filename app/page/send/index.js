// page/send/send.js
import { getAddress, alert, coordFormat } from '../../assets/libs/utils'
import { getPriceCalc, addOrder } from '../../assets/libs/apis'

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
        success: function (data) {
          that.setData({
            priceInfo: data
          })
        }
      })
    }

  },
  formSubmit(e) {
    const that = this

    this.setData({
      loading: true
    })
    const {
      info,
      fromAddress, toAddress,
      priceInfo
    } = that.data
    if (!info) {
      this.setData({
        loading: false
      })
      return alert('请选取物品信息')
    }
    if (!fromAddress) {
      this.setData({
        loading: false
      })
      return alert('请选取发货地址')
    }
    if (!toAddress) {
      this.setData({
        loading: false
      })
      return alert('请选取收货地址')
    }
    if (!priceInfo) {
      this.setData({
        loading: false
      })
      return alert('价格计算中, 请耐心等待')
    }
    const params = e.detail.value
    addOrder({
      data: Object.assign({
        errands_price: priceInfo.price,
        good_info: info,
        start_city: fromAddress.city_id,
        start_address: [fromAddress.address_name, fromAddress.detail].join(' ').trim(),
        start_location: coordFormat(fromAddress.location),
        end_city: toAddress.city_id,
        end_address: [toAddress.address_name, toAddress.detail].join(' ').trim(),
        end_location: coordFormat(toAddress.location),
        send_start_phones: fromAddress.phone,
        send_finish_key_phones: toAddress.phone,
        district_name: fromAddress.district,
      }, params),
      success(data) {
        console.log(data)
      },
      complete() {
        that.setData({
          loading: false
        })
      }
    })
  }
})