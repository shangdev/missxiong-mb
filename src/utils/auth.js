import wepy from 'wepy'
import route from './route.js'

const auth = function () {
  // 检查登录是否过期，过期则再次登录，未过期则获取本地storage中存储的token
  wepy.checkSession().then((res) => {
    // Session未过期，并且在本生命周期内一直有效
    wepy.$instance.globalData.token = wepy.getStorageSync('token')
    wepy.$instance.globalData.userInfo = wepy.getStorageSync('userInfo')
  }).catch((resErr) => {
    // Sesscion过期，重新登录
    wepy.login().then((res) => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      if (res.code) {
        wepy.request({
          method: 'POST',
          url: route.auth(),
          data: {
            'code': res.code
          }
        }).then((res) => {
          wepy.$instance.globalData.token = res.data.token
          wepy.setStorageSync('token', res.data.token)
        })
      }
    })
  })
}

const checkAuth = function () {
  if (wepy.$instance.globalData.token) {
    return true
  } else {
    return new Promise((resolve, reject) => {
      // Sesscion过期，重新登录
      wepy.login().then((res) => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wepy.request({
            method: 'POST',
            url: route.auth(),
            data: {
              'code': res.code
            }
          }).then((res) => {
            wepy.$instance.globalData.token = res.data.token
            wepy.setStorageSync('token', res.data.token)
            resolve(res)
          }).catch((err) => {
            reject(err)
          })
        }
      }).catch((err) => {
        reject(err)
      })
    })
  }
}

module.exports = {
  auth: auth,
  checkAuth: checkAuth
}
