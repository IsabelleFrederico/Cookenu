import connection from '../connection'
import { Recipes } from '../types/recipes'

const recipesTable = () => connection('recipes_list')

export const getAllRecipes = async () => {
    const allRecipes = await recipesTable()
    return allRecipes
}

export const createRecipe = async (newRecipe: Omit<Recipes, 'id' & 'user_id' & 'user_name' & 'date'>) => {
    const recipe = await recipesTable()
        .insert(newRecipe)
    return recipe
}

export const updateRecipe = async (
    id: string,
    userData: Omit<Recipes, 'id'>
) => {
    await
        recipesTable()
            .update(userData)
            .where({ id })
}

export const getYourRecipes = async (user_id: string): Promise<any> => {
    const result = await recipesTable()
        .select('title', 'description', 'user_name', 'date')
        .where({ user_id })
        .orderBy('date', 'desc')

    return result;
}

export const getFollowedRecipes = async (user_id: string): Promise<any> => {
    const result = await recipesTable()
    .select('title', 'description', 'date', 'user_name')
    .join({ f: 'followers_list'}, 'f.followed_id', 'user_id')
    .where ('f.follower_id', user_id)
    .orderBy('date', 'desc')

    return result;
}

export const getRecipeById = async (id: string): Promise<any> => {
    const result = await recipesTable()
        .where({ id })
    return result[0];
}

export const getRecipeByTitle = async (title: string): Promise<any> => {
    const result = await recipesTable()
        .where('title', 'like', `%${title}%`)
    return result;
}

export const deleteRecipe = async (id: string): Promise<any> => {
    await recipesTable()
        .delete()
        .where({ id });
}