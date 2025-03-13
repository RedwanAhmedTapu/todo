const mongoose=require("mongoose");

const todoSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true,
        trim: true,
    },
    
    completed: {
        type: Boolean,
        default: false,
    },
    dueDate: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports= Todo;
