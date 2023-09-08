type RobotVacuumCleanerOutput = {
  actualPath: number[];
  roomsCleaned: number;
  batchesProcessed: number;
  roomsPassedWithoutCleaning: number;
  finalRoom: number;
}

export default class RobotVacuumCleaner {
  actualPath: number[];
  roomsCleaned: Set<number>;
  batchesProcessed: number;
  roomsPassedWithoutCleaning: number;
  currentRoom: number;

  constructor() {
    this.actualPath = [1];
    this.roomsCleaned = new Set<number>();
    this.batchesProcessed = 0;
    this.roomsPassedWithoutCleaning = 0;
    this.currentRoom = 1;
  }

  public ingestBatch(batch: number[], priorityRooms: number[]): void {
    // Takes in a sorted batch of rooms to clean and a sorted list of rooms to prioritize
    // Finds optimal path, and sends it to processBatch to do the actual cleaning
    const currentOptimalPath: number[] = [];

    if (!priorityRooms.length) {
      // If there are no priority rooms, clean the batch in order starting from whichever side is closest
      if (Math.abs(this.currentRoom - batch[0]) < Math.abs(this.currentRoom - batch[batch.length - 1])) {
        for (let i = 0; i < batch.length; i++) {
          currentOptimalPath.push(batch[i]);
        }
      } else {
        for (let i = batch.length - 1; i >= 0; i--) {
          currentOptimalPath.push(batch[i]);
        }
      }
    } else if (!batch.length) {
      // If there are no rooms in the batch, clean the priority in order starting from whichever side is closest
      if (Math.abs(this.currentRoom - priorityRooms[0]) < Math.abs(this.currentRoom - priorityRooms[priorityRooms.length - 1])) {
        for (let i = 0; i < priorityRooms.length; i++) {
          currentOptimalPath.push(priorityRooms[i]);
        }
      } else {
        for (let i = priorityRooms.length - 1; i >= 0; i--) {
          currentOptimalPath.push(priorityRooms[i]);
        }
      }
    } else {
      // We have 4 cases:
        // Priority rooms are done in order:
          // 0. Batch is done in order
          // 1. Batch is done in reverse order
        // Priority rooms are done in reverse order
          // 2. Batch is done in order
          // 3. Batch is done in reverse order
      const startToFirstPriorityDistance = Math.abs(this.currentRoom - priorityRooms[0]);
      const startToLastPriorityDistance = Math.abs(this.currentRoom - priorityRooms[priorityRooms.length - 1]);
      const lastPriorityToFirstBatchDistance = Math.abs(priorityRooms[priorityRooms.length - 1] - batch[0]);
      const lastPriorityToLastBatchDistance = Math.abs(priorityRooms[priorityRooms.length - 1] - batch[batch.length - 1]);
      const firstPriorityToFirstBatchDistance = Math.abs(priorityRooms[0] - batch[0]);
      const firstPriorityToLastBatchDistance = Math.abs(priorityRooms[0] - batch[batch.length - 1]);

      const cases = [
        startToFirstPriorityDistance + lastPriorityToFirstBatchDistance,
        startToFirstPriorityDistance + lastPriorityToLastBatchDistance,
        startToLastPriorityDistance + firstPriorityToFirstBatchDistance,
        startToLastPriorityDistance + firstPriorityToLastBatchDistance,
      ]
      let minimum = cases[0];
      let minimumIndex = 0;
      for (let i = 1; i < cases.length; i++) {
        if (cases[i] < minimum) {
          minimum = cases[i];
          minimumIndex = i;
        }
      }

      switch (minimumIndex) {
        case 0: {
          for (let i = 0; i < priorityRooms.length; i++) {
            currentOptimalPath.push(priorityRooms[i]);
          }
          for (let i = 0; i < batch.length; i++) {
            currentOptimalPath.push(batch[i]);
          }
          break;
        }
        case 1: {
          for (let i = 0; i < priorityRooms.length; i++) {
            currentOptimalPath.push(priorityRooms[i]);
          }
          for (let i = batch.length - 1; i >= 0; i--) {
            currentOptimalPath.push(batch[i]);
          }
          break;
        }
        case 2: {
          for (let i = priorityRooms.length - 1; i >= 0; i--) {
            currentOptimalPath.push(priorityRooms[i]);
          }
          for (let i = 0; i < batch.length; i++) {
            currentOptimalPath.push(batch[i]);
          }
          break;
        }
        case 3: {
          for (let i = priorityRooms.length - 1; i >= 0; i--) {
            currentOptimalPath.push(priorityRooms[i]);
          }
          for (let i = batch.length - 1; i >= 0; i--) {
            currentOptimalPath.push(batch[i]);
          }
          break;
        }
      }
    }
    console.log('Current Optimal Path: ', currentOptimalPath);
  
    this.processBatch(currentOptimalPath);
  }

  private processBatch(batch: number[]): void {
    // Takes in a batch of rooms to clean
      for (let j = 0; j < batch.length; j++) {
        // Travelling to the room
        let path = this.travel(this.currentRoom, batch[j]);
        this.actualPath = this.actualPath.concat(path);
        this.currentRoom = batch[j];
        this.roomsPassedWithoutCleaning += path.length - 1;
        // Cleaning the room
        if (!this.roomsCleaned.has(this.currentRoom)) {
          this.roomsCleaned.add(this.currentRoom);
        }
      }
      this.batchesProcessed++;
  }


  private travel(from: number, to: number): number[] {
    // Generates the path from one room to another (Excludes starting room)
    let path: number[] = [];
    while (from !== to) {
      if (from < to) {
        from++;
      } else {
        from--;
      }
      path.push(from);
    }
    return path;
  }

  public getStats(): RobotVacuumCleanerOutput {
    // Returns the stats of the robot vacuum cleaner
    let output: RobotVacuumCleanerOutput = {
      actualPath: this.actualPath,
      roomsCleaned: this.roomsCleaned.size,
      batchesProcessed: this.batchesProcessed,
      roomsPassedWithoutCleaning: this.roomsPassedWithoutCleaning,
      finalRoom: this.currentRoom,
    }
    return output;
  }
}
