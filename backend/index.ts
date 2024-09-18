import express from 'express'
import mongoose from "mongoose";
import ForumThemeRouter from "./routes/ForumThemeRoutes";
import ForumUserRouter from "./routes/ForumUserRoutes";

const app = express();
const port = 8000;

app.use(express.json())
app.use(express.static('public'))
app.use('/post', ForumThemeRouter)
app.use('/users', ForumUserRouter)
const run = async () => {
      try {
          await mongoose.connect('mongodb://127.0.0.1:27017/Forum');
          console.log('Connected to MongoDB');
      }catch (e){
          console.error('Error connecting to MongoDB:', e)
      }
      app.listen(port, () => {
          console.log('We are live on http://localhost:' + port);
      });

      process.on('exit', () => {
          mongoose.disconnect();
      });
}

run()