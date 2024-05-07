const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function CreateNewEventV2(req, res) {
    let { title, content, hasImg, subTitle , img , eventtime} = req.body;

    async function createEventWithRevision(revisionData, user) {
        // Start a transaction
        const result = await prisma.$transaction(async (prisma) => {
          // Create an Event item
          const event = await prisma.events.create({
            data: {},
          })
      
          // Create an EventRevisions item with the eventId set to the id of the Event
          const eventRevision = await prisma.eventRevisions.create({
            data: {
              eventId: event.id,
              CreatedBy: user.id, // Use the user from the middleware
              ...revisionData,
            },
          })
      
          // Create a CurrentRevision item with the eventId set to the id of the Event
          // and the revisionId set to the id of the EventRevisions
          const currentRevision = await prisma.currentRevisionEvents.create({
            data: {
              eventId: event.id,
              revisionId: eventRevision.id,
            },
          })
      
          return { event, eventRevision, currentRevision }
        })
      
        return result
      }
      
      createEventWithRevision({
        status: 'Published',
        title: title,
        content: content,
        eventtime: eventtime
      }, req.user) // Pass the user from the middleware as an argument
        .then((result) => {
          res.status(201).json({ msg: 'Event Created', result })
        })
        .catch((e) => {
          throw e
        })
}

// Get All Events
async function GetAllEvents(req,res) {
    try {
        let allEvents = await prisma.events.findMany({ select: {id: true , date: true , currentRevision: {select: {revision: true}}} });
        res.status(200).json(allEvents)
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
}

// Get Event By Id
async function GetEventByIdV2(req, res) {
    const { id } = req.params;
    try {
        const event = await prisma.events.findUnique({ where: { id } , select: {id: true , date: true , currentRevision: {select: {revision: true}}} });
        if (news) {
            res.status(200).json(event);
        } else {
            res.status(404).json({ msg: 'Event not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
}

// Update Event
async function updateEvent(req, res) {
    const { id } = req.params;
    const { title, content, hasImg, subTitle, img, eventtime } = req.body;
    try {
      const event = await prisma.events.update({
        where: { id },
        data: { title, content, hasImg, subTitle, img, eventtime },
      });
      res.status(200).json({ msg: 'Event Updated', event });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server Error' });
    }
  }


// Delete Event
async function deleteEvent(req, res) {
    const { id } = req.params;
    try {
      await prisma.currentRevision.delete({ where: { eventId: id } });
      await prisma.eventRevisions.deleteMany({ where: { eventId: id } });
      await prisma.events.delete({ where: { id } });
      res.status(200).json({ msg: 'Event Deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server Error' });
    }
  }


module.exports = {
    CreateNewEventV2,
    GetAllEvents,
    GetEventByIdV2,
    updateEvent,
    deleteEvent
}
