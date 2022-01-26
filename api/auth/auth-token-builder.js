const jwt = require('jsonwebtoken')
// const JWT_SECRET = require('../../config').JWT_SECRET
const {JWT_SECRET} = require('../../config')

// function tokenBuilder(user) {
//     console.log(JWT_SECRET)
//     return 'The awesome token'
// }
// TEST: http :9000/api/users 
// TEST: http :9000/api/users Authorization:garbage_token
// TEST: http :9000/api/users Authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoyLCJ1c2VybmFtZSI6ImZvbyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjQzMTcxMjA1LCJleHAiOjE2NDMyNTc2MDV9.oQniHoWEWcCXrLLHhq77xm39zpmAirALb21sNy-TaAY
function tokenBuilder(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        role: user.role,
      }
      const options = {
        expiresIn: '1d',
      }
      const token = jwt.sign(payload, JWT_SECRET, options)

      return token
}

module.exports = tokenBuilder