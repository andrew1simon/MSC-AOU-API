const  { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function GetAllNews(req,res) {
    let allNews = await prisma.news.findMany();
    res.send(allNews)
}

async function GetAllNewsV2(req,res) {
    let allNews = await prisma.news.findMany({ select: {id: true , date: true , currentRevision: {select: {revision: true}}} });
    res.send(allNews)
}

async function GetHomeNews(req,res) {
    try {
        const news = await prisma.news.findMany({ select: {id: true , date: true , currentRevision: {select: {revision: true}}} , take: 4 , orderBy: {date: 'desc'} });
        if (news) {
            res.status(200).json(news);
        } else {
            res.status(404).json({ msg: 'News not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
}

async function GetNewsById(req, res) {
    const { id } = req.params;
    try {
        const news = await prisma.news.findUnique({ where: { id } , select: {id: true , date: true , currentRevision: {select: {revision: true}}} });
        if (news) {
            res.status(200).json(news);
        } else {
            res.status(404).json({ msg: 'News not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
}

module.exports = { 
	GetAllNews , GetNewsById , GetAllNewsV2 , GetHomeNews
}
