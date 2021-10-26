
const genericHeaders = {
        'Accept': 'application/vnd.pagerduty+json;version=2',
        'Content-Type': 'application/json'
}
      
module.exports = {
  /**
   * Send http(s) GET request.
   * 
   * @param {URL}       url       - Target URL to access this endpoint  
   * @param {object}    options   - Options will be used to config the request, 
   *                                it should be an object like { method: <HttpMethod>, headers: { key: value, ... } }
   * @param {function}  callback  - Callback function (err, data) => { ... }, 
   *                                err will be set if there is any exception or non-success response otherwise err is null, 
   *                                data is the received payload from the response.
   */
  http_get: function http_get(url, options, callback) {
    const _options = {
      method: 'GET',
      headers: Object.assign(genericHeaders, options.headers)
    }

    console.log("\nSending 'GET' request to URL : " + url)

    fetch(url.toString(), _options)
      .then(res => Promise.all([res.status, res.json()]))
      .then(([httpStatusCode, jsonData]) => {
        let responseError = null
        if (httpStatusCode >= 400) {
          responseError = {
            httpStatusCode,
            message: `Did not get an OK from this server. Code: ${httpStatusCode}`
          }
        }
        callback(responseError, jsonData)
      })
      .catch(err => callback(err))
  },

  /**
   * Send http(s) POST request.
   * 
   * @param {URL}           url       - Target URL to access this endpoint  
   * @param {object}        options   - Options will be used to config the request, 
   *                                    it should be an object like { method: <HttpMethod>, headers: { key: value, ... } }
   * @param {object|array}  payload   - The payload will be submitted to the server side endpoint. 
   * @param {function}      callback  - Callback function (err, data) => { ... }, 
   *                                    err will be set if there is any exception or non-success response otherwise err is null, 
   *                                    data is the received payload from the response.
   */
  http_post: function (url, options, payload, callback) {
    const _options = {
      method: 'POST',
      headers: Object.assign(genericHeaders, options.headers),
      body: JSON.stringify(payload || {})
    }

    const baseUrl = new URL(url)

    console.log("\nSending 'POST' request to URL : " + url)
    
    fetch(baseUrl.toString(), _options)
      .then(res => Promise.all([res.status, res.json()]))
      .then(([httpStatusCode, jsonData]) => {
        let responseError = null
        if (httpStatusCode >= 400) {
          responseError = {
            httpStatusCode,
            message: `Did not get an OK from this server. Code: ${httpStatusCode}`
          }
        }
        callback(responseError, jsonData)
      })
      .catch(err => callback(err))
  },

  http_put: function (url, options, callback) {
    
  },

  http_delete: function (url, options, callback) {
    
  },

  http_option: function (url, options, callback) {
    
  }
}