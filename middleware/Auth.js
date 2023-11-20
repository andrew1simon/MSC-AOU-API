const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const JWTKey = process.env.JWT_key; 
const prisma = new PrismaClient()

async function CheckAdmin(req,res,next) {
    const token = req.cookies?.token
    if(token) {
        let decoded = jwt.verify(token,JWTKey)
        if(decoded) {
            const DB = await prisma.user.findFirst({where:{id:decoded.userId , role:"ADMIN"}})
            if(DB) {
                next()
            }else{
                res.status(403).json({msg:"action forbidden"})
            }
        }
    }
    else {
        res.status(403).json({msg:"invalid action"})
    }
    
}
async function CheckAuth(req,res,next) {
    const token = req.cookies?.token
    if(token) {
        let decoded = jwt.verify(token,JWTKey)
        if(decoded) {
            const DB = await prisma.user.findFirst({where:{id:decoded.userId , role:"USER"}})
            if(DB) {
                next()
            }else{
                res.status(403).json({msg:"action forbidden"})
            }
        }
    }
    else {
        res.status(403).json({msg:"invalid action"})
    }
    
}
module.exports = {CheckAdmin , CheckAuth}