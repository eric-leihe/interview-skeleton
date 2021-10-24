const abilities = require('./resources/Abilities')
const Resource = require('./Resource')

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

resources.register(abilities)
resources.register(commandsResource)

module.exports = resources
