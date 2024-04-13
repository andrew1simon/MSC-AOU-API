const EventCont = require('../controllers/event')
const { Router } = require('express'); 
// Initialization 
const router = Router(); 

// Requests (/events/*)
router.get('/', EventCont.GetAllEvents); 
router.get('/:id', EventCont.GetEventById); 

module.exports =  {router};
