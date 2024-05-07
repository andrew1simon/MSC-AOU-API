const  { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function GetAllEvents(req,res) {
    let allEvents = await prisma.events.findMany({ select: {id: true , date: true , currentRevision: {select: {revision: true}}} });
    res.send(allEvents)
}

async function GetHomeEvents(req,res) {
    try {
        const events = await prisma.events.findMany({ select: {id: true , date: true , currentRevision: {select: {revision: true}}} , take: 4 , orderBy: {date: 'desc'} });
        if (events) {
            res.status(200).json(events);
        } else {
            res.status(404).json({ msg: 'News not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
}

async function GetEventById(req, res) {
    const { id } = req.params;
    try {
        const events = await prisma.events.findUnique({ where: { id } , select: {id: true , date: true , currentRevision: {select: {revision: true}}} });
        if (events) {
            res.status(200).json(events);
        } else {
            res.status(404).json({ msg: 'News not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
}

module.exports = {
	GetAllEvents , GetEventById, GetHomeEvents
}
