<h1 align='center'> COOKENU </h1>

## Como utilizar ##

## **Estrutura das tabelas** ##
```
CREATE TABLE IF NOT EXISTS users_list (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('NORMAL', 'ADMIN') NOT NULL 
);
```
```
CREATE TABLE IF NOT EXISTS recipes_list (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    user_id VARCHAR(64) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users_list(id),
    user_name VARCHAR(255) NOT NULL
);
```
```
CREATE TABLE IF NOT EXISTS followers_list (
    follower_id VARCHAR(64),
    FOREIGN KEY (follower_id) REFERENCES users_list(id),
    followed_id VARCHAR(64),
    FOREIGN KEY (followed_id) REFERENCES users_list(id)
);
```
## **Estrutura do .env** ##
`DB_HOST`: código host do MySQL <br />
`DB_PASSWORD`: senha do host do MySQL<br />
`DB_USER`: usuário do MySQL<br />
`DB_SCHEMA`: database do MySQL<br />
`JWT_KEY`: chave que será usada como base para gerar o token<br />
`NODEMAILER_USER`: email<br />
`NODEMAILER_PASS`: senha do email<br />

```
DB_HOST = 
DB_PASSWORD = 
DB_USER = 
DB_SCHEMA = 

JWT_KEY = 

NODEMAILER_USER = 
NODEMAILER_PASS = 
```
## **Dados para teste** ##

As funcionalidade disponíveis são: 

## ***Tabela de Usuários*** ##
<br />

## **Verificação de todos usuários (get)** ##
`http://localhost:3003/users`

**OUTPUT:**<br />
**Body**<br />
`id`: id do usuário<br />
`name`: name do usuário<br />
`email`: email do usuário<br />
`password`: senha do usuário<br />
`role`: tipo de controle do usuário ENUM(ADMIN ou NORMAL)

```
    [
        {
            "id": "string",
            "name": "string",
            "email": "string",
            "password": "string",
            "role": "string"
        }
    ]
```

## **Busca de usuário por id (get)** ##
`http://localhost:3003/users/:id`

**INPUT**
**Headers**<br />
`Authorization`: token do usuário (obrigatório)

**Path Param**<br />
`id`: id do usuário (obrigatório) <br />
` id: "string" ` 

**OUTPUT**<br />
**Body** 

```
    [
        {
            "id": "string",
            "name": "string",
            "email": "string",
            "role": "string"
        }
    ]
```

## **Adição de usuário (post)** ##
`http://localhost:3003/users/signup`

**INPUT:**<br />
**Body**<br />
`name`: nome do usuário (obrigatório) <br />
`email`: email do usuário (obrigatório) <br />
`password`: senha do usuário (obrigatório) <br />
`role`: acesso do usuário (obrigatório) <br />

```
{
   "name": "string", 
   "email": "string",
   "password": "string",
   "role": "string"
}
```

**Body pretty**

```
{
    message: "Usuário cadastrado com sucesso",
    token: "string"
}
```

## **Login de usuário (post)** ##
`http://localhost:3003/users/login`

**INPUT:**<br />
**Body**<br />
`email`: email do usuário (obrigatório) <br />
`password`: senha do usuário (obrigatório) <br />

```
{
   "email": "string",
   "password": "string"
}
```

**Body pretty**

```
{
    token: "string"
}
```

## **Reset password do usuário (post)** ##
`http://localhost:3003/users/password/reset`

**INPUT:**<br />
**Body**<br />
`email`: email do usuário (obrigatório) <br />

```
{
   "email": "string"
}
```

**Body pretty**

```
{
    "message": "Sua senha de recuperação foi enviada para o email ${email}. Por questão de segurança altere a senha no campo editar usuário"
}
```

## **Edição do usuário (put)** ##
`http://localhost:3003/users/edit/:id`

**INPUT**<br />
**Headers**<br />
`Authorization`: token do usuário (obrigatório)<br />

**Path Param**<br />
`id`: id do usuário (obrigatório) <br />
``` id: "string" ```<br />

**Body**<br />
`name`: nome do usuário (obrigatório) <br />
`password`: senha do usuário (obrigatório) <br />

```
{
    "name": "string"
    "password": "string"
}
```

**OUTPUT**<br />
**Body pretty**<br />

```
{
    "message": "Usuário atualizado"
}
```

## **Deletar usuário (delete)** ##
`http://localhost:3003/users/delete/:id`

**INPUT**<br />
**Headers**<br />
`Authorization`: token do usuário (obrigatório)<br />

**Path Param**<br />
`id`: id do usuário (obrigatório) <br />
``` id: "string" ```<br />

**OUTPUT**<br />
**Body pretty**<br />

```
{ 
    message: 'Usuário excluido!' 
}
```
<br />

## ***Tabela de Receitas*** ##
<br />

