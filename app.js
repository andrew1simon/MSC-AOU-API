// 3rd Party Modules 
const express = require('express'); 
require('dotenv/config'); 
const cookie = require("cookie-parser")
// Local Modules 
const {router:NewsRouter} = require('./Routes/News-routes.js'); 
const {router:AuthRouter} = require('./Routes/Auth-routes.js'); 
const {router:AdminRouter} = require('./Routes/Admin-routes.js'); 

const {CheckAdmin} = require("./middleware/Auth.js")
const {CheckAuth} = require("./middleware/Auth.js");

// Server Initialization 
const app = express(); 
const PORT = process.env.PORT; 

// Middlewares 
app.use(express.json()); 
app.use(cookie())

// Routes will be written here 
app.use('/news', NewsRouter); 
app.use('/admin' , CheckAdmin , AdminRouter)
app.use('/auth', AuthRouter); 

// Server Listen Along with Database 
// connection(in case of data persistence) 
app.listen(PORT, (error) =>{ 
	if(!error) 
		console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
	else
		console.log("Error occurred, server can't start", error); 
	} 
);
