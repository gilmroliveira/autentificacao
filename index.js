// Importando dependências
const express = require('express');
const app = express();
const port = 3000;

// Middleware para tratar requisições JSON
app.use(express.json());

// Simulação de dados e credenciais
const validUser = 'admin';
const validPass = 'senha123';
const validToken = 'seu-token-simples';

// Armazenamento simples das tarefas em memória
let tasks = [];

// Middleware de autenticação para rotas protegidas
function authMiddleware(req, res, next) {
    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(403).json({ error: 'Token não fornecido. Acesso negado.' });
    }

    if (token !== validToken) {
        return res.status(403).json({ error: 'Token inválido. Acesso negado.' });
    }

    next();
}

// Rota de login — retorna um token simples se credenciais estiverem corretas
app.post('/login', (req, res) => {
    const { user, pass } = req.body;

    if (user === validUser && pass === validPass) {
        return res.json({ token: validToken });
    } else {
        return res.status(401).json({ error: 'Usuário ou senha incorretos.' });
    }
});

// Rota protegida para listar tarefas
app.get('/tasks', authMiddleware, (req, res) => {
    res.json(tasks);
});

// Rota protegida para adicionar tarefas
app.post('/task', authMiddleware, (req, res) => {
    const { task } = req.body;
    
    if (!task) {
        return res.status(400).json({ error: 'Campo "task" é obrigatório.' });
    }

    tasks.push(task);
    res.status(201).json({ message: 'Tarefa adicionada com sucesso!', tarefas: tasks });
});

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
