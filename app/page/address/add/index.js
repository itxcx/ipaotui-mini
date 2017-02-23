// page/address/address/add/index

import QQMapWX from '../../../assets/libs/qqmap-wx-jssdk.min'
const App = getApp()
var qqmapsdk;

Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.initValidate()
    qqmapsdk = new QQMapWX({
      key: 'FPOBZ-UT2K2-ZFYUC-CX67E-IOOYS-7XFQ6'
    });
    if (options.id) {
      this.initData(options.id)
      wx.setNavigationBarTitle({
        title: '修改地址'
      })
    }
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
  chooseLocation: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          location: {
            latitude: res.latitude,
            longitude: res.longitude,
            name: res.name
          }
        })
      }
    })
  },
  formSubmit: function (e) {
    this.setData({
      loading: true
    })
    const params = e.detail.value
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      wx.showModal({
        content: error.msg,
        showCancel: false
      })
      return false
    }
    const location = this.data.location
    if (!location) {
      wx.showModal({
        content: '请选取联系地址',
        showCancel: false
      })
      return false
    }
    const that = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: location.latitude,
        longitude: location.longitude
      },
      success: function (res) {
        var {
          ad_info: {
            city, district, adcode
          }
        } = res.result
        var address = Object.assign({
          city, district,
          district_id: adcode,
          city_id: adcode.replace(/\d{2}$/, '00'),
          address_name: location.name,
          location: {
            latitude: location.latitude,
            longitude: location.longitude
          },
        }, params)
        var addressList = wx.getStorageSync('addressList') || []
        if (that.data.id) {
          addressList[that.data.id] = address
        } else {
          addressList.push(address)
        }
        wx.setStorageSync('addressList', addressList)
        wx.navigateBack()
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        that.setData({
          loading: false
        })
      }
    })

    // addressList.push(
    //   Object.assign({
    //     location
    //   }, params))
    // wx.setStorageSync('addressList', addressList)
  },
  initValidate() {
    this.WxValidate = App.WxValidate({
      name: {
        required: true,
      },
      phone: {
        required: true,
        tel: true,
      }
    }, {
        name: {
          required: '请输入联系人姓名',
        },
        phone: {
          required: '请输入手机号',
        },
      })
  },
  initData(id) {
    const address = wx.getStorageSync('addressList')[id]
    if (address) {
      var {
        name, phone, detail, location, address_name
      } = address
      this.setData({
        name, phone, detail,
        location: Object.assign({
          name: address_name
        }, location),
        id
      })
    }
  }
})