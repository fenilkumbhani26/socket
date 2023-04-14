const TODO = require("../models/todo_model");

const createTask = async (data, callback) => {
    try {
        let newTask = new TODO({ task_name: data.task_name });
        let taskData = newTask.save();
        callback({ message: "new task added", task: newTask });
    } catch (error) {
        callback({ message: "something went wrong" });
    }
}

const getAllTask = async (data, callback) => {
    try {
        const list = await TODO.find();
        callback(list);
    } catch (error) {
        callback({ message: "something went wrong" });
    }
}

const editTask = async (data, callback) => {
    const taskId = data.taskId;
    try {
        const exitTask = await TODO.findOne({ _id: taskId });
        if (!exitTask) {
            callback({ message: "task not found" });
        }
        const editTask = await TODO.findByIdAndUpdate(taskId, {
            task_name: data.task_name
        }, { new: true });
        callback(editTask);
    } catch (error) {
        callback({ message: "something went wrong" });
    }
}

const deleteTask = async (data, callback) => {
    const taskId = data.taskId;
    try {
        const exitTask = await TODO.findOne({ _id: taskId });
        if (!exitTask) {
            callback({ message: "task not found" });
        }
        const deleteTask = await TODO.findByIdAndDelete(taskId);

        callback({ message: "record delete" });
    } catch (error) {
        callback({ message: "something went wrong" });
    }
}

module.exports = { createTask, getAllTask, editTask, deleteTask } 