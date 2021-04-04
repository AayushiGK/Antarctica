# Antarctica - register, login, Authenticate & fetch UserData
<!-- Included a readme file to explain folder structure, design, other decisions etc. -->

--- index.js
 |-- Config/config.js
 |      |----- hold configurations like portNo, db Info & jwt token key.
 |
 |-- Schema/schema.js
 |      |----- Hold the db connection and table defination of the database tables.
 |
 |--Utilities/utilities.js
 |      |----- Hold the password hashing & verifing the password user enter to register & login respectively.
 |
 |-- Controller
        |----- controller.js
                    |---- Authorize the requested API before blindly passing it ahead on server. 
        |----- fetchUser.js
                    |---- it would fetch user on the given filters and sort them with the pagination parameter.
        |----- loginUser.js
                    |---- it would login user after verifying the password and Email-Id passed by the user.
        |----- registerUser.js
                    |----  it would register the user while saving the data in the User table and the password stored in the database will be hashed for the secuirty of the user.  





To start the node one need to give the command 'node index.js'. After the project has been downloaded.

As mentioned above the start File is 'index.js' according to the command that i have passed. 
Visiting the index file the node knows the dependency of the other files it needed to aquire. 

In starting it knows the Configurations, Database Schemas, and the Utility file where the password function has been defined. Once all these dependencies has been required we hold all in single variable passing through the files 'arrg'.

Later in the index file i called for the controller.js. 
Controller.js is the base file for the API/URL to be used to pass through. Whenever there is an incoming request then that request will go through the controller express, compression, cors packages has been used to parse on the req also after data would pass on the res too. 

In controller i have further passed the incoming request into the method where it check for the authentication of the req from the user. If the request woulc contain the token then the request from passed to the requested API while if the token seems mismatched or missing then it would send 403 error for the requested API.

Since we have all basic config in the 'arrg' variable i passed it to the further files. 
**app.use("/", require("./registerUser")(arrg));**

And then these file do the specified functioning of registerUser, loginUser or fetchUserData.
