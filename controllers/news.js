const  { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function GetAllNews(req,res) {
    let allNews = await prisma.news.findMany();
    res.send(allNews)
}
async function CreateNewNews(req,res) {
    let {title,content} = req.body
    await prisma.news.create({data: {title , content}})
    res.send("Done")
}
module.exports = { 
	GetAllNews , CreateNewNews
}

