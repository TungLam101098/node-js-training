import express from 'express';
import route from './routes';
import connectToMongo from './config/db/mongodb';
import errorMiddleware from './middlewares/error';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle route for app
route(app);

app.use(errorMiddleware);

const startApp = async () => {
  try {
    await connectToMongo();

    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
}



startApp();