## **Verificação de todas receitas (get)** ##
`http://localhost:3003/recipes`

**OUTPUT:**<br />
**Body**<br />
`id`: id da receita<br />
`title`: titulo da receita<br />
`description`: descrição da receita<br />
`date`: data de criação da receita<br />
`user_id`: id do usuário criador da receita<br />
`user_name`: name do usuário criador da receita<br />

```
    [
        {
            "id": "string",
            "title": "string",
            "description": "text",
            "date": "date",
            "user_id": "string",
            "user_name": "string"
        }
    ]
```

## **Busca de receita por titulo (get)** ##
`http://localhost:3003/recipes/:title`

**INPUT**<br />
**Headers**<br />
`Authorization`: token do usuário (obrigatório)<br />

**Path Param**<br />
`id`: id do usuário (obrigatório) <br />
` id: "string" `<br />

**OUTPUT**
**Body** 

```
[
        {
            "id": "string",
            "title": "string",
            "description": "text",
            "date": "date",
            "user_id": "string",
            "user_name": "string"
        }
    ]
```

## **Verificar o feed do usuário (get)** ##
`http://localhost:3003/recipes/myfeed`

**INPUT**<br />
**Headers**<br />
`Authorization`: token do usuário (obrigatório)<br />

**OUTPUT**<br />
**Body** <br />

```
{
    "recipes": [
        {
            "title": "string",
            "description": "text",
            "date": "date",
            "user_name": "string"
        }
    ]
}
```

## **Verificação das receitas criadas pelo usuário logado (get)** ##
`http://localhost:3003/recipes/my`

**INPUT**<br />
**Headers**<br />
`Authorization`: token do usuário (obrigatório)<br />

**OUTPUT:**<br />
**Body** <br />

```
{
    "recipes": [
        {
            "title": "string",
            "description": "text",
            "user_name": "string",
            "date": "date"
        }
    ]
}
```

## **Adição de receita (post)** ##
`http://localhost:3003/recipes/add`

**INPUT:**<br />
**Headers**<br />
`Authorization`: token do usuário (obrigatório)<br />

**Body**<br />
`title`: título da recita (obrigatório) <br />
`description`: descrição da recita (obrigatório) <br />
`date`: data de criação da recita (obrigatório) <br />

```
{
    "title": "string",
    "description": "text",
    "date": "date"
}
```

**Body pretty**

```
{
    message: "Receita adicionada com sucesso",
    [
        {
            "id": "string",
            "title": "string",
            "description": "text",
            "date": "date",
            "user_id": "string",
            "user_name": "string"
        }
    ]
}
```

## **Edição da receita (put)** ##
`http://localhost:3003/recipes/edit/:id`

**INPUT**<br />
**Headers**<br />
`Authorization`: token do usuário (obrigatório)<br />

**Path Param**<br />
`id`: id da receita (obrigatório) <br />
``` id: "string" ```<br />

**Body**<br />
`title`: título da recita (obrigatório) <br />
`description`: descrição da recita (obrigatório) <br />

```
{
    "title": "string"
    "description": "string"
}
```

**OUTPUT**<br />
**Body pretty**<br />

```
{
    message: "Receita atualizado",
    [
        {
            "id": "string",
            "title": "string",
            "description": "text",
            "date": "date",
            "user_id": "string",
            "user_name": "string"
        }
    ]
}
```

## **Deletar usuário (delete)** ##
`http://localhost:3003/recipes/delete/:id`

**INPUT**<br />
**Headers**<br />
`Authorization`: token do usuário (obrigatório)<br />

**Path Param**<br />
`id`: id da receita (obrigatório) <br />
``` id: "string" ```<br />

**OUTPUT**<br />
**Body pretty**<br />

```
{ 
    message: 'Receita excluida!' 
}
```
<br />

## ***Tabela de seguidores*** ##
<br />

## **Seguir usuário (post)** ##
`http://localhost:3003/feed/follow`

**INPUT:**<br />
**Headers**<br />
`Authorization`: token do usuário (obrigatório)<br />

**Body**<br />
`followed_id`: id do usuário a ser seguido (obrigatório) <br />

```
{
    "followed_id": "string"
}
```

**Body pretty**<br />

```
{
    message: "Seguindo!"
}
```

## **Deixar de seguir usuário (delete)** ##
`http://localhost:3003/feed/delete`

**INPUT**<br />
**Headers**<br />
`Authorization`: token do usuário (obrigatório)<br />

**Body**<br />
`followed_id`: id do usuário a ser deixado de seguido (obrigatório) <br />

```
{
    "followed_id": "string"
}
```

**OUTPUT**<br />
**Body pretty**<br />

```
{
     message: 'unFollow realizado com sucesso!' 
}

```

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/2526f10f3a4378549c38?action=collection%2Fimport)
