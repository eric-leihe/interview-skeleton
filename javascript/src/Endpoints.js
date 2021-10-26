const abilities = require('./resources/Abilities')
const incidents = require('./resources/Incidents')
const users = require('./resources/Users')
const Resource = require('./Resource')

const endpoints = {
  registry: {},
  init: function (httpClient) {
      Resource.use(httpClient)
  },
  register: function (resource) {
    this.registry[resource.getName()] = resource
  },
  list: function () {
    return Object.keys(this.registry)
  },
  get: function (name) {
    return this.registry[name]
  }
}

const commandsResource = Resource('commands', 'command', {
  'list': {
    path: '', // Relative path to the resource base URL
    desc: "List all of your account's abilities, by name.",
    execute: function (options = {}, params, callback) {
      return callback(null, JSON.stringify(endpoints.list()))
    }
  }
})

// Local
endpoints.register(commandsResource)

// Remote Resources
endpoints.register(abilities)
endpoints.register(incidents)
endpoints.register(users)

module.exports = endpoints
