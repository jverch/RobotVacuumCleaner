import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import RobotVacuumCleaner from './robotVacuumCleaner';

dotenv.config();

const app: Express = express();
const port = process.env.PORT_TRAVERSER || 3002;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const robotVacuumCleaner = new RobotVacuumCleaner();

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server (Traverser)');
});

app.post('/api/traverse', jsonParser, (req: Request, res: Response) => {
  console.log("received request: ", req.body);

  for (let i = 0; i < req.body.length; i++) {
    robotVacuumCleaner.ingestBatch(req.body[i].batchRooms, req.body[i].batchPriorityRooms);
  }

  res.send({data: "Traverser processed request"});
});

app.get('/api/getData', (req: Request, res: Response) => {
  res.send(robotVacuumCleaner.getStats());
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});