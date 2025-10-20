const express = require('express');
const app = express();
const port = 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Array em memória para armazenar tarefas
let tasks = [];

// Rota para listar tarefas (protegida pela autenticação no Passo 3)
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Rota para adicionar tarefa
app.post('/task', (req, res) => {
    const task = req.body.task;
    if (!task) {
        return res.status(400).json({ error: 'Tarefa é obrigatória' });
    }
    tasks.push(task);
    res.status(201).json({ message: 'Tarefa adicionada com sucesso' });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
