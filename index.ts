import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './src/models/db';
import router from './src/router';


const port = process.env.PORT || 3000;
const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>{
  res.json({message:"Api running"})
})
app.use('/api/v1',router)    

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Failed to connect to database:', err);
  process.exit(1);
});
