# Hook service 

_ This service is used to serve and store data into MongoDB dynamically. No need to set up each controller for each route for each action you wanna take in the DB_

## TO DO
- Because of dynamic limitations of the *mongoose* package, I will have to set up a custom wrapper for MongoDB connection and queries when a hook is triggered. How ever mongoose will be still used for simple CRUD operations with connectors and wehooks definitions
- Implementation of authentication is still pending. This service will use the auth microservice 
- Better information in the console. Add more information and colors in the console
- Better error handling
- Finish connectors CRUD
