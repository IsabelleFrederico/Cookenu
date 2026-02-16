import { User, USER_ROLES } from '../types/user'
import { Login } from '../types/user'
import { Recipes } from '../types/recipes'
import { Feed } from '../types/feed'

// Users

export const userValidator = (newUser: Omit<User, 'id'>) => {

    const { name, email, password, role } = newUser

    if (!name || !role) {
        throw new Error("Preencha os campos 'name' e 'role'")
    }

    if (!email || email.indexOf("@") === -1) {
        throw new Error("Email inválido")
    }

    if (!password || password.length < 6) {
        throw new Error("A senha deve conter no mínimo 6 caracteres e no máximo 20")
    }

    if (!(role in USER_ROLES)) {
        throw new Error("'role' deve ser 'NORMAL' ou 'ADMIN'")
    }

    return newUser
}

export const loginValidator = (data: Login) => {
    const { email, password } = data

    if (!email) {
        throw new Error("Preencha o campo 'email'");
    }

    if (!password) {
        throw new Error("Preencha o campo 'senha'");
    }

    return data
}

export const editUserValidator = (editUser: Omit<User, "id">, id: string) => {

    const { name, password } = editUser

    if (!name && !password) {
        throw new Error("Atenção! Apenas os campos nome e password podem ser alterado")
    }

    if (!id) {
        throw new Error("Por favor, informe o ID do usuário que deve ser alterado")
    }

    return editUser
}

// Recipes

export const recipeValidator = (newRecipe: Omit<Recipes, 'id' | 'user_id' | 'user_name'>) => {

    const { title, description, date } = newRecipe

    if (!title || !description || !date) {
        throw new Error("Preencha os campos 'title', 'description' e date")
    }

    return newRecipe
}

export const editRecipeValidator = (editRecipe: Omit<Recipes, 'id'>) => {

    const { title, description } = editRecipe

    if (!title && !description) {
        throw new Error("Atenção! O campo title e description devem ser alterados")
    }

    return editRecipe
}

// Follow

export const followValidator = (newFollow: Omit<Feed, 'follower_id'>) => {

    const { followed_id } = newFollow

    if (!followed_id) {
        throw new Error("Preencha o campo 'followed_id'")
    }

    return newFollow
}
