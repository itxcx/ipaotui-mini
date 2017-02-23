// page/my/index.js
var App = getApp();

Page({
  data:{
    userInfo: {}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    const that = this
    App.getUserInfo(function(err, userInfo){
      if(err) {
        return false
      }
      console.log(userInfo)
      that.setData({
        userInfo
      })
    }) 
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})