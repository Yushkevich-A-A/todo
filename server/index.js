const fs = require('fs');
const fileUpload = require('express-fileupload');
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;
const { db } = require('./database');
const {createNewProject, createNewTask, createAdditionalTask, createFileObj, createNewComment } = require('./lib');
const { reqursion } = require('./lib/reqursion');


app.use(fileUpload({createParentPath: true}));

app.use(cors());
app.use(express.json());
app.use('/public', express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/public/build/static'));
// app.use( /\.(js|css|map|ico|json)$/, express.static( path.resolve( __dirname, '/public/build' ) ) );


app.get('/api/projects', (req, res) => {
  res.send(db);
});

const initFolder = () => {
  db.forEach( (item) => {
    fs.access(`${__dirname}/public/folders/${item.id}`, (err) => {
        if (err && err.code === 'ENOENT') {
          fs.mkdir(`${__dirname}/public/folders/${item.id}`, err => {
            if (err) {
              throw err
            }
            console.log('Directory is created.')
          })
        }
      });
    item.task_list.forEach( (task) => {

      fs.access(`${__dirname}/public/folders/${item.id}`, (err) => {
        if (err && err.code === 'ENOENT') {
          fs.mkdir(`${__dirname}/public/folders/${task.id_project}/${task.id}`, err => {
            if (err) {
              throw err
            }
            console.log('Directory is created.')
          })
        }
      });
    });
  });
}

initFolder();

// ручки создания и изменения проекта

app.post('/api/projects', (req, res) => {
  const newProject = createNewProject(req.body);
  fs.mkdir(`${__dirname}/public/folders/${newProject.id}`, err => {
    if (err) {
      throw err
    }
    console.log('Directory is created.')
  });
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

  if (fs.existsSync(`${__dirname}/public/folders/${req.body.id}`)) {
    fs.rmdirSync(`${__dirname}/public/folders/${req.body.id}`, {recursive: true, force: true})
  }

  res.send(db);
});

// ручки создания и изменения выбранного проекта

app.post('/api/task', (req, res) => {
  const edittingProject = db.find( item => item.id === req.body.id_project );
  const numberForNewTask = Math.max( ...edittingProject.task_list.map( item => item.number )) + 1;

  const newTask = createNewTask({
    name: req.body.name, 
    number: numberForNewTask,
    id_project: req.body.id_project,
  });

  edittingProject.task_list.push(newTask);
  edittingProject.columns.find( item => item.id ===  req.body.column_id).tasks.push(newTask.id)
  fs.mkdir(`${__dirname}/public/folders/${newTask.id_project}/${newTask.id}`, err => {
    if (err) {
      throw err
    }
    console.log('Directory is created.')
  });
  res.send(edittingProject);
});

app.delete('/api/task', (req, res) => {
  const edittingProject = db.find( item => item.id === req.body.id_project );
  const deleteTaskIndex = edittingProject.task_list.findIndex( item => item.id === req.body.id);
  edittingProject.task_list.splice( deleteTaskIndex, 1);
  const edittingcolumn = edittingProject.columns.find( column => column.id === req.body.id_column ).tasks;
  const indexInColumn = edittingcolumn.findIndex( item => item === req.body.id);
  edittingcolumn.splice(indexInColumn, 1);

  fs.rmdirSync(`${__dirname}/public/folders/${req.body.id_project}/${req.body.id}`, {recursive: true, force: true})
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
  const edittingProject = db.find( item => item.id === req.body.id_project );
  edittingProject.task_list.find( item => item.id === req.body.id_main_task).other_tasks.push(newAdditionalTask);
  res.send(edittingProject);
});

app.put('/api/task/additional', (req, res) => {
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

// добавление файлов на сервер

app.post('/api/task/files', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  let file = req.files.file;

  const format = file.mimetype.split('/')[1];
  const fileName = Date.now() + '.' + format;
  const path = `/public/folders/${req.body.id_project}/${req.body.id}/${fileName}`;

  const newFileData = createFileObj({
    path: path,
    name: fileName,
    size: file.size,
    id_project: req.body.id_project,
    id_main_task: req.body.id,

  })

  file.mv(__dirname + path, function(err) {
    if (err)
      return res.status(500).send(err);

    const edittingProject = db.find( item => item.id === req.body.id_project );
    const edittingTask = edittingProject.task_list.find( item => item.id === req.body.id);
    edittingTask.files.push(newFileData);
    res.send(edittingProject);
  });
});

app.delete('/api/task/files', (req, res) => {
  const edittingProject = db.find( item => item.id === req.body.id_project );
  const edittingTask = edittingProject.task_list.find( item => item.id === req.body.id_main_task);
  const deleteImageIndex =  edittingTask.files.findIndex( item => item.id === req.body.id)
  edittingTask.files.splice(deleteImageIndex, 1);
    fs.unlink(`${__dirname}${req.body.path}`,function(err){
      if(err) return console.log(err);
      res.send(edittingProject);
  });  
});

// добавление комментария

app.post('/api/task/comment', (req, res) => {
  const edittingProject = db.find( item => item.id === req.body.id_project );
  const edittingTask = edittingProject.task_list.find( item => item.id === req.body.id_task);
  const newComment = createNewComment(req.body);
  if (!req.body.id_main_comment) {
    edittingTask.comments.push(newComment);
  } else {
    const mainComment = reqursion(edittingTask.comments, newComment.id_main_comment);
    mainComment.comments.push(newComment);
  }
  
  res.send(edittingProject);
});

// изменение даты окончания задачи

app.put('/api/task/deadline', (req, res) => {
  const edittingProject = db.find( item => item.id === req.body.id_project );
  const edittingTask = edittingProject.task_list.find( item => item.id === req.body.id_task);
  edittingTask.finish_date = req.body.finish_date;
  res.send(edittingProject);
});


// Получение начальных данных
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/public/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
