// import RobotVacuumCleaner from "../traverser/robotVacuumCleanerTraverser";

type RobotVacuumCleanerOutput = {
  actualPath: number[];
  roomsCleaned: number;
  batchesProcessed: number;
  roomsPassedWithoutCleaning: number;
  finalRoom: number;
}

function robotVacuumCleanerScheduler(cleaningBatches: number[][], priorityRooms: number[]) {

}


let input1 = {
  cleaningBatches: [
    [3,2,4],[2,8,4],[4,6,4,9]
  ],
  priorityRooms: [2,4,6,8]
}

console.log(robotVacuumCleanerScheduler(input1.cleaningBatches, input1.priorityRooms));