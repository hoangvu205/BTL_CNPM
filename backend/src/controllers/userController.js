const conn = require('../config/dbConnect');
const jwt = require('jsonwebtoken');
const login = async (req,res)=>{
    const {email,password} = req.body;
    let [user] = await conn.query(`select * from users where email=?`,[email]);
    user=user[0];
    if(!user){
        res.json({check:false});
    }
    else{
        if(user.password==password){
            const token = jwt.sign({
                username:user.name,
                email:user.email,
                role:user.role
            },"hoang");
            res.json({
                token,check:true
            })
        }
        else{
            res.json({check:false,message:"sai mk"})
        }
    }
}
const register = async (req,res)=>{
    const {username,email,password} = req.body;
    try {
        await conn.query(`insert into users(name,password,email)
                    values(?,?,?)`,
                [username,password,email]);
        res.json({check:true})
    } catch (er) {
        res.json({check:false,error:er})    
    }
}
module.exports = {
    login,
    register
}