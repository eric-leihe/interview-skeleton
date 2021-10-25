
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
  return new URL(`${this.name}`, this.restApiBaseUrl).toString()
}

Resource.prototype.commandNames = function () {
  return Object.keys(this.commands)
}

Resource.prototype.execute = function (command, options, params, cb) {
  const commandHandler = this.commands[command]

  if (!commandHandler) {
    throw Error(`Unrecognized command: '${command}'. This resource only supports commands: ${JSON.stringify(this.commandNames())}`)
  }

  // TODO: extract query, payload from params
  const parsedParams = {
    path: extractPath(params),
    query: extractQuery(params),
    payload: extractPayload(params)
  }
  
  commandHandler.execute(options, parsedParams, cb)
}

function extractPayload(params) {
  if (!params || params.length === 0) return null
  
  let payloadParamStart = false
  for (let element of params) {
    if (element === '-d' || element === '--data') {
      payloadParamStart = true
      continue
    } else {
      if (payloadParamStart === true && element.startsWith('-')) { // This is a very naive implementation for demo purpose
        break;
      }
    }

    if (payloadParamStart) {
      return JSON.parse(element)
    }
  }
}

function extractQuery(params) {
  let queries = []

  if(!params || params.length === 0) return queries

  let queryParamStart = false
  for (let element of params) {
    if (element === '-q' || element === '--query') {
      queryParamStart = true
      continue
    } else {
      if (queryParamStart === true && element.startsWith('-')) { // This is a very naive implementation for demo purpose
        break;
      }
    }

    if (queryParamStart) {
      queries.push(element)
    }
  }
  return queries
}

function extractPath(params) {
  if(!params || params.length === 0) return ''

  let pathParamStart = false
  for (let element of params) {
    if (element === '-p' || element === '--path') {
      pathParamStart = true
      continue
    } else {
      if (pathParamStart === true && element.startsWith('-')) { // This is a very naive implementation for demo purpose
        break;
      }
    }

    if (pathParamStart) {
      return element
    }
  }
}

module.exports = Resource 