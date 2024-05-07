const  { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function adminApi(req,res) {
    res.send("admin api")
}

async function AdminProfile(req,res) {
    const { user } = req;
    res.status(200).json(user);

}


module.exports = { 
	adminApi , 
    AdminProfile
}

