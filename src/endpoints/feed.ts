import { Router } from 'express'

import {
    createFollow,
    unFollow
} from '../database/feed'

import { getTokenData } from '../services/authenticator'

import {
    followValidator
} from '../utils/valitador'

export const feedRoute = Router()

feedRoute.post('/follow', async (req, res) => {
    try {
        const followCheck = followValidator(req.body)

        const token = req.headers.authorization as string;
        const authenticationData = getTokenData(token)

        const followData = {
            follower_id: authenticationData.id,
            ...followCheck
        };

        const followCreated = await createFollow(followData)

        if (!followCreated) throw Error("Não foi possivel seguir esse usuário")

        res.status(200).send({
            message: "Seguindo!",
        })

    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }

})

feedRoute.delete('/delete', async (req, res) => {
    try {
        const token = req.headers.authorization as string;

        const authenticationData = getTokenData(token);

        const follow = {
            follower_id: authenticationData.id,
            followed_id: req.body.followed_id
        }

        if (!follow) {
            throw new Error("Seguidor não encontrado");
        }

        await unFollow(follow)

        res.send({ message: 'unFollow realizado com sucesso!' })

    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
})