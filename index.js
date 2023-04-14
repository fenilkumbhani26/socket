const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { createTask, getAllTask, editTask, deleteTask } = require("./controller/todo_controller");

const db = require("./config/mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let routes = require("./routes/index");

app.use("/api", routes);


io.on('connection', (socket) => {
    console.log("user connected");
    socket.on("sender", (data) => {
        createTask(data, function (result) {
            io.emit("receive", result);
        });
    });

    socket.on("findData", (data) => {
        getAllTask(data, function (result) {
            io.emit("recevie", result);
        });
    });

    socket.on("editData", (data) => {
        editTask(data, function (result) {
            io.emit("recevie", result);
        });
    });

    socket.on("deleteData", (data) => {
        deleteTask(data, function (result) {
            io.emit("recevie", result);
        });
    });

})

server.listen(PORT, () => {
    console.log("server runnig this port:", PORT);
});