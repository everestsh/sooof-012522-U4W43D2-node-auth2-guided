const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config');

// AUTHENTICATION
const restricted = (req, res, next) => {
  // next()
  // step 1
  // console.log("restricted middleware")
  // const token = req.headers.authorization
  // console.log(token);
  // next()
  // step 2
  // const token = req.headers.authorization
  // if(!token) {
  //   next({ status: 401, message: 'access denied' });
  // } else {
  //   jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
  //     if(err) {
  //       next({ status: 401, message: 'access denied' });
  //     } else {
  //       console.log(decodedToken);
  //     }
  //   })
  //   next()
  // }
   // step 3
   const token = req.headers.authorization
   if(!token) {
     next({ status: 401, message: 'access denied' });
   } else {
     jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
       if(err) {
         next({ status: 401, message: 'access denied' });
       } else {
         req.decodedJwt = decodedToken;
         next()
       }
     })
   }
}

// AUTHORIZATION
const only = role => (req, res, next) => {
  if (role != req.decodedJwt.role) {
    next({ status: 401, message: 'access denied' });
  } else {
    next()
  }
}

module.exports = {
  restricted,
  only,
}