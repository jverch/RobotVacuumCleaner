"use strict";
// No optimization at all
function robotVacuumCleaner(cleaningBatches, priorityRooms) {
    console.log('Robot vacuum cleaner');
    console.log('Cleaning batches: ', cleaningBatches);
    console.log('Priority rooms: ', priorityRooms);
    let actualPath = [1];
    let roomsCleaned = new Set();
    let batchesProcessed = 0;
    let roomsPassedWithoutCleaning = 0;
    let currentRoom = 1;
    for (let i = 0; i < cleaningBatches.length; i++) {
        let batch = cleaningBatches[i];
        for (let j = 0; j < batch.length; j++) {
            // Travelling to the room
            let path = travel(currentRoom, batch[j]);
            actualPath = actualPath.concat(path);
            currentRoom = batch[j];
            roomsPassedWithoutCleaning += path.length - 1;
            // Cleaning the room
            if (!roomsCleaned.has(currentRoom)) {
                roomsCleaned.add(currentRoom);
            }
        }
        batchesProcessed++;
    }
    // Ideas for implementation and optimization:
    // Modify batches directly to put priority rooms first
    let output = {
        actualPath,
        roomsCleaned: roomsCleaned.size,
        batchesProcessed,
        roomsPassedWithoutCleaning,
        finalRoom: currentRoom,
    };
    return output;
}
function travel(from, to) {
    let path = [];
    while (from !== to) {
        if (from < to) {
            from++;
        }
        else {
            from--;
        }
        path.push(from);
    }
    return path;
}
let input1 = {
    cleaningBatches: [
        [3, 2, 4], [2, 8, 4], [4, 6, 4, 9]
    ],
    priorityRooms: [2, 4, 6, 8]
};
console.log(robotVacuumCleaner(input1.cleaningBatches, input1.priorityRooms));
