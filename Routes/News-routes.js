const NewsCont = require('../controllers/news')
const { Router } = require('express'); 
// Initialization 
const router = Router(); 

// Requests (/news/*)
router.get('/', NewsCont.GetAllNews); 
router.post('/new', NewsCont.CreateNewNews); 
router.get('/get/:id', NewsCont.GetNewsById); 

module.exports =  {router};
