import UserModel from './user.model'
import { Request, Response } from 'express';
const bcrypt = require('bcrypt')
const { addOne, findOne, getAll } = new UserModel()
interface Iapi {
  (req: Request, res: Response ): void;
}

const getUsers:Iapi = async (req, res) => {
  const usersList = await getAll()
  res.send(usersList.rows)
}

const login:Iapi = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      res.send('請填入完整資料')
    } else {
      const userData = await findOne({ email })
      if (userData.rows[0]) {
        const verifyUser = await bcrypt.compare(password, userData.rows[0].password)
        if (verifyUser) {
          res.status(201).send('登入成功')
        } else {
          res.status(201).send('密碼輸入錯誤')
        }
      } else {
        res.status(201).send('信箱輸入錯誤')
      }
    }
  } catch (error:any) {
    const loginError = { msg: error.msg, status: 400 }
    throw loginError
  }
}

const signUp:Iapi = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const list = await findOne({ email })

    if (list.rows[0]) {
      res.status(201).send('The email had been used')
    } else {
      const encryptedPassword = await bcrypt.hash(password, 10)
      await addOne({ name, email, encryptedPassword })
      res.status(201).send(`User ${email} signUp successful`)
    }
  } catch (error:any) {
    throw {
      msg:error.msg, status: 400
    }
  }
}

module.exports = {
  signUp,
  login,
  getUsers
}
