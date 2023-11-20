const AdminCon = require('../controllers/admin')
const { Router } = require('express'); 
// Initialization 
const router = Router(); 

// Requests (/news/*)
router.get('/', AdminCon.adminApi); 


module.exports =  {router};
