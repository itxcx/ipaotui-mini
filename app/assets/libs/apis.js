import { fetch, showLoading, coordFormat } from './utils'

// 计算价格
export function getPriceCalc(options) {
    const {
        fromAddress, toAddress, success
    } = options
    fetch({
        url: "index.php?m=Api&c=Common&a=getPriceCalc",
        data: {
            start_city: fromAddress.city_id,
            start_location: coordFormat(fromAddress.location),
            end_city: toAddress.city_id,
            end_location: coordFormat(toAddress.location),
            district_id: fromAddress.district_id
        },
        success: function (data) {
            success && success(data)
        }
    })
}

// 获取代我买价格
export function getPriceCan(options) {
    const {
        city_id, district_id,
        success
    } = options
    fetch({
        url: "index.php?m=Api&c=Common&a=getPriceCan",
        data: {
            city_id, district_id
        },
        success: function (data) {
            success && success(data)
        }
    })
}

// 获取验证码
export function getCode(options) {
    const {
        phone, success
    } = options
    fetch({
        url: "index.php?m=Api&c=Common&a=checkMSG",
        data: {
            phone,
            key: 'fast_login'
        },
        success: function (data) {
            success && success(data)
        }
    })
}

// 登录
export function login(options) {
    const {
        code, success
    } = options
    fetch({
        url: "index.php?m=Api&c=WeixinMini&a=login",
        data: {
            code,
            session_3rd: wx.getStorageSync('session_3rd'),
        },
        success(data) {
            success && success(data)
        }
    })
}

// 验证手机
export function verify(options) {
    const {
        phone, code, success, complete
    } = options
    const App = getApp()
    App.getUserInfo(function (err, userInfo) {
        if (err) {
            return alert(err);
        }
        fetch({
            url: "index.php?m=Api&c=WeixinMini&a=verify",
            data: {
                phone,
                code,
                openid: userInfo.openid
            },
            success(data) {
                success && success(data)
            },
            complete() {
                complete && complete()
            }
        })
    })
}

// 加载订单
export function getReleaseList(options) {
    const {
        last_id, success
    } = options;
    showLoading()
    getApp().getUserInfo(function (err, userInfo) {
        if (err) {
            return alert(err)
        }
        fetch({
            url: 'index.php?m=Api&c=Order&a=getReleaseList',
            data: {
                user_id: userInfo.user_id,
                user_token: userInfo.user_token,
                last_id
            },
            success(data) {
                success && success(data)
            },
            complete() {
                wx.hideToast()
            }
        })
    })

}

// 订单详情
export function getOrderInfo(options) {
    const {
        order_id, success
    } = options
    showLoading()
    getApp().getUserInfo(function (err, userInfo) {
        if (err) {
            return alert(err)
        }
        fetch({
            url: 'index.php?m=Api&c=Order&a=getOrderInfo',
            data: {
                user_id: userInfo.user_id,
                user_token: userInfo.user_token,
                order_id
            },
            success(data) {
                success && success(data)
            },
            complete() {
                wx.hideToast()
            }
        })
    })
}

// 代我买
export function addOrderBuy(options) {
    const {
        data, success, complete
    } = options
    getApp().getUserInfo(function (err, userInfo) {
        if (err) {
            return alert(err)
        }
        fetch({
            url: 'index.php?m=Api&c=My&a=addOrder_buy',
            data: Object.assign({
                user_id: userInfo.user_id,
                user_token: userInfo.user_token,
                pay_type: 0,
            }, data),
            success(data) {
                success && success(data)
            },
            complete
        })
    })
}
// 代我送
export function addOrder(options) {
    const {
        data, success, complete
    } = options
    getApp().getUserInfo(function (err, userInfo) {
        if (err) {
            return alert(err)
        }
        fetch({
            url: 'index.php?m=Api&c=My&a=addOrder',
            data: Object.assign({
                user_id: userInfo.user_id,
                user_token: userInfo.user_token,
                pay_type: 0,
            }, data),
            success(data) {
                success && success(data)
            },
            complete
        })
    })
}

// 取消订单
