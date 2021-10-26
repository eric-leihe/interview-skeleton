const Resource = require('../Resource')

const resource = Resource('users', 'user', {
  list: {
    desc: "List users of your PagerDuty account, optionally filtered by a search query.",
    execute: function (options = {}, params, callback) {
      resource.client.http_get(resource.getTargetUrl(params), options, callback)
    }
  },
  show: {
    desc: "Get details about an existing user.",
    execute: function (options = {}, params, callback) {
      resource.client.http_get(resource.getTargetUrl(params), options, callback)
    }
  },
  create: {
    desc: 'Create a new user.',
    execute: function (options = {}, params, callback) {
      resource.client.http_post(resource.getTargetUrl(params), options, params, callback)
    }
  }
})

module.exports = resource