<h1 align="center"> Backend Money Checking </h1>

<p align="center">
  <a href="#tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#executar">Como Executar</a>&nbsp;&nbsp;&nbsp;
</p>

<br>

# Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- Node
- Typescript
- PostgresSQL, Redis e Mongodb
- Jest
- Typeorm
- Git e Github

# Projeto

O Money Checking foi pensado para ser um aplicativo de gestão financeira simples, no qual podem ser feitos lançamentos de receitas e despesas para determinada data. Além disso também é possível alterar e excluir esses lançamentos e pesquisar por eles dentro do mês. O aplicativo mostra o saldo desses lançamentos dentro do mês no front-end mobile e mostra gráficos detalhados no front-end web. Também é possível fazer cadastro de conta e existe um controle de login para multi usuários.

Esse backend é uma API REST desenvolvida com Node JS que faz todo o CRUD da aplicação e persiste os dados no banco. Esse backend serve tanto o front-end (React JS) web como o mobile (React Native).

# Executar

- Recomendo baixar o docker e executar os seguintes comandos para criar os containers dos bancos de dados utilizados nos projetos: <br/>

```bash
  # Primeiro o Postgres:
  $ docker run -d --name postgresql -e POSTGRESQL_PASSWORD='sua senha aqui' -e POSTGRESQL_USERNAME=postgres -e POSTGRESQL_DATABASE=money_checking -p 35432:5432 bitnami/postgresql:latest

  # Agora o Mongodb:
  $ docker run -d --name mongodb -e MONGODB_USERNAME=moneychecking -e MONGODB_PASSWORD='sua senha aqui' -e MONGODB_ROOT_PASSWORD='sua senha aqui' -e MONGODB_DATABASE=moneychecking -p 47017:27017 bitnami/mongodb:latest

  # Por fim o Redis:
  $ docker run -d --name redis -e REDIS_PASSWORD=51b83069b3279582026219141b3bf9d1 -p 56379:6379 bitnami/redis:latest

  # Executar a versão da build
  $ node dist/shared/infra/http/server.js
```

Após isso, conferir as configurações do arquivo .env e ormconfig.json para que estejam referenciando corretamente os bancos de dados.

- Agora, baixar as dependências, executar as migrations do projeto, buildar a aplicação e executar a build com os containers do docker executando

```bash
  # Instalar as dependências:
  $ yarn

  # Rodar as migrations:
  $ yarn typeorm migration:run

  # Buildar a aplicação:
  $ yarn build

  # Executar a versão da build
  $ node dist/shared/infra/http/server.js
```
