import { Router } from 'express'

import {
    getAllUsers,
    createUser,
    verifyEmail,
    updateUser,
    getUserById,
    deleteUser,
    updatePassword
} from '../database/users'

import { generateHash, compareHash } from '../services/hashManager'
import { generateId } from '../services/idGenerator'
import { generateToken, getTokenData } from '../services/authenticator'

import { authenticationData } from '../types/user'

import {
    userValidator,
    editUserValidator,
    loginValidator
} from '../utils/valitador'
import { transporter } from '../services/transporter'

export const usersRoute = Router()

usersRoute.get('/', async (req, res) => {
    try {
        const allUser = await getAllUsers()

        if (!allUser.length) {
            res.send("Não há usuários cadastrados ainda")
        } else {
            res.send(allUser)
        }
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
})

usersRoute.get("/:id", async (req, res) => {
    const token = req.headers.authorization as string;

    const authenticationData = getTokenData(token);

    const user = await getUserById(authenticationData.id);

    if (!user) {
        throw new Error("Usuário não encontrado");
    }

    if (authenticationData.role === "ADMIN") {
        res.status(200).send({ user })
    }

    res.status(200).send({
        id: user.id,
        name: user.name,
        email: user.email,
        role: authenticationData.role
    });


});

usersRoute.post('/signup', async (req, res) => {
    try {
        const userCheck = userValidator(req.body)
        const id = generateId();

        const generatedHash = generateHash(userCheck.password)

        const userData = {
            id,
            name: userCheck.name,
            email: userCheck.email,
            password: generatedHash,
            role: userCheck.role
        };

        const userCreated = createUser(userData)

        if (!userCreated) throw Error('Não foi possivel criar o usuário')

        const tokenData: authenticationData = {
            id: userData.id,
            role: userData.role
        }

        const token = generateToken(tokenData)

        res.status(200).send({
            message: "Usuário cadastrado com sucesso",
            token
        })
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }

})

usersRoute.post("/login", async (req, res) => {
    try {
        const loginCheck = loginValidator(req.body)

        const userRegistered = await verifyEmail(loginCheck.email)

        if (!userRegistered) {
            throw new Error("Usuário não encontrado")
        }

        const passwordIsCorrect: boolean = compareHash(loginCheck.password, userRegistered.password)

        if (!passwordIsCorrect) {
            throw new Error("Senha inválida")
        }

        const tokenData: authenticationData = {
            id: userRegistered.id,
            role: userRegistered.role
        }

        const token = generateToken(tokenData)

        res.status(200).send({ token });

    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }

})

usersRoute.post("/password/reset", async (req, res) => {
    try {
        const email = req.body.email as string
    
        if (!email) {
            throw new Error("Por favor, informe o e-mail cadastrado")
        }

        const user = await verifyEmail(email)

        if (!user) {
            throw new Error("E-mail não encontrado")
        }

        const characters = "abcdfeujkcnd24356714327?!/[]{}"

        let newPassword = ""

        for (let i = 0; i < 10; i++) {
            const index = Math.floor(Math.random() * (characters.length - 1))
            newPassword += characters[index]
        }

        const newHash = generateHash(newPassword)

        await updatePassword(email, newHash)

        await transporter.sendMail({
            from: `<${process.env.NODEMAILER_USER}>`,
            to: email,
            subject: "Recuperação de senha",
            text: `Sua nova senha é ${newPassword}`,
            html: `<p>Sua nova senha é <strong>${newPassword}</strong></p>`
        })

        res.send({
            message: `Sua senha de recuperação foi enviada para o email ${email}. Por questão de segurança altere a senha no campo editar usuário`})

    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
})

usersRoute.put("/edit/:id", async (req, res) => {
    try {
        const { id } = req.params
        const token = req.headers.authorization as string;

        const authenticationData = getTokenData(token);

        if (authenticationData.role !== "ADMIN" && authenticationData.id !== id) {
            throw new Error("Ops, apenas usuários 'ADMIN' ou o próprio usuário podem realizar essa tarefa");
        }

        const checkEddit = editUserValidator(req.body, id)

        const editedUser = await updateUser(id, checkEddit)

        res.status(200).send({
            message: "Usuário atualizado",
            editedUser
        });
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
});

usersRoute.delete('/delete/:id', (req, res) => {
    try {
        const { id } = req.params

        const token = req.headers.authorization as string;

        const authenticationData = getTokenData(token);

        const user = getUserById(authenticationData.id);

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        if (authenticationData.role !== "ADMIN") {
            throw new Error("Ops, apenas usuários 'ADMIN' podem realizar essa tarefa");
        }

        const userDeleted = deleteUser(id)

        if (!userDeleted) {
            throw Error('Usuário não encontrado')
        }

        res.send({ message: 'Usuário excluido!' })

    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
})