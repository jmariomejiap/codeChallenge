# CHALLENGE DATA

A *challenge* is fully defined by a set of files and folder 
structure contained in a single folder.

Each *challenge* is conformed by one or more *steps* (or problems).
Each *step* is contained in its own folder.


## Challenge definition

1) A json file, with information about the challange. File: `challenge.json`
2) One of more subfolder of *steps*.


## Step definition

1) A description file, in markdown format, with instruction on how 
to solve the *step*. File: `description`  
2) A json file, with information about tests for the *step*. This 
information should be displayed to the user in the front end 
application as hints and will also be used to test the users 
response dinamically. File: `info.json`   
3) An unmuttable file that has the initial code that is presented
to the user with the funcion definition (parameters and returns) and 
represents the starting point to solve the *step*. File: `code`   
