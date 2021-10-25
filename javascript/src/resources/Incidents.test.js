const resource = require('../Resource')
const client = require('../Client');
const incidents = require('./Incidents')

resource.use(client)

const commonHeader = { 'Authorization': 'Token token=y_NbAkKc66ryYTWUXYEu' }

test('Create a incident', done => {
    const testData = {
      "incident": {
        "type": "incident",
        "title": "The server is on fire.",
        "service": {
          "id": "PWIXJZS",
          "type": "service_reference"
        },
        "priority": {
          "id": "P53ZZH5",
          "type": "priority_reference"
        },
        "urgency": "high",
        "incident_key": "baf7cf21b1da41b4b0221008339ff357",
        "body": {
          "type": "incident_body",
          "details": "A disk is getting full on this machine. You should investigate what is causing the disk to fill, and ensure that there is an automated process in place for ensuring data is rotated (eg. logs should have logrotate around them). If data is expected to stay on this disk forever, you should start planning to scale up to a larger disk."
        },
        "escalation_policy": {
          "id": "PT20YPA",
          "type": "escalation_policy_reference"
        }
      }
    }
  
  const createIncidentCallback = function (err, data) {
    if (err) {
      console.log(data)
      done(err)
    } else {
      expect(data).toBeDefined()
      done()
    }
  }
  
  incidents.execute('create', { headers: Object.assign(commonHeader, {'From': 'john.doe@example.com'}) }, ['-d', JSON.stringify(testData)], createIncidentCallback)
})

