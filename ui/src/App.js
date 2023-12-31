import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AddTaskForm } from './Components/AddTaskForm';
import { Task } from './Components/Task';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { API_URL } from './utils';  

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const fetchTasks = async () => {
  try {
  const { data } = await axios.get(API_URL);
  setTasks(data);}
  catch (error) {
    console.log('error fetching tasks:', {error});
  }};


useEffect(() => {
  fetchTasks();
}, []);

// export default function App() {
//   const [tasks, setTasks] = useState([]);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AddTaskForm fetchTasks={fetchTasks}/>
      {tasks.map((task) => (
        <Task key={task.id} task={task} fetchTasks={fetchTasks} />
      ))}
      <Task task={task}/>
    </ThemeProvider>
  );

