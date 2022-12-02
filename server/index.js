const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;
const { db } = require('./database');
const {createNewProject, createNewTask, createAdditionalTask } = require('./lib');

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

// ручки изменения колонок задач проекта

app.put('/api/task/columns', (req, res) => {
  const edittingProject = db.find( item => item.id === req.body.id_project );
  edittingProject.columns = req.body.columns;
  res.status(200).send('success');
});

app.put('/api/task/name', (req, res) => {
  const edittingProject = db.find( item => item.id === req.body.id_project );
  edittingProject.task_list.find( item => item.id === req.body.id).name = req.body.name;
  res.send(edittingProject);
});

app.put('/api/task/description', (req, res) => {
  const edittingProject = db.find( item => item.id === req.body.id_project );
  edittingProject.task_list.find( item => item.id === req.body.id).description = req.body.description;
  res.send(edittingProject);
});

app.put('/api/task/priority', (req, res) => {
  const edittingProject = db.find( item => item.id === req.body.id_project );
  edittingProject.task_list.find( item => item.id === req.body.id).priority = req.body.priority;
  res.send(edittingProject);
});

// добавление, изменение, удаление дополнительных задач

app.post('/api/task/additional', (req, res) => {
  const newAdditionalTask = createAdditionalTask(req.body);

  console.log(newAdditionalTask);
  const edittingProject = db.find( item => item.id === req.body.id_project );
  edittingProject.task_list.find( item => item.id === req.body.id_main_task).other_tasks.push(newAdditionalTask);
  res.send(edittingProject);
});

app.put('/api/task/additional', (req, res) => {
  console.log(req.body)
  const edittingProject = db.find( item => item.id === req.body.id_project );
  const edittingTask = edittingProject.task_list.find( item => item.id === req.body.id_main_task);
  edittingTask.other_tasks.find( item => item.id === req.body.id)[req.body.field] = req.body.value;
  res.send(edittingProject);
});

app.delete('/api/task/additional', (req, res) => {
  const edittingProject = db.find( item => item.id === req.body.id_project );
  const edittingTask = edittingProject.task_list.find( item => item.id === req.body.id_main_task);
  const deleteOtherTaskIndex =  edittingTask.other_tasks.find( item => item.id === req.body.id)
  edittingTask.other_tasks.splice(deleteOtherTaskIndex, 1)
  res.send(edittingProject);
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
