const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./user.controller')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.get('/', db.getUsers)
// app.get('/users/:id', db.getUserById)
app.post('/users', db.signUp)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
module.exports = app
