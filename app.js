// 3rd Party Modules 
const express = require('express'); 
require('dotenv/config'); 

// Local Modules 
const {router:NewsRouter} = require('./Routes/News-routes.js'); 

// Server Initialization 
const app = express(); 
const PORT = process.env.PORT; 

// Middlewares 
app.use(express.json()); 

// Routes will be written here 
app.use('/news', NewsRouter); 

// Server Listen Along with Database 
// connection(in case of data persistence) 
app.listen(PORT, (error) =>{ 
	if(!error) 
		console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
	else
		console.log("Error occurred, server can't start", error); 
	} 
);
