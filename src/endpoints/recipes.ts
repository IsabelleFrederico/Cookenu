import { Router } from 'express'

import {
    getYourRecipes,
    getAllRecipes,
    createRecipe,
    getRecipeByTitle,
    getFollowedRecipes,
    updateRecipe,
    getRecipeById,
    deleteRecipe
} from '../database/recipes'

import { generateId } from '../services/idGenerator'
import { getTokenData } from '../services/authenticator'

import {
    recipeValidator,
    editRecipeValidator
} from '../utils/valitador'
import { getUserById } from '../database/users'

export const recipesRoute = Router()

recipesRoute.get('/', async (req, res) => {
    try {
        const allRecipes = await getAllRecipes()

        if (!allRecipes.length) {
            res.send("Não há receitas cadastradas ainda")
        } else {
            res.send(allRecipes)
        }
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
})

recipesRoute.get('/myfeed', async (req, res) => {
    try {
        const token = req.headers.authorization as string;

        const authenticationData = getTokenData(token);

        const recipes = await getFollowedRecipes(authenticationData.id)

        if (!recipes) {
            throw new Error("Receitas não encontradas");
        }
        if (recipes.length === 0) {
            throw new Error("Você ainda não segue ninguem com receitas publicadas");
        }

        res.status(200).send({ recipes })

    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
})

recipesRoute.get("/my", async (req, res) => {
    const token = req.headers.authorization as string;

    const authenticationData = getTokenData(token);

    const recipes = await getYourRecipes(authenticationData.id)

    if (!recipes) {
        throw new Error("Receitas não encontradas");
    }

    res.status(200).send({ recipes })

});

recipesRoute.get("/:title", async (req, res) => {
    const { title } = req.params

    const recipes = await getRecipeByTitle(title)

    if (!recipes) {
        throw new Error("Receitas não encontradas");
    }

    res.status(200).send({ recipes })

})

recipesRoute.post('/add', async (req, res) => {
    try {
        const recipeCheck = recipeValidator(req.body)
        const id = generateId()

        const token = req.headers.authorization as string;
        const authenticationData = getTokenData(token)

        const user = await getUserById(authenticationData.id)

        const recipeData = {
            id,
            ...recipeCheck,
            user_id: authenticationData.id,
            user_name: user.name
        };

        const recipeCreated = await createRecipe(recipeData)

        if (!recipeCreated) throw Error("Não foi possivel adicionar a receita")

        res.status(200).send({
            message: "Receita adicionada com sucesso",
            recipeData
        })

    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }

})

recipesRoute.put("/edit/:id", async (req, res) => {
    try {
        const { id } = req.params
        const token = req.headers.authorization as string;

        const authenticationData = getTokenData(token);
        const recipeData = await getRecipeById(id)

        if (!recipeData) {
            throw new Error("Receita não encontrada");
        }

        if (authenticationData.role !== "ADMIN" && authenticationData.id !== recipeData.user_id) {
            throw new Error("Ops, apenas usuários 'ADMIN' e autores podem realizar essa tarefa")
        }

        const checkEddit = editRecipeValidator(req.body)

        const editedRecipe = await updateRecipe(id, checkEddit)

        res.status(200).send({
            message: "Receita atualizado",
            editedRecipe
        });

    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
});

recipesRoute.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        const token = req.headers.authorization as string;

        const authenticationData = getTokenData(token);
        const recipeData = await getRecipeById(id)

        if (!recipeData) {
            throw new Error("Receita não encontrada");
        }

        if (authenticationData.id !== recipeData.user_id && authenticationData.role !== "ADMIN") {
            throw new Error("Ops, Apenas ADMIN ou o criador da receita que podem deletá-la");
        }

        const recipeDeleted = deleteRecipe(id)

        if (!recipeDeleted) {
            throw Error('Receita não encontrada')
        }

        res.send({ message: 'Receita excluida!' })

    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
})