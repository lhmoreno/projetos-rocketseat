# Tasks API

## Iniciar o projeto
Intale as dependências usando:
```bash
npm install
```

Rode o projeto com:
```bash
npm run dev
```

## Rotas
### /tasks `POST`
```json
// Request Body
{
  "title": "Titulo da tarefa",
  "description": "Descrição completa da tarefa"
}

// Response Body
{
  "id": "fad0e49f-626b-4399-831c-fa5674dd1cf7",
  "title": "Titulo da tarefa",
  "description": "Descrição completa da tarefa",
  "created_at": "2023-04-29T17:13:22.572Z", // Data atual
  "updated_at": "2023-04-29T17:13:22.572Z", // Data atual
  "completed_at": null
}
```

### /tasks/:id/complete `PATCH`
```json
// Para completar uma tarefa
```

### /tasks/:id `PUT`
```json
// Request Body
{
  "title": "Novo titulo da tarefa", // Opcional
  "description": "Nova descrição da tarefa" // Opcional
}
```

### /tasks/:id `DELETE`
```json
// Para deletar uma tarefa
```

### /tasks `GET`
```json
// Response Body
[
  {
    "id": "fad0e49f-626b-4399-831c-fa5674dd1cf7",
    "title": "Novo titulo da tarefa",
    "description": "Nova descrição da tarefa",
    "created_at": "2023-04-29T17:13:22.572Z",
    "updated_at": "2023-04-29T17:13:22.572Z",
    "completed_at": "2023-04-29T17:16:26.577Z"
  }
]

// Query Params
// 1. title
// 2. description
```

## Upload do arquivo CSV
Com o servidor funcionando, rode o seguinte em outro terminal:
```bash
npm run upload
```