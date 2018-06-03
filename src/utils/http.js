import wepy from 'wepy'

// HTTP工具类
export default class http {
  static request(method, url, data = {}, header = {}) {
    const self = this

    // 如果对象为空，给header一个默认值
    if (Object.keys(header).length === 0) {
      header = {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + wepy.$instance.globalData.token
      }
    }

    const params = {
      method: method,
      url: url,
      data: data,
      header: header
    }

    wepy.showLoading({
      title: '加载中...'
    })

    return new Promise((resolve, reject) => {
      wepy.request(params).then((res) => {
        wepy.hideLoading()
        resolve(res.data)
      }).catch((err) => {
        wepy.hideLoading()
        reject(err)
      })
    })
  }

  /**
   * 处理异常
   * @param res
   */
  static requestException(res) {
    const error = {}
    error.statusCode = res.statusCode
    const wxData = res.data
    if (wxData) {
      error.serverCode = wxData.code
      error.message = wxData
    }
    return error
  }

  static get(url, data) {
    return this.request('GET', url, data)
  }

  static put(url, data) {
    return this.request('PUT', url, data)
  }

  static post(url, data) {
    return this.request('POST', url, data)
  }

  static patch(url, data) {
    return this.request('PATCH', url, data)
  }

  static delete(url, data) {
    return this.request('DELETE', url, data)
  }
}
