const  { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function GetAllNews(req,res) {
    let allNews = await prisma.news.findMany();
    res.send(allNews)
}
async function CreateNewNews(req, res) {
    let { title, content, hasImg, subTitle } = req.body;
    try {
        await prisma.news.create({ data: { title, content, hasImg, subTitle} });
        res.status(201).json({ msg: 'News Created' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' })
    }
}
module.exports = { 
	GetAllNews , CreateNewNews
}
