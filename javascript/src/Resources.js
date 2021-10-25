const abilities = require('./resources/Abilities')
const incidents = require('./resources/Incidents')
const users = require('./resources/Users')
const Client = require('./Client')
const Resource = require('./Resource')

Resource.use(Client)

const resources = {
  registry: {},
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

const commandsResource = Resource('commands', {
  'list': {
    path: '', // Relative path to the resource base URL
    desc: "List all of your account's abilities, by name.",
    execute: function (options = {}, params, callback) {
      return callback(null, JSON.stringify(resources.list()))
    }
  }
})

// Local
resources.register(commandsResource)

// Remote Resources
resources.register(abilities)
resources.register(incidents)
resources.register(users)

module.exports = resources
