Status do Projeto: Em desenvolvimento :warning:
![[object Object]](https://socialify.git.ci/rafaelgeronimo/today-backend/image?description=1&descriptionEditable=%5B%20T%20O%20D%20A%20Y%20%5D%20-%20B%20A%20C%20K%20E%20N%20D&font=KoHo&language=1&name=1&owner=1&theme=Light)

### Bem vindo ao repositório **backend** do projeto [Today](https://github.com/rafaelgeronimo/today)!

### Para ter mais contexto sobre o desafio, [acesse o repositório inicial](https://github.com/rafaelgeronimo/today).

#### Se  você está procurando pelo repositório **frontend**, [clique aqui para visitar o projeto **today-frontend**](https://github.com/rafaelgeronimo/today-frontend).

## :book: Sobre
O **Today Backend** é onde se encontra todo o código necessário para execução da API do projeto.

Em fase avançada de desenvolvimento, o sistema já contempla as principais rotas necessárias para atender as requisições do frontend.

## :art: Feito com 
As principais ferramentas utilizadas para o desenvolvimento desse projeto:
- [Express](https://expressjs.com/pt-br/)
- [MongoDB](https://www.mongodb.com/)
- [NodeJS](https://nodejs.org/en/)
- [Joi](https://joi.dev/)
- [JWT](https://www.npmjs.com/package/jsonwebtoken)
- [pm2](https://pm2.keymetrics.io/)

## :dash: Deploy da API

### [https://geronimo-today.herokuapp.com/](https://geronimo-today.herokuapp.com/)

## 🛑 Endpoints e parâmetros

- **`/users:`**
    - GET: retorna uma listagem de pessoas usuárias cadastradas
    - POST: realiza o cadastro de uma nova pessoa usuária
- **`/users/:id`**
    - GET: busca informações de pessoa usuária específica
    - PUT: atualiza os dados da pessoa usuária
    - DELETE: exclui o registro da pessoa usuária
- **`/login`**
    - POST: realiza o login da pessoa usuária
- **`/tasks`**
    - GET: retorna a listagem de todas as tarefas cadastradas
    - POST: realiza o cadastro de uma nova tarefa
- **`/tasks/:id`**
    - GET: retorna detalhes de uma tarefa específica
    - PUT: atualiza as informações de uma tarefa
    - DELETE: exclui a tarefa do banco de dados
- **`/tasks/user/:id`**
    - GET: consulta as tarefas atribuídas à uma pessoa usuária específica

## :rocket: Executando o projeto
> Obs.: é necessário possuir o `nodejs` instalado no seu sistema e um gerenciador de pacotes (de preferência `yarn` - mas também pode usar o `npm`)

Para executar o projeto em seu sistema, primeiramente realize o clone desse repositório através do terminal com o comando:
```shell=
git clone git@github.com:rafaelgeronimo/today-backend.git
```

Em seguida, acesse a pasta do projeto e instale as dependências do sistema:
```shell=
cd toda-backend
yarn install
```

Antes de executar, será necessário definir as variáveis de ambiente.
Na raíz do projeto, crie o arquivo `.env` e defina valores para as variáveis:
```json=
MONGO_DB_URL=mongodb://localhost:27017/today
DB_NAME=today
PORT=4000
FRONTEND_URL=http://localhost:3000/
JWT_SECRET=
```

> Altere as informações acima conforme sua necessidade. Não se esqueça de fornecer uma senha para o `JSW_SECRET`!

Agora, com tudo configurado, basta executar o projeto com o comando:
```shell=
yarn start
```

Utilize o [`Insomnia`](https://insomnia.rest/download) (ou outro de sua preferência) para realizar as consultas às rotas...

OU

Inicie o projeto [Today Frontend](https://github.com/rafaelgeronimo/today-frontend) configurado para acessar a rota da API.
    
