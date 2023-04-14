const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
    task_name: {
        type: String
    }, is_active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("TaskList", toDoSchema);