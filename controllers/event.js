const  { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function GetAllEvents(req,res) {
    let allEvents = await prisma.events.findMany();
    res.send(allEvents)
}


async function GetEventById(req, res) {
    const { id } = req.params;
    try {
        const events = await prisma.events.findUnique({ where: { id } });
        if (events) {
            res.status(200).json(events);
        } else {
            res.status(404).json({ msg: 'Event not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
}

module.exports = {
	GetAllEvents , GetEventById
}
