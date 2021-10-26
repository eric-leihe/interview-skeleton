
const Resource = function (name, singlularName, commands) {
  if (this instanceof Resource) {
    this.name = name
    this.singlularName = singlularName 
    this.commands = commands
  } else {
    return new Resource(name, singlularName, commands)
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
  return new URL(`${this.name}`, this.restApiBaseUrl).toString()
}

Resource.prototype.commandNames = function () {
  return Object.keys(this.commands)
}

/**
 * Build target URL from the resource's base URL and the params
 * If there is a path property in params or a query property in params, they will be combined
 * with the base URL to create a target URL.
 *  
 * @param {object} params - { path: '<path-to-resource>', query: [...] }
 * @returns {URL} targetUrl
 */
Resource.prototype.getTargetUrl = function (params) {
  const targetUrl = params.path ? new URL(params.path, `${this.baseUrl()}/`) : new URL(this.baseUrl())

  // Add Query paramters into the URL
  if (params.query && params.query.length > 0) {
    targetUrl.search += (Object.keys(targetUrl.searchParams).length === 0 ? '?' : '&') + params.query.join('&')
  }

  return targetUrl
}

Resource.prototype.execute = function (command, options, params, cb) {
  try {
    const commandHandler = this.commands[command]

    if (!commandHandler) {
      throw Error(`Unrecognized command: '${command}'. This resource only supports commands: ${JSON.stringify(this.commandNames())}`)
    }

    const headers = params.headers
    if (headers) {
      options.headers = Object.assign(options.headers, headers)
    }

    commandHandler.execute(options, params, cb)
  } catch (err) {
    cb(err) 
  }
}



module.exports = Resource 