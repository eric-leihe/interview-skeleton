#!/usr/bin/env node
const readcommand = require('readcommand');
const httpClient = require('./HttpClient')
const endpoints = require('./Endpoints')
const paramParser = require('./ParamParser')
endpoints.init(httpClient)


var sigints = 0;

readcommand.loop({ ps1: 'PagerDuty> '}, function(err, args, str, next) {
  if (err && err.code !== 'SIGINT') {
      throw err;
  } else if (err) {
      if (sigints === 1) {
          process.exit(0);
      } else {
          sigints++;
          console.log('Press ^C again to exit.');
          return next();
      }
  } else {
      sigints = 0;
  }

  const inputCallback = (input) => {
    try {
      if (!input || input.length === 0) return next();

      const [resourceName, command, ...params] = input

      const resource = endpoints.get(resourceName)

      if (!resource) {
        throw Error(`Unknown resource '${resourceName}'. Please use 'commands list' to check all supported resources.`)
      }

      resource.execute(command, 'u+KQ19ypt4SsAs6-8zLg', paramParser(params), (err, data) => {
        if (err != null) {
          console.error(`Encountered an error trying to make a request: ${err.message}. \n`, data);
        } else {
          console.log(data)
        }
        return next()
      })
    } catch (e) {
      console.error("Encountered an error trying to execute command: \n", e)
      return next()
    } 
  }
  return inputCallback(args);
});