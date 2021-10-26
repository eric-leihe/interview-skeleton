// Parsing command line parameters which is feeded into this function as any array of string

function extractPayload(params) {
  if (!params || params.length === 0) return null
  
  let payloadParamStart = false
  for (let element of params) {
    if (element === '-d' || element === '--data') {
      payloadParamStart = true
      continue
    } else {
      if (payloadParamStart === true && element.startsWith('-')) { // This is a very naive implementation for demo purpose
        return {}
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
        return '';
      }
    }

    if (pathParamStart) {
      return element
    }
  }
}

function extractHeaders(params) {
  if (!params || params.length === 0) return {}

  const headers = {}
  let headerParamStart = false
  for (let element of params) {
    if (element === '-h' || element === '--header') {
      headerParamStart = true
      continue
    } else {
      if (headerParamStart === true && element.startsWith('-')) { 
        break;
      }
    }

    if (headerParamStart) {
      const [key, value] = element.split('=')
      headers[key] = value
    }
  }

  return headers
}

const PARAM_NAME_PATH = 'path'
const PARAM_NAME_QUERY = 'query'
const PARAM_NAME_HEADER = 'header'
const PARAM_NAME_PAYLOAD = 'data'

function parser(params) {
  if (!params || params.length === 0) return {}

  const parsedPath = []
  const parsedQuery = []
  const parseHeader = {}
  let parsedPayload = {}
  
  let parsingName = null
  for (let element of params) {
    if (element === '-p' || element === '--path') {
      parsingName = PARAM_NAME_PATH
      continue
    } else if (element === '-h' || element === '--header') {
      parsingName = PARAM_NAME_HEADER
      continue
    } else if (element === '-d' || element === '--data') {
      parsingName = PARAM_NAME_PAYLOAD
      continue
    } else if (element === '-q' || element === '--query') {
      parsingName = PARAM_NAME_QUERY
      continue
    }

    switch (parsingName) {
      case PARAM_NAME_PATH: {
        parsedPath.push(element.trim())
        break
      }
      case PARAM_NAME_QUERY: {
        parsedQuery.push(element)
        break
      }
      case PARAM_NAME_HEADER: {
        const [key, value] = element.split('=')
        parseHeader[key.trim()] = value.trim()
        break
      }
      case PARAM_NAME_PAYLOAD: {
        parsedPayload = JSON.parse(element)
        break
      }
      default:
        console.log("Ignore unknown parameter: ", element)
    }
  }

  return {
    headers: parseHeader,
    path: parsedPath[0],
    query: parsedQuery,
    payload: parsedPayload
  }
}

module.exports = parser