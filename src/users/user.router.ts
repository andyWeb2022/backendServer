const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const router = express.Router()
const db = require('./user.controller')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

router.get('/getUsers', db.getUsers)
// app.get('/users/:id', db.getUserById)
router.post('/signUp', db.signUp)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)
router.post('/login', db.login)

app.use('/', router)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

module.exports = app
