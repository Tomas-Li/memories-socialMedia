import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'; //cross origin requests

//ENV variables
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

//initilization
const app = express();

//settings
app.use(express.json({ extended: true, limit: "30mb" })) //limit for our images
app.use(express.urlencoded({ extended: true, limit: "30mb" })) //limit for our images
app.use(cors());

//Routing
//Is being done before the DB connection as this one will be doing the listening if the connection is succesfull
import postRoutes from './routes/posts.js';

app.use('/post', postRoutes);

//DB connection (ATLAS connection)
mongoose.connect(process.env.CONNECTION_URL)
  .then(() => app.listen(process.env.PORT, () => console.log(`Server running on port: ${process.env.PORT}`)))
  .catch((error) => console.log(error.message));