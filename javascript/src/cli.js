#!/usr/bin/env node
const resources = require('./Resources')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function json_to_object(json_string) {
  if (!json_string) return ''
  return JSON.parse(json_string)
}

function get_input_line(callback) {
  readline.question('PagerDuty/>', input => {
    if (input) {
      callback(input);
    } else {
      get_input_line(callback)
    }
  })
}

console.log("This is where the execution code can be added")

const serviceBaseUrl = 'https://api.pagerduty.com/' 
// const eventApi = 'https://events.pagerduty.com/v2/' 

const inputCallback = (input) => {
  try {
    const [resourceName, command, ...params] = input.split(/\s/)

    const resource = resources.get(resourceName)

    if (!resource) {
      throw Error(`Unknown resource '${resource}'. Please use 'commands list' to check all supported resources.`)
    }

    resource.execute(command, { headers: { 'Authorization': 'Token token=y_NbAkKc66ryYTWUXYEu' } }, params, (err, data) => {
      if (err != null) {
        console.error(`Encountered an error trying to make a request: ${err}. \n`, json_to_object(data));
      } else {
        console.log("Received data: ", json_to_object(data))
      }
      get_input_line(inputCallback)
    })
  } catch (e) {
    console.error("Encountered an error trying to execute command: \n", e)
    get_input_line(inputCallback)
  } 
}

get_input_line(inputCallback)

