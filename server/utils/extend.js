const isObject = require('./is-object')
const extend = (target, ...data) => {
  if (!isObject(target)) {
    return target
  }
  data.forEach(one => {
    if (!isObject(one)) {
      return
    }
    Object.keys(one).forEach(key => {
      target[key] = one[key]
    })
  })
  return target
}
module.exports = extend
