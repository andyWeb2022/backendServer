const userExpress = require('express')
const router = userExpress.Router()
const db = require('./user.controller')

router.get('/getUsers', db.getUsers)
// app.get('/users/:id', db.getUserById)
router.post('/signUp', db.signUp)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)
router.post('/login', db.login)

module.exports = router
