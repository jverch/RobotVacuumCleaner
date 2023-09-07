type RobotVacuumCleanerOutput = {
  actualPath: number[];
  roomsCleaned: number;
  batchesProcessed: number;
  roomsPassedWithoutCleaning: number;
  finalRoom: number;
}

export class RobotVacuumCleaner {
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
    // Takes in a batch of rooms to clean and a list of rooms to prioritize
    // Finds optimal path, and sends it to processBatch to do the actual cleaning
    this.processBatch(batch);
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
