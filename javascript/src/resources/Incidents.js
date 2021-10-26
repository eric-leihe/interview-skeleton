const Resource = require('../Resource')

const resource = Resource('incidents', 'incident', {
  list: {
    desc: "List existing incidents.",
    execute: function (options = {}, params, callback) {
      resource.client.http_get(resource.getTargetUrl(params), options, callback)
    }
  },
  show: {
    desc: "Show detailed information about an incident.",
    execute: function (url, options = {}, params, callback) {
      resource.client.http_get(url, options, callback)
    }
  },
  create: {
    desc: 'Create an incident synchronously without a corresponding event from a monitoring service.',
    execute: function (options = {}, params, callback) {
      resource.client.http_post(resource.getTargetUrl(params), options, params.payload, callback)
    }
  }
})

module.exports = resource