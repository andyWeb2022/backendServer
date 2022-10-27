const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'person',
  password: '589632147',
  port: 5432
})

export default class UserModel {
    addOne(params:any) {
        return pool.query('INSERT INTO person_list (name, email, password) VALUES ($1, $2, $3)', [params.name, params.email, params.encryptedPassword], (error:any, results:any) => {
            if (error) {
              throw error
            }})
    }
    findOne(params:any) {
        return pool.query('SELECT * FROM person_list WHERE email = ($1)', [params.email])
    }
    getAll() {
      return pool.query('SELECT * FROM person_list')
    }
}