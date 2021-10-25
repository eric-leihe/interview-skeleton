const Resource = require('../Resource')

const resource = Resource('incidents', {
  list: {
    desc: "List existing incidents.",
    execute: function (options = {}, params, callback) {
      resource.client.http_get(resource.baseUrl(), options, params, callback)
    }
  },
  show: {
    desc: "Show detailed information about an incident.",
    execute: function (options = {}, params, callback) {
      const commandUrl = new URL(`${params.path}`, `${resource.baseUrl()}/`).toString()
      resource.client.http_get(commandUrl, options, params, callback)
    }
  },
  create: {
    desc: 'Create an incident synchronously without a corresponding event from a monitoring service.',
    execute: function (options = {}, params, callback) {
      resource.client.http_post(resource.baseUrl(), options, params.payload, callback)
    }
  }
})

module.exports = resource