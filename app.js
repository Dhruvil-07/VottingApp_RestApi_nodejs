const express = require('express');
const app = express();
const cors = require('cors');

//env file
require('dotenv').config();

//database connection import
const db = require('./db');

//router import 
const userRouter = require('./routes/user_route');
const candidateRoute = require('./routes/candidate_route');
const voteRoute = require('./routes/voting_route');

app.use(cors());

//middelware
app.use(express.json());

//router middelware 
app.use('/',async (req,res)=>{
    return res.send('On site');
});
app.use('/user',userRouter);
app.use('/candidate',candidateRoute);
app.use('/vote',voteRoute);


app.listen(process.env.PORT,()=>console.log(`server started on ${process.env.PORT}`));