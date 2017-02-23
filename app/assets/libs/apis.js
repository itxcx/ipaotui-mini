import { fetch } from './utils'

// 计算价格
export function getPriceCalc(options) {
    const {
        fromAddress, toAddress, success
    } = options
    fetch({
        url: "index.php?m=Api&c=Common&a=getPriceCalc",
        data: {
            start_city: fromAddress.city_id,
            start_location: `${fromAddress.location.longitude},${fromAddress.location.latitude}`,
            end_city: toAddress.city_id,
            end_location: `${toAddress.location.longitude},${toAddress.location.latitude}`,
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
export function getCode(phone) {
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