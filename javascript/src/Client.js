const https = require('https')

function json_to_object(json_string) {
  try {
    return JSON.parse(json_string)
  } catch (err) {
    console.error(`Suppressed. Failed to parse the response "${json_string}" into a JSON object. Use an empty object instead.`)
    return {}
  } 
}

const startRequest = (url, options, callback) => {
  const req = https.request(url, options, (res) => {
    let responseError = null
    if (res.statusCode >= 400) {
      responseError = {
        httpStatusCode: res.statusCode,
        message: `Did not get an OK from this server. Code: ${res.statusCode}`
      }
      res.resume()
    }

    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('close', () => callback(responseError, json_to_object(data)));
  })
  req.on('error', error => {
    callback(error)
  })

  return req
}

module.exports = {
  /**
   * 
   * @param {string} url - Base URL to access this endpoint  
   * @param {object} options - Options will be used to config the request, it should be an object like { method: <HttpMethod>, headers: { key: value, ... } }
   * @param {object} params  - Parameters to compose the query and payload, it should be an object like { query: { ... }, payload: { key: value } | undefined | null }
   * @param {function} callback - Callback function (err, data) => { ... }, if there is any exception or non-success response err will be set, data is the payload from the response.
   */
  http_get: function http_get(url, options, params, callback) {
    const _options = {
      method: 'GET',
      headers: Object.assign({
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/vnd.pagerduty+json;version=2',
        'Content-Type': 'application/json'
      }, options.headers)
    }

    const baseUrl = new URL(url)

    // Add Query paramters into the URL
    if (params.query && params.query.length > 0) {
      baseUrl.search += (Object.keys(baseUrl.searchParams).length === 0 ? '?' : '&') + params.query.join('&')
    }
    console.log("\nSending 'GET' request to URL : " + url)

    let request = startRequest(baseUrl.toString(), _options, callback)
    request.end()
  },

  http_post: function (url, options, data, callback) {
    const _options = {
      method: 'POST',
      headers: Object.assign({
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/vnd.pagerduty+json;version=2',
        'Content-Type': 'application/json'
      }, options.headers)
    }
    

    console.log("\nSending 'POST' request to URL : " + url)
    
    let request = startRequest(url, _options, callback)

    request.write(JSON.stringify(data))
    request.end()
  },

  http_put: function (url, options, callback) {
    
  },

  http_delete: function (url, options, callback) {
    
  },

  http_option: function (url, options, callback) {
    
  }
}