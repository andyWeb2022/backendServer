const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'person',
  password: '589632147',
  port: 5432
})

  const getUsers = async(req:any, res:any) => {
    pool.query('SELECT * from personList', (error:any, results:any) => {
      if (error) {
        console.log(error.msg)
      }
    res.send(results.rows)
    })
  }
  const signUp = async(request:any, response:any) => {
    try {
    const { name, email, password } = request.body
    const list = await pool.query('SELECT distinct(email) from personList')
    const findTheSameEmail = (ele:any) =>{
         return ele.email === email
    }
    if (list.rows.find(findTheSameEmail)) {
      response.status(201).send(`The email had been used`)
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
  module.exports = {
    signUp,
    getUsers
  }
