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
async function GetNewsById(req, res) {
    const { id } = req.params;
    try {
        const news = await prisma.news.findUnique({ where: { id } });
        if (news) {
            res.send(news).json({ msg: 'News found' });
        } else {
            res.status(404).json({ msg: 'News not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
}

module.exports = { 
	GetAllNews , CreateNewNews, GetNewsById
}
