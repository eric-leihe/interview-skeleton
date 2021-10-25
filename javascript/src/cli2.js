#!/usr/bin/env node
const resources = require('./Resources')

var readcommand = require('readcommand');

var sigints = 0;

readcommand.loop(function(err, args, str, next) {
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

      console.log('Received args: ', resourceName, command, params);

      const resource = resources.get(resourceName)

      if (!resource) {
        throw Error(`Unknown resource '${resource}'. Please use 'commands list' to check all supported resources.`)
      }

      resource.execute(command, { headers: { 'Authorization': 'Token token=y_NbAkKc66ryYTWUXYEu' } }, params, (err, data) => {
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