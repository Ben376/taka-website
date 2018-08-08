# bdx-0218-js-taka
Projet 3 - Taka


## Introduction

This site was created for IVALDI-BRUNEL Baptiste who is the owner of Taka. It was made for data-visualization.


## Used

- Javascript ES6
- React / Redux
- Node.js
- MongoDB
- Mysql
- Material UI


## Supported browser

This site is optimized for Google Chrome.


## Contributors

This site was created by [Valentin BOUZIN](https://github.com/ValentinBz), [Coralie BROTEILLE](https://github.com/coraliebrtl), [Estelle DOREAU](https://github.com/EstelleDoreau), [Loïc FRANÇOIS](https://github.com/Preums), [Jérémy ROULON](https://github.com/olwe1), [Simon RULQUIN](https://github.com/SimonR07) and [Benjamin SEURIN](https://github.com/Ben376), students at the Wild Code School Bordeaux.


## Quick start

1. Clone the repo: 
```
git clone https://github.com/WildCodeSchool/bdx-0218-js-taka.git
```

2. Install SQL & Mongo databases (/backup)
Mongo_databases.js is a data creator file for demo, like the dump directory

   1. If you need to insert demo data you can run the mongo_databases.js in a mongo terminal or open a terminal in the backup directory and run

      ```
      cd backup/
      mongorestore
      ```
     
   2. To create Mysql database : 
      ```
      cd backup/
      mysql -u root -p < Init_taka_db.sql
      ```
   
   3. in /back/helpers/db.js, write your own HOST_NAME, PORT, USER, PASSWORD
   

3. in /back/helpers/sql.js, write your own HOST_NAME, PORT, DB_NAME, USER, PASSWORD

4. ```npm install``` in folders /back & /front
``` 
cd /back 
npm install
cd /front
npm install 
```

5. ```npm start``` first in the folder /back & then in the folder /front
```
cd /back
npm start
cd /front
npm start
```

## Folder Structure
After creation, your project should look like this:
```
bdx-0218-js-taka
└── back/
     ├── bin/
     ├── helpers/
     ├── node_modules/
     ├── routes/
     ├── app.js
     └── package.json
└── backup/
     ├── dump/
     ├── mongo_databse.sql
     └── mysql_database.sql
└── front/
     ├── node_modules/
     ├── public/
     ├── src/
          ├── actions/
          ├── components/
          ├── containers/
          ├── images/
          ├── reducers/
          ├── scss/
          └── index.js
     └── package.json
└── README.md
└── .gitignore
└── .yo-rc.json



```

## To untrack helpers
Change files you don't want to be tracked and use the following command:

```
git update-index --assume-unchanged back/helpers/db.js
```

```
git update-index --assume-unchanged back/helpers/sql.js
```

*(and if you want to track the changes again use this command :)*

```
git update-index --no-assume-unchanged back/helpers/db.js
```

```
git update-index --no-assume-unchanged back/helpers/sql.js
```


## API different paths

### /api
--------

All paths succeding /api are admin only.

You need to be logged with an admin account to acceed this informations.

The following paths are for get requests.

* /fillingRate
* /fillingRateAtDumping
Return the average level sorted by glass, plastic and metal

* /serial_number
Return an array containing the serial numbers of all trashes

* /serial_number/:id
Return the datas of a specific serial number

* /trashesList
Return the last datas for each serial number

* /yellowWarning
Return the number of trashes with an engine temperatur over 60°C

* /orangeWarning
Return the number of trashes sending a user default

* /redWarning
Return the number of trashes sendin a user default without an automatic default registered

* /trashes/sort/professionals
Return the last informations of all professionnal trashes

* /trashes/sort/privates
Return the last informations of all private trashes

* /trash/:id
Return the last information about a specific serial number

* /trashes/count
Return the number of trashes

* /maintenance
Return all trashes with a default signaled, a switch in a wrong position or an excessive temperature recorded

* /trashesOffline
Return the list of trashes having not sending informations for a month

* /stats/date/:date/:action
Return the trashes data by date give in first parameter for the new connected trashes or the volume tubs trashes give as second parameter (newConnectedTrashes, volumeTubsTrashes)

### /auth
---------

The following paths are for post requests.

* /signup
Add a new customer

* /sinin
Logged a user

### /insertData
---------------

This path is used for the trash auto insert

* /trashData
insert the raw data in Takamodel collection and update/insert the _id in the Takarchive collection in a log array and in the last field.

### /sql
--------

The following path method is indicate for each one like this: /path (method)

* /addAdmin (post)
Insert a new admin

* /userdetails/:id (get)
Return all user details from a trash serial number

* /admins (get)
Return the informations from all admins

* /geo (get)
Return an array of all the zip codes from the users

* /city (get)
Return an array of all the cities from the users

* /city/:town (get)
Return an array of all the serial number from a particular town

* /localisation (get)
Return an array of all the address and zip codes from the users

* /sendMail (post)
Send a mail to the administrator containing the informations of the user's contact form

* /forgetPassword (post)
Send a new random password to a user email address

* /changeAdmin (put)
Update the data from an administrator except password

* /changeAdminPassword (put)
Update the password of an administrator

* /deleteAdmin (delete)
Remove an administrator

### /user
---------

The following path method is indicate for each one like this: /path (method)

* /createTrash (post)
Associate a new trash to a specific owner

* /read/:id (get)
Return user details from a specific id

* /readSN/:id (get)
Return the serial number of trashes associate to a specific user from his id

* /serial_number/:sn (get)
Return the last datas from a trash selected by a specific serial number

* /serialNumberHistory/:sn (get)
Return the history for a specific serial number

* /checkPassword (post)
Return if a password is available for a specific id

* /changePassword (put)
Update the password for a specific id

* /update (put)
update the user details fro a specific user indicate by id

* /deleteTrash (delete)
Remove a trash from a user

* /delete (delete)
Remove a user

## Ngrok
download ngrok
unzip the file
open a terminal in the directory of the ngrok file (modifié)
run
```
./ngrok http 5000
```
use the path give in the terminal to access the root directory of your node server

## List of known issues
1. Sometimes, the Markers on the Google Map need time to be functional and to be on their good places. So, the Marker Clusterer can be wrong.

2. On trashes table (side Admin) we can change number only after taping on "Enter". We can't update this with an "On Change".

3. Component of frequency uses isn't implanted. 

4. There is always some warnings on the terminal and browser.

5. When we write a wrong zip code, all the trashes are displayed in the table.

6. The button to reset all filters on the table trashes is not fuctionnal if sort fields are not empty.

7. When you stay a long time clicking on a row on trashes table, an error occured.
