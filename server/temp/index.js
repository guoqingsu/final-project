const express = require("express");
const morgan = require("morgan");

const {
  getUsers,
  addUser,
  getUserByLogin,
} = require("./handlers");

// cd server 
// yarn init
// yarn add  node nodemon express mongodb morgan
// yarn start
const app = express();

app
    // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
    .use(morgan("tiny"))
    .use(express.json())

    // Any requests for static files will go into the public folder
    .use(express.static("public"))


    // .get("/", (req, res) => {
    //   res.send("Hello World AAAAAAA");
    // });

    .get("/api/get-users", getUsers)

    .post("/api/add-user", addUser)

    .post("/api/login", getUserByLogin); // get data input at frontend Signin.js: fetch("/api/signin", {


   

app.listen(8000,  () => console.log(`Listening on port 8000`));
