const conn = require('../config/dbConnect');

const login = async (req,res)=>{
    const [users] =  await conn.query("select * from users")
    console.log(users)
    res.json(users);
}
const register = async (req,res)=>{

}
module.exports = {
    login
}