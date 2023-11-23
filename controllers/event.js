const  { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function GetAllEvents(req,res) {
    let allEvents = await prisma.news.findMany();
    res.send(allEvents)
}

async function CreateNewEvents(req, res) {
    let { title, content,eventtime, hasImg, subTitle } = req.body;
    try {
        await prisma.news.create({ data: { title, content,eventtime, hasImg, subTitle} });
        res.status(201).json({ msg: 'Event Created' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' })
    }
}
async function GetEventById(req, res) {
    const { id } = req.params;
    try {
        const news = await prisma.news.findUnique({ where: { id } });
        if (news) {
            res.send(news).json({ msg: 'Event found' });
        } else {
            res.status(404).json({ msg: 'Event not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
}

module.exports = {
	GetAllEvents , CreateNewEvents, GetEventById
}
