import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './models/db';
import router from './router';


const port = 3000;
const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());
// Error-handling middleware function
app.use((err, req, res,_) => {
  console.error(err.stack); // Log the error stack trace for debugging
  res.status(500).json({ error: 'An internal server error occurred.' });
});

app.use('/api/v1',router)    


app.listen(port, () => {
  connectDB()
  return console.log(`Express is listening at http://localhost:${port}`);
});
