const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;
const { db } = require('./database');
const {createNewProject, createNewTask } = require('./lib');

app.use(cors());
app.use(express.json());

app.use('/static', express.static(__dirname + '/public'));

// Получение начальных данных

app.get('/api/projects', (req, res) => {
  res.send(db);
});

// ручки создания и изменения проекта

app.post('/api/projects', (req, res) => {
  const newProject = createNewProject(req.body);
  db.push(newProject);
  res.send(newProject);
});

app.put('/api/projects', (req, res) => {
  const edittingProject = db.find( item => item.id === req.body.id );
  Object.values.forEach( item => edittingProject[item[0]] = item[1] );
  res.send(edittingProject);
});

app.delete('/api/projects', (req, res) => {
  const deleteProjectIndex = db.findIndex( item => item.id === req.body.id );
  db.splice(deleteProjectIndex, 1);
  res.send(db);
});

// ручки создания и изменения выбранного проекта

app.post('/api/task', (req, res) => {
  const newTask = createNewTask(req.body);
  const edittingProject = db.find( item => item.id === req.body.id_project );
  edittingProject.task_list.push(newTask);
  edittingProject.columns[0].tasks.push(newTask.id);
  res.send(edittingProject);
});

app.delete('/api/task', (req, res) => {
  const edittingProject = db.find( item => item.id === req.body.id_project );
  const deleteTaskIndex = edittingProject.task_list.findIndex( item => item.id === req.body.id);
  edittingProject.task_list.splice( deleteTaskIndex, 1);
  res.send(edittingProject);
});

// ручки изменения задачи

app.put('/api/task', (req, res) => {
  const newTask = createNewTask(req.body);
  const edittingProject = db.find( item => item.id === req.body.id_project );
  edittingProject.task_list.push(newTask);
  edittingProject.columns[0].tasks.push(newTask.id);
  res.send(edittingProject);
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
