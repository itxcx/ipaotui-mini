// page/phone/index.js
import { alert } from '../../assets/libs/utils'
import { getCode } from '../../assets/libs/apis'
const App = getApp()
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.initValidate()
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
  initValidate() {
    this.WxValidate = App.WxValidate({
      phone: {
        required: true,
        tel: true,
      },
      code: {
        required: true,
      },
    }, {
        phone: {
          required: '请输入手机号',
        },
        code: {
          required: '请输入验证码',
        },
      })
  },
  formSubmit: function (e) {
    this.setData({
      loading: true
    })
    const params = e.detail.value
    const that = this

    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      that.setData({
        loading: false
      })
      return alert(error.msg)
    }
  },
  bindCode: function(e) {

  },
})