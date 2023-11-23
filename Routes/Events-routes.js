const EventCont = require('../controllers/event')
const { Router } = require('express'); 
// Initialization 
const router = Router(); 

// Requests (/news/*)
router.get('/', EventCont.GetAllEvents); 
router.post('/event', EventCont.CreateNewEvents); 
router.get('/get/:id', EventCont.GetEventById); 

module.exports =  {router};
