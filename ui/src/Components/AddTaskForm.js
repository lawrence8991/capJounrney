import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const AddTaskForm = ({ fetchTasks }) => {
  const [newTask, setNewTask] = useState("");

  const addNewTask = async () => {
    try {
      await axios.post(API_URL, { 
        name: newTask, 
        completed: false
      });

      await fetchTasks();
      setNewTask("");
      } catch (error) {
      console.log("error creating task:", { error });
    }
  };

  return (
    <div>
      <Typography align="center" varient="h2" paddingTop={2}>
        My Task list
      </Typography>

      <div className = "addTaskForm">

      <TextField
        size="small"
        label="Task"
        variant="outlined"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
      />

      <Button
        disabled={!newTask.length}
        varient="outlined"
        onClick={addNewTask}
      >
        <AddIcon />
      </Button>
    </div>
    </div>
  );
};
