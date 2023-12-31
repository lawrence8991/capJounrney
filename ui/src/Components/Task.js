import { Button, Checkbox, Typography } from "@mui/material";
import { UpdateTaskForm } from "./UpdateTaskForm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import classnames from "classnames";
import axios from "axios";

export const Task = ({ task, fetchTasks }) => {
  const { id, name, completed } = task;
  const [isComplete, setIsComplete] = useState(completed);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUpdateTaskCompletion = async () => {
    try {
      await axios.put(API_URL, {id, name, completed: !isComplete});
      
    } catch (error) {
      console.log("error updating task:", { error });
    }
  
    setIsComplete((prev) => !prev);
    console.log('testing the handle update task completion')
  };

  const handleDeleteTask = async () => {
    try {
      await axios.delete(`${API_URL}/${task.id}`);

      await fetchTasks();
    } catch (error) {
      console.log("error deleting task:", { error });
    }
  };
  return (
    <div>
      <div className={classnames("flex", { done: isComplete, })}>
        <Checkbox checked={isComplete} onChange={handleUpdateTaskCompletion} />
        <Typography varient="h4">{name}</Typography>
      </div>
      <div className="taskButtons">
        <Button varient="contained" onClick={() => setIsDialogOpen(true)}>
          <EditIcon />
        </Button>
        <Button
          color="error"
          varient="contained"
          onClick={() => handleDeleteTask(true)}
        >
          <DeleteIcon />
        </Button>
      </div>
      <UpdateTaskForm
        fetchTasks={fetchTasks}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        task={task}
      ></UpdateTaskForm>
    </div>
  );
};
