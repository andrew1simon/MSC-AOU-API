const  { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function GetAllNews(req,res) {
    let allNews = await prisma.news.findMany();
    res.send(allNews)
}
async function CreateNewNews(req,res) {
    await prisma.news.create({data: {title:"testing" , body:"testing 123"}})
    res.send("Done")
}

module.exports = { 
	GetAllNews , CreateNewNews
}
