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
| Send Forgot Password Email | POST |  http://localhost:3333/password/forgot | - | {"email":"raphael@gmail.com"} | no body | {"status": "error","message": "This User does not exists."} | - |
| Create Session | POST |  http://localhost:3333/orphanages |  - |  {"email":"raphael@gmail.com","password":"123qwe"} | {"name": "Rafael","email": "raphael@gmail.com","token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjA2NzE1NjEsImV4cCI6MTYyMDY3ODc2MSwic3ViIjoiYzlhNTU0ZmEtZjQ5Ni00OWE1LWEwNTMtNTE5Yzk3MTYwNDg0In0.zqwFrITRXHqeX3uzSgnA3ja4umPQPSwfGG-4S2An_Ac"} | {"status": "error","message": "Incorrect email/password combination"} | - |
| Update Orphanage | PUT | http://localhost:3333/orphanages/:id |  SIM |  no body | no body | {"status": "error","message": "Orphanage not found"} | - |
| Delete Orphanage | DELETE | http://localhost:3333/orphanages/:id |  SIM |  no body | no body | {"status": "error","message": "Orphanage not found"} | - |
| Approve Orphanage | PATCH | http://localhost:3333/orphanages/:id |  SIM |  no body | no body | {"status": "error","message": "Orphanage not found."} | - |
| Get Accepted Orphanages | GET | http://localhost:3333/orphanages/accepted |  - |  - | [{"id": "4b3629d3-8ab0-4fc6-b096-eb079930dd68","name": "Orfanato Esperença","latitude": "-32.0338372154","longitude": "-52.1002793312","about": "Presta assistência","instructions": "Venha como","opening_hours": "Das 8h ás 18h","open_on_weekends": false,"accepted": true,"images": [{"id": "fd5360ad-7915-435f-a5f3-bea507efd4e9","url": "http://localhost:3333/tmp/1620252692121-design_sem_nome_73_widelg.jpg"}]}] or [] | - | - |
| Get Accepted Orphanage | GET | http://localhost:3333/orphanages/accepted/:id|  - |  - | {"id": "4b3629d3-8ab0-4fc6-b096-eb079930dd68","name": "Orfanato Esperença","latitude": "-32.0338372154","longitude": "-52.1002793312","about": "Presta assistência a crianças de 06 a 15 anos que se encontre em situação de risco e/ou vulnerabilidade social.","instructions": "Venha como se sentir a vontade e traga muito amor e paciência para dar.","opening_hours": "Das 8h ás 18h","open_on_weekends": false,"accepted": true,"images": [{"id": "fd5360ad-7915-435f-a5f3-bea507efd4e9","url": "http://localhost:3333/tmp/1620252692121-design_sem_nome_73_widelg.jpg"}]} | - | {"status": "error","message": "Orphanage not found"} |
| Get Orphanage | GET | http://localhost:3333/orphanages/:id |  SIM |  - | {"id": "4b3629d3-8ab0-4fc6-b096-eb079930dd68","name": "Orfanato Esperença","latitude": "-32.0338372154","longitude": "-52.1002793312","about": "Presta assistência a crianças de 06 a 15 anos que se encontre em situação de risco e/ou vulnerabilidade social.","instructions": "Venha como se sentir a vontade e traga muito amor e paciência para dar.","opening_hours": "Das 8h ás 18h","open_on_weekends": false,"accepted": true,"images": [{"id": "fd5360ad-7915-435f-a5f3-bea507efd4e9","url": "http://localhost:3333/tmp/1620252692121-design_sem_nome_73_widelg.jpg"}]} | - | {"status": "error","message": "Orphanage not found"} |
| Get Orphanages | GET | http://localhost:3333/orphanages/orphanages |  SIM |  - | [{"id": "4b3629d3-8ab0-4fc6-b096-eb079930dd68","name": "Orfanato Esperença","latitude": "-32.0338372154","longitude": "-52.1002793312","about": "Presta assistência","instructions": "Venha como","opening_hours": "Das 8h ás 18h","open_on_weekends": false,"accepted": true,"images": [{"id": "fd5360ad-7915-435f-a5f3-bea507efd4e9","url": "http://localhost:3333/tmp/1620252692121-design_sem_nome_73_widelg.jpg"}]}] or [] | - | - |
| Get Pending Orphanages | GET | http://localhost:3333//orphanages/pending |  SIM |  - | [{"id": "4b3629d3-8ab0-4fc6-b096-eb079930dd68","name": "Orfanato Esperença","latitude": "-32.0338372154","longitude": "-52.1002793312","about": "Presta assistência","instructions": "Venha como","opening_hours": "Das 8h ás 18h","open_on_weekends": false,"accepted": false,"images": [{"id": "fd5360ad-7915-435f-a5f3-bea507efd4e9","url": "http://localhost:3333/tmp/1620252692121-design_sem_nome_73_widelg.jpg"}]}] or [] | - | - |

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

