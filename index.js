const express = require("express");
const urlRoute = require('./routes/url');
const {connectToMongoDB} = require('./connect')



const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(()=> console.log('mongodb connected'));

//midlleware for handling body error
app.use(express.json());

app.use("/url" , urlRoute); //creating shortid & finding no. of clicks

//getting short id ( we can refracter it)
app.use('/' , urlRoute);

app.listen(PORT , ()=> console.log(`app started at port ${PORT}`));



