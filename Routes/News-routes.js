const { Router } = require('express'); 
const NewsCont = require('../controllers/news')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
// Initialization 
const router = Router(); 

// Requests (/news/*)
router.get('/', NewsCont.GetAllNewsV2); 
router.get('/home', NewsCont.GetHomeNews);
//
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));
router.get('/:id', NewsCont.GetNewsById); 
//



module.exports =  {router};
