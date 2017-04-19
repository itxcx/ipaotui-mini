# 微信小程序-爱跑腿

## 简介
爱跑腿核心功能代我买，代我送

## 配置

### 接口域名切换, 默认为正式接口域名
```javascript
// 测试域名
wx.setStorageSync('debug', true)

// 正式域名
wx.removeStorageSync('debug')
```

### request合法域名
```
https://apis.map.qq.com
https://api.ipaotui.com
https://apitest.ipaotui.com
```

## 预览
### 代我买
![buy](/images/buy.png)

### 代我送
![send](/images/send.png)

### 我的
![my](/images/my.png)

### 小程序二维码
![qrcode](/images/qrcode.jpg)