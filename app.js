// 3rd Party Modules 
const express = require('express'); 
require('dotenv/config'); 
const cookie = require("cookie-parser")
const cors = require("cors");
// Local Modules 
const {router:NewsRouter} = require('./Routes/News-routes.js'); 
const {router:AuthRouter} = require('./Routes/Auth-routes.js'); 
const {router:AdminRouter} = require('./Routes/Admin-routes.js'); 
const {router:EventsRouter} = require('./Routes/Events-routes.js'); 

const {CheckAdmin} = require("./middleware/Auth.js")
const {CheckAuth} = require("./middleware/Auth.js");

// Server Initialization 
const app = express(); 
const PORT = process.env.PORT || 3000; 

//CORS
const corsOptions ={
	origin:['http://localhost:5173'],  
	credentials:true,     //access-control-allow-credentials:true
	allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Methods", "Access-Control-Request-Headers"],
	enablePreflight: true,
	optionSuccessStatus:200,
 }
 

// Middlewares 
app.use(express.json()); 
app.use(cookie())
app.use(cors(corsOptions))


// Routes will be written here 
app.use('/news', NewsRouter); 
app.use('/admin' , CheckAdmin , AdminRouter)
app.use('/events', EventsRouter); 
app.use('/auth', AuthRouter); 


app.get('/getcookie', function (req, res) {
    res.send(req.cookies);
})
// Server Listen Along with Database 
// connection(in case of data persistence) 
app.listen(PORT, (error) =>{ 
	if(!error) 
		console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
	else
		console.log("Error occurred, server can't start", error); 
	} 
);
