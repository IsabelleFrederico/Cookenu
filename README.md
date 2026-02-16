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
`DB_HOST`: código host do MySQL 
`DB_PASSWORD`: senha do host do MySQL
`DB_USER`: usuário do MySQL
`DB_SCHEMA`: database do MySQL
`JWT_KEY`: chave que será usada como base para gerar o token
`NODEMAILER_USER`: email
`NODEMAILER_PASS`: senha do email

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


### **Verificação de todos usuários (get)** ###
`http://localhost:3003/users`

**OUTPUT:**
**Body**
`id`: id do usuário
`name`: name do usuário
`email`: email do usuário
`password`: senha do usuário
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

### **Busca de usuário por id (get)** ###
`http://localhost:3003/users/:id`

**INPUT**
**Headers**
`Authorization`: token do usuário (obrigatório)

**Path Param**
`id`: id do usuário (obrigatório) 
` id: "string" ` 

**OUTPUT**
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

### **Adição de usuário (post)** ###
`http://localhost:3003/users/signup`

**INPUT:**
**Body**
`name`: nome do usuário (obrigatório) 
`email`: email do usuário (obrigatório) 
`password`: senha do usuário (obrigatório) 
`role`: acesso do usuário (obrigatório) 

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

### **Login de usuário (post)** ###
`http://localhost:3003/users/login`

**INPUT:**
**Body**
`email`: email do usuário (obrigatório) 
`password`: senha do usuário (obrigatório) 

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

### **Reset password do usuário (post)** ###
`http://localhost:3003/users/password/reset`

**INPUT:**
**Body**
`email`: email do usuário (obrigatório) 

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

### **Edição do usuário (put)** ###
`http://localhost:3003/users/edit/:id`

**INPUT**
**Headers**
`Authorization`: token do usuário (obrigatório)

**Path Param**
`id`: id do usuário (obrigatório) 
``` id: "string" ```

**Body**
`name`: nome do usuário (obrigatório) 
`password`: senha do usuário (obrigatório) 

```
{
    "name": "string"
    "password": "string"
}
```

**OUTPUT**
**Body pretty**

```
{
    "message": "Usuário atualizado"
}
```

### **Deletar usuário (delete)** ###
`http://localhost:3003/users/delete/:id`

**INPUT**
**Headers**
`Authorization`: token do usuário (obrigatório)

**Path Param**
`id`: id do usuário (obrigatório) 
``` id: "string" ```

**OUTPUT**
**Body pretty**

```
{ 
    message: 'Usuário excluido!' 
}
```


## ***Tabela de Receitas*** ##


### **Verificação de todas receitas (get)** ###
`http://localhost:3003/recipes`

**OUTPUT:**
**Body**
`id`: id da receita
`title`: titulo da receita
`description`: descrição da receita
`date`: data de criação da receita
`user_id`: id do usuário criador da receita
`user_name`: name do usuário criador da receita

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

### **Busca de receita por titulo (get)** ###
`http://localhost:3003/recipes/:title`

**INPUT**
**Headers**
`Authorization`: token do usuário (obrigatório)

**Path Param**
`id`: id do usuário (obrigatório) 
` id: "string" `

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

### **Verificar o feed do usuário (get)** ###
`http://localhost:3003/recipes/myfeed`

**INPUT**
**Headers**
`Authorization`: token do usuário (obrigatório)

**OUTPUT**
**Body** 

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

### **Verificação das receitas criadas pelo usuário logado (get)** ###
`http://localhost:3003/recipes/my`

**INPUT**
**Headers**
`Authorization`: token do usuário (obrigatório)

**OUTPUT:**
**Body** 

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

### **Adição de receita (post)** ###
`http://localhost:3003/recipes/add`

**INPUT:**
**Headers**
`Authorization`: token do usuário (obrigatório)

**Body**
`title`: título da recita (obrigatório) 
`description`: descrição da recita (obrigatório) 
`date`: data de criação da recita (obrigatório) 

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

### **Edição da receita (put)** ###
`http://localhost:3003/recipes/edit/:id`

**INPUT**
**Headers**
`Authorization`: token do usuário (obrigatório)

**Path Param**
`id`: id da receita (obrigatório) 
``` id: "string" ```

**Body**
`title`: título da recita (obrigatório) 
`description`: descrição da recita (obrigatório) 

```
{
    "title": "string"
    "description": "string"
}
```

**OUTPUT**
**Body pretty**

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

### **Deletar usuário (delete)** ###
`http://localhost:3003/recipes/delete/:id`

**INPUT**
**Headers**
`Authorization`: token do usuário (obrigatório)

**Path Param**
`id`: id da receita (obrigatório) 
``` id: "string" ```

**OUTPUT**
**Body pretty**

```
{ 
    message: 'Receita excluida!' 
}
```


## ***Tabela de seguidores*** ##


### **Seguir usuário (post)** ###
`http://localhost:3003/feed/follow`

**INPUT:**
**Headers**
`Authorization`: token do usuário (obrigatório)

**Body**
`followed_id`: id do usuário a ser seguido (obrigatório) 

```
{
    "followed_id": "string"
}
```

**Body pretty**

```
{
    message: "Seguindo!"
}
```

### **Deixar de seguir usuário (delete)** ###
`http://localhost:3003/feed/delete`

**INPUT**
**Headers**
`Authorization`: token do usuário (obrigatório)

**Body**
`followed_id`: id do usuário a ser deixado de seguido (obrigatório) 

```
{
    "followed_id": "string"
}
```

**OUTPUT**
**Body pretty**

```
{
     message: 'unFollow realizado com sucesso!' 
}

```

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/2526f10f3a4378549c38?action=collection%2Fimport)
