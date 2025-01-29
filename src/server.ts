import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Supervisor from './supervisor/Supervisor';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const supervisor = new Supervisor();

app.use(cors()); // Enable CORS
app.use(express.json());

app.post('/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const { query } = req.body;
    if (!query) {
      res.status(400).send({ error: 'Query is required' });
      return;
    }

    const response = await supervisor.handleQuery(query);
    res.json({ response });
  } catch (error) {
    console.error('Error handling query:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
