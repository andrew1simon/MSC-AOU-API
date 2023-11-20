const  { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function adminApi(req,res) {
    res.send("admin api")
}

module.exports = { 
	adminApi
}

