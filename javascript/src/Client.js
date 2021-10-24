const https = require('https')

module.exports = {
  http_get: function http_get(url, options, callback) {
    const _options = Object.assign({
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/vnd.pagerduty+json;version=2',
        'Content-Type': 'application/json'
      }
    }, options)

    console.log("\nSending 'GET' request to URL : " + url)

    let request = https.request(url, _options, (res) => {
      let responseError = null
      if (res.statusCode >= 400) {
        responseError = `Did not get an OK from this server. Code: ${res.statusCode}`
        res.resume()
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('close', () => callback(responseError, data));
    })
    
    request.on('error', error => {
      callback(error)
    })

    request.end()
  },
  http_post: function (url, options, callback) {
    
  },
  http_put: function (url, options, callback) {
    
  },
  http_delete: function (url, options, callback) {
    
  },
  http_option: function (url, options, callback) {
    
  }
}