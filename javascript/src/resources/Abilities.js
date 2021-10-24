const Resource = require('../Resource')
const Client = require('../Client')

const resource = Resource('abilities', {
  'list': {
    path: '', // Relative path to the resource base URL
    desc: "List all of your account's abilities, by name.",
    execute: function (options = {}, params, callback) {
      const commandUrl = new URL(this.path, resource.baseUrl()).toString()
      Client.http_get(commandUrl, options, callback)
    }
  },
  'test': {
    path: '', // Relative path to the resource base URL
    desc: "List all of your account's abilities, by name.",
    execute: function (options = {}, params, callback) {
      const commandUrl = new URL(`${params[0]}`, resource.baseUrl()).toString()
      Client.http_get(commandUrl, options, callback)
    }
  }
})

module.exports = resource