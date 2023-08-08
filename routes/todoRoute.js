import express from "express";
import { addTask, getAllList, removeTask, updateTask } from "../controller/taskController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();


router.post("/add",isAuthenticated,addTask);
router.get('/allList',isAuthenticated,getAllList);
router.route("/:_id").put(isAuthenticated,updateTask).delete(isAuthenticated,removeTask);


export default router;