
// Default http client implementation - Use nodejs native http module for server side environment and is browserified into `fetch` for browser
exports.httpClient = require('./FetchClient.js')

// Resource prototype to create a new resource endpoint
exports.resource = require('./Resource')

// Entry point for use API endpoints. It should be initialized with a proper HttpClient implmementation before use
exports.endpoints = require('./Endpoints')
