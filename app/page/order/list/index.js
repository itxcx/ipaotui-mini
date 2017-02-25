// page/order/list/index.js
import { alert, datetimeFormat } from '../../../assets/libs/utils'
import { getReleaseList } from '../../../assets/libs/apis'

const App = getApp()


Page({
  data: {
    items: [],
    loadMore: true,
    last_id: 0,
    status: {
      '1': '已发布', '2': '待付款',
      '3': '已取消', '4': '待取货',
      '5': '待放弃', '6': '退款中',
      '7': '已退款', '8': '进行中',
      '9': '待确认', '10': '待评价',
      '11': '已完成', '12': '已删除',
      '13': '已过期', '14': '投诉中',
      '15': '已处理'
    },
    types: {
      '0': 'send',
      '1': 'buy'
    },
    startAddressLabels: {
      '0': '发货地址',
      '1': '购买地址',
    },
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.loadData()
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

  loadData() {
    const that = this
    getReleaseList({
      last_id: that.data.last_id,
      success(data) {
        var list = data.list.map(function (item, i) {
          console.log(item)
           item.add_time_format = datetimeFormat(item.add_time)
           return item
        })
        that.setData({
          last_id: data.last_id,
          items: that.data.items.concat(list),
          loadMore: data.size == 10,
        })
      }
    })
  }
})