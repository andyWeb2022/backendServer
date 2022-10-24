const bcrypt = require('bcrypt')
const CodeError = require('../utils/codeError')
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'person',
  password: 'dreamdigger',
  port: 5432
})

const getUsers = async (req:any, res:any) => {
  pool.query('SELECT * from personList', (error:any, results:any) => {
    if (error) {
      console.log(error.msg)
    }
    res.send(results.rows)
  })
}
const signUp = async (request:any, response:any) => {
  try {
    const { name, email, password } = request.body
    const list = await pool.query('SELECT distinct(email) from personList')
    const findTheSameEmail = (ele:any) => {
      return ele.email === email
    }
    if (list.rows.find(findTheSameEmail)) {
      response.status(201).send('The email had been used')
    } else {
      pool.query('INSERT INTO personList (name, email, password) VALUES ($1, $2, $3)', [name, email, password], (error:any, results:any) => {
        if (error) {
          throw error
        }
        response.status(201).send(`User ${email} signUp successful`)
      })
    }
  } catch (error:any) {
    console.log(error.msg)
  }
}

const login = (request:any, response:any) => {
  try {
    const { email, password } = request.body
    const passwordInStore = pool.query(`SELECT password FROM personList WHERE email=${email}`, (error:any, results:any) => {
      if (error) throw error
    })
    const verifyUser = bcrypt.compare(password, passwordInStore)
    if (!email || !password) {
      throw new CodeError({
        status: 400,
        msg: '請填入完整資料'
      })
    }
    if (verifyUser) {
      const token = 'fdsfsdfsdnflksdnflskfsf' // <----------------------- 記得改成jwt
      return {
        token,
        msg: '登入成功'
      }
    }
  } catch (error:any) {
    if (error instanceof CodeError) {
      const loginError = {
        status: error.status,
        msg: error.msg
      }
      throw loginError
    }
  }
}

module.exports = {
  login,
  signUp,
  getUsers
}
