import ErrorHandler from "../middlewares/errorHandler.js";
import { Todo } from "../model/todoModel.js";

export const addTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const task = await Todo.create({ title, description, user: req.user._id });

    res.status(201).json({
      success: true,
      message: "task added successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllList = async (req, res, next) => {
  try {
    const tasks = await Todo.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      message: `${req.user.name} total task`,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { _id } = req.params;

    let task = await Todo.findById(_id);

    if (!task) return next(new ErrorHandler("Task not found"));

    task.isCompleted = !task.isCompleted;

    task = await task.save();
    res.status(200).json({
      success: true,
      message: "task updated successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const removeTask = async (req, res, next) => {
  try {
    const { _id } = req.params;
    let task = await Todo.findById(_id);
    if (!task) return next(new ErrorHandler("Task not found"));
    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "task removed successfully",
    });
  } catch (error) {
    next(error);
  }
};
