const isObject = object => {
  return object === Object(object) &&
      typeof object !== 'function' &&
      !Array.isArray(object)
}

module.exports = isObject
