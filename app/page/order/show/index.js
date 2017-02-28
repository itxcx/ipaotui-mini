// page/order/show/index.js
import { datetimeFormat } from '../../../assets/libs/utils'
import { getOrderInfo } from '../../../assets/libs/apis'
import { STATUS, START_LABEL } from '../list/constant'

Page({
  data: {
    orderInfo: {},
    STATUS, START_LABEL
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.order_id = options.id
    this.loadData(this.order_id)
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onPullDownRefresh: function () {
    this.loadData(this.order_id)
  },
  loadData(order_id) {
    const that = this
    getOrderInfo({
      order_id,
      success(data) {
        console.log(data)
        data.add_time_format = datetimeFormat(data.add_time)
        that.setData({
          orderInfo: data
        })
        wx.stopPullDownRefresh()
      }
    })
  },
  makePhoneCall(e) {
    wx.makePhoneCall({
      phoneNumber: e.target.dataset.phone,
      success: function (res) {
        // success
      }
    })
  },
})