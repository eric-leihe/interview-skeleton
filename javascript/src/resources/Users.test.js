const resource = require('../Resource')
const client = require('../HttpClient.js');
const users = require('./users')

resource.use(client)

const commonHeader = { 'Authorization': 'Token token=y_NbAkKc66ryYTWUXYEu' }

test('List users', done => {
  const callback = function (err, data) {
    if (err) {
      console.log(data)
      done(err)
    } else {
      expect(data).toBeDefined()
      done()
    }
  }
  
  users.execute('list', { headers: commonHeader }, {'query': ['limit=5', 'offset=0']}, callback)
})

// test('Create a user', done => {
//   const callback = function (err, data) {
//     if (err) {
//       console.log(data)
//       done()
//     } else {
//       expect(data).toBeDefined()
//       done()
//     }
//   }
  
//   const data = `{
//     "user": {
//         "type": "user",
//         "name": "Earline Greenholt",
//         "email": "345.greenholt.earline@graham.name",
//         "time_zone": "America/Lima",
//         "color": "green",
//         "role": "admin",
//         "job_title": "Director of Engineering",
//         "avatar_url": "https://secure.gravatar.com/avatar/1d1a39d4635208d5664082a6c654a73f.png?d=mm&r=PG",
//         "description": "I'\''m the boss"
//       }
//     }`
//   users.execute('create', { headers: Object.assign(commonHeader, { 'From': '' }) }, { payload: data }, callback)
// })

