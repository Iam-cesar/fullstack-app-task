# Task Management Application

Este projeto é uma aplicação full-stack para gerenciamento de tarefas, composta por uma API desenvolvida com NestJS e um frontend desenvolvido com React e TypeScript.

## Estrutura do Projeto

```
.
├── .editorconfig
├── .env
├── .env.production
├── .eslintrc.js
├── .idea/
├── .prettierrc
├── docker-compose.yml
├── readme.md
├── task-api/
│   ├── .editorconfig
│   ├── .eslintignore
│   ├── .eslintrc.js
│   ├── .gitignore
│   ├── .prettierrc
│   ├── Dockerfile
│   ├── nest-cli.json
│   ├── package.json
│   ├── README.md
│   ├── src/
│   ├── test/
│   ├── tsconfig.build.json
│   ├── tsconfig.json
├── task-ui-react/
│   ├── .gitignore
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── src/
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
```

## Tecnologias Utilizadas

- **Backend**: NestJS, TypeScript, TypeORM, PostgreSQL
- **Frontend**: React, TypeScript, Vite, TailwindCSS
- **Infraestrutura**: Docker, Docker Compose

## Configuração do Ambiente

### Pré-requisitos

- Docker
- Docker Compose

### Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

```
NODE_ENV=development

API_PORT=3000
INTERNAL_API_PORT=3000
API_COMMAND=start:dev

UI_PORT=5173
UI_COMMAND=dev
UI_URL=http://localhost

DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=DB_USERNAME
DB_PASSWORD=DB_PASSWORD
DB_DATABASE_NAME=task_manager
```

### Iniciando a Aplicação

Para iniciar a aplicação, execute o seguinte comando:

```sh
docker-compose --env-file .env up -d --build
```

## Estrutura do Backend (task-api)

O backend é uma API desenvolvida com NestJS seguindo os princípios da Arquitetura Limpa (Clean Architecture).

### Endpoints

- **GET /task**: Lista todas as tarefas
- **POST /task**: Cria uma nova tarefa
- **GET /task/:id**: Retorna uma tarefa específica
- **PATCH /task/:id**: Atualiza uma tarefa específica
- **DELETE /task/:id**: Remove uma tarefa específica

### Executando Testes

Para executar os testes, utilize o comando:

```sh
npm run test
```

## Estrutura do Frontend (task-ui-react)

O frontend é uma aplicação React desenvolvida com TypeScript e Vite.

### Scripts Disponíveis

- **`npm run dev`**: Inicia o servidor de desenvolvimento
- **`npm run build`**: Compila a aplicação para produção
- **`npm run lint`**: Executa o linter

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para obter mais informações.
