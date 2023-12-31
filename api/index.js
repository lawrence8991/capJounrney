
import express from 'express';
import { fetchTasks, createTask, deleteTasks } from './task';
import serverless from 'serverless-http';
import cors from "cors"
const { updateTasks } = require('./task');
const app = express()
const port = 3001;


if (process.env.DEVELOPMENT) {
    app.use(cors());
} 

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/task', async (req, res) => {
    try {
        const tasks = await fetchTasks();
        res.send(tasks.Items);
        
    } catch (error) {
        res.status(400).send('error fetching tasks:', {error});
        
    }
  })

app.post('/task', async (req, res) => {
    try {
        const task = req.body;

        const response = await createTask(task);
        res.send(response);
    } catch (error) {
        res.status(400).send('error creating tasks:', {error});
        
    }
  })

app.put('/task', async (req, res) => {
    try {
        const task = req.body;

        const response = await updateTasks(task);
        res.send(response);
    } catch (error) {
        res.status(400).send('error updating tasks:', {error});
        
    }
  })
  
app.delete('/task/:id', async (req, res) => {
    try {
        const {id} = req.params;

        const response = await deleteTasks(id);
        res.send(response);
    } catch (error) {
        res.status(400).send('error deleting tasks:', {error});
        
    }
  })  

  if (process.env.DEVELOPMENT) {
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
} 
export const handler = serverless(app);