require("dotenv").config();
const express = require("express");
const usersRoutes = require("./modules/users/routes");
const roomsRoutes = require("./modules/rooms/routes");
const messagesRoute = require("./modules/messages/routes");


const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());


app.use('/api/users', usersRoutes);
app.use('/api/rooms', roomsRoutes);
app.use('/api/messages', messagesRoute);



app.listen(port, function () {
  console.log(`The server set up at port ${port}`);
});


