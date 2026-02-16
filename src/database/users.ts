import { Hash } from 'crypto'
import connection from '../connection'
import { User } from '../types/user'

const usersTable = () => connection('users_list')

export const getAllUsers = async () => {
    const allUsers = await usersTable()
    return allUsers
}

export const createUser = async (newUser: User) => {
    try {
        const user = await usersTable()
            .insert(newUser)
        return user
    } catch (err) {
        throw new Error(err.message)
    }
}

export const verifyEmail = async (email: string) => {
    const result = await usersTable()
    .where("email", `${email}`)
    return result[0]
}

export const updateUser = async (
    id: string,
    userData: Omit<User, 'id'>
) => { await
    usersTable()
        .update(userData)
        .where({ id })
}

export const updatePassword = async(email: string, password: string) => {
    await usersTable()
    .update({password})
    .where({email})
}

export const getUserById = async (id: string): Promise<any> => {
    const result = await usersTable()
        .select("*")
        .where({ id });

    return result[0];
}

export const deleteUser = async (id: string): Promise<any> => {
    await usersTable()
        .delete()
        .where({ id });
}