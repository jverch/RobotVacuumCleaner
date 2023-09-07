import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT_TRAVERSER || 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server (Traverser)');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});