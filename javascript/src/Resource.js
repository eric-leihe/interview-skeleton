
const Resource = function (resourceName, commands) {
  if (this instanceof Resource) {
    this.name = resourceName
    this.commands = commands
  } else {
    return new Resource(resourceName, commands)
  }
}

Resource.use = function (client) {
  Resource.prototype.client = client
}

Resource.prototype.getName = function () {
  return this.name
}

Resource.prototype.restApiBaseUrl = 'https://api.pagerduty.com/'

Resource.prototype.baseUrl = function () {
  return new URL(`${this.name}/`, this.restApiBaseUrl).toString()
}

Resource.prototype.commandNames = function () {
  return Object.keys(this.commands)
}

Resource.prototype.execute = function (command, options, params, cb) {
  const commandHandler = this.commands[command]

  if (!commandHandler) {
    throw Error(`Unrecognized command: '${command}'. This resource only supports commands: ${JSON.stringify(this.commandNames())}`)
  }
  
  commandHandler.execute(options, params, cb)
}

module.exports = Resource 