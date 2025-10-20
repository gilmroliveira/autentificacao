# Autenticação Simples

## Como testar a rota de login

- Envie uma requisição POST para `http://localhost:3000/login`
- Corpo (JSON):
  {
    "user": "admin",
    "pass": "senha123"
  }
- Se estiver correto, receberá um token simples:
  {
    "token": "seu-token-simples"
  }
- Se errado, erro 401 com mensagem "Usuário ou senha incorretos".

## Como testar a rota de tarefas

- Envie uma requisição GET para `http://localhost:3000/tasks`
- Inclua o cabeçalho:
  Authorization: seu-token-simples
- Se o token for válido, receberá a lista de tarefas.
- Caso contrário, erro 403 - acesso negado.

- Para adicionar tarefa, envie POST para `http://localhost:3000/task`
- Corpo (JSON):
  {
    "task": "Descrição da tarefa"
  }
- Inclua o mesmo cabeçalho Authorization com o token correto.
