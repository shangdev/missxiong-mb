import wepy from 'wepy'
import route from './route.js'

const login = function () {
  const self = this

  wepy.login().then((res) => {
    if (res.code) {
      wepy.getUserInfo((resUserInfo) => {
        wepy.request({
          method: 'POST',
          url: route.auth(),
          data: {
            'code': res.code,
            'encryptedData': resUserInfo.encryptedData,
            'iv': resUserInfo.iv
          }
        }).then((resData) => {
          console.log(resData)
          if (resData.statusCode === 200) {
            wepy.showToast({
              title: '登录成功',
              icon: 'success'
            }).then((d) => {
              self.$parent.globalData.token = resData.data.token
              wepy.setStorageSync('token', resData.data.token)

              self.$parent.globalData.userID = resData.data.ID
              wepy.setStorageSync('userID', resData.data.ID)
            })
          } else {
            wepy.showModal({
              content: resData.data.code,
              showCancel: false
            })
          }
        })
      }).catch((err) => {
        wepy.authorize({
          scope: 'scope.userInfo'
        }).then((res) => {
          login()
        })
      })
    }
  })
}

module.exports = {
  login: login
}
