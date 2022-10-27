const bcrypt = require('bcrypt')
import UserModel from "./user.model";
const {addOne, findOne, getAll} = new UserModel()

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
      throw {
        msg:error.msg, status: 400
      }
    }
  }
  module.exports = {
    signUp,
    getUsers
  }
