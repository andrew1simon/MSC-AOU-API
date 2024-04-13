const AdminCon = require('../controllers/admin')

const { Router } = require('express'); 
// Initialization 
const router = Router(); 

// Requests (/admin/*)
router.get('/', AdminCon.adminApi); 
//Events
router.post('/events/new', AdminCon.CreateNewEvents);
//News 
router.post('/news/new', AdminCon.CreateNewEventsV2); 
router.post('/news/update', AdminCon.UpdateNews);
router.get('/news/:id', AdminCon.GetNewsByIdV2); 
router.get('/news/Delete/:id', AdminCon.DeleteNews); 
//Profile
router.get('/profile' , AdminCon.AdminProfile)

module.exports =  {router};
