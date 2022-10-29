const express = require('express')
const bodyParser = require('body-parser')
const userRouter = require('./users/user.router')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use('/',userRouter)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

module.exports = app