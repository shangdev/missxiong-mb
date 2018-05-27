const getSonsTree = function(obj, data) {
  let children = []

  for (let i = 0; i < data.length; i++) {
    if (data[i].parent === obj.id) {
      getSonsTree(data[i], data)
      children.push(data[i])
    }
  }

  if (children.length > 0) {
    obj.children = children
  }

  return obj
}

const buildTree = function (data = {}) {
  let ptree = []

  for (let i = 0; i < data.length; i++) {
    if (data[i].parent === 0) {
      let o = getSonsTree(data[i], data)
      ptree.push(o)
    }
  }

  return ptree
}

const rebuildArray = function(obj, parent, son, pid = 0){
  let rebuildData = []

  for (let i in obj) {
    if (obj[i][parent] === pid) {
      for (var j = 0; j < obj[i].length; j++) {
        obj[i]['children'] = rebuildArray(obj, parent, son, obj[i][j][son])
        rebuildData = obj
      }
    }
  }

  return rebuildData
}

module.exports = {
  formatCurrency: function (num) {
    let money = num.toString().replace(/\$|\,/g, '')
    if (isNaN(money)) {
      money = '0'
    }
    return '￥' + (money / 1000000).toFixed(2)
  },
  removeHTML: function (text) {
    let str = text.replace(/<\/?.+?>/g, '')
    str = str.replace(/[\r\n]/g, '')
    str = str.replace(/ /g, '')

    return str
  },
  getSonsTree: getSonsTree,
  buildTree: buildTree,
  rebuildArray: rebuildArray
}
