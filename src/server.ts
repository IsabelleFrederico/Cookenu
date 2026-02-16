import express from 'express'
import cors from 'cors'
import { usersRoute } from './endpoints/users'
import { recipesRoute } from './endpoints/recipes' 
import { feedRoute } from './endpoints/feed' 

export const app = express()

app.use(express.json())
app.use(cors())

app.use('/users', usersRoute)
app.use('/recipes', recipesRoute)
app.use('/feed', feedRoute)