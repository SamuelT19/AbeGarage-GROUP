First clone the repository by runing this command in empty folder ( git clone https://github.com/SamuelT19/AbeGarage-GROUP.git )

open terminal in both backend and frontend then run in both this command ( npm install . )

create new database and useraccount
useraccount : abegarage-group
database name : abegarage-group
database password: abegarage-group

adjust your port based on your database in ( db.config.js @ line 5 )

run ( nodemon app.js) in your backend terminal ! if u already install nodemon globally ! otherwise ( node app.js)

run ( http://localhost:8787/install ) in your browser searchbar and check if the tables created in your abegarageGroup database

To create employee send POST request ( http://localhost:8787/api/employee) in postman or thunder client

     // body data

{ "employee_email": "test@test.com",
"employee_password": "12345678",
"active_employee": "1",
"employee_first_name": "test",
"employee_last_name": "test",
"employee_phone": "123456789",
"company_role_id": "3" }

run ( npm start ) in your frontend terminal

use this to login
username: test@test.com
password: 12345678

DONE!!!

NB: Before pushing your code to the repository create and change your branch by running these commands one by one

on the remote repo:
first create a branch with name of your task <your-branch>
on your local repo:
git pull
git checkout -b <your-branch>
git pull origin <your-branch>
git push -u origin <your-branch>


