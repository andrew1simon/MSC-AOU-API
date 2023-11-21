const NewsCont = require('../controllers/news')
const { Router } = require('express'); 
// Initialization 
const router = Router(); 

// Requests (/news/*)
router.get('/', NewsCont.GetAllNews); 
router.post('/new', NewsCont.CreateNewNews); 

module.exports =  {router};
