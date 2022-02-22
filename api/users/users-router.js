const router = require("express").Router()

const User = require("./users-model.js")

const { restricted, only } = require('../auth/auth-middleware')


// TEST: http :9000/api/users 
// TEST: http :9000/api/users Authorization:garbage_token
// TEST: http :9000/api/users Authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoyLCJ1c2VybmFtZSI6ImZvbyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjQ1NTU0MjY3LCJleHAiOjE2NDU2NDA2Njd9.Unohg3n00BYsG_Hw2woTjfJ0spm0itceveJqn30Ya_I
router.get("/", restricted, only('admin'), (req, res, next) => {
  User.find()
    .then(users => {
      res.json(users)
    })
    .catch(next) // our custom err handling middleware in server.js will trap this
})

module.exports = router
