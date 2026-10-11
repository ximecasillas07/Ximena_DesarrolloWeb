const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

//configurar el ejs
app.engine('html', require('ejs').renderFile);
app.set('view engine','html');
app.set('views', path.join(__dirname, 'html'));

//procesar los datos
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// estructura de datos de memoria
const names = [];
const tasks = [];

// ruta raiz, muentra index.html 
app.get('/', (req, res) => {
    res.render('index.html' , {names, tasks, error: null});
});

// GET /greet recibe los nombres del formulario y manda a la raiz
app.get('/greet', (req, res) => {
    const name = req.query.name;
    if(name){
        console.log(`Nombre: ${name}`);
        names.push(name);
    }
    res.redirect('/');
});

// GET /greet/:index busca el nombre en el indice y muestra wazzup
app.get('/greet/:index', (req, res, next) =>{
    const index = parseInt(req.params.index, 10);

    if(isNaN(index) || index < 0 || index >= names.length){
        const error = new Error(`El indice ${req.params.index} no es valido`);
        return next(error);
    }
    res.render('wazzup.html', {name: names[index]});
});

// PUT /greet/:name agregar por URL param y devuelve JSON para Post
app.put('/greet/:name', (req, res) => {
    const name = req.params.name;
    if(name){
        names.push(name);
    }
    res.json(names);
});

// GET /task devuelve las tareas en JSON para Post
app.get('/task', (req, res) =>{
    res.json(tasks);
});

// POST /task recibe la nueva tarea 
app.post('/task', (req, res) => {
    const task = req.body.task;
    if (task) {
        tasks.push(task);
    }
    res.redirect('/');
});


// eliminar tarea
app.post('/task/delete/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if(!isNaN(index) && index >= 0 && index < tasks.length){
        tasks.splice(index, 1);
    }
    res.redirect('/');
});

// mover tarea para arriba
app.get('/task/up/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if(index > 0 && index < tasks.length){
        const temp = tasks[index];
        tasks[index] = tasks[index - 1];
        tasks[index - 1] = temp;
    }
    res.redirect('/');
});

//mover tara hacia abajo
app.get('/task/down/:index', (req, res) =>{
    const index = parseInt(req.params.index, 10);
    if(index >= 0 && index < tasks.length -1){
        const temp = tasks[index];
        tasks[index] = tasks[index + 1];
        tasks[index + 1]= temp;
    }
    res.redirect('/');
});

// middleware de error para mostrarlo en el index
app.use((err, req, res, next) => {
    res.status(400).render('index.html', {
        names,
        tasks,
        error : err.message
    });
});

app.listen(PORT, () =>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});