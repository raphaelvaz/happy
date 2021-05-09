# Happy 2.0

![](happyl.gif)

## Índice
  1. [Descrição](#description)
  2. [Tecnologias](#techs)
  3. [Rotas](#rotes)
  4. [Como Rodar](#run)
  
 <div id='description' />
 
## Descrição

Sistema para ajudar a conectar orfanatos a possiveis visitantes. Adicionada área de administrador, possibilitando controlar os orfanatos adicionados pelo público.

<div id='techs' />

## Tecnologias

[React](https://pt-br.reactjs.org/)

[Node](https://nodejs.org/en/)

[Express](https://expressjs.com/pt-br/)

[Typescript](https://www.typescriptlang.org/)

[PostgreSQL](https://www.postgresql.org/)

[TypeORM](https://typeorm.io/#/)

[Jwt Token](https://jwt.io/)

[Docker](https://www.docker.com/)



<div id='rotes' />

## Rotas

<div id='run' />

| Função | Método  |  Caminho  | Rota Autenticada | Corpo da Request | 200 | 400 | 404 |
| ------------------- | ------------------- | ------------------- | ------------------- | ------------------- |------------------- |------------------- | ------------------- |
| Reset Password | POST |  http://localhost:3333/password/reset | - | - | - | - | - |
| Send Forgot Password Email | POST |  http://localhost:3333/password/forgot | - | - | - | - | - |
| Create Session | POST |  http://localhost:3333/orphanages |  - |  - | - | - | - |
| Update Orphanage | PUT | http://localhost:3333/orphanages/:id |  SIM |  - | - | - | - |
| Delete Orphanage | DELETE | http://localhost:3333/orphanages/:id |  SIM |  - | - | - | - |
| Approve Orphanage | PATCH | http://localhost:3333/orphanages/:id |  SIM |  - | - | - | - |
| Get Accepted Orphanages | GET | http://localhost:3333/orphanages/accepted |  - |  - | - | - | - |
| Get Accepted Orphanage | GET | http://localhost:3333/orphanages/accepted/:id|  - |  - | - | - | - |
| Get Orphanage | GET | http://localhost:3333/orphanages/:id |  SIM |  - | - | - | - |
| Get Orphanages | GET | http://localhost:3333/orphanages/orphanages |  SIM |  - | - | - | - |
| Get Pending Orphanages | GET | http://localhost:3333//orphanages/pending |  SIM |  - | - | - | - |

## Como rodar

Primeiro clone o projeto:

```bash
> git clone https://github.com/raphaelvaz/happy.git
```
Depois entre na pasta via terminal:

```bash
> cd happy/backend
```
Instale todas as dependências:

```bash
> yarn
```
Para rodar em ambiente de desenvolvimento crie um arquivo .env e adicione a URL do seu banco postgresSQL:

```bash
> DATABASE_URL=postgresql://[user[:password]@][netloc][:port][/dbname]
```
Adicione também ao arquivo .env a variavél a baixo e preencha a variavél APP_SECRET(jwt):

```bash
> APP_API_URL=http://localhost:3333/tmp/
```
Rode as migrations para gerar as tabelas no banco de dados:

```bash
> yarn typeorm migration:run
```

Depois rode: 
```bash
> yarn dev:server
```

Acesse a api através do endereço:
```bash
> http://localhost:3333
```
Abrindo outro terminal:

```bash
> CRTL + ALT + T 
```
Acesse a pasta frontend via terminal(supondo que foi feito o clone na pasta pessoal):

```bash
> cd happy/frontend
```
Instale todas as dependências:

```bash
> yarn
```
Rode o frontend:

```bash
> yarn start
```
A aplicação pode ser acessada através de: http://localhost:3000.

