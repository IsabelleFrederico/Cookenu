<h1 align='center'> COOKENU </h1>

## How to Use / Como utilizar ##

## **Database Structure / Estrutura das tabelas** ##
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
## **.env Structure / Estrutura do .env** ##
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
## **Available Features / Dados para teste** ##

As funcionalidade disponíveis são: 

## ***Users Table / Tabela de Usuários*** ##


### **Get all users / Verificação de todos usuários (get)** ###
`http://localhost:3003/users`

**OUTPUT:**
**Body**
`id`: user id / user id (mandatory) / id do usuário
`name`: username / name do usuário
`email`: user email / email do usuário
`password`: user password / senha do usuário
`role`: access permission (ADMIN or NORMAL) / tipo de acesso (ADMIN ou NORMAL)

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

### **Get user by ID / Busca de usuário por id (get)** ###
`http://localhost:3003/users/:id`

**INPUT**
**Headers**
`Authorization`: user token (mandatory) / token do usuário (obrigatório)

**Path Param**
`id`: user id (mandatory) / id do usuário (obrigatório) 
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

### **User signup / Adição de usuário (post)** ###
`http://localhost:3003/users/signup`

**INPUT:**
**Body**
`name`: username (mandatory) / nome do usuário (obrigatório) 
`email`: user email / email do usuário (obrigatório) 
`password`: user password (mandatory) / senha do usuário (obrigatório) 
`role`: access permission (mandatory) / tipo de acesso (obrigatório)

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

### **User login / Login de usuário (post)** ###
`http://localhost:3003/users/login`

**INPUT:**
**Body**
`email`: user email (mandatory) / email do usuário (obrigatório) 
`password`: user password (mandatory) / senha do usuário (obrigatório) 

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

### **Password reset / Reset password do usuário (post)** ###
`http://localhost:3003/users/password/reset`

**INPUT:**
**Body**
`email`: user email (mandatory) / email do usuário (obrigatório) 

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

### **Edit user / Edição do usuário (put)** ###
`http://localhost:3003/users/edit/:id`

**INPUT**
**Headers**
`Authorization`: user token (mandatory) / token do usuário (obrigatório)

**Path Param**
`id`: user id (mandatory) / id do usuário (obrigatório) 
``` id: "string" ```

**Body**
`name`: username (mandatory) / nome do usuário (obrigatório) 
`password`: user password (mandatory) / senha do usuário (obrigatório) 

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

### **Delete user / Deletar usuário (delete)** ###
`http://localhost:3003/users/delete/:id`

**INPUT**
**Headers**
`Authorization`: user token (mandatory) / token do usuário (obrigatório)

**Path Param**
`id`: user id (mandatory) / id do usuário (obrigatório) 
``` id: "string" ```

**OUTPUT**
**Body pretty**

```
{ 
    message: 'Usuário excluido!' 
}
```


## ***Recipes / Tabela de Receitas*** ##


### **Get all recipes / Verificação de todas receitas (get)** ###
`http://localhost:3003/recipes`

**OUTPUT:**
**Body**
`id`: recipe id / id da receita
`title`: recipe title / titulo da receita
`description`: recipe description / descrição da receita
`date`: recipe creation date / data de criação da receita
`user_id`: ID of the user who created the recipe / id do usuário criador da receita
`user_name`: username that created the recipe / name do usuário criador da receita

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

### **Get recipe by title / Busca de receita por titulo (get)** ###
`http://localhost:3003/recipes/:title`

**INPUT**
**Headers**
`Authorization`: user token (mandatory) / token do usuário (obrigatório)

**Path Param**
`id`: user id (mandatory) / id do usuário (obrigatório) 
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

### **Get user feed / Verificar o feed do usuário (get)** ###
`http://localhost:3003/recipes/myfeed`

**INPUT**
**Headers**
`Authorization`: user token (mandatory) / token do usuário (obrigatório)

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

### **Get logged-in user recipes / Verificação das receitas criadas pelo usuário logado (get)** ###
`http://localhost:3003/recipes/my`

**INPUT**
**Headers**
`Authorization`: user token (mandatory) / token do usuário (obrigatório)

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

### **Create recipe / Adição de receita (post)** ###
`http://localhost:3003/recipes/add`

**INPUT:**
**Headers**
`Authorization`: user token (mandatory) / token do usuário (obrigatório)

**Body**
`title`: recipe title (mandatory) / título da receita (obrigatório) 
`description`: recipe description (mandatory) / descrição da receita (obrigatório) 
`date`: recipe creation date (mandatory) / data de criação da receita (obrigatório) 

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

### **Edit recipe / Edição da receita (put)** ###
`http://localhost:3003/recipes/edit/:id`

**INPUT**
**Headers**
`Authorization`: user token (mandatory) / token do usuário (obrigatório)

**Path Param**
`id`: recipe id (mandadory) / id da receita (obrigatório) 
``` id: "string" ```

**Body**
`title`: recipe title (mandatory) / título da receita (obrigatório) 
`description`: recipe description (mandatory) / descrição da receita (obrigatório) 

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

### **Delete recipe / Deletar usuário (delete)** ###
`http://localhost:3003/recipes/delete/:id`

**INPUT**
**Headers**
`Authorization`: user token (mandatory) / token do usuário (obrigatório)

**Path Param**
`id`: recipe id (mandadory) / id da receita (obrigatório) 
``` id: "string" ```

**OUTPUT**
**Body pretty**

```
{ 
    message: 'Receita excluida!' 
}
```


## ***Followers / Tabela de seguidores*** ##


### **Follow user / Seguir usuário (post)** ###
`http://localhost:3003/feed/follow`

**INPUT:**
**Headers**
`Authorization`: user token (mandatory) / token do usuário (obrigatório)

**Body**
`followed_id`: ID of the user to be followed (mandatory) / id do usuário a ser seguido (obrigatório) 

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

### **Unfollow user / Deixar de seguir usuário (delete)** ###
`http://localhost:3003/feed/delete`

**INPUT**
**Headers**
`Authorization`: user token (mandatory) / token do usuário (obrigatório)

**Body**
`followed_id`: the user to be followed unfollowed (mandatory) / id do usuário a ser deixado de seguir (obrigatório) 

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
