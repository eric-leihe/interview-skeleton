const Resource = require('../Resource')

const resource = Resource('users', {
  list: {
    desc: "List users of your PagerDuty account, optionally filtered by a search query.",
    execute: function (options = {}, params, callback) {
      resource.client.http_get(resource.baseUrl(), options, params, callback)
    }
  },
  show: {
    desc: "Get details about an existing user.",
    execute: function (options = {}, params, callback) {
      const commandUrl = new URL(`${params.path}`, `${resource.baseUrl()}/`).toString()
      resource.client.http_get(commandUrl, options, params, callback)
    }
  },
  create: {
    desc: 'Create a new user.',
    execute: function (options = {}, params, callback) {
      resource.client.http_post(resource.baseUrl(), options, params.payload, callback)
    }
  }
})

module.exports = resource