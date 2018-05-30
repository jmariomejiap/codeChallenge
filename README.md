# Code Challenge

Code Challenge is a platform for testing small code problems and evaluate their solutions
in real-time. It supports basic authentication and cookies.

It is an Isomorphic application built using React, React-Bootstrap, Node.js, Express and MongoDB.


## Demo

![codechallenge](https://user-images.githubusercontent.com/22829270/39161998-327fedb6-4728-11e8-9ef7-5258024605db.gif)




## Getting Started

##### Installation

note: make sure mongoDB is installed and running.


First
```
$ git clone https://github.com/jmariomejiap/codeChallenge.git
```

install dependencies.
```
$ npm install 
```
or 
```
$ yarn install
```

If you want to run Code Challenge locally.

```
$ npm start
```

and go to *http://localhost:8000/*




## Challenge Data

###### Example
data structure for challenges.

* challenges_data
  - math
    - 001
      - code
      - description
      - info.json


New challenges can be added to the **challenge_data** folder. 
Each challenge (ex. _math_) can have multiple exercises.
Each exercise must have 3 files.
* **code**. will describe part of the solution for a given exercise.
* **description**. well, will describe what must be done.
* **info.json**. This is where we have the data that will be injected into the user's answer as well as the expected result. use for **Real time** testing.

## Contributing
I welcome contributions! Please open an issue if you have any feature ideas or find any bugs. I also accept pull requests with open arms. I will go over the issues when I have time. :)




