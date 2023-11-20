const AuthCon = require('../controllers/auth')
const { Router } = require('express'); 
// Initialization 
const router = Router(); 

// Requests (/auth/*)
router.post('/login', AuthCon.Login); 
router.post('/reg', AuthCon.CreateAcc); 

module.exports =  {router};
