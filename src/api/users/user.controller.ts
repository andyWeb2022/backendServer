const bcrypt = require('bcrypt')
import userModel from "./user.model";
const {addOne, findOne, getAll} = new userModel

  const getUsers = async(req:any, res:any) => {
    const usersList = await getAll();
    res.send(usersList.rows)
  }

  const signUp = async(req:any, res:any) => {
    try {
    const { name, email, password } = req.body
    const list = await findOne({email})
    
    if (list.rows[0]) {
      res.status(201).send(`The email had been used`)
    } else {
      const encryptedPassword =await bcrypt.hash(password, 10);
      await addOne({name, email, encryptedPassword})
      res.status(201).send(`User ${email} signUp successful`)
    }
    
    } catch (error:any) {
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
