import express from 'express';
import route from './routes';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle route for app
route(app);

const startApp = () => {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}/`);
  });
}

startApp();
