const Resource = require('../Resource')

const resource = Resource('abilities', 'ability', {
  list: {
    desc: "List all of your account's abilities, by name.",
    execute: function (options = {}, params, callback) {
      resource.client.http_get(resource.getTargetUrl(params), options, callback)
    }
  },
  test: {
    desc: "Test whether your account has a given ability.",
    execute: function (options = {}, params, callback) {
      // const commandUrl = new URL(`${params.path}`, `${resource.baseUrl()}/`).toString()

      const responseInterpretor = (err, data) => {
        if (err) {
          switch (err.httpStatusCode) {
            case 404:
              callback(Error(`The requested resource was not found.`), data)
              break
            default:
              callback(err, data)
          }
        } else {
          callback(err, 'The account has the requested ability.')
        }
      }

      resource.client.http_get(resource.getTargetUrl(params), options, responseInterpretor)
    }
  }
})

module.exports = resource