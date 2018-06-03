var Mock = require('mockjs')

module.exports = function(data={}) {
  return Mock.mock(data)
}