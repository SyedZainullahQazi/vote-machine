Voting MachineUpdate your Readme file using the following format
# voting-machine
### Description
- A Voting Machine that schedules voting in all halka together.
-Multiple schedules can be added in line assignng halka to users
-and starting elections.
### Technologies used:
//list your dependecies here. e.g;
- React
- Nodejs 
- Bootstrap
### Developer Setup:
Following are the steps to run this React application on your system.
- Prerequisite: Node js
Once done, then
- Clone the respected git repository
```sh
$ git clone https://github.com/SyedZainullahQazi/vote-machine.git
```
- Install all dependencies
```sh
$ npm install
```
- Good to go. Now run your application
```sh
$ npm starts
###Server Env Example:
PORT=5000
dbConnectionString="mongodb://127.0.0.1:27017/voteapp-database"
CORS_ORIGIN="http://localhost:3000"
JWT_SECRET="sajjadbhai"
#Client Env Example:
REACT_APP_HOST="http://127.0.0.1:5000"
RESETPASS_NEWPASS="/api/auth/reset-password/new-password"
RESETPASS="/api/auth/reset-password/"
JWT_SECRET="sajjadbhai"
