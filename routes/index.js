const routes = require("express").Router();
const { createTask, getAllTask, editTask, deleteTask } = require("../controller/todo_controller");

routes.post("/", createTask);
routes.get("/getAllTask", getAllTask);
routes.patch("/editTask", editTask);
routes.delete("/deleteTask", deleteTask);

module.exports = routes;