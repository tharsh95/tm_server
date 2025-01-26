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

app.use('/api/v1',router)    


app.listen(port, () => {
  connectDB()
  return console.log(`Express is listening at http://localhost:${port}`);
});
