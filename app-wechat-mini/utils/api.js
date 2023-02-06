const fetch = require('./request.js')

function fetchCnode (params) {
  return fetch('/topics', 'get', params)
}

module.exports = {
  fetchCnode
}