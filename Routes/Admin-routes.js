const AdminCon = require('../controllers/adminConFn/AdminCon')
const EventCon = require('../controllers/adminConFn/AdminEvents')
const NewsCon = require('../controllers/adminConFn/AdminNews')

const { Router } = require('express'); 
// Initialization 
const router = Router(); 

// Requests (/admin/*)
router.get('/', AdminCon.adminApi); 
//Events
router.post('/events/new', EventCon.CreateNewEventV2);
router.post('/events/update', EventCon.updateEvent);
router.get('/events/:id', EventCon.GetEventByIdV2);
router.post('/events/' , EventCon.GetAllEvents)
//News 
router.post('/news/new', NewsCon.CreateNewNewsV2); 
router.post('/news/update', NewsCon.UpdateNews);
router.get('/news/:id', NewsCon.GetNewsByIdV2); 
router.get('/news/Delete/:id', NewsCon.DeleteNews); 
//Profile
router.get('/profile' , AdminCon.AdminProfile)

module.exports =  {router};
