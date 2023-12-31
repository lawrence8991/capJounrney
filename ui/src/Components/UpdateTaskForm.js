import {Dialog, DialogTitle, TextField, Button } from '@mui/material';
import CheckIcon from "@mui/icons-material/Check";
import { useState, React } from 'react';
import axios from 'axios';


export const UpdateTaskForm = ({ fetchTasks, isDialogOpen, setIsDialogOpen, task }) => {
const {id, completed} = task; 
const [taskName, setTaskName] = useState(""); 


const handleUpdateTask = async () => {
    try {
        await axios.put(API_URL, {id, name: taskName, completed});

    await fetchTasks();
    setTaskName("");
     } catch (error) {
      console.log("error updating task:", {error});
  }
    setIsDialogOpen(false);

  return( 
  <Dialog open={isDialogOpen}>
    <DialogTitle>Edit Task</DialogTitle>
    <div className="dialog">
        <TextField 
        size='small' 
        label='task' 
        variant='outlined'
        onChange={(e) => setTaskName(e.target.value)}
        />
        <Button 
        variant="contained" 
        onClick={ async () => {
          handleUpdateTask();
            setIsDialogOpen(false);
            }}>
           <CheckIcon></CheckIcon>     
        </Button>
        </div>
  </Dialog> 
  );
}};
