import express from 'express'
import cors from 'cors'
import { userRouter } from './routers/userRouter'
import { postRouter } from './routers/postRouter'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.use("/users", userRouter)
app.use("/posts", postRouter)