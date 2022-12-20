import { model, Schema } from "mongoose";
import { TODO_STATUS } from "../constants/index";

const todoItemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: Object.values(TODO_STATUS),
    default: TODO_STATUS.PENDING,
  },
});

export const Todo = model("todo", todoItemSchema);
