import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT_SCHEDULER || 3001;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server (Scheduler)');
});

app.post('/api/schedule', jsonParser, (req: Request, res: Response) => {
  console.log("received request: ", req.body);

  // Modify input before sending along to traverser
  // Make set of all priority rooms
  let priorityRooms = new Set<number>();
  for (let i = 0; i < req.body.priorityRooms.length; i++) {
    priorityRooms.add(req.body.priorityRooms[i]);
  }

  // Make array of rooms and and priority rooms in each batch, separating
  // them into two arrays with no overlap
  let batches = [];
  for (let i = 0; i < req.body.batches.length; i++) {
    let currentBatch = req.body.batches[i];
    let batchRooms = [];
    let batchPriorityRooms = [];
    for (let j = 0; j < currentBatch.length; j++) {
      if (priorityRooms.has(currentBatch[j])) {
        batchPriorityRooms.push(currentBatch[j]);
      } else {
        batchRooms.push(currentBatch[j]);
      }
    }
    batchRooms.sort((a, b) => a - b);
    batchPriorityRooms.sort((a, b) => a - b);
    batches.push({
      batchRooms: batchRooms,
      batchPriorityRooms: batchPriorityRooms
    });
  }

  // Send batches to scheduler
  fetch("http://localhost:3002/api/traverse", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(batches),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));


  res.send({data: "Scheduler processed request"});
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});