import mongoose from "mongoose";

const TodoListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    tasks: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],
        default: [],
    },
    authorTodoList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    created_at: {
        type: Date,
        default: Date.now(),
    }
})

const TodoList = mongoose.model('TodoList', TodoListSchema);

export {TodoList};
