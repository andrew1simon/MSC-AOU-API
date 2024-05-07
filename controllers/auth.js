const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWTKey = process.env.JWT_key; 

const prisma = new PrismaClient()


function CreateAcc(req,res) {
    const {name,userName,password,team} = req.body;
    bcrypt.hash(password, 10, async function(err, hash) {
        if(!err) {
            const DB = await prisma.user.create({data:{name,userName,password:hash,team}})
            res.status(200).json(DB)
        }else {
            res.status(500).json({ msg: 'Server Error' });
        }
    });

}
async function Login(req,res) {
    const {userName , password} = req.body
    const checkUser = await prisma.user.findFirst({where:{userName}})
    if(checkUser) {
        bcrypt.compare(password,checkUser['password'] , function(err,result) {
            if(!err) {
                if(result) {
                    console.log(result)
                    console.log(process.env.JWT_Key)
                    let token = jwt.sign({ userId:checkUser.id }, process.env.JWT_Key ,{expiresIn:"1h"} )
                    res.cookie("token" , token , {expires: new Date(Date.now() + 3420000), httpOnly: true , secure:true , sameSite: 'none'}).status(200).json({checkUser , token})
                }else {
                    res.status(401).json({ msg: 'Invalid User' });
                }
            }else {
                res.status(500).json({ msg: 'Server Error' });
            }
        })
    }else {
        res.status(401).json({ message: 'Invalid User' });
    }
}

module.exports = { 
	CreateAcc , Login
}

