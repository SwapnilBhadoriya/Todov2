require("dotenv").config();
const cors = require('cors');
const express = require("express");

const app = express();


//Middlewares
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Routers
const userRouter = require('./routes/user');
const authrouter = require('./routes/authenticate');
const adminRouter = require('./routes/admin')

app.use('/',authrouter);
app.use('/user',userRouter);
app.use('/admin',adminRouter);


// Database and Port
const port = process.env.PORT || 3000;
const { connectDB } = require("./config/dbconfig");







const startServer = async function () {
  try {
    await connectDB();
    app.listen(port, (error) => {
      if (!error) {
        console.log("Server running successfully at port :", port);
      }
    });
  } catch (error) {
    console.log('Error in starting server' , error);
  }
};


startServer();