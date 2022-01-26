const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../../config')


// AUTHENTICATION
const restricted = (req, res, next) => {
  // next()
  const token = req.headers.authorization
  console.log(token)
  // next()
  if (!token) {
    next({ status: 401, message: 'You shall not pass!' }) 
  }else {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        next({ status: 401, message: `Your token sucks: ${err.message}` })
      } else {
        req.decodedJwt = decoded
        next()
      }
    })
  }
}

// AUTHORIZATION
const checkRole = role =>  (req, res, next) => {
  // next()
  if (req.decodedJwt.role === role) {
    next()
  } else {
    next({ status: 403, message: 'you have no power here!' })
  }
}

module.exports = {
  restricted,
  checkRole,
}
