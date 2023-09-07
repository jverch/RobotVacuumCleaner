# RobotVacuumCleaner

This repository has 3 parts that all should be migrated into their own individual repos:


#### robot-vacuum-cleaner-react-app/
Basic react app for querying the Express servers
`cd robot-vacuum-cleaner-react-app`
`npm start`

#### scheduler/ 
Express server for scheduling Robot cleaning jobs
`npm run dev_scheduler`

#### traverser/ 
Express server for setting up and managing a Robot Vacuum Cleaner doing cleaning jobs
`npm run dev_traverser`