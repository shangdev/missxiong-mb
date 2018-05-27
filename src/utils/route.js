import config from './config.js'

module.exports = {
  auth: function () {
    return config.getDomain + '/wp-json/mp/v1/auth'
  },
  getJwtToken: function () {
    return config.getDomain + '/wp-json/jwt-auth/v1/token'
  },
  getPosts: function (page = 1, perPage = config.getPageCount) {
    const pages = '?per_page=' + perPage + '&page=' + page
    return config.getDomain + '/wp-json/wp/v2/posts/' + pages
  },
  getPostById: function (postId) {
    return config.getDomain + '/wp-json/wp/v2/posts/' + postId
  },
  getCommentsList: function (postId) {
    return config.getDomain + '/wp-json/wp/v2/comments?post=' + postId
  },
  getPostComments: function () {
    return config.getDomain + '/wp-json/wp/v2/comments'
  },
  getDeleteComments: function (id) {
    return config.getDomain + '/wp-json/wp/v2/comments/' + id
  }
}
