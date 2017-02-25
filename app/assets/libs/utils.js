'use strict';
import timeago from './timeago.min'
import { host } from '../../config'

export function getPrevPage() {
    const pages = getCurrentPages()
    return pages[pages.length - 2]
}
export function getAddress(index) {
    const addressList = wx.getStorageSync('addressList') || []
    return addressList[index]
}

export function fetch(options) {
    wx.request({
        url: `https://${host}/${options.url}`,
        data: options.data,
        method: options.method || 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
            const data = res.data
            if (data.State == 'Success') {
                options.success && options.success(data.data)
            } else {
                wx.showModal({
                    content: data.info,
                    showCancel: false
                });
            }
            options.complete && options.complete()
        }
    })
}

// 提示框
export function alert(content) {
    wx.showModal({
        title: '提示',
        content: content,
        showCancel: false
    })
}

// 时间格式化
export function datetimeFormat(unix_timestamp) {
    return new timeago().format(new Date(unix_timestamp * 1000), 'zh_CN'); 
}